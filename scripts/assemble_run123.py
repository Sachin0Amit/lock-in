#!/usr/bin/env python3
"""assemble_run123.py — the RUN 123 assembler for the LockIn Library repo.

Closes Advanced Algebra (book #4) chapter 10 'The Synthesis and the
Doorstep' from the five verified part files (10.1 finished, 10.2 authored,
10.3 + 10.R prose completed this run; 10.3/10.4 delivered by run 122 and
preserved in docs/research/aa-ch10-wip/), and SHIPS THE BOOK COMPLETE.

  JOB 1  build src/.../ch-10.ts       (five lessons + chapter export; the only
                                       mechanical renames are the per-part
                                       palette consts C->c101/c102/c10R and
                                       FONT->f101/f102/f10R so the single
                                       file's top-level consts never collide;
                                       aa103's SYN and aa104's inlined hexes
                                       are already unique)
  JOB 2  build scripts/verify-book4-ch10.ts
                                      (the five v-files wrapped whole as
                                       async sections — engines re-run, pins
                                       re-reading the SHIPPED chapter via the
                                       redirected imports — plus section Z:
                                       the closed-chapter AND closed-BOOK
                                       census, the honest 67-lesson count)
  JOB 3  swap book.ts                 (chapter10 import replaces the planned
                                       inline object; STATUS comment to TEN
                                       chapters; book status 'complete')

Run:  cd /home/z/my-project && python3 scripts/assemble_run123.py
"""

import os
import re

ROOT = "/home/z/my-project"
AA = os.path.join(ROOT, "src/data/library/books/mathematics/advanced-algebra")
TR = os.path.join(ROOT, "temporary-references")
CH10 = os.path.join(AA, "ch-10.ts")
BOOK = os.path.join(AA, "book.ts")
VER = os.path.join(ROOT, "scripts/verify-book4-ch10.ts")

READ = lambda p: open(p, encoding="utf-8").read()
WRITE = lambda p, s: open(p, "w", encoding="utf-8").write(s)

C_PROPS = [
    "struct", "ink", "mid", "teal", "tealInk", "conn", "accent", "warn",
    "panelA", "panelB", "faint", "white",
]


def strip_import(text: str) -> str:
    """Remove the part-file Lesson import (any position)."""
    return re.sub(
        r"^import type \{ Lesson \} from '\.\./src/data/library/types'\n",
        "",
        text,
        flags=re.M,
    )


def rename_palette(text: str, tag: str) -> tuple[str, int]:
    """Rename `const C` -> `const c<tag>` and `const FONT` -> `const f<tag>`,
    replacing ONLY the exact `C.<prop>` property reads (prose `C(50,25)`
    is never touched) and the whole-word FONT."""
    n = 0
    text = text.replace(f"const C = {{", f"const c{tag} = {{")
    n += 1
    for p in C_PROPS:
        old, new = f"C.{p}", f"c{tag}.{p}"
        n += text.count(old)
        text = text.replace(old, new)
    text = re.sub(r"\bFONT\b", f"f{tag}", text)
    return text, n


# ---------------------------------------------------------------- JOB 1

CHAPTER_HEAD = """import type { Chapter, Lesson } from '../../../types'

/**
 * Advanced Algebra — chapter 10 "The Synthesis and the Doorstep"
 * (OPENED by the RUN 122 WHOLE-CHAPTER SWARM, which the platform's
 * subagent-deadline wall cut short with the chapter NOT closed — its landed
 * work PRESERVED in docs/research/aa-ch10-wip/ — and CLOSED COMPLETE by the
 * RUN 123 RESUMPTION SWARM, per the owner's 2026-11-25 directive "finish
 * advanced algebra book first": 10.3 and 10.4 were delivered whole by run
 * 122 (203/203 and 213/213 green); run 123 restored the preservation,
 * re-ran the 117/117 pre-flight pin checker, FINISHED 10.1 (the exercises
 * block, the quiz-key fix, the qquad strip — 119/119 green, 6,020 words),
 * AUTHORED 10.2 whole from its spec (78 engine + 33 pin = 111/111 green,
 * 6,108 words) and COMPLETED the 10.R review prose + pin section
 * (235 engine + 32 pin = 267/267 green, 5,062 words); the orchestrator
 * assembled, gated and shipped the closed chapter AND the closed book).
 *
 * PROVENANCE: ground = the sanctioned internet fallback web-ground
 * (`cengage-jee-style` presentation contract, `jee-main-2026-syllabus`
 * arc) + Hall & Knight's *Higher Algebra* (`hall-knight-higher-algebra`,
 * banked run 66) for the competition-craft and functional-equation depth
 * stretches. STUDY-NEVER-REPRODUCE absolute: every roster, witness,
 * figure, Illustration, quiz item and exercise below is OUR OWN,
 * engine-pinned in scripts/verify-book4-ch10.ts (which re-runs all five
 * verify-first harnesses against THIS file and closes with the
 * closed-chapter + closed-BOOK census).
 */
"""

