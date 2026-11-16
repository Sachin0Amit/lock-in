/**
 * pack-library.ts — compile the TS content registry into the content
 * database (Prisma models LibraryBook / LibraryLesson / ContentPack).
 *
 * Run:    bun run lib:pack        (full repack; idempotent)
 *         bun run lib:pack --check (drift check only: DB vs registry)
 *
 * The TS files under src/data/library stay the AUTHORING source of truth
 * (git history, verify scripts, E2E suites all walk them). This script is
 * the deploy bridge: after authoring or editing any book, run it so the
 * reading routes serve the new content. All content tables are derived
 * data — wiping and repacking them is always safe; the user tables
 * (accounts, custom books, the study ledger) are never touched.
 *
 * Lesson ids are the canonical registry ids — the packer never invents
 * one — so every persisted reference (custom books, practice runs,
 * revision ledger) keeps resolving forever.
 */
import { PrismaClient } from '@prisma/client'
import { existsSync, statSync } from 'node:fs'
import { allBooks, allLessons, bookStats, libraryStats } from '../src/data/library/index'
import { countLessonWords } from '../src/data/library/types'
import type { Lesson } from '../src/data/library/types'

const prisma = new PrismaClient({ log: ['error'] })

/** A written lesson reduced to its navigational stub for the book TOC. */
function stubLesson(l: Lesson) {
  return {
    id: l.id,
    number: l.number,
    title: l.title,
    concepts: l.concepts,
    words: l.words ?? countLessonWords(l),
    blocks: [] as Lesson['blocks'],
  }
}

function dbSizeMb(): string {
  const url = process.env.DATABASE_URL ?? ''
  const m = /^file:(.*)$/.exec(url)
  const path = m?.[1]?.replace(/^\/\//, '/')
  if (path && existsSync(path)) return (statSync(path).size / 1048576).toFixed(2)
  return '?'
}

async function main() {
  const checkOnly = process.argv.includes('--check')
  const t0 = Date.now()

  /* ---- registry census (the ground truth) ------------------------- */
  const reg = {
    books: allBooks.length,
    chapters: allBooks.reduce((n, b) => n + b.chapters.length, 0),
    lessons: allLessons.length,
    words: allLessons.reduce((n, l) => n + l.words, 0),
  }
  const libStats = libraryStats()

  /* ---- drift check mode -------------------------------------------- */
  if (checkOnly) {
    const pack = await prisma.contentPack.findUnique({ where: { id: 'singleton' } })
    const dbBooks = await prisma.libraryBook.count()
    const dbLessons = await prisma.libraryLesson.count()
    const agg = await prisma.libraryLesson.aggregate({ _sum: { words: true } })
    const dbWords = agg._sum.words ?? 0
    const ok =
      !!pack && pack.books === reg.books && pack.lessons === reg.lessons && pack.words === reg.words
    const rowsOk = dbBooks === reg.books && dbLessons === reg.lessons && dbWords === reg.words
    console.log(`pack check — registry: ${reg.books} books / ${reg.lessons} lessons / ${reg.words} words`)
    console.log(`pack check — db     : ${dbBooks} books / ${dbLessons} lessons / ${dbWords} words (pack v${pack?.version ?? '—'} @ ${pack?.packedAt?.toISOString() ?? 'never'})`)
    if (ok && rowsOk) {
      console.log('PASS — the content database matches the registry.')
      return
    }
    console.error('FAIL — run `bun run lib:pack` to bring the database back in sync.')
    process.exitCode = 1
    return
  }

  /* ---- full repack -------------------------------------------------- */
  const prev = await prisma.contentPack.findUnique({ where: { id: 'singleton' } })

  // rows are built first, then written in one clean sweep
  const bookRows = allBooks.map((book, position) => {
    const stats = bookStats(book) // computed on FULL content — honest term/formula counts
    const outline = {
      ...book,
      chapters: book.chapters.map((ch) => ({
        ...ch,
        lessons: ch.lessons.map(stubLesson),
      })),
    }
    return {
      id: book.id,
      position,
      discipline: book.discipline,
      title: book.title,
      subtitle: book.subtitle ?? '',
      level: book.level,
      description: book.description,
      status: book.status,
      accentJson: JSON.stringify(book.accent),
      statsJson: JSON.stringify(stats),
      outlineJson: JSON.stringify(outline),
    }
  })

  const lessonRows = allLessons.map((ref, position) => ({
    id: ref.lesson.id,
    bookId: ref.book.id,
    chapterNumber: ref.chapter.number,
    number: ref.lesson.number,
    title: ref.lesson.title,
    conceptsJson: JSON.stringify(ref.lesson.concepts),
    words: ref.words,
    position,
    contentJson: JSON.stringify(ref.lesson),
  }))

  await prisma.libraryLesson.deleteMany({})
  await prisma.libraryBook.deleteMany({})
  await prisma.libraryBook.createMany({ data: bookRows })
  await prisma.libraryLesson.createMany({ data: lessonRows })
  await prisma.contentPack.upsert({
    where: { id: 'singleton' },
    create: {
      id: 'singleton',
      version: 1,
      books: reg.books,
      lessons: reg.lessons,
      words: reg.words,
    },
    update: {
      version: (prev?.version ?? 0) + 1,
      books: reg.books,
      lessons: reg.lessons,
      words: reg.words,
    },
  })

  /* ---- verify what was actually written ----------------------------- */
  const dbBooks = await prisma.libraryBook.count()
  const dbLessons = await prisma.libraryLesson.count()
  const agg = await prisma.libraryLesson.aggregate({ _sum: { words: true } })
  const dbWords = agg._sum.words ?? 0
  const pack = await prisma.contentPack.findUnique({ where: { id: 'singleton' } })

  const outlineBytes = bookRows.reduce((n, r) => n + r.outlineJson.length, 0)
  const contentBytes = lessonRows.reduce((n, r) => n + r.contentJson.length, 0)
  const ms = Date.now() - t0

  console.log(`packed ${dbBooks} books (${reg.chapters} chapters) + ${dbLessons} lessons in ${ms} ms`)
  console.log(`  outline payloads : ${(outlineBytes / 1048576).toFixed(2)} MB total`)
  console.log(`  lesson payloads  : ${(contentBytes / 1048576).toFixed(2)} MB total · ${reg.words.toLocaleString()} words`)
  console.log(`  database file    : ${dbSizeMb()} MB (pack v${pack?.version})`)
  console.log(`  home stats       : ${libStats.disciplines} disciplines · ${libStats.books} books · ${libStats.written} written · ${libStats.plannedLessons} planned lessons`)

  const ok = dbBooks === reg.books && dbLessons === reg.lessons && dbWords === reg.words
  if (!ok) {
    console.error('VERIFY FAILED — DB row counts do not match the registry census:')
    console.error(`  books  db=${dbBooks}  registry=${reg.books}`)
    console.error(`  lessons db=${dbLessons} registry=${reg.lessons}`)
    console.error(`  words  db=${dbWords} registry=${reg.words}`)
    process.exitCode = 1
  } else {
    console.log('verify: PASS — every registry book and lesson is present in the database.')
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exitCode = 1
  })
  .finally(() => prisma.$disconnect())
