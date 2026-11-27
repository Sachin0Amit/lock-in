#!/usr/bin/env python3
"""assemble_run131.py — the RUN 131 assembler for the LockIn Library repo.

CLOSES GEOMETRY (book #5 of the mathematics shelf) chapter 5 'Transformations
and Symmetry: the Rigid-Motion Idea' COMPLETE: builds ch-05.ts from the FOUR
wip parts (all landed whole by the run-131 swarm in ONE wave — geo501 84/84,
geo502 92/92, geo503 84/84, geo504 96/96), sets the chapter tail to status
'complete' with plannedLessons [], rebuilds scripts/verify-book5-ch05.ts (the
four v-geo50X harnesses wrapped whole as async sections re-reading the SHIPPED
chapter + Z: the CLOSED census — 4 lessons, ids/numbers/titles verbatim,
floors >= 8000, quiz keys pairwise distinct), and swaps book.ts's planned
ch.5 object for the shipped chapter5.

  JOB 1  build src/.../geometry/ch-05.ts   (four lessons + chapter export)
  JOB 2  build scripts/verify-book5-ch05.ts
  JOB 3  swap book.ts chapter5 + refresh STATUS comment

Run:  cd /home/z/my-project && python3 scripts/assemble_run131.py
"""

import os
import re
import time

ROOT = "/home/z/my-project"
GEO = os.path.join(ROOT, "src/data/library/books/mathematics/geometry")
WIP = os.path.join(ROOT, "docs/research/geo-ch05-wip")
CH05 = os.path.join(GEO, "ch-05.ts")
BOOK = os.path.join(GEO, "book.ts")
VER = os.path.join(ROOT, "scripts/verify-book5-ch05.ts")

READ = lambda p: open(p, encoding="utf-8").read()
WRITE = lambda p, s: open(p, "w", encoding="utf-8").write(s)

PARTS = [f"part-geo50{n}.ts" for n in range(1, 5)]
LESSONS = [f"lessonGeo50{n}" for n in range(1, 5)]


def strip_import(text: str) -> str:
    return re.sub(
        r"^import type \{ Lesson \} from '\.\./\.\./\.\./src/data/library/types'\n",
        "",
        text,
        flags=re.M,
    )


CHAPTER_HEAD = """import type { Chapter, Lesson } from '../../../types'

/**
 * Geometry — chapter 5 "Transformations and Symmetry: the Rigid-Motion
 * Idea" (CLOSED COMPLETE by RUN 131, 2026-11-28 — the maths lane,
 * whole-chapter cadence, v9.2 protocol).
 *
 * The four seats, ALL LANDED WHOLE in one first-wave launch: 5.1 'The
 * Rigid Motions: Slides, Flips and Turns' (geo501 84/84 — 38 engine + 46
 * pins, 10,089 words); 5.2 'Composing Transformations and the Isometry
 * Idea' (geo502 92/92 — 46 + 46, 10,668 words; the engine caught that a
 * slide PERPENDICULAR to the mirror collapses to a pure reflection — the
 * lesson teaches the collapse honestly before building the true glide);
 * 5.3 'Line and Rotational Symmetry' (geo503 84/84 — 37 + 47, 12,303
 * words; the engine proved the spec's "scalene" census triangle was
 * secretly isosceles with a sweep-invisible mirror and replaced it with
 * an honest scalene witness); 5.4 'Dilations, Scale Factors and Similarity
 * Re-Read' (geo504 96/96 — 49 + 47, 11,178 words). The master pin set:
 * scripts/pin_check_geo131.py 81/81 (eight first-draft catches fixed
 * in-engine, including the external/internal similitude-centre k-signs).
 *
 * PROVENANCE: ground = the run-131 reference-scan-first pass (v9.2
 * amendment 9): the Common Core HSG-CO standards (thecorestandards.org,
 * G-CO.2-9 fetched verbatim), Illustrative Mathematics Geometry Unit 1
 * 'Constructions and Rigid Transformations' (the transformation-first
 * curriculum's rigid-motion definition), the NCERT class-7 'Symmetry'
 * chapter structure (web-grounded), the sibling geometry chapters 3-4
 * (the congruence criteria and similarity re-read as invariances) — every
 * source in docs/project/SOURCE_LOG.md under the run-131 block.
 * STUDY-NEVER-REPRODUCE absolute: every roster, witness, figure,
 * Illustration, quiz item and exercise below is OUR OWN, engine-pinned in
 * scripts/verify-book5-ch05.ts (which re-runs the verify-first harnesses
 * against THIS file and closes with the CLOSED chapter census).
 */
"""


