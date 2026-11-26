#!/usr/bin/env python3
"""assemble_run127.py — the RUN 127 assembler for the LockIn Library repo.

CLOSES GEOMETRY (book #5 of the mathematics shelf) chapter 2 'Angles, Parallel
Lines and the Transversal' COMPLETE: builds ch-02.ts from the FOUR wip parts
(2.1 shipped by run 126; 2.2 salvaged whole this run by seats 127-a/127-b —
72/72 engine+pins green after the orchestrator splice; 2.3 + 2.4 banked green
since run 126), sets the chapter tail to status 'complete' with plannedLessons
[], rebuilds scripts/verify-book5-ch02.ts (the four v-geo20X harnesses wrapped
whole as async sections re-reading the SHIPPED chapter + Z: the CLOSED census
— 4 lessons, ids/numbers/titles verbatim, floors >= 6000, quiz keys pairwise
distinct), and refreshes book.ts's STATUS comment.

  JOB 1  build src/.../geometry/ch-02.ts   (four lessons + chapter export)
  JOB 2  build scripts/verify-book5-ch02.ts
  JOB 3  refresh book.ts STATUS comment

Run:  cd /home/z/my-project && python3 scripts/assemble_run127.py
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

PARTS = ["part-geo201.ts", "part-geo202.ts", "part-geo203.ts", "part-geo204.ts"]
LESSONS = ["lessonGeo201", "lessonGeo202", "lessonGeo203", "lessonGeo204"]


def strip_import(text: str) -> str:
    return re.sub(
        r"^import type \{ Lesson \} from '\.\./\.\./\.\./src/data/library/types'\n",
        "",
        text,
        flags=re.M,
    )


CHAPTER_HEAD = """import type { Chapter, Lesson } from '../../../types'

/**
 * Geometry — chapter 2 "Angles, Parallel Lines and the Transversal"
 * (OPENED by the RUN 126 swarm with lesson 2.1; CLOSED COMPLETE by RUN 127,
 * 2026-11-26 — the maths lane, whole-chapter cadence, v9.1 protocol).
 *
 * The four seats: 2.1 'Angles: Types, Pairs and Measures' (96/96, run 126);
 * 2.2 'Parallel Lines and the Fifth Postulate' — the run-126 seat died at
 * the subagent deadline wall with ~15% on disk; RUN 127 salvaged it with TWO
 * SPLIT smaller-spec seats per amendment 5 (127-a prose: 7,769 words at
 * green; 127-b back half: quiz + 15 exercises + coda, landed 47KB on disk
 * when its agent hit the wall — write-early-often made it count) and the
 * orchestrator splice: 72/72 engine+pins GREEN, 11,909 words, quiz
 * [1,2,0,3,1]; 2.3 'The Transversal: the Eight-Angle Census' (106/106,
 * banked whole run 126); 2.4 'Angle Sum of a Triangle and Its Consequences'
 * (125/125, banked whole run 126).
 *
 * PROVENANCE: ground = the run-126 web-verified research pass (Euclid does
 * not use the fifth postulate until I.29 — Joyce's Elements; Proclus c. 450
 * CE "ought even to be struck out of the Postulates altogether"; the
 * Playfair/Saccheri/Lobachevsky/Bolyai ladder) — every URL banked in
 * docs/project/SOURCE_LOG.md under geo-ch02-web-ground. STUDY-NEVER-
 * REPRODUCE absolute: every roster, witness, figure, Illustration, quiz item
 * and exercise below is OUR OWN, engine-pinned in scripts/verify-book5-ch02.ts
 * (which re-runs the verify-first harnesses against THIS file and closes with
 * the CLOSED chapter census).
 */
"""


def chapter_tail() -> str:
    lessons = ", ".join(LESSONS)
    return (
        "\nexport const chapter2: Chapter = {\n"
        "  number: 2,\n"
        "  slug: 'angles-and-parallel-lines',\n"
        "  title: 'Angles, Parallel Lines and the Transversal',\n"
        "  summary:\n"
        "    'Angles measured, named and paired; then the parallel line and the transversal — the eight-angle census (corresponding, alternate, co-interior) that powers half of school geometry. The angle-sum of a triangle is DERIVED from the parallel postulate, and the exterior-angle inequality follows — the first classic theorems proved the honest way.',\n"
        "  status: 'complete',\n"
        f"  lessons: [{lessons}],\n"
        "  plannedLessons: [],\n"
        "}\n"
    )


def job1_build_ch02() -> None:
    chunks = []
    for i, part in enumerate(PARTS):
        text = strip_import(READ(os.path.join(WIP, part)))
        assert f"export const {LESSONS[i]}" in text, f"{part}: export {LESSONS[i]} missing"
        assert "import type" not in text, f"{part}: import line survived the strip"
        banner = (
            f"/* ================================================================== */\n"
            f"/* lesson 2.{i + 1} — from docs/research/geo-ch02-wip/{part}            */\n"
            f"/* ================================================================== */\n"
        )
        chunks.append(banner + text.strip("\n") + "\n")
    out = CHAPTER_HEAD + "\n".join(chunks) + chapter_tail()
    WRITE(CH02, out)
    print(f"JOB 1: wrote {CH02} ({len(out.splitlines())} lines)")


VER_HEAD = """import { chapter2, lessonGeo201, lessonGeo202, lessonGeo203, lessonGeo204 } from '../src/data/library/books/mathematics/geometry/ch-02'
import { geometry } from '../src/data/library/books/mathematics/geometry/book'
import { countLessonWords, type Lesson } from '../src/data/library/types'
import { existsSync, readFileSync } from 'node:fs'