LESSON_BANNERS = {
    "aa101": "// ------------------------------------------------------------------\n"
             "// lesson 10.1 — run 122 (preserved) + run 123 (finished): the\n"
             "// exercises block, the quiz-key fix and the qquad strip landed here\n"
             "// ------------------------------------------------------------------\n",
    "aa102": "// ------------------------------------------------------------------\n"
             "// lesson 10.2 — run 123 (authored whole from the run-122 spec)\n"
             "// ------------------------------------------------------------------\n",
    "aa103": "// ------------------------------------------------------------------\n"
             "// lesson 10.3 — run 122 (delivered whole, integrated verbatim)\n"
             "// ------------------------------------------------------------------\n",
    "aa104": "// ------------------------------------------------------------------\n"
             "// lesson 10.4 — run 122 (delivered whole, integrated verbatim)\n"
             "// ------------------------------------------------------------------\n",
    "aa10R": "// ------------------------------------------------------------------\n"
             "// lesson 10.R — run 122 (engines) + run 123 (prose + pins)\n"
             "// ------------------------------------------------------------------\n",
}

CHAPTER_TAIL = """

export const chapter10: Chapter = {
  number: 10,
  slug: 'the-synthesis-and-the-doorstep',
  title: 'The Synthesis and the Doorstep',
  summary:
    'The closing synthesis, in the house manner. First the competition craft across all the new families — the substitution game on quadratics and symmetric reads, AM–GM maxima under constraints, series sums priced by difference and telescoping, binomial term hunts, log speed reads — the advanced sequel to AL 11.2. Then functional equations: functions built by rule instead of formula — additive value ladders climbed from one seed to every rational, constant cleanups, the quadratic regeneration of the Gauss sum, the product-rule census of the exponential and logarithm families, and the iteration cycles of involutions and Möbius machines. Then the book in one page: the honest map of what was built and what was only opened, the cross-references made good, the formula family gathered. And then the doorstep itself: the infinite tail’s limit met again, the changing output measured discretely along the new families, continuity named as a promise — the handoff to Calculus, with Coordinate Geometry (graphs reunited) and Trigonometry (the next family) named as the neighbouring doors. The unit review closes the book: one table, four one-move re-derivations, six cross-lesson audit chains, a seventeen-witness mixed bench, and the coda that reads the four-door handoff and the sixty-seven-lesson census sentence.',
  status: 'complete',
  lessons: [lesson101, lesson102, lesson103, lesson104, lesson10R],
  plannedLessons: [],
}
"""


def job1_build_ch10() -> None:
    parts = []
    for key, fname, tag in [
        ("aa101", "part-aa101.ts", "101"),
        ("aa102", "part-aa102.ts", "102"),
        ("aa103", "part-aa103.ts", None),
        ("aa104", "part-aa104.ts", None),
        ("aa10R", "part-aa10R.ts", "10R"),
    ]:
        text = READ(os.path.join(TR, fname))
        text = strip_import(text)
        if tag:
            text, n = rename_palette(text, tag)
            print(f"   {fname}: palette renamed ({n} property reads)")
        parts.append(LESSON_BANNERS[key] + text.strip("\n") + "\n")
    out = (
        CHAPTER_HEAD
        + "\n".join(parts)
        + CHAPTER_TAIL
    )
    WRITE(CH10, out)
    print(f"JOB 1: wrote {CH10} ({len(out.splitlines())} lines)")


# ---------------------------------------------------------------- JOB 2

