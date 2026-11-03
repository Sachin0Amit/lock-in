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
  'fm-addition-carrying': { authoredOn: '2026-11-03', commit: '(unit-2 ship commit)', unit: 'unit 2 (lesson 2.1 of 5; chapter 2 in progress)' },
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
  { date: '2026-11-03 (hourly run 2)', commit: '(unit-2 ship commit)', title: 'UNIT 2 OPENED: lesson 2.1 Addition and the Art of Carrying', detail: 'Chapter 2 (The Four Operations) started per the unit cadence: lesson 2.1 authored (~3,600 words): counting-on, number-line figure with commutativity drawn as geometry, four-law property table, column-addition algorithm block, worked 4,589+2,764 with carry seat-map figure, carry-bound derivation (9+9+1=19 induction), sum-bound equation + formula card, 999+1 seat-creation example, four carrying-traps callout, mod-9 checksum section with verified fingerprint example + blindness analysis (transpositions, ±9 slips), compensation technique, Gauss pairing historical callout, exam callout, 5 quiz items, L1–L6 exercises. 51 arithmetic checks verified by scripts/verify-unit-2.ts BEFORE writing. Khattar QA 4e re-downloaded from Drive for the unit (working copies deleted after verification); NCERT class 6 ch. 2 topics web-checked. Chapter 2 registered in book.ts (in-progress; lessons 2.2–2.5 planned).' },
]

const verificationLog = [
  { unit: 'platform base (lesson 1.1)', date: '2026-11-02', gates: 'lint clean; tsc --noEmit clean (src/); agent-browser E2E: home/book/lesson render, 55 KaTeX nodes + 1 SVG, quiz feedback, solution expansion, completion persistence, search, dark mode, no overflow at 390px/1280px, no console errors. Accuracy pass fixed 4 issues (numeral paragraph, 10^11 kharab column, modular-arithmetic wording, digit-reversal formula verified by substitution).' },
  { unit: 'platform v2', date: '2026-11-02', gates: 'lint clean; all routes 200 (unknown ids 404); browser E2E: palette multi-word search + navigation, quiz answered-all → 5/5 + quizBest persisted + retake reset, keyboard C/B, flashcards flip/mark/mode switch, scrollspy, progress bar, Your desk, localStorage persistence; per-page fresh loads show zero hydration warnings; VLM screenshot review.' },
  { unit: 'streak removal + cadence docs', date: '2026-11-03', gates: 'lint clean; tsc clean (fixed pre-existing SearchHit union type error); E2E with seeded progress: desk stats [Lessons completed 1 · Words read 2,852 · Terms mastered 3 · Bookmarks 0], zero "streak" occurrences anywhere, 54 KaTeX nodes, no console errors, no hydration warnings.' },
  { unit: 'site v3', date: '2026-11-03', gates: 'lint + tsc clean; all routes 200; browser E2E: hero CTAs, 6 spine labels, stat strip, roadmap, footer links, breadcrumb, Next-up + 5/5 quiz chip + 1/1-done counter, 54 KaTeX nodes, C-keyboard toggle, Ctrl-K palette, flashcards; VLM visual review rounds: home 9/10 (desktop + mobile; imbalance, ghost-contrast, devtools overlap fixed), book 9/10, reader 8/10; dark-mode spine contrast fixed; zero console errors.' },
  { unit: 'unit 1 (Foundation Mathematics ch. 1)', date: '2026-11-03', gates: '66 arithmetic checks recomputed by script before writing (incl. half-up vs half-even error sums +5 vs 0); verify-unit-1.ts ALL CHECKS PASS (ids unique, quiz indices valid, solutions complete, prereqs resolve, sources resolve); lint clean; tsc clean; routes 200; browser E2E: KaTeX 154/114 nodes per lesson, figures + algorithm block + 11-col table render, quiz scored 5/5 "perfect" with feedback, 16-term flashcard deck, glossary lists new terms + formula cards, TOC shows ch. 1 complete with ch. 2 planned, Next-up works; mobile 390px exactly no overflow; no console errors.' },
  { unit: 'unit 2 (FM ch. 2, lesson 2.1)', date: '2026-11-03', gates: '51 arithmetic checks verified by scripts/verify-unit-2.ts BEFORE writing (ALL PASS — incl. digit-root convention fix: multiples of 9 root to 9, compared mod 9); lint clean; tsc clean repo-wide (tsconfig excludes sandbox dirs; @types/bun added); routes 200 (lesson 2.1 needed a dev-server restart to pick up new generateStaticParams); browser E2E: KaTeX 118 nodes, 14 headings, both figures + algorithm + formula cards + 6 terms render, quiz answered 5/5 "perfect" with feedback, flashcard deck grew 16 → 22 cards, glossary lists Addend/Carry/Commutative + Sum-bound formula card, mobile 390px exactly no overflow (scrollW=390); zero console errors.' },
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
      { key: 'khattar-qa-4e', work: 'Dinesh Khattar, Quantitative Aptitude for Competitive Examinations, 4th ed., Pearson (2019), ISBN 9789353439552', usedFor: 'FM ch. 1 (unit 1): place-value/face-value definitions, Indian system naming, exam-style digit problems. FM ch. 2 (unit 2): exam-style rapid-arithmetic context, ch. 4 Simplification surveyed (BODMAS material reserved for lesson 2.5). Exposition original.' },
      { key: 'ncert-math6-ch1', work: 'NCERT Class 6 Mathematics, ch. 1 "Knowing Our Numbers" (public curriculum)', usedFor: 'FM ch. 1 (unit 1): canonical school-level topic coverage (comparing, ordering, greatest/smallest, estimation). Coverage cross-checked via web; exposition original.' },
      { key: 'ncert-math6-ch2', work: 'NCERT Class 6 Mathematics, ch. 2 "Whole Numbers" (public curriculum)', usedFor: 'FM ch. 2 (unit 2, lesson 2.1): canonical school-level treatment of addition on the number line and the properties of whole numbers (closure, commutativity, associativity, identity). Coverage web-checked; exposition original.' },
    ],
    perUnitDownloadLedger: [
      { unit: 'unit 1 — FM ch. 1', downloaded: 'Khattar QA 4e PDF (32.4 MB, 1049 pp) + NCERT web outline', usedFor: 'lessons 1.2 + 1.3', workingCopiesDeleted: '2026-11-03, after unit verification' },
      { unit: 'unit 2 — FM ch. 2 (lesson 2.1)', downloaded: 'Khattar QA 4e PDF (33.9 MB, re-downloaded after sandbox recycle wiped working copies; Drive file id recovered via re-survey) + NCERT class 6 ch. 2 web outline', usedFor: 'lesson 2.1 (Addition and the Art of Carrying)', workingCopiesDeleted: '2026-11-03, after E2E verification' },
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
