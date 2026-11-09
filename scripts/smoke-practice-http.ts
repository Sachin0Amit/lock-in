/** HTTP API smoke for the sectioned paper flow (dev server on :3000). */
export {}

const BASE = 'http://localhost:3000'

async function j (url, body) {
  const res = await fetch(BASE + url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error(`${url} -> ${res.status}`)
  return res.json()
}

const paper = await j('/api/practice/paper', { presetKey: 'jee-main-maths', band: 'standard' })
const secs = paper.meta.sections ?? []
console.log('paper:', paper.paper.length, 'questions · sections:', secs.map((s) => `${s.label} [${s.type}] ${s.count}q ${s.from}-${s.to} +${s.marks}/-${s.negative}`).join(' | '))
if (paper.paper.length !== 25 || secs.length !== 2) throw new Error('unexpected paper shape')
if (!paper.paper.slice(0, 20).every((q) => q.kind === 'mcq')) throw new Error('section A not mcq')
if (!paper.paper.slice(20).every((q) => q.kind === 'free')) throw new Error('section B not free')

const answers = paper.paper.map((q, i) => {
  const section = i < 20 ? 0 : 1
  if (q.kind === 'mcq') {
    return { questionId: q.id, chosen: i % 2 === 0 ? q.answerIndex : (q.answerIndex + 1) % q.options.length, section, secs: 20 + i }
  }
  const m = /-?\d+(?:\.\d+)?/.exec((q.answerText ?? '').replace(/\{,\}/g, '').replace(/(\d),(?=\d{3}\b)/g, '$1').replace(/\$/g, ''))
  const ev = m ? Number(m[0]) : 1
  return { questionId: q.id, value: String(i % 2 === 0 ? ev : ev + 9), section, secs: 60 + i }
})
const sub = await j('/api/practice/submit', {
  kind: 'exam', presetKey: 'jee-main-maths', seed: paper.meta.seed, secs: 900, answers, band: 'standard',
})
console.log('submit: score', sub.score, '/', sub.maxScore, '· correct', sub.correctCount, 'wrong', sub.wrongCount)
console.log('sectionScores:', sub.sectionScores.map((s) => `${s.label}: ${s.score}/${s.maxScore} (${s.correct}c ${s.wrong}w ${s.skipped}s)`).join(' | '))
console.log('avgSecsPerQuestion:', sub.avgSecsPerQuestion, '· typed echo on Q21:', sub.questions[20].typed, '· secs echo:', sub.questions[0].secs)

const expected = 10 * 4 - 10 * 1 + 3 * 4 - 2 * 1 // 40
if (Math.abs(sub.score - expected) > 1e-9) throw new Error(`score mismatch: ${sub.score} != ${expected}`)
if (sub.sectionScores?.length !== 2) throw new Error('missing sectionScores')
if (sub.sectionScores[0].score !== 30 || sub.sectionScores[1].score !== 10) throw new Error('section score mismatch')
if (typeof sub.avgSecsPerQuestion !== 'number') throw new Error('missing avgSecsPerQuestion')
console.log('API SMOKE: ALL OK')
