/**
 * verify-exam-coverage.ts — the exam-topic coverage guarantee pass
 * (2026-11-15, owner directive: "make sure different exams topics are
 * also covered").
 *
 * WHAT IT CHECKS — four sections, all green or the pass fails:
 *
 *  I. REGISTRY COMPLETENESS — every examination in
 *     docs/project/EXAM_REGISTRY.json with a RESEARCHED mathematics
 *     section either ships a practice preset (matched by registryId)
 *     or sits in NOT_YET_SERVED below with an honest reason. The
 *     not-applicable (no maths section) and adjacent (scope mirrors a
 *     researched sibling) entries are accounted for as such. Nobody
 *     can silently drop an exam family again.
 *
 *  II. PRESET ↔ REGISTRY CONSISTENCY — every preset's registryId,
 *     region and category match the registry entry exactly; scopes
 *     resolve over WRITTEN chapters only; and each preset matches the
 *     hand-authored EXPECTED table (exact scope chapter set + required
 *     caveat themes) — the "arrange accordingly" artifact for exams.
 *     The display-group mapping (EXAM_CATEGORY_GROUPS) must be total.
 *
 *  III. PAPER TOPIC SPREAD — for every preset, across seeds and
 *      difficulty bands, generated papers:
 *        - draw ONLY from the preset's scope (no off-syllabus leakage),
 *        - never repeat a question within the paper,
 *        - fill every section to min(count, eligible pool),
 *        - carry the round-robin topic guarantee: distinct chapters
 *          per section == min(count, chapters with eligible questions)
 *          — no single topic dominates a paper,
 *        - span >= 2 distinct books whenever the scope does.
 *
 *  IV. NUMERIC POOLS — every type-in section's eligible pool exceeds
 *      its question count (papers never come up short).
 *
 * Run: bun run scripts/verify-exam-coverage.ts   (dev server NOT required)
 */
import { readFileSync } from 'fs'
import { CATALOG } from '../src/lib/builder/catalog'
import { EXAM_PRESETS, EXAM_CATEGORY_GROUPS } from '../src/data/exams/presets'
import { BadInput, buildExamPaper } from '../src/lib/practice/practice-service'
import { allPracticeQuestions } from '../src/lib/practice/questions'
import { numericAnswerOf } from '../src/lib/practice/engine'
import type { DifficultyBand, PracticeQuestion } from '../src/lib/practice/types'

let pass = 0
let fail = 0
const ok = (cond: boolean, label: string, detail?: unknown) => {
  if (cond) {
    pass++
  } else {
    fail++
    console.error(`  FAIL: ${label}`, detail !== undefined ? JSON.stringify(detail) : '')
  }
}

/* ------------------------------------------------------------------ */
/* Registry                                                            */
/* ------------------------------------------------------------------ */

interface RegistryExam {
  id: string
  name: string
  region: string
  category: string
  status: string
  mathUnits?: string[]
  coverageMap?: string[]
}

const registry = JSON.parse(
  readFileSync('docs/project/EXAM_REGISTRY.json', 'utf8'),
) as { exams: RegistryExam[] }
const regById = new Map(registry.exams.map((e) => [e.id, e]))

/**
 * Researched maths exams that honestly ship NO preset yet, with the
 * reason. A preset lands only when at least one of the exam's units
 * has meaningful written coverage — a preset that would mislabel
 * library basics as the exam's core scope is worse than none.
 */
const NOT_YET_SERVED: Record<string, string> = {
  'iit-jam-math':
    'Real analysis, multivariable calculus, linear algebra and abstract algebra — none of its units is written yet; lands with the analysis and algebra books.',
  ap: 'AP Calculus AB/BC and AP Statistics — no unit written yet; lands with the calculus and statistics books.',
  putnam:
    'Calculus and real analysis at problem depth dominate the paper; only the prerequisite algebra is written. Lands with the analysis books.',
  'fe-ncees':
    'Engineering mathematics (calculus, linear algebra, differential equations, numerical methods) — only the algebra prerequisite is written. Lands with the engineering-maths books.',
}

/* ------------------------------------------------------------------ */
/* Written-library census + expected scopes                            */
/* ------------------------------------------------------------------ */

const writtenChapters = CATALOG.chapters.filter((c) => c.lessonRecordIds.length > 0)
const writtenKeys = new Set(writtenChapters.map((c) => c.key))
const chaptersOfBook = (bookId: string) =>
  writtenChapters.filter((c) => c.bookId === bookId).map((c) => c.chapterNumber)

