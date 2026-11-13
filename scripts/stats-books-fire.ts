import { allBooks, bookGlossary, bookLessons } from '../src/data/library/index'
for (const b of allBooks) {
  const lessons = bookLessons(b)
  if (lessons.length === 0) continue
  const words = lessons.reduce((n, l) => n + l.words, 0)
  console.log(JSON.stringify({ id: b.id, written: lessons.length, words, terms: bookGlossary(b).length }))
}