VER_HEAD = """import { chapter10, lesson101, lesson102, lesson103, lesson104, lesson10R } from '../src/data/library/books/mathematics/advanced-algebra/ch-10'
import { advancedAlgebra } from '../src/data/library/books/mathematics/advanced-algebra/book'
import { countLessonWords, type Lesson } from '../src/data/library/types'
import { existsSync, readFileSync } from 'node:fs'

export {}

/**
 * verify-book4-ch10.ts — the whole-chapter AND whole-BOOK verifier for
 * Advanced Algebra (book #4), chapter 10 "The Synthesis and the Doorstep"
 * — the chapter that CLOSES THE BOOK (run 122 opened and preserved; run
 * 123 finished 10.1, authored 10.2, completed the 10.R prose, assembled
 * and shipped). VERIFY-FIRST per the standing protocol: each lesson's
 * ENGINE section ran green BEFORE its prose was declared done — by the
 * authoring agent against its part file — and the PIN sections here
 * RE-READ THE SHIPPED CHAPTER (the part imports redirected to ch-10.ts).
 *
 *   (aa101) 10.1 engines + pins    (aa102) 10.2 engines + pins
 *   (aa103) 10.3 engines + pins    (aa104) 10.4 engines + pins
 *   (aa10R) 10.R engines + pins    (Z) the closed-chapter + closed-BOOK
 *                                   census — the honest 67-lesson count
 *
 * Assembled by scripts/assemble_run123.py: each v-file wrapped whole as
 * one async section (its local collectors/helpers stay function-scoped,
 * so nothing collides); the only edits are the documented import
 * redirects and the verdict-block swaps.
 */

type SectionResult = { id: string; pass: number; fail: number }

const CH10_SRC = new URL('../src/data/library/books/mathematics/advanced-algebra/ch-10.ts', import.meta.url).pathname

"""

VER_TAIL = """
/* ================================================================== */
/* SECTION Z — the closed-chapter + closed-BOOK census                 */
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
  console.log('== SECTION Z: the closed-chapter + closed-BOOK census ==')
  z('Z01 chapter number is 10', chapter10.number === 10)
  z('Z02 chapter slug', chapter10.slug === 'the-synthesis-and-the-doorstep', chapter10.slug)
  z('Z03 chapter status complete', chapter10.status === 'complete', chapter10.status)
  z('Z04 five lessons', chapter10.lessons.length === 5, String(chapter10.lessons.length))
  z('Z05 plannedLessons empty', (chapter10.plannedLessons ?? []).length === 0)
  const ids = chapter10.lessons.map((l) => l.id)
  z('Z06 lesson ids in teaching order', JSON.stringify(ids) === JSON.stringify(['aa-competition-algebra-the-advanced-craft', 'aa-functional-equations-building-functions-from-rules', 'aa-the-book-in-one-page-synthesis', 'aa-the-doorstep-limits-and-the-changing-output', 'aa-the-synthesis-and-the-doorstep-unit-10-review']), ids.join(','))
  const nums = chapter10.lessons.map((l) => l.number)
  z('Z07 lesson numbers 10.1..10.R', JSON.stringify(nums) === JSON.stringify(['10.1', '10.2', '10.3', '10.4', '10.R']), nums.join(','))
  const wcs = chapter10.lessons.map((l) => countLessonWords(l))
  console.log(`  Z word counts: ${wcs.join(', ')}`)
  z('Z08 word floors (10.1-10.4 >= 6000; 10.R >= 5000)', wcs[0] >= 6000 && wcs[1] >= 6000 && wcs[2] >= 6000 && wcs[3] >= 6000 && wcs[4] >= 5000, wcs.join(', '))
  for (const [i, l] of chapter10.lessons.entries()) {
    z(`Z09.${i + 1} quiz block present`, l.blocks.some((b) => b.kind === 'quiz'))
    z(`Z10.${i + 1} exercises block present`, l.blocks.some((b) => b.kind === 'exercises'))
    z(`Z11.${i + 1} terms + formula cards present`, l.blocks.some((b) => b.kind === 'terms') && l.blocks.some((b) => b.kind === 'formula'))
  }
  z('Z12 the shipped source exists', existsSync(CH10_SRC))
  const shippedText = readFileSync(CH10_SRC, 'utf8')
  z('Z13 the shipped source exports all five lessons', ['lesson101', 'lesson102', 'lesson103', 'lesson104', 'lesson10R'].every((n) => shippedText.includes(`export const ${n}`)))

  // ---- the closed-BOOK census ----
  z('Z14 book status complete', advancedAlgebra.status === 'complete', advancedAlgebra.status)
  z('Z15 ten chapters', advancedAlgebra.chapters.length === 10, String(advancedAlgebra.chapters.length))
  z('Z16 every chapter complete', advancedAlgebra.chapters.every((c) => c.status === 'complete'))
  z('Z17 no planned lessons remain anywhere', advancedAlgebra.chapters.every((c) => (c.plannedLessons ?? []).length === 0))
  const total = advancedAlgebra.chapters.reduce((n, c) => n + c.lessons.length, 0)
  console.log(`  Z per-chapter lesson counts: ${advancedAlgebra.chapters.map((c) => `${c.number}:${c.lessons.length}`).join('  ')}`)
  z('Z18 the honest census: 67 written lessons (62 banked + 5)', total === 67, String(total))
  z('Z19 every lesson carries a real body', advancedAlgebra.chapters.every((c) => c.lessons.every((l) => l.blocks.length >= 10)))
  z('Z20 book id', advancedAlgebra.id === 'advanced-algebra')
  const bookWords = advancedAlgebra.chapters.reduce((n, c) => n + c.lessons.reduce((m, l) => m + countLessonWords(l), 0), 0)
  console.log(`  Z whole-book word count: ${bookWords}`)
  z('Z21 the book body is non-trivial (> 350,000 words)', bookWords > 350000, String(bookWords))
  return { id: 'Z', pass, fail }
}

/* ================================================================== */
/* runner                                                              */
/* ================================================================== */
async function main(): Promise<void> {
  const results: SectionResult[] = [
    await sectionAA101(),
    await sectionAA102(),
    await sectionAA103(),
    await sectionAA104(),
    await sectionAA10R(),
    await sectionZ(),
  ]
  console.log('')
  console.log('================ verify-book4-ch10: verdict ================')
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
  console.log('RESULT: ALL GREEN — chapter 10 closed, the BOOK closed at 67 lessons.')
}

main()
"""


