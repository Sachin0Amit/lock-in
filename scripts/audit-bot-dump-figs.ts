/**
 * Dump every figure (body figures + solution figures) of a lesson to
 * /tmp/audit-figs/ as .svg files for cairosvg rendering + VLM audit.
 * Run: bun run scripts/audit-bot-dump-figs.ts <lessonId>
 */
import { findLesson } from '../src/data/library/index'

const lessonId = process.argv[2]
if (!lessonId) {
  console.error('usage: bun run scripts/audit-bot-dump-figs.ts <lessonId>')
  process.exit(1)
}
const ref = findLesson(lessonId)
if (!ref) {
  console.error(`lesson ${lessonId} not found`)
  process.exit(1)
}

const renderable = (svg: string) =>
  // cairosvg has no CSS context: substitute currentColor with visible ink
  // and back the paper with white so the VLM sees light mode.
  svg
    .replace(/currentColor/g, '#1c1917')
    .replace(/(<svg[^>]*>)/, '$1<rect x="-10" y="-10" width="10000" height="10000" fill="#ffffff"/>')

let n = 0
const manifest: { file: string; caption: string }[] = []
const push = (svg: string, caption: string, tag: string) => {
  n++
  const file = `/tmp/audit-figs/${lessonId}-${tag}${n}.svg`
  const file2 = `/tmp/audit-figs/${lessonId}-${tag}${n}-light.svg`
  void Bun.write(file, svg)
  void Bun.write(file2, renderable(svg))
  manifest.push({ file: file2, caption: caption.slice(0, 110) })
  console.log(`${tag}${n}: ${file2}`)
}

for (const b of ref.lesson.blocks) {
  if (b.kind === 'figure') push(b.svg, b.caption, 'fig')
  if (b.kind === 'example' && b.figures?.length)
    for (const f of b.figures) push(f.svg, f.caption, `x-sol`)
  if (b.kind === 'exercises')
    for (const set of b.sets)
      for (const q of set.questions)
        if (q.figures?.length) for (const f of q.figures) push(f.svg, f.caption, 'sol')
}
await Bun.write(`/tmp/audit-figs/${lessonId}-manifest.json`, JSON.stringify(manifest, null, 2))
console.log(`total figures (body + solutions): ${n}`)
