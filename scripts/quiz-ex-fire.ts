import { allLessons } from '../src/data/library/index'
let quiz = 0, ex = 0, formulas = 0
for (const ref of allLessons) {
  const l = ref.lesson
  for (const bl of l.blocks) {
    if (bl.kind === 'quiz') quiz += bl.items.length
    if (bl.kind === 'exercises') for (const s of bl.sets) ex += s.questions.length
    if (bl.kind === 'formula') formulas++
  }
}
console.log(JSON.stringify({ quiz, ex, formulas }))