export {}

/**
 * verify-book5-ch02.ts — the chapter verifier for GEOMETRY (book #5),
 * chapter 2 "Angles, Parallel Lines and the Transversal" (run 126 OPENED
 * with 2.1; run 127 salvaged 2.2 and assembled 2.2 + 2.3 + 2.4 to CLOSE it
 * COMPLETE — 4 lessons, 38,983 words). VERIFY-FIRST per the standing
 * protocol: each lesson's ENGINE section ran green BEFORE its prose was
 * declared done — by its authoring agent against its part file — and the
 * PIN sections here RE-READ THE SHIPPED CHAPTER (the part imports
 * redirected to ch-02.ts).
 *
 *   (geo201) 2.1 engines + pins      (geo202) 2.2 engines + pins
 *   (geo203) 2.3 engines + pins      (geo204) 2.4 engines + pins
 *   (Z)      the CLOSED chapter census — the honest 4-of-4 shape
 *
 * Assembled by scripts/assemble_run127.py (on the assemble_run126.py
 * pattern): each v-file wrapped whole as one async section (its local
 * collectors/helpers stay function-scoped); the only edits are the
 * documented import redirects and the verdict-block swaps.
 */

type SectionResult = { id: string; pass: number; fail: number }

const CH02_SRC = new URL('../src/data/library/books/mathematics/geometry/ch-02.ts', import.meta.url).pathname

"""

VER_TAIL = """
/* ================================================================== */
/* SECTION Z — the CLOSED chapter census                               */
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
  console.log('== SECTION Z: the CLOSED chapter census ==')
  z('Z01 chapter number is 2', chapter2.number === 2)
  z('Z02 chapter slug', chapter2.slug === 'angles-and-parallel-lines', chapter2.slug)
  z('Z03 chapter status complete', chapter2.status === 'complete', chapter2.status)
  z('Z04 four lessons shipped', chapter2.lessons.length === 4, String(chapter2.lessons.length))
  z('Z05 plannedLessons is empty (nothing outstanding)', (chapter2.plannedLessons ?? []).length === 0, JSON.stringify(chapter2.plannedLessons ?? []))
  const ids = chapter2.lessons.map((l) => l.id)
  z('Z06 lesson ids in teaching order', JSON.stringify(ids) === JSON.stringify(['geo-angles-types-pairs-and-measures', 'geo-parallel-lines-and-the-fifth-postulate', 'geo-the-transversal-the-eight-angle-census', 'geo-angle-sum-of-a-triangle-and-its-consequences']), ids.join(','))
  z('Z07 lesson numbers 2.1..2.4', JSON.stringify(chapter2.lessons.map((l) => l.number)) === JSON.stringify(['2.1', '2.2', '2.3', '2.4']), chapter2.lessons.map((l) => l.number).join(','))
  z('Z08 lesson titles exact', JSON.stringify(chapter2.lessons.map((l) => l.title)) === JSON.stringify(['Angles: Types, Pairs and Measures', 'Parallel Lines and the Fifth Postulate', 'The Transversal: the Eight-Angle Census', 'Angle Sum of a Triangle and Its Consequences']), chapter2.lessons.map((l) => l.title).join(' | '))
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
    ['geo-incidence-how-points-lines-and-planes-interlock', 'geo-angles-types-pairs-and-measures'],
    ['geo-incidence-how-points-lines-and-planes-interlock', 'geo-angles-types-pairs-and-measures', 'geo-parallel-lines-and-the-fifth-postulate'],
    ['geo-incidence-how-points-lines-and-planes-interlock', 'geo-angles-types-pairs-and-measures', 'geo-parallel-lines-and-the-fifth-postulate', 'geo-the-transversal-the-eight-angle-census'],
  ]
  for (const [i, l] of chapter2.lessons.entries()) {
    z(`Z13.${i + 1} prerequisites exact (the teaching chain)`, JSON.stringify(l.prerequisites ?? []) === JSON.stringify(expectedPrereqs[i]), JSON.stringify(l.prerequisites ?? []))
  }
  z('Z14 the shipped source exists', existsSync(CH02_SRC))
  const shippedText = readFileSync(CH02_SRC, 'utf8')
  z('Z15 the shipped source exports all four lessons', ['lessonGeo201', 'lessonGeo202', 'lessonGeo203', 'lessonGeo204'].every((n) => shippedText.includes(`export const ${n}`)))

  // ---- the book census (the honest closed-chapter shape) ----
  z('Z16 book status in-progress (10 chapters remain)', geometry.status === 'in-progress', geometry.status)
  z('Z17 twelve chapters planned', geometry.chapters.length === 12, String(geometry.chapters.length))
  z('Z18 chapters 1 AND 2 complete', geometry.chapters[0].status === 'complete' && geometry.chapters[1].status === 'complete', `${geometry.chapters[0].status}/${geometry.chapters[1].status}`)
  z('Z19 chapters 3-12 still planned', geometry.chapters.slice(2).every((c) => c.status === 'planned'))
  z('Z20 the geo- prefix in use', ids.every((id) => id.startsWith('geo-')))
  z('Z21 every lesson carries a real body', chapter2.lessons.every((l) => l.blocks.length >= 10))
  const chapterWords = chapter2.lessons.reduce((m, l) => m + countLessonWords(l), 0)
  console.log(`  Z shipped chapter word count: ${chapterWords}`)
  z('Z22 the shipped body is non-trivial (> 24,000 words)', chapterWords > 24000, String(chapterWords))
  const keys = chapter2.lessons.map((l) => {
    const qb = l.blocks.find((b) => b.kind === 'quiz') as { kind: 'quiz'; items: Array<{ answer: number }> } | undefined
    return qb ? qb.items.map((i) => i.answer).join('') : 'none'
  })
  console.log(`  Z quiz keys: ${keys.join(' | ')}`)
  z('Z23 quiz keys are the pinned four, pairwise distinct', JSON.stringify(keys) === JSON.stringify(['12012', '12031', '20312', '13021']) && new Set(keys).size === 4, keys.join(','))
  z('Z24 the four lesson ids are unique', new Set(ids).size === 4)
  return { id: 'Z', pass, fail }
}

