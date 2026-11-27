#!/usr/bin/env python3
"""assemble_run129.py — the RUN 129 assembler for the LockIn Library repo.

CLOSES GEOMETRY (book #5 of the mathematics shelf) chapter 3 'Triangles:
Congruence and the Craft of Proof' COMPLETE: builds ch-03.ts from the SIX
wip parts (3.1 shipped by run 128; 3.2/3.3/3.4/3.5/3.6 landed green by the
run-129 swarm — 3.3 + 3.4 first-wave seats, 302/305/306 continuation seats
after the swarm-transcript wall), sets the chapter tail to status 'complete'
with plannedLessons [], rebuilds scripts/verify-book5-ch03.ts (the six
v-geo30X harnesses wrapped whole as async sections re-reading the SHIPPED
chapter + Z: the CLOSED census — 6 lessons, ids/numbers/titles verbatim,
floors >= 6000, quiz keys pairwise distinct), and swaps book.ts's planned
ch.3 object for the shipped chapter3.

  JOB 1  build src/.../geometry/ch-03.ts   (six lessons + chapter export)
  JOB 2  build scripts/verify-book5-ch03.ts
  JOB 3  swap book.ts chapter3 + refresh STATUS comment

Run:  cd /home/z/my-project && python3 scripts/assemble_run129.py
"""

import os
import re
import time

ROOT = "/home/z/my-project"
GEO = os.path.join(ROOT, "src/data/library/books/mathematics/geometry")
WIP = os.path.join(ROOT, "docs/research/geo-ch03-wip")
CH03 = os.path.join(GEO, "ch-03.ts")
BOOK = os.path.join(GEO, "book.ts")
VER = os.path.join(ROOT, "scripts/verify-book5-ch03.ts")

READ = lambda p: open(p, encoding="utf-8").read()
WRITE = lambda p, s: open(p, "w", encoding="utf-8").write(s)

PARTS = [f"part-geo30{n}.ts" for n in range(1, 7)]
LESSONS = [f"lessonGeo30{n}" for n in range(1, 7)]


def strip_import(text: str) -> str:
    return re.sub(
        r"^import type \{ Lesson \} from '\.\./\.\./\.\./src/data/library/types'\n",
        "",
        text,
        flags=re.M,
    )


CHAPTER_HEAD = """import type { Chapter, Lesson } from '../../../types'

/**
 * Geometry — chapter 3 "Triangles: Congruence and the Craft of Proof"
 * (OPENED by the RUN 128 swarm with lesson 3.1; CLOSED COMPLETE by RUN 129,
 * 2026-11-27 — the maths lane, whole-chapter cadence, v9.2 protocol).
 *
 * The six seats: 3.1 'Congruence: the Idea of Same Shape and Size' (96/96,
 * run 128 — the only seat the run-128 swarm wall let land); 3.2 'The
 * Congruence Criteria: SAS, ASA, AAS, SSS, RHS' (100/100 — the run-129
 * continuation seat: engine banked green run 128, part written fresh);
 * 3.3 'Isosceles Triangles: the Classic Consequences' (113/113, first-wave
 * seat); 3.4 'Inequalities in a Triangle: Sides and Angles' (115/115,
 * first-wave seat); 3.5 'The Cevian Theorems: Ceva and Menelaus' (103/103 —
 * continuation seat finishing the half-banked part); 3.6 "Stewart's Theorem
 * and the Median Relation" (106/106 — continuation seat). The run-129 swarm
 * wall: the 6-up launch died at the transcript deadline with all six engines
 * and three parts on disk (staged seats + write-early-often made it count);
 * the continuation relaunch landed 302/305/306 green.
 *
 * PROVENANCE: ground = the run-128 reference-scan-first pass (v9.2
 * amendment 9): Cengage M1-05 'Properties and Solutions of Triangle'
 * (Drive library, vision-extracted), NCERT Class 7 ch.7 'Congruence of
 * Triangles' (text layer), the Euclid I.4/I.5/I.6/I.8/I.16/I.18/I.19/I.20
 * banked ground, and the Ceva/Menelaus/Stewart history via WebSearch+
 * WebFetch — every URL and page in docs/project/SOURCE_LOG.md under the
 * run-128 block. STUDY-NEVER-REPRODUCE absolute: every roster, witness,
 * figure, Illustration, quiz item and exercise below is OUR OWN,
 * engine-pinned in scripts/verify-book5-ch03.ts (which re-runs the
 * verify-first harnesses against THIS file and closes with the CLOSED
 * chapter census).
 */
"""


