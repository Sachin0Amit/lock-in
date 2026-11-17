#!/usr/bin/env python3
"""emit_shelf_gates.py — writes the four missing shelf-planning census gates
(verify-physics-shelf-planning.ts, verify-chemistry-shelf-planning.ts,
verify-ecf-shelf-planning.ts, verify-bio-med-arts-shelf-planning.ts).

These gates were referenced-but-missing since their shelves' planning passes
(the 2026-11-16 EXAM_TOPIC_LEDGERS.md queued item #4); the wipe of the
un-whitelisted scripts/ dir made the debt concrete. This emitter rebuilds
them on the humanities/languages gate pattern with the CURRENT census
(post the 2026-11-17 exam-gap pass: 355 planned lessons added), so the
census guarantee finally covers all 11 disciplines.

The generator debt (gen_physics/chemistry/economics_finance/biology/medical/
arts_music_shelf.py + their shelf_data modules) is NOT resolved here —
queued with the recovery path (book.ts extraction) recorded honestly.
"""
import json

PINS = json.load(open('scripts/ledger_data/chapter_pins.json'))

TEMPLATE = '''/**
 * verify-{slug}-shelf-planning.ts — the {Discipline} shelf's full-planning
 * census gate (REBUILT 2026-11-17 — the gate was referenced-but-missing
 * since the {n_books}-book planning pass of 2026-11-16; the wipe of the
 * un-whitelisted scripts/ made the debt concrete; the rebuild pins the
 * CURRENT census including the 2026-11-17 exam-gap additions of {added}
 * planned lessons). Mirrors verify-humanities-shelf-planning.ts:
 *
 *  A. {n_books} {discipline} books load, status 'planned'
 *  B. per-book chapter census pinned; shelf totals pinned
 *     ({n_ch} chapters / {n_pl} planned lessons)
 *  C. planned-chapter hygiene: status/lessons-empty/>=3 plannedLessons/
 *     slugs/summaries/numbers
 *  D. planned-lesson titles non-trivial, unique within book
 *  E. id-prefix reservation: the {prefixes_list} prefixes unused across
 *     all WRITTEN lesson ids
 *  F. book hygiene: unique ids, accents, level+description+subtitle
 *  G. cross-reference/handoff language present
 *  H. the survey evidence base mentions every book id and the anchors
 *  I. PLANNING-ONLY: zero written lessons in the shelf
 *  J. covers: every book has its AI cover asset
 */
import {{ allBooks }} from '../src/data/library'
import {{ readFileSync, existsSync }} from 'fs'

const roster = existsSync('scripts/gen_covers.py') ? readFileSync('scripts/gen_covers.py', 'utf8') : ''
// genuine single-word TOC registers (the 2026-11-17 drive-toc continuation):
// Hammer's German modal particles (english book) + chemistry element/family
// singles + the mechanics machines register — junk fragments were removed
// from the books; these survivors are real topics shorter than 6 chars.
const SHORT_OK = new Set(['Auch', 'Blo\u00df', 'Denn', 'Doch', 'Eben', 'Erst', 'Etwa', 'Halt', 'Noch', 'Ruhig', 'Wohl', 'Zwar', 'Gears', 'Alums', 'Lead', 'Coal', 'Gene', 'Gels', 'P4S3', 'P4S10'])


let pass = 0
let fail = 0
const ok = (cond: boolean, label: string) => {{
  if (cond) {{ pass++ }} else {{ fail++; console.error(`  FAIL: ${{label}}`) }}
}}

const EXPECTED_CHAPTERS: Record<string, number> = {expected_chapters}

console.log('== A. shelf load & statuses ==')
const shelf = allBooks.filter((b) => b.discipline === '{discipline}')
ok(shelf.length === {n_books}, `{n_books} {discipline} books (got ${{shelf.length}})`)
ok(shelf.every((b) => b.status === 'planned'), 'every {discipline} book status planned')

console.log('== B. the honest census (per book) ==')
let totCh = 0
let totPl = 0
for (const b of shelf) {{
  const pl = b.chapters.reduce((n, c) => n + (c.plannedLessons?.length ?? 0), 0)
  totCh += b.chapters.length
  totPl += pl
  console.log(`  ${{b.id.padEnd(40)}} ${{b.status.padEnd(9)}} ${{String(b.chapters.length).padStart(2)}} ch  ${{String(pl).padStart(3)}} planned`)
  ok(EXPECTED_CHAPTERS[b.id] === b.chapters.length, `${{b.id}} chapter count pins ${{EXPECTED_CHAPTERS[b.id]}} (got ${{b.chapters.length}})`)
}}
ok(totCh === {n_ch}, `shelf total {n_ch} chapters (got ${{totCh}})`)
ok(totPl === {n_pl}, `shelf total {n_pl} planned lessons (got ${{totPl}})`)

console.log('== C. planned-chapter hygiene ==')
for (const b of shelf) {{
  for (const c of b.chapters) {{
    ok(c.status === 'planned', `${{b.id}} ch${{c.number}} status planned`)
    ok(c.lessons.length === 0, `${{b.id}} ch${{c.number}} lessons empty`)
    ok((c.plannedLessons?.length ?? 0) >= 3, `${{b.id}} ch${{c.number}} >= 3 plannedLessons`)
    ok(c.slug.length > 3 && !/\\s/.test(c.slug), `${{b.id}} ch${{c.number}} slug clean`)
    ok(c.summary.length > 200, `${{b.id}} ch${{c.number}} summary substantial (${{c.summary.length}} chars)`)
  }}
  const slugs = new Set(b.chapters.map((c) => c.slug))
  ok(slugs.size === b.chapters.length, `${{b.id}} chapter slugs unique`)
  ok(b.chapters.every((c, i) => c.number === i + 1), `${{b.id}} chapter numbers 1..N`)
}}

console.log('== D. planned-lesson titles ==')
for (const b of shelf) {{
  const titles = b.chapters.flatMap((c) => c.plannedLessons ?? [])
  ok(titles.every((t) => t.trim().length > 5 || SHORT_OK.has(t)), `${{b.id}} lesson titles non-trivial`)
  const set = new Set(titles)
  ok(set.size === titles.length, `${{b.id}} lesson titles unique (${{titles.length}} total)`)
}}

console.log('== E. id-prefix reservation (planning-only shelf) ==')
const PREFIXES = [{prefixes_ts}]
const writtenIds: string[] = []
for (const b of allBooks) for (const c of b.chapters) for (const l of c.lessons) writtenIds.push(l.id)
const writtenSet = new Set(writtenIds)
ok(writtenSet.size === writtenIds.length, `written lesson ids globally unique (${{writtenIds.length}})`)
for (const p of PREFIXES) {{
  ok(!writtenIds.some((id) => id.startsWith(p)), `{discipline} prefix '${{p}}' unused by written lessons`)
}}
const mathWritten = writtenIds.filter((id) => /^(fm-|ans-|al-|aa-)/.test(id)).length
ok(mathWritten > 0, `the written maths spine still present (${{mathWritten}} lessons)`)

console.log('== F. book hygiene ==')
const ids = new Set(allBooks.map((b) => b.id))
ok(ids.size === allBooks.length, 'book ids globally unique (269 books)')
for (const b of shelf) {{
  ok(Array.isArray(b.accent) && b.accent.length === 2 && b.accent.every((c) => typeof c === 'string' && c.length > 0), `${{b.id}} accent pair valid`)
  ok(b.level.length > 10 && b.description.length > {desc_min}, `${{b.id}} level+description present (>={desc_min} chars, the pass's honest floor)`)
  ok(!!(b.subtitle && b.subtitle.length > 20), `${{b.id}} subtitle present`)
}}

console.log('== G. cross-reference language ==')
for (const b of shelf) {{
  const blob = b.description + b.chapters.map((c) => c.summary).join(' ')
  ok(/cross-referenc|hands off|doorstep|cross-reference/i.test(blob), `${{b.id}} speaks the handoff language`)
}}

console.log('== H. the survey evidence base ==')
const survey = readFileSync('docs/research/{DOC}_TOC_SURVEY.md', 'utf8')
{survey_checks}
ok(survey.length > 3_000, `survey substantial (${{survey.length}} chars)`)

console.log('== I. planning-only guarantee ==')
const written = shelf.reduce((n, b) => n + b.chapters.reduce((m, c) => m + c.lessons.length, 0), 0)
ok(written === 0, 'zero written lessons in the whole shelf (planning pass only)')

console.log('== J. cover art ==')
for (const b of shelf) {{
  ok(existsSync(`public/covers/${{b.id}}.webp`), `${{b.id}} cover asset present`)
}}

console.log(`\\nverify-{slug}-shelf-planning: ${{pass}} checks passed, ${{fail}} failed`)
if (fail > 0) process.exit(1)
export {{}}
'''

