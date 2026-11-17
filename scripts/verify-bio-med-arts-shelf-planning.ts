/**
 * verify-bio-med-arts-shelf-planning.ts — the combined census gate for the
 * three 2026-11-16 "yes, open the three remaining shelves" passes: Biology
 * (23 books), Medical Sciences (19), Arts & Music (36) — REBUILT
 * 2026-11-17 (the gate was referenced-but-missing since those passes; the
 * wipe of the un-whitelisted scripts/ made the debt concrete; the rebuild
 * pins the CURRENT census including the 2026-11-17 exam-gap additions).
 * Mirrors verify-humanities-shelf-planning.ts; sections A-J per shelf:
 *
 *  A. books load, status 'planned' (23 + 19 + 36)
 *  B. per-book chapter census pinned; shelf totals pinned
 *     (biology 182 ch / 820 planned · medical 121 ch / 562 · arts 183/793 — post the 2026-11-17 swarm reorg)
 *  C. planned-chapter hygiene  D. lesson titles  E. prefix reservation
 *  F. book hygiene  G. handoff language  H. survey evidence base
 *  I. planning-only  J. covers
 */
import { allBooks } from '../src/data/library'
import { readFileSync, existsSync } from 'fs'

const roster = readFileSync('scripts/gen_covers.py', 'utf8')
// genuine single-word TOC registers (the 2026-11-17 drive-toc continuation):
// chemistry element/family singles + the mechanics 'Gears' register.
const SHORT_OK = new Set(['Gears', 'Alums', 'Lead', 'Coal', 'Gene', 'Gels', 'P4S3', 'P4S10'])

let pass = 0
let fail = 0
const ok = (cond: boolean, label: string) => {
  if (cond) { pass++ } else { fail++; console.error(`  FAIL: ${label}`) }
}

const EXPECTED_CHAPTERS: Record<string, number> = { 'animal-anatomy': 7, 'animal-behaviour': 5, 'animal-diversity': 8, 'animal-physiology': 8, 'biotechnology': 9, 'cell-biology': 9, 'developmental-biology': 7, 'ecology': 8, 'economic-botany': 7, 'entomology': 6, 'evolution': 9, 'foundation-biology': 9, 'genetics': 9, 'immunology': 8, 'microbiology': 9, 'molecular-biology': 9, 'parasitology': 6, 'plant-anatomy': 8, 'plant-ecology': 8, 'plant-genetics': 8, 'plant-pathology': 8, 'plant-physiology': 9, 'plant-taxonomy': 8, 'anatomy': 8, 'clinical-immunology': 6, 'community-medicine': 6, 'dentistry': 6, 'forensic-medicine': 7, 'general-surgery': 7, 'histology': 7, 'internal-medicine': 7, 'medical-biochemistry': 8, 'medical-microbiology': 7, 'medical-physiology': 8, 'nursing': 5, 'obstetrics-gynaecology': 6, 'pathology': 7, 'pediatrics': 5, 'pharmacology': 6, 'pharmacy': 5, 'physiotherapy': 5, 'veterinary-medicine': 5, '3d-modelling': 5, 'acoustics': 6, 'acting': 5, 'animation': 5, 'architecture': 5, 'cinematography': 5, 'classical-dance': 5, 'colour-theory': 5, 'contemporary-dance': 5, 'counterpoint': 6, 'creative-writing': 5, 'dance-fundamentals': 5, 'digital-art': 5, 'drawing': 5, 'ear-training': 5, 'fashion-design': 4, 'film-studies': 5, 'graphic-design': 5, 'harmony': 6, 'illustration': 5, 'instrument-studies': 5, 'interior-design': 4, 'music-composition': 5, 'music-history': 6, 'music-production': 5, 'music-theory-notation': 6, 'painting': 5, 'perspective': 5, 'photography': 5, 'rhythm-meter': 6, 'screenwriting': 5, 'sculpture': 5, 'stage-production': 5, 'theatre': 4, 'typography': 5, 'vocal-music': 5 }

const SHELVES: Record<string, { n: number; ch: number; pl: number; doc: string }> = {
  'biology': { n: 23, ch: 182, pl: 820, doc: 'BIOLOGY' }, // 867->812 drive-toc; 812->820 the 2026-11-17 swarm-reorg witnesses
  'medical-sciences': { n: 19, ch: 121, pl: 562, doc: 'MEDICAL' }, // 549->562 swarm-reorg witnesses
  'arts-music': { n: 36, ch: 183, pl: 793, doc: 'ARTS_MUSIC' }, // 754->793 swarm-reorg witnesses
}