def chapter_tail() -> str:
    lessons = ", ".join(LESSONS)
    return (
        "\nexport const chapter3: Chapter = {\n"
        "  number: 3,\n"
        "  slug: 'triangles-congruence-and-proof',\n"
        "  title: 'Triangles: Congruence and the Craft of Proof',\n"
        "  summary:\n"
        "    'The chapter that makes geometers: congruence as exact coincidence, the five criteria (SAS, ASA, AAS, SSS, RHS) stated as postulates-of-method and used with discipline, and the classic consequences PROVED — isosceles triangles, the equilateral case, and the side/angle inequalities. Every proof is written the Euclidean way: statement, construction, argument, conclusion.',\n"
        "  status: 'complete',\n"
        f"  lessons: [{lessons}],\n"
        "  plannedLessons: [],\n"
        "}\n"
    )


def job1_build_ch03() -> None:
    chunks = []
    for i, part in enumerate(PARTS):
        text = strip_import(READ(os.path.join(WIP, part)))
        assert f"export const {LESSONS[i]}" in text, f"{part}: export {LESSONS[i]} missing"
        assert "import type" not in text, f"{part}: import line survived the strip"
        banner = (
            f"/* ================================================================== */\n"
            f"/* lesson 3.{i + 1} — from docs/research/geo-ch03-wip/{part}            */\n"
            f"/* ================================================================== */\n"
        )
        chunks.append(banner + text.strip("\n") + "\n")
    out = CHAPTER_HEAD + "\n".join(chunks) + chapter_tail()
    WRITE(CH03, out)
    print(f"JOB 1: wrote {CH03} ({len(out.splitlines())} lines)")