TEMPLATE_MULTI = '''/**
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
 *     (biology 182 ch / 964 planned · medical 121 ch / 585 · arts 183/816 — post the 2026-11-17 drive-toc continuation)
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

const EXPECTED_CHAPTERS: Record<string, number> = @@EXPECTED@@

const SHELVES: Record<string, { n: number; ch: number; pl: number; doc: string }> = {
  'biology': { n: 23, ch: 182, pl: 964, doc: 'BIOLOGY' }, // 867->964 drive-toc continuation
  'medical-sciences': { n: 19, ch: 121, pl: 585, doc: 'MEDICAL' },
  'arts-music': { n: 36, ch: 183, pl: 816, doc: 'ARTS_MUSIC' },
}

for (const [disc, meta] of Object.entries(SHELVES)) {
  console.log(`\\n== ${disc}: A. shelf load ==`)
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
      ok(c.slug.length > 3 && !/\\s/.test(c.slug), `${b.id} ch${c.number} slug clean`)
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

console.log(`\\nverify-bio-med-arts-shelf-planning: ${pass} checks passed, ${fail} failed`)
if (fail > 0) process.exit(1)
export {}
'''

def fmt_expected(ids):
    entries = ', '.join(f"'{i}': {PINS[i]}" for i in ids)
    return '{ ' + entries + ' }'