def chapter_tail() -> str:
    lessons = ", ".join(LESSONS)
    return (
        "\nexport const chapter5: Chapter = {\n"
        "  number: 5,\n"
        "  slug: 'transformations-and-symmetry',\n"
        "  title: 'Transformations and Symmetry: the Rigid-Motion Idea',\n"
        "  summary:\n"
        "    'Congruence and similarity earn their machine definitions: translations, reflections and rotations written as functions of the plane \\u2014 the rigid motions \\u2014 their compositions read as the isometry idea, line and rotational symmetry found as the fixed sets of those motions, and dilations as the scale engines that re-derive similarity. The Common Core\\u2019s transformation-first route and NCERT\\u2019s symmetry chapters are both honoured: SAS/ASA/SSS are re-read as invariances under motion, and the ground is laid for the homothety reading of centres of similitude in the circle chapter and for the shifting of axes in Coordinate Geometry.',\n"
        "  status: 'complete',\n"
        f"  lessons: [{lessons}],\n"
        "  plannedLessons: [],\n"
        "}\n"
    )


def job1_build_ch05() -> None:
    chunks = []
    for i, part in enumerate(PARTS):
        text = strip_import(READ(os.path.join(WIP, part)))
        assert f"export const {LESSONS[i]}" in text, f"{part}: export {LESSONS[i]} missing"
        assert "import type" not in text, f"{part}: import line survived the strip"
        banner = (
            f"/* ================================================================== */\n"
            f"/* lesson 5.{i + 1} — from docs/research/geo-ch05-wip/{part}            */\n"
            f"/* ================================================================== */\n"
        )
        chunks.append(banner + text.strip("\n") + "\n")
    out = CHAPTER_HEAD + "\n".join(chunks) + chapter_tail()
    WRITE(CH05, out)
    print(f"JOB 1: wrote {CH05} ({len(out.splitlines())} lines)")


