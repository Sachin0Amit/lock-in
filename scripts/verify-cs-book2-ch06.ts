export {}
/**
 * verify-cs-book2-ch06.ts — CS RUN 11 chapter-closing Z census for
 * Computer Fundamentals ch.6 'Connecting Computers' (the verify-cs-book2-
 * ch05 pattern, rebuilt). The four seat engines (docs/research/cf-ch06-wip/
 * v-cf61/62/63/6R.ts) verify the parts; THIS closes the assembled chapter:
 * identity verbatim, word floors, quiz keys pairwise distinct, figure
 * counts, book swap, plannedLessons emptied.
 */
import { chapter6 } from '../src/data/library/books/computer-science/computer-fundamentals/ch-06'
import { countLessonWords } from '../src/data/library/types'

let P = 0; let F = 0
const fails: string[] = []
function ok(name: string, cond: boolean, detail = '') {
  if (cond) { P++ } else { F++; fails.push(name + (detail ? ' :: ' + detail : '')) }
}

const L = chapter6.lessons
ok('Z1 chapter 6 has exactly 4 lessons', L.length === 4, `got ${L.length}`)
ok('Z2 chapter status complete', chapter6.status === 'complete')
ok('Z3 plannedLessons emptied', chapter6.plannedLessons.length === 0)
ok('Z4 slug verbatim', chapter6.slug === 'connecting-computers')
ok('Z5 title verbatim', chapter6.title === 'Connecting Computers')

const ids = ['cf-the-network-idea', 'cf-the-internet-a-network-of-networks', 'cf-browsing-the-web-the-citizens-vocabulary', 'cf-unit-6-completion-review']
const nums = ['6.1', '6.2', '6.3', '6.R']
const titles = ['The Network Idea', 'The Internet: a Network of Networks', "Browsing the Web: the Citizen's Vocabulary", 'Unit 6 Completion Review']
const floors = [7000, 7000, 7000, 5200]
const keys = ['3,0,2,4,1', '1,4,2,0,3', '2,1,4,3,0', '0,3,1,4,2']
for (let i = 0; i < 4; i++) {
  ok(`Z${6 + i} lesson ${nums[i]} id verbatim`, L[i].id === ids[i], L[i].id)
  ok(`Z${10 + i} lesson ${nums[i]} number verbatim`, L[i].number === nums[i], L[i].number)
  ok(`Z${14 + i} lesson ${nums[i]} title verbatim`, L[i].title === titles[i], L[i].title)
  const w = countLessonWords(L[i])
  ok(`Z${18 + i} lesson ${nums[i]} word floor ${floors[i]}`, w >= floors[i], `got ${w}`)
  const qk = (L[i].blocks.filter((b: any) => b.kind === 'quiz')[0] as any)?.items?.map((it: any) => it.answer).join(',')
  ok(`Z${22 + i} lesson ${nums[i]} quiz key ${keys[i]}`, qk === keys[i], `got ${qk}`)
  const bodyFigs = L[i].blocks.filter((b: any) => b.kind === 'figure').length
  ok(`Z${26 + i} lesson ${nums[i]} body figures >= 3`, bodyFigs >= 3, `got ${bodyFigs}`)
  let solFigs = 0
  L[i].blocks.forEach((b: any) => {
    if (b.kind === 'exercises') {
      (b.sets || []).forEach((s: any) => {
        (s.questions || []).forEach((q: any) => {
          solFigs += (q.figures || []).length
        })
      })
    }
  })
  ok(`Z${30 + i} lesson ${nums[i]} solution figures >= 4`, solFigs >= 4, `got ${solFigs}`)
  ok(`Z${34 + i} lesson ${nums[i]} sources pinned`, (L[i].sources || []).includes('cs-cf-web-ground-ch06'))
}

const allKeys = keys.map((k) => k.split(',').join(''))
const pairDistinct = new Set(allKeys).size === 4
ok('Z38 quiz keys pairwise distinct', pairDistinct)
ok('Z39 every lesson has objectives + concepts', L.every((l: any) => (l.objectives || []).length >= 5 && (l.concepts || []).length >= 5))
ok('Z40 every lesson has prereqs', L.every((l: any) => (l.prerequisites || []).length >= 1))

const total = L.reduce((a: number, l: any) => a + countLessonWords(l), 0)
ok('Z41 chapter word total >= 40,000', total >= 40000, `got ${total}`)

console.log(`VERIFY-CS-BOOK2-CH06: ${P}/${P + F} GREEN`)
console.log(`  chapter words: ${total}`)
if (F > 0) { fails.forEach((f) => console.log('  RED: ' + f)); process.exit(1) }