for (const [disc, meta] of Object.entries(SHELVES)) {
  console.log(`\n== ${disc}: A. shelf load ==`)
  const shelf = allBooks.filter((b) => b.discipline === disc)
  ok(shelf.length === meta.n, `${disc} pins ${meta.n} books (got ${shelf.length})`)
  ok(shelf.every((b) => b.status === 'planned'), `every ${disc} book status planned`)

  console.log(`== ${disc}: B. the honest census ==`)
  let totCh = 0
  let totPl = 0
  for (const b of shelf) {
    const pl = b.chapters.reduce((n, c) => n + (c.plannedLessons?.length ?? 0), 0)
    totCh += b.chapters.length
    totPl += pl
    ok(EXPECTED_CHAPTERS[b.id] === b.chapters.length, `${b.id} chapter count pins ${EXPECTED_CHAPTERS[b.id]} (got ${b.chapters.length})`)
  }
  ok(totCh === meta.ch, `${disc} total ${meta.ch} chapters (got ${totCh})`)
  ok(totPl === meta.pl, `${disc} total ${meta.pl} planned lessons (got ${totPl})`)

  console.log(`== ${disc}: C+D. chapter & title hygiene ==`)
  for (const b of shelf) {
    for (const c of b.chapters) {
      ok(c.status === 'planned', `${b.id} ch${c.number} status planned`)
      ok(c.lessons.length === 0, `${b.id} ch${c.number} lessons empty`)
      ok((c.plannedLessons?.length ?? 0) >= 3, `${b.id} ch${c.number} >= 3 plannedLessons`)
      ok(c.slug.length > 3 && !/\s/.test(c.slug), `${b.id} ch${c.number} slug clean`)
      ok(c.summary.length > 200, `${b.id} ch${c.number} summary substantial`)
    }
    const slugs = new Set(b.chapters.map((c) => c.slug))
    ok(slugs.size === b.chapters.length, `${b.id} chapter slugs unique`)
    ok(b.chapters.every((c, i) => c.number === i + 1), `${b.id} chapter numbers 1..N`)
    const titles = b.chapters.flatMap((c) => c.plannedLessons ?? [])
    ok(titles.every((t) => t.trim().length > 5 || SHORT_OK.has(t)), `${b.id} lesson titles non-trivial`)
    ok(new Set(titles).size === titles.length, `${b.id} lesson titles unique (${titles.length})`)
  }

  console.log(`== ${disc}: E+F+G. prefixes, hygiene, handoff ==`)
  const writtenIds: string[] = []
  for (const b of allBooks) for (const c of b.chapters) for (const l of c.lessons) writtenIds.push(l.id)
  const written = shelf.reduce((n, b) => n + b.chapters.reduce((m, c) => m + c.lessons.length, 0), 0)
  ok(written === 0, `zero written lessons in ${disc} (planning pass only)`)
  ok(new Set(writtenIds).size === writtenIds.length, 'written lesson ids globally unique')
  for (const b of shelf) {
    ok(Array.isArray(b.accent) && b.accent.length === 2, `${b.id} accent pair valid`)
    ok(b.level.length > 10 && b.description.length > 300, `${b.id} level+description present`)
    ok(!!(b.subtitle && b.subtitle.length > 20), `${b.id} subtitle present`)
    const blob = b.description + b.chapters.map((c) => c.summary).join(' ')
    ok(/cross-referenc|hands off|doorstep|cross-reference/i.test(blob), `${b.id} speaks the handoff language`)
  }

  console.log(`== ${disc}: H+I+J. survey evidence, covers ==`)
  const survey = readFileSync(`docs/research/${meta.doc}_TOC_SURVEY.md`, 'utf8')
  ok(survey.length > 3_000, `${disc} survey substantial (${survey.length} chars)`)
  for (const b of shelf) ok(survey.includes(b.id), `${disc} survey mentions ${b.id}`)
  for (const b of shelf) {
    ok(existsSync(`public/covers/${b.id}.webp`) || roster.includes(`"${b.id}":`), `${b.id} cover present or queued in the gen_covers.py roster`)
  }
}

console.log(`\nverify-bio-med-arts-shelf-planning: ${pass} checks passed, ${fail} failed`)
if (fail > 0) process.exit(1)
export {}