VER_HEAD = """import { chapter5, lessonGeo501, lessonGeo502, lessonGeo503, lessonGeo504 } from '../src/data/library/books/mathematics/geometry/ch-05'
import { geometry } from '../src/data/library/books/mathematics/geometry/book'
import { countLessonWords, type Lesson } from '../src/data/library/types'
import { existsSync, readFileSync } from 'node:fs'

export {}

/**
 * verify-book5-ch05.ts — the chapter verifier for GEOMETRY (book #5),
 * chapter 5 "Transformations and Symmetry: the Rigid-Motion Idea"
 * (CLOSED COMPLETE by RUN 131, 2026-11-28 — 4 lessons). VERIFY-FIRST per
 * the standing protocol: each lesson's ENGINE section ran green BEFORE its
 * prose was declared done — by its authoring agent against its part file —
 * and the PIN sections here RE-READ THE SHIPPED CHAPTER (the part imports
 * redirected to ch-05.ts).
 *
 *   (geo501) 5.1 engines + pins      (geo502) 5.2 engines + pins
 *   (geo503) 5.3 engines + pins      (geo504) 5.4 engines + pins
 *   (Z)      the CLOSED chapter census — the honest 4-of-4 shape
 *
 * Assembled by scripts/assemble_run131.py (on the assemble_run129.py
 * pattern): each v-file wrapped whole as one async section (its local
 * collectors/helpers stay function-scoped); the only edits are the
 * documented import redirects and the verdict-block swaps.
 */

type SectionResult = { id: string; pass: number; fail: number }

const CH05_SRC = new URL('../src/data/library/books/mathematics/geometry/ch-05.ts', import.meta.url).pathname

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
  z('Z01 chapter number is 5', chapter5.number === 5)
  z('Z02 chapter slug', chapter5.slug === 'transformations-and-symmetry', chapter5.slug)
  z('Z03 chapter status complete', chapter5.status === 'complete', chapter5.status)
  z('Z04 four lessons shipped', chapter5.lessons.length === 4, String(chapter5.lessons.length))
  z('Z05 plannedLessons is empty (nothing outstanding)', (chapter5.plannedLessons ?? []).length === 0, JSON.stringify(chapter5.plannedLessons ?? []))
  const ids = chapter5.lessons.map((l) => l.id)
  z('Z06 lesson ids in teaching order', JSON.stringify(ids) === JSON.stringify(['geo-rigid-motions-slides-flips-and-turns', 'geo-composing-transformations-and-the-isometry-idea', 'geo-line-and-rotational-symmetry', 'geo-dilations-scale-factors-and-similarity-re-read']), ids.join(','))
  z('Z07 lesson numbers 5.1..5.4', JSON.stringify(chapter5.lessons.map((l) => l.number)) === JSON.stringify(['5.1', '5.2', '5.3', '5.4']), chapter5.lessons.map((l) => l.number).join(','))
  z('Z08 lesson titles exact (the planned census honoured)', JSON.stringify(chapter5.lessons.map((l) => l.title)) === JSON.stringify(['The Rigid Motions: Slides, Flips and Turns', 'Composing Transformations and the Isometry Idea', 'Line and Rotational Symmetry', 'Dilations, Scale Factors and Similarity Re-Read']), chapter5.lessons.map((l) => l.title).join(' | '))
  const wcs = chapter5.lessons.map((l) => countLessonWords(l))
  console.log(`  Z word counts: ${wcs.join(', ')}`)
  z('Z09 word floors (>= 8000 each)', wcs.every((w) => w >= 8000), wcs.join(', '))
  for (const [i, l] of chapter5.lessons.entries()) {
    z(`Z10.${i + 1} quiz block present`, l.blocks.some((b) => b.kind === 'quiz'))
    z(`Z11.${i + 1} exercises block present`, l.blocks.some((b) => b.kind === 'exercises'))
    z(`Z12.${i + 1} terms + formula cards present`, l.blocks.some((b) => b.kind === 'terms') && l.blocks.some((b) => b.kind === 'formula'))
  }
  const expectedPrereqs: string[][] = [
    ['geo-congruence-the-idea-of-same-shape-and-size', 'fm-angles-and-their-measurement', 'al-the-coordinate-plane-and-linear-graphs'],
    ['geo-rigid-motions-slides-flips-and-turns', 'geo-the-congruence-criteria-sas-asa-aas-sss-rhs'],
    ['geo-rigid-motions-slides-flips-and-turns', 'geo-composing-transformations-and-the-isometry-idea'],
    ['geo-rigid-motions-slides-flips-and-turns', 'geo-composing-transformations-and-the-isometry-idea', 'geo-similar-figures-same-shape-at-any-scale', 'geo-the-basic-proportionality-theorem-thales', 'geo-the-similarity-criteria-aa-sas-sss', 'geo-pythagoras-proved-the-theorem-earned'],
  ]
  for (const [i, l] of chapter5.lessons.entries()) {
    z(`Z13.${i + 1} prerequisites exact (the teaching chain)`, JSON.stringify(l.prerequisites ?? []) === JSON.stringify(expectedPrereqs[i]), JSON.stringify(l.prerequisites ?? []))
  }
  z('Z14 the shipped source exists', existsSync(CH05_SRC))
  const shippedText = readFileSync(CH05_SRC, 'utf8')
  z('Z15 the shipped source exports all four lessons', ['lessonGeo501', 'lessonGeo502', 'lessonGeo503', 'lessonGeo504'].every((n) => shippedText.includes(`export const ${n}`)))

  // ---- the book census (the honest closed-chapter shape) ----
  z('Z16 book status in-progress (7 chapters remain)', geometry.status === 'in-progress', geometry.status)
  z('Z17 twelve chapters planned', geometry.chapters.length === 12, String(geometry.chapters.length))
  z('Z18 chapters 1-5 complete', geometry.chapters.slice(0, 5).every((c) => c.status === 'complete'), geometry.chapters.slice(0, 5).map((c) => c.status).join('/'))
  z('Z19 chapters 6-12 still planned', geometry.chapters.slice(5).every((c) => c.status === 'planned'))
  z('Z20 the geo- prefix in use', ids.every((id) => id.startsWith('geo-')))
  z('Z21 every lesson carries a real body', chapter5.lessons.every((l) => l.blocks.length >= 10))
  const chapterWords = chapter5.lessons.reduce((m, l) => m + countLessonWords(l), 0)
  console.log(`  Z shipped chapter word count: ${chapterWords}`)
  z('Z22 the shipped body is non-trivial (> 35,000 words)', chapterWords > 35000, String(chapterWords))
  const keys = chapter5.lessons.map((l) => {
    const qb = l.blocks.find((b) => b.kind === 'quiz') as { kind: 'quiz'; items: Array<{ answer: number }> } | undefined
    return qb ? qb.items.map((i) => i.answer).join('') : 'none'
  })
  console.log(`  Z quiz keys: ${keys.join(' | ')}`)
  z('Z23 quiz keys are the pinned four, pairwise distinct', JSON.stringify(keys) === JSON.stringify(['30412', '14203', '41032', '03241']) && new Set(keys).size === 4, keys.join(','))
  z('Z24 the four lesson ids are unique', new Set(ids).size === 4)
  return { id: 'Z', pass, fail }
}

/* ================================================================== */
/* runner                                                              */
/* ================================================================== */
async function main(): Promise<void> {
  const results: SectionResult[] = [
    await sectionGeo501(),
    await sectionGeo502(),
    await sectionGeo503(),
    await sectionGeo504(),
    await sectionZ(),
  ]
  console.log('')
  console.log('================ verify-book5-ch05: verdict ================')
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
  console.log('RESULT: ALL GREEN — chapter 5 CLOSED COMPLETE (4/4 lessons).')
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
    for i, vfile in enumerate([f"v-geo50{n}.ts" for n in range(1, 5)]):
        v = READ(os.path.join(WIP, vfile))
        v = re.sub(r"^import \{ countLessonWords \} from '\.\./\.\./\.\./src/data/library/types'\n", "", v, flags=re.M)
        v = re.sub(r"^import type \{ Lesson \} from '\.\./\.\./\.\./src/data/library/types'\n", "", v, flags=re.M)
        v = v.replace(f"mod = await import('./part-geo50{i + 1}')",
                      f"mod = await Promise.resolve({{ {LESSONS[i]} }})")
        # the staged-seat guard checks the part file relative to import.meta.url;
        # in the wrapper that is scripts/ — redirect the guard onto the SHIPPED
        # chapter source (the run-130 seam fix), so the pins always run.
        v = v.replace(f"existsSync(new URL('./part-geo50{i + 1}.ts', import.meta.url))",
                      "existsSync(CH05_SRC)")
        # the seats carry a SECOND import block mid-file (above the pins);
        # inside a wrapped function those are illegal — strip every remaining
        # import/export-{} line from the section body (the wrapper's header
        # already imports countLessonWords/Lesson/existsSync/node:fs at top).
        v = re.sub(r"^import (type )?\{[^}]*\} from '[^']*'\n", "", v, flags=re.M)
        v = re.sub(r"^export \{\}\n", "", v, flags=re.M)
        cut = v.find("/* ------------------------------------------------------------------ */\n/* bottom harness")
        if cut < 0:
            cut = v.find("/* bottom harness")
        assert cut > 0, f"{vfile}: harness cut not found"
        v = v[:cut]
        sections.append(wrap_section(v, f"sectionGeo50{i + 1}", LESSONS[i]))
    out = VER_HEAD + "".join(sections) + VER_TAIL
    WRITE(VER, out)
    print(f"JOB 2: wrote {VER} ({len(out.splitlines())} lines)")


def job3_swap_book() -> None:
    b = READ(BOOK)
    if "from './ch-05'" in b:
        print("JOB 3: book.ts already carries chapter5 (idempotent re-run)")
        return
    # add the import after the chapter4 import
    assert "import { chapter4 } from './ch-04'" in b, "chapter4 import line not found"
    b = b.replace("import { chapter4 } from './ch-04'",
                  "import { chapter4 } from './ch-04'\nimport { chapter5 } from './ch-05'")
    # swap the planned ch.5 object for the shipped chapter5
    m = re.search(r"  \{\n    number: 5,\n.*?\n  \},\n(?=  \{\n    number: 6,)", b, flags=re.S)
    assert m, "planned chapter-5 object not found in book.ts"
    b = b[: m.start()] + "  chapter5,\n" + b[m.end():]
    # refresh the STATUS comment
    m2 = re.search(r" \* STATUS: IN-PROGRESS \(run 130, 2026-11-27.*?\n(?: \*.*\n)*", b)
    assert m2, "run-130 STATUS comment not found in book.ts"
    new = (
        " * STATUS: IN-PROGRESS (run 131, 2026-11-28 — chapters 1-5 CLOSED\n"
        " * COMPLETE: ch.5 'Transformations and Symmetry: the Rigid-Motion Idea'\n"
        " * shipped all four lessons by the run-131 first-wave swarm — 5.1\n"
        " * 'The Rigid Motions: Slides, Flips and Turns', 5.2 'Composing\n"
        " * Transformations and the Isometry Idea', 5.3 'Line and Rotational\n"
        " * Symmetry', 5.4 'Dilations, Scale Factors and Similarity Re-Read' —\n"
        " * every seat landed engine-green on the run-131 master pin set\n"
        " * (scripts/pin_check_geo131.py 81/81); ch.6 'Quadrilaterals and\n"
        " * Polygons' rides the next fire).\n"
        " */\n"
    )
    b = b[: m2.start()] + new + b[m2.end():]
    WRITE(BOOK, b)
    print(f"JOB 3: swapped {BOOK} to chapter5 + refreshed STATUS (chapter 5 CLOSED COMPLETE)")


if __name__ == "__main__":
    job1_build_ch05()
    job2_build_verifier()
    job3_swap_book()
    # amendment 7: touch generated files before gating (same-mtime stale transpiles)
    for p in (CH05, VER, BOOK):
        os.utime(p, None)
    time.sleep(1)
    print("assemble_run131: done (files touched per amendment 7)")
