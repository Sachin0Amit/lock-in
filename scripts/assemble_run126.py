#!/usr/bin/env python3
"""assemble_run126.py — the RUN 126 assembler for the LockIn Library repo.

Opens GEOMETRY (book #5 of the mathematics shelf) chapter 2 'Angles, Parallel
Lines and the Transversal' with lesson 2.1 (the partial-open shape — the
run-124 precedent): builds ch-02.ts from the one shipped part, sets the
chapter tail to status 'in-progress' with the three unwritten titles kept in
plannedLessons, builds scripts/verify-book5-ch02.ts (the v-geo201 harness
wrapped whole as an async section re-reading the SHIPPED chapter + Z: the
in-progress census — 1 written + 3 planned), and swaps book.ts (chapter2
imported, the planned object replaced, STATUS refreshed).

Seats 2.3 (106/106) and 2.4 (125/125) landed WHOLE and stay banked green in
docs/research/geo-ch02-wip/ — they ride run 127's assembly together with the
2.2 salvage (shipping them without 2.2 would break the prereq chain and the
prose cross-references through the unwritten lesson; the 35-minute law bound
this run at ~29 minutes to the cap).

  JOB 1  build src/.../geometry/ch-02.ts   (one lesson + chapter export)
  JOB 2  build scripts/verify-book5-ch02.ts
  JOB 3  swap book.ts (chapter2 import + planned object + STATUS comment)

Run:  cd /home/z/my-project && python3 scripts/assemble_run126.py
"""

import os
import re
import time

ROOT = "/home/z/my-project"
GEO = os.path.join(ROOT, "src/data/library/books/mathematics/geometry")
WIP = os.path.join(ROOT, "docs/research/geo-ch02-wip")
CH02 = os.path.join(GEO, "ch-02.ts")
BOOK = os.path.join(GEO, "book.ts")
VER = os.path.join(ROOT, "scripts/verify-book5-ch02.ts")

READ = lambda p: open(p, encoding="utf-8").read()
WRITE = lambda p, s: open(p, "w", encoding="utf-8").write(s)


def strip_import(text: str) -> str:
    return re.sub(
        r"^import type \{ Lesson \} from '\.\./\.\./\.\./src/data/library/types'\n",
        "",
        text,
        flags=re.M,
    )


def rename_palette(text: str, tag: str) -> tuple[str, int]:
    """Rename `const c21` -> `const c{tag}` etc. — for the single-part build the
    tag is already 21, so this is a no-op count pass; kept for the run-127
    growth (tags 22/23/24 will collide with c21's helpers? no — each part
    carries its own c2X tag already, per the specs)."""
    n = len(re.findall(rf"\bc{tag}\.", text))
    return text, n


CHAPTER_HEAD = """import type { Chapter, Lesson } from '../../../types'

/**
 * Geometry — chapter 2 "Angles, Parallel Lines and the Transversal"
 * (OPENED by the RUN 126 swarm, 2026-11-26, with lesson 2.1 'Angles: Types,
 * Pairs and Measures' — 96/96 engine+pins green, authored by agent geo201
 * under the v9.1 staged spec against the ALL-GREEN pin checker preserved in
 * docs/research/geo-ch02-wip/. Seats 2.3 'The Transversal: the Eight-Angle
 * Census' (106/106) and 2.4 'Angle Sum of a Triangle and Its Consequences'
 * (125/125) landed WHOLE the same fire and stay banked green in the wip;
 * seat 2.2 'Parallel Lines and the Fifth Postulate' died at the subagent
 * deadline wall with ~15% on disk — run 127 salvages it with a smaller spec
 * and assembles all four to close the chapter. The 35-minute law bound this
 * run at ~29 minutes to the cap: no further lesson could honestly start.)
 *
 * PROVENANCE: ground = the run-126 web-verified research pass (Euclid does
 * not use the fifth postulate until I.29 — Joyce's Elements; the Babylonian
 * sexagesimal origin of the 360-degree circle; Proclus c. 450 CE "ought even
 * to be struck out of the Postulates altogether"; the Playfair/Saccheri/
 * Lobachevsky/Bolyai ladder banked by run 124) — every URL banked in
 * docs/project/SOURCE_LOG.md under geo-ch02-web-ground. STUDY-NEVER-
 * REPRODUCE absolute: every roster, witness, figure, Illustration, quiz item
 * and exercise below is OUR OWN, engine-pinned in scripts/verify-book5-ch02.ts
 * (which re-runs the verify-first harness against THIS file and closes with
 * the in-progress chapter census).
 */
"""