/* ================================================================== */
/* runner                                                              */
/* ================================================================== */
async function main(): Promise<void> {
  const results: SectionResult[] = [
    await sectionGeo201(),
    await sectionGeo202(),
    await sectionGeo203(),
    await sectionGeo204(),
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
  console.log('RESULT: ALL GREEN — chapter 2 CLOSED COMPLETE (4/4 lessons, 38,983 words).')
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
    sections = []
    for i, vfile in enumerate(["v-geo201.ts", "v-geo202.ts", "v-geo203.ts", "v-geo204.ts"]):
        v = READ(os.path.join(WIP, vfile))
        v = re.sub(r"^import \{ countLessonWords \} from '\.\./\.\./\.\./src/data/library/types'\n", "", v, flags=re.M)
        v = re.sub(r"^import type \{ Lesson \} from '\.\./\.\./\.\./src/data/library/types'\n", "", v, flags=re.M)
        v = re.sub(r"^export \{\}\n", "", v, flags=re.M)
        v = v.replace(f"mod = await import('./part-geo20{i + 1}')",
                      f"mod = await Promise.resolve({{ {LESSONS[i]} }})")
        cut = v.find("/* ------------------------------------------------------------------ */\n/* bottom harness")
        if cut < 0:
            cut = v.find("/* bottom harness")
        assert cut > 0, f"{vfile}: harness cut not found"
        v = v[:cut]
        sections.append(wrap_section(v, f"sectionGeo20{i + 1}", LESSONS[i]))
    out = VER_HEAD + "".join(sections) + VER_TAIL
    WRITE(VER, out)
    print(f"JOB 2: wrote {VER} ({len(out.splitlines())} lines)")


def job3_refresh_book() -> None:
    b = READ(BOOK)
    assert "from './ch-02'" in b, "book.ts chapter2 import missing"
    if "STATUS: IN-PROGRESS (run 127" in b:
        print("JOB 3: book.ts STATUS already carries the run-127 close wording (idempotent re-run)")
        return
    m = re.search(r" \* STATUS: IN-PROGRESS \(run 126, 2026-11-26.*?\n(?: \*.*\n)*", b)
    assert m, "run-126 STATUS comment not found in book.ts"
    new = (
        " * STATUS: IN-PROGRESS (run 127, 2026-11-26 — chapters 1 AND 2 CLOSED\n"
        " * COMPLETE: ch.2 'Angles, Parallel Lines and the Transversal' shipped\n"
        " * all four lessons — 2.1 (run 126), the 2.2 two-seat salvage, 2.3 and\n"
        " * 2.4 (banked run 126, assembled run 127); ch.3 rides the next fire).\n"
    )
    b = b[: m.start()] + new + b[m.end():]
    WRITE(BOOK, b)
    print(f"JOB 3: refreshed {BOOK} STATUS (chapter 2 CLOSED COMPLETE)")


if __name__ == "__main__":
    job1_build_ch02()
    job2_build_verifier()
    job3_refresh_book()
    # amendment 7: touch generated files before gating (same-mtime stale transpiles)
    for p in (CH02, VER, BOOK):
        os.utime(p, None)
    time.sleep(1)
    print("assemble_run127: done (files touched per amendment 7)")