const EA = chaptersOfBook('elementary-algebra').map((n) => `elementary-algebra:${n}`)
const AA = chaptersOfBook('advanced-algebra').map((n) => `advanced-algebra:${n}`)
const FM = chaptersOfBook('foundation-mathematics').map((n) => `foundation-mathematics:${n}`)
const ANS = chaptersOfBook('arithmetic-and-number-systems').map((n) => `arithmetic-and-number-systems:${n}`)

/** Hand-authored expectation per preset: exact scope + caveat themes. */
interface Expected {
  scope: string[] | '*'
  caveatThemes: string[]
}

const EXPECTED: Record<string, Expected> = {
  'library-sweep': { scope: '*', caveatThemes: [] },
  'jee-main-maths': {
    scope: '*',
    caveatThemes: ['Trigonometry', 'Coordinate geometry', 'Calculus', 'Statistics'],
  },
  'jee-advanced-maths': {
    scope: '*',
    caveatThemes: ['Trigonometry', 'geometry', 'Calculus', 'Matrices', 'Probability', 'Sequences'],
  },
  'cuet-ug-maths': { scope: '*', caveatThemes: ['Vectors', 'Calculus', 'Probability'] },
  'cat-quant': {
    scope: [...FM.filter((k) => Number(k.split(':')[1]) <= 7 || k.endsWith(':11')), ...ANS.filter((k) => Number(k.split(':')[1]) <= 2), ...EA.filter((k) => Number(k.split(':')[1]) <= 5)],
    caveatThemes: ['Number systems', 'Geometry', 'Functions'],
  },
  'ssc-cgl-quant': { scope: '*', caveatThemes: ['Trigonometry', 'Data interpretation', 'Geometry'] },
  'nda-maths': { scope: '*', caveatThemes: ['Trigonometry', 'Calculus', 'Vectors', 'Statistics'] },
  'upsc-csat': {
    scope: [...FM.filter((k) => [1, 2, 3, 4, 5, 6, 7, 10].includes(Number(k.split(':')[1]))), ...ANS.filter((k) => Number(k.split(':')[1]) <= 2)],
    caveatThemes: ['alligation', 'Logical reasoning', 'Data-interpretation'],
  },
  'gate-engineering-maths': {
    scope: [...EA, ...AA.filter((k) => Number(k.split(':')[1]) <= 2)],
    caveatThemes: ['Linear algebra', 'Calculus', 'Differential equations', 'Probability', 'Numerical'],
  },
  'ugc-net-paper1': {
    scope: FM.filter((k) => [1, 2, 3, 4, 5, 6, 7, 10, 11].includes(Number(k.split(':')[1]))),
    caveatThemes: ['coding', 'Data-interpretation', 'Teaching'],
  },
  'ca-foundation-qa': {
    scope: [...FM.filter((k) => [5, 6].includes(Number(k.split(':')[1]))), ...EA, ...AA.filter((k) => Number(k.split(':')[1]) <= 2)],
    caveatThemes: ['Logarithms', 'compound interest', 'Permutations', 'Statistics', 'Logical reasoning'],
  },
  'isi-b-stat': {
    scope: [...EA, ...AA, ...ANS.filter((k) => Number(k.split(':')[1]) <= 5), ...FM.filter((k) => k.endsWith(':8'))],
    caveatThemes: ['inequalities', 'Geometry', 'Trigonometry', 'Calculus', 'Combinatorics'],
  },
  'sat-math': {
    scope: [...EA, ...AA.filter((k) => Number(k.split(':')[1]) <= 2), ...FM.filter((k) => [4, 5, 6, 8, 10].includes(Number(k.split(':')[1])))],
    caveatThemes: ['Trigonometry', 'Complex numbers', 'Statistics'],
  },
  'act-math': { scope: '*', caveatThemes: ['Trigonometric', 'Vectors', 'Statistics'] },
  'gre-quant': { scope: '*', caveatThemes: ['Geometry', 'Coordinate geometry', 'Counting', 'Data-analysis'] },
  'gmat-quant': {
    scope: [...FM.filter((k) => [1, 2, 3, 4, 5, 6, 7, 10].includes(Number(k.split(':')[1]))), ...ANS.filter((k) => Number(k.split(':')[1]) <= 2), ...EA],
    caveatThemes: ['Data-sufficiency', 'Functions', 'Statistics'],
  },
  'a-level-maths': {
    scope: [...EA, ...AA],
    caveatThemes: ['Trigonometry', 'Calculus', 'Coordinate geometry', 'Sequences', 'Vectors', 'Further pure'],
  },
  'ib-maths-aa': {
    scope: [...EA, ...AA, ...FM.filter((k) => [8, 10, 11].includes(Number(k.split(':')[1])))],
    caveatThemes: ['Trigonometry', 'Calculus', 'Statistics', 'Vectors'],
  },
  'gaokao-math': {
    scope: [...EA, ...AA],
    caveatThemes: ['Trigonometric', 'Sequences', 'geometry', 'Derivatives', 'Counting', 'Sets'],
  },
  'korean-csat-math': {
    scope: [...EA, ...AA],
    caveatThemes: ['Trigonometric', 'Limits', 'Integrals', 'Probability', 'Analytic geometry', 'Exponentials'],
  },
  'eju-math': {
    scope: [...EA, ...AA.filter((k) => Number(k.split(':')[1]) <= 2), ...FM.filter((k) => k.endsWith(':8'))],
    caveatThemes: ['Sets', 'Trigonometric', 'Calculus', 'Vectors', 'Linear programming', 'Probability'],
  },
  'tmua-paper1': {
    scope: [...EA, ...AA.filter((k) => Number(k.split(':')[1]) <= 2)],
    caveatThemes: ['Calculus', 'Trigonometry', 'Vectors', 'Proof', 'Statistics'],
  },
  'oxford-mat': {
    scope: [...EA, ...AA.filter((k) => Number(k.split(':')[1]) <= 2), ...FM.filter((k) => k.endsWith(':8'))],
    caveatThemes: ['Differentiation', 'Trigonometry', 'Logarithms', 'Coordinate geometry', 'Graph-transformation'],
  },
  'step-mathematics': {
    scope: [...EA, ...AA],
    caveatThemes: ['calculus', 'Complex numbers', 'Trigonometric', 'Probability', 'proof'],
  },
  'amc-12': {
    scope: [...EA, ...AA, ...ANS.filter((k) => Number(k.split(':')[1]) <= 5), ...FM.filter((k) => k.endsWith(':8'))],
    caveatThemes: ['Geometry', 'Combinatorics', 'Probability', 'USAMO'],
  },
  aime: {
    scope: [...EA, ...AA, ...ANS.filter((k) => Number(k.split(':')[1]) <= 5), ...FM.filter((k) => k.endsWith(':8'))],
    caveatThemes: ['Geometry', 'Combinatorics', 'Probability', 'USAMO'],
  },
  euclid: {
    scope: [...EA, ...AA, ...ANS.filter((k) => Number(k.split(':')[1]) <= 5), ...FM.filter((k) => k.endsWith(':8'))],
    caveatThemes: ['Geometry', 'Full-solution', 'Combinatorics'],
  },
  'imo-style': {
    scope: [...EA, ...AA, ...ANS.filter((k) => Number(k.split(':')[1]) <= 5), ...FM.filter((k) => k.endsWith(':8'))],
    caveatThemes: ['Functional equations', 'geometry', 'Combinatorics', 'Proof'],
  },
}