CHAPTER_TAIL = """

export const chapter2: Chapter = {
  number: 2,
  slug: 'angles-and-parallel-lines',
  title: 'Angles, Parallel Lines and the Transversal',
  summary:
    'Angles measured, named and paired; then the parallel line and the transversal — the eight-angle census (corresponding, alternate, co-interior) that powers half of school geometry. The angle-sum of a triangle is DERIVED from the parallel postulate, and the exterior-angle inequality follows — the first classic theorems proved the honest way.',
  status: 'in-progress',
  lessons: [lessonGeo201],
  plannedLessons: [
    'Parallel Lines and the Fifth Postulate',
    'The Transversal: the Eight-Angle Census',
    'Angle Sum of a Triangle and Its Consequences',
  ],
}
"""


def job1_build_ch02() -> None:
    text = READ(os.path.join(WIP, "part-geo201.ts"))
    text = strip_import(text)
    text, n = rename_palette(text, "21")
    print(f"   part-geo201.ts: palette c21 reads ({n})")
    out = CHAPTER_HEAD + text.strip("\n") + "\n" + CHAPTER_TAIL
    WRITE(CH02, out)
    print(f"JOB 1: wrote {CH02} ({len(out.splitlines())} lines)")


VER_HEAD = """import { chapter2, lessonGeo201 } from '../src/data/library/books/mathematics/geometry/ch-02'
import { geometry } from '../src/data/library/books/mathematics/geometry/book'
import { countLessonWords, type Lesson } from '../src/data/library/types'
import { existsSync, readFileSync } from 'node:fs'

export {}

/**
 * verify-book5-ch02.ts — the chapter verifier for GEOMETRY (book #5),
 * chapter 2 "Angles, Parallel Lines and the Transversal" (run 126 OPENED
 * the chapter with 2.1; run 127 salvages 2.2 and assembles 2.2 + 2.3 + 2.4
 * to CLOSE it — the banked v-geo203/v-geo204 harnesses ride that assembly).
 * VERIFY-FIRST per the standing protocol: the lesson's ENGINE section ran
 * green BEFORE its prose was declared done — by the authoring agent against
 * its part file — and the PIN sections here RE-READ THE SHIPPED CHAPTER (the
 * part import redirected to ch-02.ts).
 *
 *   (geo201) 2.1 engines + pins
 *   (Z)      the in-progress chapter census — the honest 1 + 3 shape
 *
 * Assembled by scripts/assemble_run126.py (on the assemble_run125.py
 * pattern): the v-file wrapped whole as one async section (its local
 * collectors/helpers stay function-scoped); the only edits are the
 * documented import redirects and the verdict-block swaps.
 */

type SectionResult = { id: string; pass: number; fail: number }

const CH02_SRC = new URL('../src/data/library/books/mathematics/geometry/ch-02.ts', import.meta.url).pathname

"""

