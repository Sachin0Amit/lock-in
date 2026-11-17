/**
 * dump_shelf_plan_data.ts — emits scripts/ledger_data/registry_blob.json:
 * the full per-book plan blob (id, discipline, titles, summaries,
 * planned-lesson titles) that the ledger builders and the standing exam
 * gate token-match against. Re-run after any shelf planning change; the
 * file is committed (gitignore-whitelisted) so the ledger infrastructure
 * survives sandbox wipes (the 2026-11-17 root-cause fix).
 */
import { allBooks } from '../src/data/library'
import { writeFileSync, mkdirSync } from 'fs'

const out: any[] = allBooks.map((b) => ({
  id: b.id,
  discipline: b.discipline,
  title: b.title,
  subtitle: b.subtitle ?? '',
  description: b.description,
  chapters: b.chapters.map((c) => ({
    title: c.title,
    summary: c.summary,
    plannedLessons: c.plannedLessons ?? [],
    lessons: c.lessons.map((l) => l.title),
  })),
}))

mkdirSync('scripts/ledger_data', { recursive: true })
writeFileSync('scripts/ledger_data/registry_blob.json', JSON.stringify(out))
console.log(`registry_blob.json: ${out.length} books, ${out.reduce((n, b) => n + b.chapters.length, 0)} chapters`)