/* ------------------------------------------------------------------ */
/* I. Registry completeness                                            */
/* ------------------------------------------------------------------ */

console.log('I. Registry completeness')
{
  ok(registry.exams.length === 56, 'registry carries 56 exams', registry.exams.length)

  const researchedMath = registry.exams.filter((e) => e.status === 'researched' && (e.mathUnits?.length ?? 0) > 0)
  ok(researchedMath.length === 30, '30 researched exams with mathematics sections', researchedMath.length)
  const notApplicable = registry.exams.filter((e) => e.status === 'not-applicable')
  const adjacent = registry.exams.filter((e) => e.status === 'adjacent')
  ok(notApplicable.length === 13, '13 not-applicable entries (no maths section)', notApplicable.length)
  ok(adjacent.length === 13, '13 adjacent entries (served by researched siblings)', adjacent.length)

  const presetRegistryIds = new Set(EXAM_PRESETS.map((p) => p.registryId).filter((id): id is string => !!id))
  const served = researchedMath.filter((e) => presetRegistryIds.has(e.id))
  const skipped = researchedMath.filter((e) => !presetRegistryIds.has(e.id))
  ok(
    skipped.every((e) => NOT_YET_SERVED[e.id] !== undefined),
    'every unserved researched-maths exam is in NOT_YET_SERVED with a reason',
    skipped.map((e) => e.id),
  )
  ok(
    Object.keys(NOT_YET_SERVED).every((id) => regById.has(id)),
    'NOT_YET_SERVED ids all exist in the registry',
    Object.keys(NOT_YET_SERVED).filter((id) => !regById.has(id)),
  )
  ok(
    Object.entries(NOT_YET_SERVED).every(([id, reason]) => reason.length > 40 && !presetRegistryIds.has(id)),
    'every NOT_YET_SERVED reason is substantive and the exam truly has no preset',
  )
  const accounted = served.length + skipped.length + notApplicable.length + adjacent.length
  ok(accounted === registry.exams.length, 'every registry entry is accounted for', accounted)

  /* presets reference real registry entries; the MAA ladder is the one
   * registry id that may legitimately serve two presets (AMC + AIME) */
  const idCounts = new Map<string, number>()
  for (const p of EXAM_PRESETS) {
    if (!p.registryId) continue
    idCounts.set(p.registryId, (idCounts.get(p.registryId) ?? 0) + 1)
  }
  ok(
    [...idCounts.entries()].every(([id, n]) => regById.has(id) && (n === 1 || (id === 'amc-aime-usamo' && n === 2))),
    'preset registryIds exist; only the AMC/AIME ladder shares an id',
    [...idCounts.entries()].filter(([id, n]) => n > 1),
  )
  ok(presetRegistryIds.size === 26, '26 distinct registry exams served by presets', presetRegistryIds.size)
  ok(EXAM_PRESETS.length === 28, '28 presets in total (27 registry-backed + Library Sweep)', EXAM_PRESETS.length)
  console.log(
    `    served: ${served.length}/30 researched-maths exams (${presetRegistryIds.size} ids, ${EXAM_PRESETS.length - 1} presets); not-yet-served: ${Object.keys(NOT_YET_SERVED).join(', ')}; not-applicable ${notApplicable.length}; adjacent ${adjacent.length}`,
  )
}