VER_HEAD = """import { chapter3, lessonGeo301, lessonGeo302, lessonGeo303, lessonGeo304, lessonGeo305, lessonGeo306 } from '../src/data/library/books/mathematics/geometry/ch-03'
import { geometry } from '../src/data/library/books/mathematics/geometry/book'
import { countLessonWords, type Lesson } from '../src/data/library/types'
import { existsSync, readFileSync } from 'node:fs'

export {}

/**
 * verify-book5-ch03.ts — the chapter verifier for GEOMETRY (book #5),
 * chapter 3 "Triangles: Congruence and the Craft of Proof" (run 128 OPENED
 * with 3.1; run 129 landed 3.2-3.6 and assembled the chapter to CLOSE it
 * COMPLETE — 6 lessons). VERIFY-FIRST per the standing protocol: each
 * lesson's ENGINE section ran green BEFORE its prose was declared done —
 * by its authoring agent against its part file — and the PIN sections here
 * RE-READ THE SHIPPED CHAPTER (the part imports redirected to ch-03.ts).
 *
 *   (geo301) 3.1 engines + pins      (geo302) 3.2 engines + pins
 *   (geo303) 3.3 engines + pins      (geo304) 3.4 engines + pins
 *   (geo305) 3.5 engines + pins      (geo306) 3.6 engines + pins
 *   (Z)      the CLOSED chapter census — the honest 6-of-6 shape
 *
 * Assembled by scripts/assemble_run129.py (on the assemble_run127.py
 * pattern): each v-file wrapped whole as one async section (its local
 * collectors/helpers stay function-scoped); the only edits are the
 * documented import redirects and the verdict-block swaps.
 */

type SectionResult = { id: string; pass: number; fail: number }

const CH03_SRC = new URL('../src/data/library/books/mathematics/geometry/ch-03.ts', import.meta.url).pathname

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
  z('Z01 chapter number is 3', chapter3.number === 3)
  z('Z02 chapter slug', chapter3.slug === 'triangles-congruence-and-proof', chapter3.slug)
  z('Z03 chapter status complete', chapter3.status === 'complete', chapter3.status)
  z('Z04 six lessons shipped', chapter3.lessons.length === 6, String(chapter3.lessons.length))
  z('Z05 plannedLessons is empty (nothing outstanding)', (chapter3.plannedLessons ?? []).length === 0, JSON.stringify(chapter3.plannedLessons ?? []))
  const ids = chapter3.lessons.map((l) => l.id)
  z('Z06 lesson ids in teaching order', JSON.stringify(ids) === JSON.stringify(['geo-congruence-the-idea-of-same-shape-and-size', 'geo-the-congruence-criteria-sas-asa-aas-sss-rhs', 'geo-isosceles-triangles-the-classic-consequences', 'geo-inequalities-in-a-triangle-sides-and-angles', 'geo-the-cevian-theorems-ceva-and-menelaus', 'geo-stewarts-theorem-and-the-median-relation']), ids.join(','))
  z('Z07 lesson numbers 3.1..3.6', JSON.stringify(chapter3.lessons.map((l) => l.number)) === JSON.stringify(['3.1', '3.2', '3.3', '3.4', '3.5', '3.6']), chapter3.lessons.map((l) => l.number).join(','))
  z('Z08 lesson titles exact', JSON.stringify(chapter3.lessons.map((l) => l.title)) === JSON.stringify(['Congruence: the Idea of Same Shape and Size', 'The Congruence Criteria: SAS, ASA, AAS, SSS, RHS', 'Isosceles Triangles: the Classic Consequences', 'Inequalities in a Triangle: Sides and Angles', "The Cevian Theorems: Ceva and Menelaus", \"Stewart's Theorem and the Median Relation\"]), chapter3.lessons.map((l) => l.title).join(' | '))
  const wcs = chapter3.lessons.map((l) => countLessonWords(l))
  console.log(`  Z word counts: ${wcs.join(', ')}`)
  z('Z09 word floors (>= 6000 each)', wcs.every((w) => w >= 6000), wcs.join(', '))
  for (const [i, l] of chapter3.lessons.entries()) {
    z(`Z10.${i + 1} quiz block present`, l.blocks.some((b) => b.kind === 'quiz'))
    z(`Z11.${i + 1} exercises block present`, l.blocks.some((b) => b.kind === 'exercises'))
    z(`Z12.${i + 1} terms + formula cards present`, l.blocks.some((b) => b.kind === 'terms') && l.blocks.some((b) => b.kind === 'formula'))
  }
  const expectedPrereqs: string[][] = [
    ['geo-angle-sum-of-a-triangle-and-its-consequences'],
    ['geo-congruence-the-idea-of-same-shape-and-size'],
    ['geo-congruence-the-idea-of-same-shape-and-size', 'geo-the-congruence-criteria-sas-asa-aas-sss-rhs'],
    ['geo-congruence-the-idea-of-same-shape-and-size', 'geo-the-congruence-criteria-sas-asa-aas-sss-rhs', 'geo-isosceles-triangles-the-classic-consequences'],
    ['geo-the-congruence-criteria-sas-asa-aas-sss-rhs', 'geo-inequalities-in-a-triangle-sides-and-angles'],
    ['geo-the-congruence-criteria-sas-asa-aas-sss-rhs', 'geo-inequalities-in-a-triangle-sides-and-angles'],
  ]
  for (const [i, l] of chapter3.lessons.entries()) {
    z(`Z13.${i + 1} prerequisites exact (the teaching chain)`, JSON.stringify(l.prerequisites ?? []) === JSON.stringify(expectedPrereqs[i]), JSON.stringify(l.prerequisites ?? []))
  }
  z('Z14 the shipped source exists', existsSync(CH03_SRC))
  const shippedText = readFileSync(CH03_SRC, 'utf8')
  z('Z15 the shipped source exports all six lessons', ['lessonGeo301', 'lessonGeo302', 'lessonGeo303', 'lessonGeo304', 'lessonGeo305', 'lessonGeo306'].every((n) => shippedText.includes(`export const ${n}`)))

  // ---- the book census (the honest closed-chapter shape) ----
  z('Z16 book status in-progress (9 chapters remain)', geometry.status === 'in-progress', geometry.status)
  z('Z17 twelve chapters planned', geometry.chapters.length === 12, String(geometry.chapters.length))
  z('Z18 chapters 1, 2 AND 3 complete', geometry.chapters[0].status === 'complete' && geometry.chapters[1].status === 'complete' && geometry.chapters[2].status === 'complete', `${geometry.chapters[0].status}/${geometry.chapters[1].status}/${geometry.chapters[2].status}`)
  z('Z19 chapters 4-12 still planned', geometry.chapters.slice(3).every((c) => c.status === 'planned'))
  z('Z20 the geo- prefix in use', ids.every((id) => id.startsWith('geo-')))
  z('Z21 every lesson carries a real body', chapter3.lessons.every((l) => l.blocks.length >= 10))
  const chapterWords = chapter3.lessons.reduce((m, l) => m + countLessonWords(l), 0)
  console.log(`  Z shipped chapter word count: ${chapterWords}`)
  z('Z22 the shipped body is non-trivial (> 50,000 words)', chapterWords > 50000, String(chapterWords))
  const keys = chapter3.lessons.map((l) => {
    const qb = l.blocks.find((b) => b.kind === 'quiz') as { kind: 'quiz'; items: Array<{ answer: number }> } | undefined
    return qb ? qb.items.map((i) => i.answer).join('') : 'none'
  })
  console.log(`  Z quiz keys: ${keys.join(' | ')}`)
  z('Z23 quiz keys are the pinned six, pairwise distinct', JSON.stringify(keys) === JSON.stringify(['13021', '02132', '20310', '31203', '10231', '03120']) && new Set(keys).size === 6, keys.join(','))
  z('Z24 the six lesson ids are unique', new Set(ids).size === 6)
  return { id: 'Z', pass, fail }
}

/* ================================================================== */
/* runner                                                              */
/* ================================================================== */
async function main(): Promise<void> {
  const results: SectionResult[] = [
    await sectionGeo301(),
    await sectionGeo302(),
    await sectionGeo303(),
    await sectionGeo304(),
    await sectionGeo305(),
    await sectionGeo306(),
    await sectionZ(),
  ]
  console.log('')
  console.log('================ verify-book5-ch03: verdict ================')
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
  console.log('RESULT: ALL GREEN — chapter 3 CLOSED COMPLETE (6/6 lessons).')
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
    for i, vfile in enumerate([f"v-geo30{n}.ts" for n in range(1, 7)]):
        v = READ(os.path.join(WIP, vfile))
        v = re.sub(r"^import \{ countLessonWords \} from '\.\./\.\./\.\./src/data/library/types'\n", "", v, flags=re.M)
        v = re.sub(r"^import type \{ Lesson \} from '\.\./\.\./\.\./src/data/library/types'\n", "", v, flags=re.M)
        v = re.sub(r"^export \{\}\n", "", v, flags=re.M)
        v = v.replace(f"mod = await import('./part-geo30{i + 1}')",
                      f"mod = await Promise.resolve({{ {LESSONS[i]} }})")
        cut = v.find("/* ------------------------------------------------------------------ */\n/* bottom harness")
        if cut < 0:
            cut = v.find("/* bottom harness")
        assert cut > 0, f"{vfile}: harness cut not found"
        v = v[:cut]
        sections.append(wrap_section(v, f"sectionGeo30{i + 1}", LESSONS[i]))
    out = VER_HEAD + "".join(sections) + VER_TAIL
    WRITE(VER, out)
    print(f"JOB 2: wrote {VER} ({len(out.splitlines())} lines)")


def job3_swap_book() -> None:
    b = READ(BOOK)
    if "from './ch-03'" in b:
        print("JOB 3: book.ts already carries chapter3 (idempotent re-run)")
        return
    # add the import after the chapter2 import
    assert "import { chapter2 } from './ch-02'" in b, "chapter2 import line not found"
    b = b.replace("import { chapter2 } from './ch-02'",
                  "import { chapter2 } from './ch-02'\nimport { chapter3 } from './ch-03'")
    # swap the planned ch.3 object for the shipped chapter3
    m = re.search(r"  \{\n    number: 3,\n.*?\n  \},\n(?=  \{\n    number: 4,)", b, flags=re.S)
    assert m, "planned chapter-3 object not found in book.ts"
    b = b[: m.start()] + "  chapter3,\n" + b[m.end():]
    # refresh the STATUS comment
    m2 = re.search(r" \* STATUS: IN-PROGRESS \(run 127, 2026-11-26.*?\n(?: \*.*\n)*", b)
    assert m2, "run-127 STATUS comment not found in book.ts"
    new = (
        " * STATUS: IN-PROGRESS (run 129, 2026-11-27 — chapters 1, 2 AND 3 CLOSED\n"
        " * COMPLETE: ch.3 'Triangles: Congruence and the Craft of Proof' shipped\n"
        " * all six lessons — 3.1 (run 128), 3.2-3.6 (the run-129 swarm: 3.3/3.4\n"
        " * first-wave seats, 302/305/306 continuation seats after the transcript\n"
        " * wall); ch.4 'Similarity and Proportion' rides the next fire).\n"
    )
    b = b[: m2.start()] + new + b[m2.end():]
    WRITE(BOOK, b)
    print(f"JOB 3: swapped {BOOK} to chapter3 + refreshed STATUS (chapter 3 CLOSED COMPLETE)")


if __name__ == "__main__":
    job1_build_ch03()
    job2_build_verifier()
    job3_swap_book()
    # amendment 7: touch generated files before gating (same-mtime stale transpiles)
    for p in (CH03, VER, BOOK):
        os.utime(p, None)
    time.sleep(1)
    print("assemble_run129: done (files touched per amendment 7)")