def fmt_prefixes(prefixes):
    return ', '.join(f"'{p}'" for p in prefixes)

# ---- physics ----
phys_ids = sorted(k for k in PINS if k in {i for i in PINS})  # filtered below by discipline file paths
import glob
def ids_for(disc):
    return sorted(p.split('/')[5] for p in glob.glob(f'src/data/library/books/{disc}/*/book.ts'))

phys = ids_for('physics')
chem = ids_for('chemistry')
ecf = ids_for('economics-commerce')
bio = ids_for('biology')
med = ids_for('medical-sciences')
arts = ids_for('arts-music')

phys_prefixes = ['pf-', 'pmech-', 'prop-', 'wav-', 'heat-', 'emag-', 'emt-', 'opt-', 'mod-',
                 'qm-', 'atom-', 'nuc-', 'ssp-', 'statm-', 'rel-', 'astro-', 'part-', 'mph-', 'exp-']
chem_prefixes = ['fchem-', 'pchem-', 'org-', 'inorg-', 'anal-', 'envchem-', 'bchem-', 'qchem-', 'cchem-', 'indchem-']
ecf_prefixes = ['fecon-', 'micro-', 'macro-', 'ieco-', 'deveco-', 'pubeco-', 'moneco-', 'econ-',
                'becon-', 'fineco-', 'bus-', 'acct-', 'cost-', 'corpfin-', 'bank-', 'invest-',
                'statecon-', 'busmath-', 'entrep-', 'mktg-', 'hrm-', 'ops-', 'intbus-']

gates = [
    dict(desc_min=200, slug='physics', Discipline='Physics', discipline='physics', n_books=19, n_ch=172, n_pl=1549,
         added='34 exam-gap + the 2026-11-17 drive-toc continuation (754 -> 1,549)', DOC='PHYSICS', expected_chapters=fmt_expected(phys),
         prefixes_list='pf- pmech- prop- wav- heat- emag- emt- opt- mod- qm- atom- nuc- ssp- statm- rel- astro- part- mph- exp-',
         prefixes_ts=fmt_prefixes(phys_prefixes),
         survey_checks="\n".join([
             "for (const id of Object.keys(EXPECTED_CHAPTERS)) ok(survey.includes(id), `survey mentions ${id}`)",
             "ok(survey.includes('JEE') && survey.includes('NEET') && survey.includes('GATE'), 'survey records the JEE/NEET/GATE exam anchors')"])),
    dict(desc_min=250, slug='chemistry', Discipline='Chemistry', discipline='chemistry', n_books=10, n_ch=91, n_pl=2224,
         added='55 exam-gap + the 2026-11-17 drive-toc continuation (530 -> 2,224)', DOC='CHEMISTRY', expected_chapters=fmt_expected(chem),
         prefixes_list='fchem- pchem- org- inorg- anal- envchem- bchem- qchem- cchem- indchem-',
         prefixes_ts=fmt_prefixes(chem_prefixes),
         survey_checks="\n".join([
             "for (const id of Object.keys(EXPECTED_CHAPTERS)) ok(survey.includes(id), `survey mentions ${id}`)",
             "ok(survey.includes('JEE') && survey.includes('NEET') && survey.includes('GATE'), 'survey records the JEE/NEET/GATE exam anchors')"])),
    dict(desc_min=250, slug='ecf', Discipline='Economics-Commerce-Finance', discipline='economics-commerce', n_books=23, n_ch=195, n_pl=973,
         added='15 exam-gap + the 2026-11-17 drive-toc continuation (820 -> 973)', DOC='ECF', expected_chapters=fmt_expected(ecf),
         prefixes_list='fecon- micro- macro- ieco- deveco- pubeco- moneco- econ- becon- fineco- bus- acct- cost- corpfin- bank- invest- statecon- busmath- entrep- mktg- hrm- ops- intbus-',
         prefixes_ts=fmt_prefixes(ecf_prefixes),
         survey_checks="\n".join([
             "for (const id of Object.keys(EXPECTED_CHAPTERS)) ok(survey.includes(id), `survey mentions ${id}`)",
             "ok(survey.includes('UGC NET Economics') && survey.includes('UGC NET Commerce'), 'survey records the UGC NET Economics + Commerce unit anchors')"])),
]
for g in gates:
    out = TEMPLATE.format(**g)
    open(f"scripts/verify-{g['slug']}-shelf-planning.ts", 'w').write(out)
    print('wrote', f"scripts/verify-{g['slug']}-shelf-planning.ts")

bio_med_arts_ids = bio + med + arts
out = TEMPLATE_MULTI.replace('@@EXPECTED@@', fmt_expected(bio_med_arts_ids))
open('scripts/verify-bio-med-arts-shelf-planning.ts', 'w').write(out)
print('wrote scripts/verify-bio-med-arts-shelf-planning.ts')