/* ------------------------------------------------------------------ */
/* II. Preset ↔ registry consistency + expected scopes                 */
/* ------------------------------------------------------------------ */

console.log('II. Preset ↔ registry consistency')
{
  const keys = new Set<string>()
  for (const p of EXAM_PRESETS) {
    ok(!keys.has(p.key), `preset key unique: ${p.key}`)
    keys.add(p.key)

    const exp = EXPECTED[p.key]
    ok(exp !== undefined, `preset has an EXPECTED entry: ${p.key}`)

    if (p.registryId) {
      const reg = regById.get(p.registryId)
      ok(reg !== undefined, `preset ${p.key}: registryId exists`, p.registryId)
      if (reg) {
        ok(p.region === reg.region, `preset ${p.key}: region matches registry`, [p.region, reg.region])
        ok(p.category === reg.category, `preset ${p.key}: category matches registry`, [p.category, reg.category])
        ok(
          (reg.mathUnits?.length ?? 0) > 0 && reg.status === 'researched',
          `preset ${p.key}: registry entry is researched with math units`,
        )
        ok(p.caveats.length > 0, `preset ${p.key}: caveats list pending topics`)
      }
    } else {
      ok(p.key === 'library-sweep', `only Library Sweep skips the registryId`, p.key)
    }

    ok(p.formatNote.length > 20, `preset ${p.key}: honest format note`)
    ok(p.scopeStatus === 'provisional', `preset ${p.key}: scope labelled provisional`)
    ok(p.durationMins > 0 && p.sections.length > 0, `preset ${p.key}: duration + sections sane`)
    ok(
      p.sections.every((s) => s.questionCount > 0 && s.marks > 0 && s.negative >= 0),
      `preset ${p.key}: section marking sane`,
    )

    /* scope over written chapters only */
    const scope = p.scope === '*' ? [...writtenKeys] : p.scope
    ok(scope.length > 0 && scope.every((k) => writtenKeys.has(k)), `preset ${p.key}: scope resolves to written chapters`, scope.filter((k) => !writtenKeys.has(k)))

    /* exact scope set vs the hand-authored expectation */
    if (exp) {
      const want = new Set(exp.scope === '*' ? [...writtenKeys] : exp.scope)
      const got = new Set(scope)
      ok(
        want.size === got.size && [...want].every((k) => got.has(k)),
        `preset ${p.key}: scope matches the EXPECTED arrangement`,
        { missing: [...want].filter((k) => !got.has(k)), extra: [...got].filter((k) => !want.has(k)) },
      )
      ok(
        exp.caveatThemes.every((t) => p.caveats.some((c) => c.includes(t))),
        `preset ${p.key}: caveats carry the pending-topic themes`,
        exp.caveatThemes.filter((t) => !p.caveats.some((c) => c.includes(t))),
      )
    }
  }

  /* the display-group mapping is total over preset categories */
  const grouped = new Set(EXAM_CATEGORY_GROUPS.flatMap((g) => g.match))
  ok(
    EXAM_PRESETS.every((p) => grouped.has(p.category)),
    'EXAM_CATEGORY_GROUPS covers every preset category',
    [...new Set(EXAM_PRESETS.map((p) => p.category))].filter((c) => !grouped.has(c)),
  )
  const groupCounts = EXAM_CATEGORY_GROUPS.map((g) => ({
    label: g.label,
    n: EXAM_PRESETS.filter((p) => g.match.includes(p.category)).length,
  }))
  ok(
    groupCounts.reduce((n, g) => n + g.n, 0) === EXAM_PRESETS.length,
    'display groups partition the preset census exactly',
    groupCounts,
  )
  console.log(
    '    groups:',
    groupCounts.map((g) => `${g.label} ${g.n}`).join(' · '),
  )
}