def wrap_section(body: str, fn_name: str, tail: str) -> str:
    return f"async function {fn_name}(): Promise<SectionResult> {{\n{body}\n{tail}\n}}\n\n"


def job2_build_verifier() -> None:
    # ---- aa101 ----
    v = READ(os.path.join(TR, "v-aa101.ts"))
    v = re.sub(r"^import \{ countLessonWords \} from '\.\./src/data/library/types'\n", "", v, flags=re.M)
    v = re.sub(r"^import type \{ Lesson \} from '\.\./src/data/library/types'\n", "", v, flags=re.M)
    v = v.replace("mod = await import('./part-aa101')", "mod = await Promise.resolve({ lesson101 })")
    cut = v.find("/* ------------------------------------------------------------------ */\n/* bottom harness")
    assert cut > 0, "aa101 harness cut not found"
    v = v[:cut]
    s101 = wrap_section(
        v,
        "sectionAA101",
        "  await runPins()\n  const ep = engine.filter((c) => c.ok).length\n  const pp = pins.filter((c) => c.ok).length\n  return { id: 'aa101 (10.1 engines+pins)', pass: ep + pp, fail: engine.length - ep + pins.length - pp }",
    )

    # ---- aa102 ----
    v = READ(os.path.join(TR, "v-aa102.ts"))
    v = re.sub(r"^import \{ countLessonWords \} from '\.\./src/data/library/types'\n", "", v, flags=re.M)
    v = re.sub(r"^import type \{ Lesson \} from '\.\./src/data/library/types'\n", "", v, flags=re.M)
    v = v.replace("mod = await import('./part-aa102')", "mod = await Promise.resolve({ lesson102 })")
    cut = v.find("/* ------------------------------------------------------------------ */\n/* bottom harness")
    assert cut > 0, "aa102 harness cut not found"
    v = v[:cut]
    s102 = wrap_section(
        v,
        "sectionAA102",
        "  await runPins()\n  const ep = engine.filter((c) => c.ok).length\n  const pp = pins.filter((c) => c.ok).length\n  return { id: 'aa102 (10.2 engines+pins)', pass: ep + pp, fail: engine.length - ep + pins.length - pp }",
    )

    # ---- aa103 ----
    v = READ(os.path.join(TR, "v-aa103.ts"))
    v = v.replace("import { existsSync, readFileSync } from 'node:fs'\n", "")
    v = v.replace(
        "const partPath = new URL('./part-aa103.ts', import.meta.url).pathname",
        "const partPath = CH10_SRC",
    )
    # the local destructures would shadow (TDZ) the top-level imports — drop them
    v = v.replace("  const { lesson103 } = await import('./part-aa103')\n", "")
    v = v.replace("  const { countLessonWords } = await import('../src/data/library/types')\n", "")
    cut = v.find("/* ---- verdict")
    assert cut > 0, "aa103 verdict cut not found"
    v = v[:cut]
    s103 = wrap_section(
        v,
        "sectionAA103",
        "  return { id: 'aa103 (10.3 engines+pins)', pass: enginePass + pinPass, fail: engineFail + pinFail }",
    )

    # ---- aa104 ----
    v = READ(os.path.join(TR, "v-aa104.ts"))
    v = v.replace("import { lesson104 } from './part-aa104'\n", "")
    v = v.replace("import { countLessonWords } from '../src/data/library/types'\n", "")
    cut = v.find("/* ---- verdict")
    assert cut > 0, "aa104 verdict cut not found"
    v = v[:cut]
    s104 = wrap_section(
        v,
        "sectionAA104",
        "  return { id: 'aa104 (10.4 engines+pins)', pass: passCount + pinPass, fail: fails.length + pinFails.length }",
    )

    # ---- aa10R ----
    v = READ(os.path.join(TR, "v-aa10R.ts"))
    v = v.replace("\nexport {}\n", "\n", 1)  # module marker only needed standalone
    v = v.replace(
        "const pinMod = (await import('./part-aa10R')) as { lesson10R?: PinLesson }",
        "const pinMod = (await Promise.resolve({ lesson10R })) as { lesson10R?: PinLesson }",
    )
    v = v.replace(
        "const pinTypes = await import('../src/data/library/types')",
        "const pinTypes = await Promise.resolve({ countLessonWords })",
    )
    marker = "console.log(`TOTAL (engine + pins): ${pass}/${total} checks green`)"
    cut = v.find(marker)
    assert cut > 0, "aa10R verdict cut not found"
    # back up to the preceding console.log('') line
    cut2 = v.rfind("console.log('')", 0, cut)
    v = v[:cut2]
    s10r = wrap_section(
        v,
        "sectionAA10R",
        "  return { id: 'aa10R (10.R engines+pins)', pass, fail: fails.length }",
    )

    out = VER_HEAD + s101 + s102 + s103 + s104 + s10r + VER_TAIL
    WRITE(VER, out)
    print(f"JOB 2: wrote {VER} ({len(out.splitlines())} lines)")