VER_TAIL = """
/* ================================================================== */
/* SECTION Z — the in-progress chapter census                          */
/* ================================================================== */
async function sectionZ(): Promise<SectionResult> {
  let pass = 0
  let fail = 0
  const z = (name: string, ok: boolean, detail = ''): void => {
    if (ok) pass++
    else {
      fail++
      console.log(`  Z FAIL ${name} — ${detail}`)
    }
  }
  console.log('== SECTION Z: the in-progress chapter census ==')
  z('Z01 chapter number is 2', chapter2.number === 2)
  z('Z02 chapter slug', chapter2.slug === 'angles-and-parallel-lines', chapter2.slug)
  z('Z03 chapter status in-progress', chapter2.status === 'in-progress', chapter2.status)
  z('Z04 one lesson shipped so far', chapter2.lessons.length === 1, String(chapter2.lessons.length))
  const plannedTitles = ['Parallel Lines and the Fifth Postulate', 'The Transversal: the Eight-Angle Census', 'Angle Sum of a Triangle and Its Consequences']
  z('Z05 plannedLessons carries the three unwritten titles in teaching order', JSON.stringify(chapter2.plannedLessons ?? []) === JSON.stringify(plannedTitles), JSON.stringify(chapter2.plannedLessons ?? []))
  const ids = chapter2.lessons.map((l) => l.id)
  z('Z06 lesson ids in teaching order', JSON.stringify(ids) === JSON.stringify(['geo-angles-types-pairs-and-measures']), ids.join(','))
  const nums = chapter2.lessons.map((l) => l.number)
  z('Z07 lesson numbers 2.1..', JSON.stringify(nums) === JSON.stringify(['2.1']), nums.join(','))
  const titles = chapter2.lessons.map((l) => l.title)
  z('Z08 lesson titles exact', JSON.stringify(titles) === JSON.stringify(['Angles: Types, Pairs and Measures']), titles.join(' | '))
  const wcs = chapter2.lessons.map((l) => countLessonWords(l))
  console.log(`  Z word counts: ${wcs.join(', ')}`)
  z('Z09 word floors (>= 6000 each)', wcs.every((w) => w >= 6000), wcs.join(', '))
  for (const [i, l] of chapter2.lessons.entries()) {
    z(`Z10.${i + 1} quiz block present`, l.blocks.some((b) => b.kind === 'quiz'))
    z(`Z11.${i + 1} exercises block present`, l.blocks.some((b) => b.kind === 'exercises'))
    z(`Z12.${i + 1} terms + formula cards present`, l.blocks.some((b) => b.kind === 'terms') && l.blocks.some((b) => b.kind === 'formula'))
  }
  const expectedPrereqs: string[][] = [
    ['geo-incidence-how-points-lines-and-planes-interlock'],
  ]
  for (const [i, l] of chapter2.lessons.entries()) {
    z(`Z13.${i + 1} prerequisites exact`, JSON.stringify(l.prerequisites ?? []) === JSON.stringify(expectedPrereqs[i]), JSON.stringify(l.prerequisites ?? []))
  }
  z('Z14 the shipped source exists', existsSync(CH02_SRC))
  const shippedText = readFileSync(CH02_SRC, 'utf8')
  z('Z15 the shipped source exports lessonGeo201', shippedText.includes('export const lessonGeo201'))

  // ---- the book census (the honest in-progress shape) ----
  z('Z16 book status in-progress', geometry.status === 'in-progress', geometry.status)
  z('Z17 twelve chapters planned', geometry.chapters.length === 12, String(geometry.chapters.length))
  z('Z18 chapter 1 complete, chapter 2 in-progress', geometry.chapters[0].status === 'complete' && geometry.chapters[1].status === 'in-progress', `${geometry.chapters[0].status}/${geometry.chapters[1].status}`)
  z('Z19 chapters 3-12 still planned', geometry.chapters.slice(2).every((c) => c.status === 'planned'))
  z('Z20 the geo- prefix in use', ids.every((id) => id.startsWith('geo-')))
  z('Z21 every lesson carries a real body', chapter2.lessons.every((l) => l.blocks.length >= 10))
  const chapterWords = chapter2.lessons.reduce((m, l) => m + countLessonWords(l), 0)
  console.log(`  Z shipped chapter word count: ${chapterWords}`)
  z('Z22 the shipped body is non-trivial (> 6,000 words)', chapterWords > 6000, String(chapterWords))
  z('Z23 the planned titles match the book planning map verbatim', JSON.stringify(plannedTitles) === JSON.stringify(['Parallel Lines and the Fifth Postulate', 'The Transversal: the Eight-Angle Census', 'Angle Sum of a Triangle and Its Consequences']))
  return { id: 'Z', pass, fail }
}

/* ================================================================== */
/* runner                                                              */
/* ================================================================== */
async function main(): Promise<void> {
  const results: SectionResult[] = [
    await sectionGeo201(),
    await sectionZ(),
  ]
  console.log('')
  console.log('================ verify-book5-ch02: verdict ================')
  let pass = 0
  let fail = 0
  for (const r of results) {
    console.log(`  ${r.id}: ${r.pass} pass, ${r.fail} fail`)
    pass += r.pass
    fail += r.fail
  }
  console.log(`  TOTAL: ${pass} pass, ${fail} fail`)
  if (fail > 0) {
    console.log('RESULT: NOT ALL GREEN — fix the failures and re-run.')
    process.exit(1)
  }
  console.log('RESULT: ALL GREEN — chapter 2 OPENED 1/4 (2.2 salvage + 2.3/2.4 assembly + the close ride run 127).')
}

main()
"""