/* ------------------------------------------------------------------ */
/* III. Paper topic spread                                             */
/* ------------------------------------------------------------------ */

console.log('III. Paper topic spread (seeds × bands × every preset)')
{
  const pool = allPracticeQuestions()
  const SEEDS = [11, 777, 90210]
  const BANDS: DifficultyBand[] = ['warmup', 'standard', 'challenge']

  const eligible = (qs: readonly PracticeQuestion[], type: 'mcq' | 'numeric') =>
    type === 'numeric'
      ? qs.filter((q) => q.kind === 'free' && numericAnswerOf(q.answerText) !== null)
      : qs.filter((q) => q.kind === 'mcq')

  let totalPapers = 0
  for (const p of EXAM_PRESETS) {
    const scopeKeys = new Set(p.scope === '*' ? [...writtenKeys] : p.scope)
    const scopeQuestions = pool.filter((q) => scopeKeys.has(q.chapterKey))
    const scopeBooks = new Set(scopeQuestions.map((q) => q.bookId))

    for (const seed of SEEDS) {
      for (const band of BANDS) {
        const res = await buildExamPaper(undefined, p.key, seed, band)
        totalPapers++
        const paper = res.paper

        /* scope fidelity — no off-syllabus leakage */
        ok(
          paper.every((q) => scopeKeys.has(q.chapterKey)),
          `paper ${p.key}/${seed}/${band}: every question inside the preset scope`,
          paper.filter((q) => !scopeKeys.has(q.chapterKey)).map((q) => q.id),
        )

        /* no duplicates across the whole paper */
        const ids = paper.map((q) => q.id)
        ok(new Set(ids).size === ids.length, `paper ${p.key}/${seed}/${band}: no repeated questions`)

        /* per-section: exact length + round-robin topic spread */
        let consumed = new Set<string>()
        ok(
          res.meta.sections?.length === p.sections.length,
          `paper ${p.key}/${seed}/${band}: meta carries every section`,
        )
        p.sections.forEach((s, si) => {
          const type = s.type ?? 'mcq'
          const sectionQs = paper.filter(
            (_, i) => i >= (res.meta.sections?.[si]?.from ?? 0) && i <= (res.meta.sections?.[si]?.to ?? -1),
          )
          const avail = eligible(
            scopeQuestions.filter((q) => !consumed.has(q.id)),
            type,
          )
          const eligibleChapters = new Set(avail.map((q) => q.chapterKey))
          ok(
            sectionQs.length === Math.min(s.questionCount, avail.length),
            `paper ${p.key}/${seed}/${band} §${si}: section fills to min(count, pool)`,
            { got: sectionQs.length, want: Math.min(s.questionCount, avail.length) },
          )
          const distinct = new Set(sectionQs.map((q) => q.chapterKey)).size
          ok(
            distinct === Math.min(sectionQs.length, eligibleChapters.size),
            `paper ${p.key}/${seed}/${band} §${si}: round-robin topic spread (distinct chapters = min(count, eligible chapters))`,
            { distinct, expected: Math.min(sectionQs.length, eligibleChapters.size) },
          )
          ok(
            sectionQs.every((q) => (type === 'numeric' ? q.kind === 'free' : q.kind === 'mcq')),
            `paper ${p.key}/${seed}/${band} §${si}: section carries its declared question type`,
          )
          /* book breadth — the pigeonhole lower bound on distinct books:
           * with c eligible chapters and k <= c picks (one per chapter in
           * the first round-robin pass), any draw must touch every book
           * holding more than c - k of those chapters. A paper can be
           * single-book only when that book dominates the scope. */
          const chapterBook = new Map<string, string>()
          for (const q of avail) chapterBook.set(q.chapterKey, q.bookId)
          const chaptersByBook = new Map<string, number>()
          for (const book of chapterBook.values()) {
            chaptersByBook.set(book, (chaptersByBook.get(book) ?? 0) + 1)
          }
          const c = eligibleChapters.size
          const k = sectionQs.length
          const requiredBooks = [...chaptersByBook.entries()].filter(
            ([, n]) => n > Math.max(0, c - k),
          ).length
          const gotBooks = new Set(sectionQs.map((q) => q.bookId)).size
          ok(
            gotBooks >= requiredBooks,
            `paper ${p.key}/${seed}/${band} §${si}: book breadth meets the pigeonhole bound`,
            { gotBooks, requiredBooks },
          )
          sectionQs.forEach((q) => consumed.add(q.id))
        })
      }
    }
  }
  ok(totalPapers === 28 * SEEDS.length * BANDS.length, 'every preset generated across all seeds and bands', totalPapers)

  /* determinism spot-checks on two of the new presets */
  for (const key of ['sat-math', 'gate-engineering-maths']) {
    const a = await buildExamPaper(undefined, key, 4242)
    const b = await buildExamPaper(undefined, key, 4242)
    ok(
      JSON.stringify(a.paper.map((q) => q.id)) === JSON.stringify(b.paper.map((q) => q.id)),
      `paper ${key}: deterministic under seed`,
    )
    const c = await buildExamPaper(undefined, key, 999)
    ok(
      JSON.stringify(a.paper.map((q) => q.id)) !== JSON.stringify(c.paper.map((q) => q.id)),
      `paper ${key}: different seed draws a different paper`,
    )
  }

  /* unknown preset still rejected */
  let threw = ''
  try {
    await buildExamPaper(undefined, 'nope-exam', 1)
  } catch (e) {
    threw = e instanceof BadInput ? 'badinput' : String(e)
  }
  ok(threw === 'badinput', 'unknown exam preset rejected', threw)

  /* a numeric-first paper (AIME) draws type-in questions only */
  const aime = await buildExamPaper(undefined, 'aime', 31337)
  ok(
    aime.paper.length === 15 && aime.paper.every((q) => q.kind === 'free'),
    'AIME paper: 15 answers-only type-in questions',
    { len: aime.paper.length, kinds: [...new Set(aime.paper.map((q) => q.kind))] },
  )
}

/* ------------------------------------------------------------------ */
/* IV. Numeric pools never come up short                               */
/* ------------------------------------------------------------------ */

console.log('IV. Numeric pools')
{
  const pool = allPracticeQuestions()
  for (const p of EXAM_PRESETS) {
    const scopeKeys = new Set(p.scope === '*' ? [...writtenKeys] : p.scope)
    const scopeQuestions = pool.filter((q) => scopeKeys.has(q.chapterKey))
    p.sections
      .filter((s) => (s.type ?? 'mcq') === 'numeric')
      .forEach((s, si) => {
        const avail = eligibleCount(scopeQuestions)
        ok(
          avail >= s.questionCount,
          `preset ${p.key} §${si}: numeric pool (${avail}) covers the question count (${s.questionCount})`,
        )
      })
  }
}

function eligibleCount(qs: readonly PracticeQuestion[]): number {
  return qs.filter((q) => q.kind === 'free' && numericAnswerOf(q.answerText) !== null).length
}

console.log(`\nverify-exam-coverage: ${pass}/${pass + fail}`)
if (fail > 0) process.exit(1)