# ---------------------------------------------------------------- JOB 3

def job3_swap_book() -> None:
    src = READ(BOOK)
    if "import { chapter10 } from './ch-10'" in src and re.search(r"chapter10,\s*\n\s*\]", src):
        print("JOB 3: book.ts already swapped — skipped (idempotent re-run)")
        return
    assert "import { chapter09 } from './ch-09'" in src
    src = src.replace(
        "import { chapter09 } from './ch-09'",
        "import { chapter09 } from './ch-09'\nimport { chapter10 } from './ch-10'",
    )
    # replace the inline planned chapter-10 object with the import
    start = src.find("  {\n    number: 10,\n    slug: 'the-synthesis-and-the-doorstep',")
    assert start > 0, "planned chapter-10 object not found"
    end = src.find("  },\n]", start)
    assert end > 0, "chapter-10 object end not found"
    src = src[:start] + "  chapter10,\n" + src[end + len("  },"):]
    # STATUS comment: nine -> ten, book complete
    old_status = " * STATUS: IN-PROGRESS — NINE chapters COMPLETE (chapters 1–9"
    assert old_status in src, "old STATUS anchor not found"
    new_status = (
        " * STATUS: COMPLETE — TEN chapters, the book CLOSED at SIXTY-SEVEN\n"
        " * written lessons (chapters 1–9 as banked; chapter 10 'The Synthesis\n"
        " * and the Doorstep' OPENED by the run-122 swarm (10.3 + 10.4 delivered\n"
        " * whole; 10.1 engines + partial prose; 10.2 + 10.R specs; the platform's\n"
        " * subagent-deadline wall deferred the close with everything preserved in\n"
        " * docs/research/aa-ch10-wip/) and CLOSED COMPLETE by the RUN 123\n"
        " * resumption under the owner's 2026-11-25 directive \"finish advanced\n"
        " * algebra book first\" — 10.1 finished (119/119), 10.2 authored whole\n"
        " * (111/111), the 10.R prose + pins completed (267/267), the honest\n"
        " * census 62 banked + 5 = 67 lessons, every number re-pinned in\n"
        " * scripts/verify-book4-ch10.ts). Previously: chapters 1–9"
    )
    src = src.replace(old_status, new_status)
    src = src.replace("  status: 'in-progress',\n  accent: ['#be123c', '#881337'],", "  status: 'complete',\n  accent: ['#be123c', '#881337'],")
    WRITE(BOOK, src)
    print("JOB 3: book.ts swapped (chapter10 imported, STATUS -> TEN chapters, book status complete)")


if __name__ == "__main__":
    job1_build_ch10()
    job2_build_verifier()
    job3_swap_book()
    print("ASSEMBLY DONE — now run: bun run scripts/verify-book4-ch10.ts")