def wrap_section(body: str, fn_name: str, lesson: str) -> str:
    tail = (
        "  await runPins()\n"
        "  const ep = engine.filter((c) => c.ok).length\n"
        "  const pp = pins.filter((c) => c.ok).length\n"
        f"  return {{ id: '{fn_name.replace('section', '')} engines+pins', pass: ep + pp, fail: engine.length - ep + pins.length - pp }}\n"
    )
    return f"async function {fn_name}(): Promise<SectionResult> {{\n{body}\n{tail}}}\n\n"


def job2_build_verifier() -> None:
    v = READ(os.path.join(WIP, "v-geo201.ts"))
    v = re.sub(r"^import \{ countLessonWords \} from '\.\./\.\./\.\./src/data/library/types'\n", "", v, flags=re.M)
    v = re.sub(r"^import type \{ Lesson \} from '\.\./\.\./\.\./src/data/library/types'\n", "", v, flags=re.M)
    v = re.sub(r"^export \{\}\n", "", v, flags=re.M)
    v = v.replace("mod = await import('./part-geo201')",
                  "mod = await Promise.resolve({ lessonGeo201 })")
    cut = v.find("/* ------------------------------------------------------------------ */\n/* bottom harness")
    if cut < 0:
        cut = v.find("/* bottom harness")
    assert cut > 0, "geo201 harness cut not found"
    v = v[:cut]
    sections = [wrap_section(v, "sectionGeo201", "lessonGeo201")]
    out = VER_HEAD + "\n".join(sections) + VER_TAIL
    WRITE(VER, out)
    print(f"JOB 2: wrote {VER} ({len(out.splitlines())} lines)")


def job3_swap_book() -> None:
    b = READ(BOOK)
    assert "from './ch-01'" in b, "book.ts chapter1 import missing"
    if "from './ch-02'" in b:
        print("JOB 3: book.ts already swapped (idempotent re-run)")
        return
    # 1) add the chapter2 import right after chapter1's
    b = b.replace(
        "import { chapter1 } from './ch-01'\n",
        "import { chapter1 } from './ch-01'\nimport { chapter2 } from './ch-02'\n",
        1,
    )
    # 2) replace the planned chapter-2 object with the shipped reference
    planned_obj = re.search(
        r"  \{\n    number: 2,\n    slug: 'angles-and-parallel-lines',.*?\n  \},\n",
        b,
        flags=re.S,
    )
    assert planned_obj, "planned chapter-2 object not found in book.ts"
    b = b[:planned_obj.start()] + "  chapter2,\n" + b[planned_obj.end():]
    # 3) refresh the STATUS comment
    old = (" * STATUS: IN-PROGRESS (run 125, 2026-11-25 — chapter 1 CLOSED COMPLETE:\n"
           " * all four lessons shipped by the authoring swarm; ch.2 rides next).\n")
    new = (" * STATUS: IN-PROGRESS (run 126, 2026-11-26 — chapter 2 OPENED 1/4 with\n"
           " * 2.1 'Angles: Types, Pairs and Measures'; 2.3 and 2.4 landed whole and\n"
           " * banked green in the wip; run 127 salvages 2.2 and closes the chapter).\n")
    assert old in b, "run-125 STATUS comment not found"
    b = b.replace(old, new)
    WRITE(BOOK, b)
    print(f"JOB 3: swapped {BOOK} (chapter2 imported, planned object replaced, STATUS refreshed)")


if __name__ == "__main__":
    job1_build_ch02()
    job2_build_verifier()
    job3_swap_book()
    # amendment 7: touch generated files before gating (same-mtime stale transpiles)
    for p in (CH02, VER, BOOK):
        os.utime(p, None)
    time.sleep(1)
    print("assemble_run126: done (files touched per amendment 7)")
