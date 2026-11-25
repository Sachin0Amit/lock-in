#!/usr/bin/env python3
"""assemble_cs8.py — CS RUN 8 assembler (the chapter CLOSE).

CLOSES Computer Fundamentals chapter 4 'Inside the Box' COMPLETE: the two
seats that landed whole and green this fire (4.1 'The Motherboard: the
City Plan' 117/117 + 4.2 'The Processor Named Honestly' 83/83) join the
three RUN 7 seats already shipped; all five assemble into the chapter in
teaching order, plannedLessons empties, status flips complete; the
verifier grows to five sections + the CLOSED Z census; book.ts STATUS
refreshes. Shelf gate csWritten 20 -> 22; totPl stays 1226 — the
pointer predicted 1227 but the closed-chapter arithmetic nets ZERO
(2 planned slots become 2 written lessons; the 4.R review was already
counted in RUN 7) — the gate pins the TRUE value and the WORKLOG records
the correction. Exam-coverage census pin likewise stays 1226.

Run:  cd /home/z/my-project && python3 scripts/assemble_cs8.py
"""

import os
import re

ROOT = "/home/z/my-project"
CF = os.path.join(ROOT, "src/data/library/books/computer-science/computer-fundamentals")
WIP = os.path.join(ROOT, "docs/research/cf-ch04-wip")
CH04 = os.path.join(CF, "ch-04.ts")
BOOK = os.path.join(CF, "book.ts")
VER = os.path.join(ROOT, "scripts/verify-cs-book2-ch04.ts")
SHELF = os.path.join(ROOT, "scripts/verify-cs-shelf-planning.ts")
EXAM = os.path.join(ROOT, "scripts/verify-cs-exam-coverage.ts")

READ = lambda p: open(p, encoding="utf-8").read()
WRITE = lambda p, s: open(p, "w", encoding="utf-8").write(s)

# (part file, tag, lesson export, engine file, verdict tag) — teaching order
SEATS = [
    ("part-cf41.ts", "41", "lesson41", "v-cf41.ts", "41"),
    ("part-cf42.ts", "42", "lesson42", "v-cf42.ts", "42"),
    ("part-cf43.ts", "43", "lesson43", "v-cf43.ts", "43"),
    ("part-cf44.ts", "44", "lesson44", "v-cf44.ts", "44"),
    ("part-cf4R.ts", "4R", "lesson4R", "v-cf4R.ts", "4R"),
]


def strip_imports(text: str) -> str:
    text = re.sub(r"^import[^\n]*\n", "", text, flags=re.M)
    text = re.sub(r"^export \{\}\n", "", text, flags=re.M)
    return text


def rename_palette(text: str, tag: str) -> tuple:
    n = 0
    text = text.replace("const C = {", f"const c{tag} = {{")
    n += 1
    n += len(re.findall(r"\bC\.", text))
    text = re.sub(r"\bC\.", f"c{tag}.", text)
    text = re.sub(r"\bFONT\b", f"f{tag}", text)
    return text, n


CHAPTER_HEAD = """import type { Chapter, Lesson } from '../../../types'

/**
 * Computer Fundamentals — chapter 4 "Inside the Box" (CLOSED COMPLETE
 * by the CS RUN 8 swarm, 2026-11-26, under the whole-chapter cadence).
 * The honest shape across the two fires: RUN 7 shipped 4.3 'The First
 * Memory Hierarchy' (128/128), 4.4 'Buses and Ports: How the Pieces
 * Talk' (83/83) and the 4.R 'Unit 4 Completion Review' (84/84) whole
 * under the time-budget law; RUN 8 shipped the two deferred seats —
 * 4.1 'The Motherboard: the City Plan' (117/117) and 4.2 'The
 * Processor Named Honestly' (83/83) — and closed the census: five
 * lessons, plannedLessons empty, chapter COMPLETE.
 *
 * PROVENANCE: ground = the sanctioned internet fallback (the Drive
 * holds no Computer Fundamentals source — the standing honest note in
 * docs/research/CS_TOC_SURVEY.md): the 2026-11-25 web-verified pins
 * (ATX 1995; Mini-ITX VIA 2001; the 0.800000 microATX ratio; Nehalem
 * 2008; Dennard 1966/patent 3,387,286 1968; RAMAC 14 September 1956;
 * 4004 15 November 1971; Moore 19 April 1965; the May 2005 dual-core
 * month; USB/HDMI/SATA/PCIe censuses; the Dean latency ladder) banked
 * under citation key `cs-cf-web-ground-ch04`,
 * docs/project/SOURCE_LOG.md. STUDY-NEVER-REPRODUCE absolute: every
 * roster, witness, figure, Illustration, quiz item and exercise below
 * is OUR OWN, engine-pinned in scripts/verify-cs-book2-ch04.ts (which
 * re-runs the five verify-first harnesses against THIS file and closes
 * with the closed-chapter census).
 */
"""

CHAPTER_TAIL = """

export const chapter4: Chapter = {
  number: 4,
  slug: 'inside-the-box',
  title: 'Inside the Box',
  summary:
    'The motherboard as a city plan, the processor named honestly (cores, clock, cache — the vocabulary without the architecture theory), the first memory hierarchy (RAM, ROM, the storage ladder from registers to the cloud), and how the pieces talk: buses and ports at the first-meeting level; Computer Organization and Architecture takes the theory door.',
  status: 'complete',
  lessons: [
    lesson41, lesson42, lesson43, lesson44, lesson4R,
  ],
  plannedLessons: [],
}
"""


def job1_build_ch04() -> None:
    parts = []
    for fname, tag, _lexp, _vf, _vt in SEATS:
        text = READ(os.path.join(WIP, fname))
        text = strip_imports(text)
        text, n = rename_palette(text, tag)
        print(f"   {fname}: palette renamed ({n} property reads)")
        parts.append(text.strip("\n") + "\n")
    out = CHAPTER_HEAD + "\n".join(parts) + CHAPTER_TAIL
    WRITE(CH04, out)
    print(f"JOB 1: wrote {CH04} ({len(out.splitlines())} lines)")


VER_HEAD = """import {
  chapter4, lesson41, lesson42, lesson43, lesson44, lesson4R,
  lesson41 as shippedLesson41, lesson42 as shippedLesson42,
  lesson43 as shippedLesson43, lesson44 as shippedLesson44,
  lesson4R as shippedLesson4R,
} from '../src/data/library/books/computer-science/computer-fundamentals/ch-04'
import { computerFundamentals } from '../src/data/library/books/computer-science/computer-fundamentals/book'
import { countLessonWords, type Lesson, type Block, type QuizItem, type ExerciseSet, type SolutionFigure } from '../src/data/library/types'
import { existsSync, readFileSync } from 'node:fs'

export {}

/**
 * verify-cs-book2-ch04.ts — the chapter verifier for Computer
 * Fundamentals (the CS shelf's book #1), chapter 4 "Inside the Box"
 * (CS RUN 7 OPENED it IN-PROGRESS 2026-11-25 with three of five seats;
 * CS RUN 8 CLOSED it COMPLETE 2026-11-26 shipping 4.1 + 4.2 and the
 * closed census). VERIFY-FIRST per the standing protocol: each shipped
 * lesson's ENGINE ran green BEFORE its prose was declared done — by the
 * authoring agent against its part file — and the PIN sections here
 * RE-READ THE SHIPPED CHAPTER (the part imports redirected to ch-04.ts).
 *
 *   (cf41) 4.1 engines + pins    (cf42) 4.2 engines + pins
 *   (cf43) 4.3 engines + pins    (cf44) 4.4 engines + pins
 *   (cf4R) 4.R engines + pins
 *   (Z)    the CLOSED chapter census — the honest 5 + 0 shape
 *
 * Assembled by scripts/assemble_cs8.py: each v-file wrapped whole as
 * one async section (its local collectors/helpers stay
 * function-scoped, so nothing collides); the only edits are the
 * documented import redirects and the verdict-block swaps.
 */

type SectionResult = { id: string; pass: number; fail: number }

const CH04_SRC = new URL('../src/data/library/books/computer-science/computer-fundamentals/ch-04.ts', import.meta.url).pathname

"""

VER_TAIL = """
/* ================================================================== */
/* SECTION Z — the CLOSED chapter census                                */
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
  z('Z01 chapter number is 4', chapter4.number === 4)
  z('Z02 chapter slug', chapter4.slug === 'inside-the-box', chapter4.slug)
  z('Z03 chapter title pinned', chapter4.title === 'Inside the Box', chapter4.title)
  z('Z04 chapter status COMPLETE (CS RUN 8 closed it)', chapter4.status === 'complete', chapter4.status)
  z('Z05 five lessons shipped (4.1 + 4.2 + 4.3 + 4.4 + the 4.R review)', chapter4.lessons.length === 5, String(chapter4.lessons.length))
  z('Z06 no lessons left planned (the chapter is closed)', JSON.stringify(chapter4.plannedLessons ?? []) === JSON.stringify([]), JSON.stringify(chapter4.plannedLessons ?? []))
  const ids = chapter4.lessons.map((l) => l.id)
  z('Z07 lesson ids in teaching order', JSON.stringify(ids) === JSON.stringify(['cf-the-motherboard-the-city-plan', 'cf-the-processor-named-honestly', 'cf-the-first-memory-hierarchy', 'cf-buses-and-ports-how-the-pieces-talk', 'cf-unit-4-completion-review']), ids.join(','))
  const nums = chapter4.lessons.map((l) => l.number)
  z('Z08 lesson numbers 4.1, 4.2, 4.3, 4.4, 4.R', JSON.stringify(nums) === JSON.stringify(['4.1', '4.2', '4.3', '4.4', '4.R']), nums.join(','))
  z('Z08b titles pinned verbatim (the planned-lesson contract)', chapter4.lessons[0].title === 'The Motherboard: the City Plan' && chapter4.lessons[1].title === 'The Processor Named Honestly' && chapter4.lessons[2].title === 'The First Memory Hierarchy' && chapter4.lessons[3].title === 'Buses and Ports: How the Pieces Talk' && chapter4.lessons[4].title === 'Unit 4 Completion Review', chapter4.lessons.map((l) => l.title).join(' | '))
  const wcs = chapter4.lessons.map((l) => countLessonWords(l))
  console.log(`  Z word counts: ${wcs.join(', ')}`)
  z('Z09 word floors (>= 6000 content; >= 5200 review)', wcs.slice(0, 4).every((w) => w >= 6000) && wcs[4] >= 5200, wcs.join(', '))
  for (const [i, l] of chapter4.lessons.entries()) {
    z(`Z10.${i + 1} quiz block present (5 items)`, l.blocks.some((b) => b.kind === 'quiz' && (b as { items: unknown[] }).items.length === 5))
    z(`Z11.${i + 1} exercises block present (15 questions)`, l.blocks.some((b) => b.kind === 'exercises' && (b as { sets: { questions: unknown[] }[] }).sets.reduce((n, s) => n + s.questions.length, 0) === 15))
    z(`Z11b.${i + 1} v9.0 solution figures present`, l.blocks.some((b) => b.kind === 'exercises' && (b as { sets: { questions: { figures?: unknown[] }[] }[] }).sets.some((s) => s.questions.some((q) => (q.figures ?? []).length > 0))))
    z(`Z11c.${i + 1} >= 3 body figures (vivid-palette law)`, l.blocks.filter((b) => b.kind === 'figure').length >= 3)
    z(`Z12.${i + 1} terms + formula cards present`, l.blocks.some((b) => b.kind === 'terms') && l.blocks.some((b) => b.kind === 'formula'))
  }
  z('Z13 the prereq chain pins (4.1 <- ch.1; 4.2 <- 4.1; 4.3 <- 4.2; 4.4 <- 4.1+4.3; 4.R <- the four ch.4 ids)', JSON.stringify(chapter4.lessons[0].prerequisites) === JSON.stringify(['cf-the-basic-structure-and-operation-of-the-computer']) && JSON.stringify(chapter4.lessons[1].prerequisites) === JSON.stringify(['cf-the-motherboard-the-city-plan']) && JSON.stringify(chapter4.lessons[2].prerequisites) === JSON.stringify(['cf-the-processor-named-honestly']) && JSON.stringify(chapter4.lessons[3].prerequisites) === JSON.stringify(['cf-the-motherboard-the-city-plan', 'cf-the-first-memory-hierarchy']) && JSON.stringify(chapter4.lessons[4].prerequisites) === JSON.stringify(['cf-the-motherboard-the-city-plan', 'cf-the-processor-named-honestly', 'cf-the-first-memory-hierarchy', 'cf-buses-and-ports-how-the-pieces-talk']), JSON.stringify(chapter4.lessons.map((l) => l.prerequisites)))
  z('Z13b every lesson carries sources (cs-cf-web-ground-ch04)', chapter4.lessons.every((l) => (l.sources ?? []).includes('cs-cf-web-ground-ch04')))
  z('Z14 the shipped source exists', existsSync(CH04_SRC))
  const shippedText = readFileSync(CH04_SRC, 'utf8')
  z('Z15 the shipped source exports all five lessons', ['lesson41', 'lesson42', 'lesson43', 'lesson44', 'lesson4R'].every((n) => shippedText.includes(`export const ${n}`)))

  // ---- the book census (the honest closed shape) ----
  z('Z16 book status in-progress (chapters 5-8 still owed)', computerFundamentals.status === 'in-progress', computerFundamentals.status)
  z('Z17 eight chapters on the book map', computerFundamentals.chapters.length === 8, String(computerFundamentals.chapters.length))
  z('Z18 chapters 1 + 2 + 3 complete', computerFundamentals.chapters[0].status === 'complete' && computerFundamentals.chapters[1].status === 'complete' && computerFundamentals.chapters[2].status === 'complete', computerFundamentals.chapters.slice(0, 3).map((c) => c.status).join(','))
  z('Z19 chapter 4 COMPLETE, chapters 5-8 planned', computerFundamentals.chapters[3].status === 'complete' && computerFundamentals.chapters.slice(4).every((c) => c.status === 'planned'), computerFundamentals.chapters.map((c) => c.status).join(','))
  z('Z20 the cf- prefix in use', ids.every((id) => id.startsWith('cf-')))
  z('Z21 every lesson carries a real body', chapter4.lessons.every((l) => l.blocks.length >= 40))
  const bookWords = chapter4.lessons.reduce((m, l) => m + countLessonWords(l), 0)
  console.log(`  Z shipped chapter word count: ${bookWords}`)
  z('Z22 the shipped body is non-trivial (> 45,000 words)', bookWords > 45000, String(bookWords))
  const csWritten = computerFundamentals.chapters.reduce((n, c) => n + c.lessons.length, 0)
  z('Z23 the shelf census grows to 22 written lessons (20 + 4.1 + 4.2)', csWritten === 22, String(csWritten))
  return { id: 'Z', pass, fail }
}

/* ================================================================== */
/* runner                                                              */
/* ================================================================== */
async function main(): Promise<void> {
  const results: SectionResult[] = [
    await sectionCf41(),
    await sectionCf42(),
    await sectionCf43(),
    await sectionCf44(),
    await sectionCf4R(),
    await sectionZ(),
  ]
  console.log('')
  console.log('============= verify-cs-book2-ch04: verdict =============')
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
  console.log('RESULT: ALL GREEN — chapter 4 CLOSED COMPLETE (five seats shipped whole across RUN 7 + RUN 8; the book rides on to chapter 5).')
}

main()
"""


def wrap_section(body: str, fn_name: str, section_id: str) -> str:
    return (
        "async function " + fn_name + "(): Promise<SectionResult> {\n"
        + body
        + "  return { id: '" + section_id + "', pass: P, fail: F }\n"
        + "}\n\n"
    )


def job2_build_verifier() -> None:
    sections = []
    for _fname, tag, lexp, vfile, vtag in SEATS:
        v = READ(os.path.join(WIP, vfile))
        v = re.sub(r"^import[^\n]*\n", "", v, flags=re.M)
        v = re.sub(r"^export \{\}\n", "", v, flags=re.M)
        # engines that audit their part SOURCE via Bun.file resolve relative to
        # the wrapped verifier's scripts/ dir — redirect to the wip directory
        v = v.replace(
            "import.meta.dir + '/part-cf",
            "import.meta.dir + '/../docs/research/cf-ch04-wip/part-cf",
        )
        # the dynamic part import redirects to the shipped chapter
        v = v.replace(
            "const mod = await import('./part-cf" + tag + "')",
            "const mod = await Promise.resolve({ " + lexp + ": shippedLesson" + vtag + " })",
        )
        assert (
            "import('./part-cf" + tag not in v
            and "from './part-cf" + tag not in v
        ), f"unredirected part import left in section {tag}"
        # cut the verdict tail (from the final V-CFxx console.log onward)
        m = re.search(r"^console\.log\(`V-CF" + vtag + r":.*$", v, flags=re.M)
        assert m, f"{vfile} verdict line not found"
        v = v[: m.start()]
        sections.append(wrap_section(v, "sectionCf" + tag, "cf" + vtag + " engines+pins"))
    out = VER_HEAD + "\n".join(sections) + VER_TAIL
    WRITE(VER, out)
    print(f"JOB 2: wrote {VER} ({len(out.splitlines())} lines)")


def job3_refresh_book() -> None:
    b = READ(BOOK)
    assert "import { chapter4 } from './ch-04'" in b, "book.ts chapter4 import missing — unexpected state"
    assert "\n  chapter4,\n" in b, "book.ts chapter4 entry missing — unexpected state"
    old_status = re.search(r" \* STATUS: IN-PROGRESS.*?(?= \*/)", b, flags=re.S)
    assert old_status, "STATUS comment not found"
    new_status = """ * STATUS: IN-PROGRESS — chapter 1 COMPLETE (4 written lessons: 1.1 +
 * 1.2 by the CS RUN 1 SWARM, 1.3 + the 1.R unit completion review by
 * the CS RUN 2 SWARM), chapter 2 COMPLETE (2.1 'Input Devices: the
 * Human Handshake' + 2.2 'Output Devices: Screens, Printers and
 * Sound' by the CS RUN 3 SWARM, 2026-11-23; 2.3 'Interacting Well:
 * the First Usability Instincts' + the 2.R 'Unit 2 Completion Review'
 * by the CS RUN 4 SWARM, 2026-11-24 — the whole-chapter cadence, the
 * chapter closed COMPLETE in one fire), chapter 3 COMPLETE (3.2 +
 * 3.6 + 3.7 by the CS RUN 5 SWARM, 3.1 + 3.3 + 3.4 + 3.5 + 3.8 + the
 * 3.R review by the CS RUN 6 SWARM, 2026-11-25 — engines green before
 * prose in every seat), chapter 4 COMPLETE (CS RUN 7, 2026-11-25:
 * 4.3 'The First Memory Hierarchy' + 4.4 'Buses and Ports: How the
 * Pieces Talk' + the 4.R review shipped whole under the time-budget
 * law; CS RUN 8, 2026-11-26: 4.1 'The Motherboard: the City Plan' +
 * 4.2 'The Processor Named Honestly' shipped whole and the chapter
 * CLOSED — five lessons, plannedLessons empty), chapters 5-8 planned
 * (the remaining 15 planned lessons)."""
    b = b[: old_status.start()] + new_status + b[old_status.end():]
    WRITE(BOOK, b)
    print("JOB 3: book.ts STATUS refreshed (chapter 4 COMPLETE)")


def job4_amend_shelf_gate() -> None:
    s = READ(SHELF)
    old_pin = re.search(r"ok\(csWritten === 20,[^\n]*\n", s)
    assert old_pin, "csWritten 20 pin not found in shelf gate"
    new_pin = ("ok(csWritten === 22, 'exactly 22 written lessons in the CS shelf "
               "(CS RUN 1..8: computer-fundamentals chapters 1, 2, 3 and 4 COMPLETE "
               "(4 + 4 + 9 + 5 written) — chapter 4 closed by CS RUN 8 shipping "
               "4.1 + 4.2 alongside the RUN 7 seats 4.3 + 4.4 + the 4.R review — the "
               "pin grows with the cs lane')\n")
    s = s[: old_pin.start()] + new_pin + s[old_pin.end():]
    # totPl stays 1226: closing ch.4 nets ZERO (2 planned slots -> 2 written
    # lessons; the 4.R review was already counted in RUN 7). The RUN 7 pointer
    # predicted 1227 — an arithmetic slip, corrected here and logged in WORKLOG.
    m = re.search(r"ok\(totPl === 1226,[^\n]*\n", s)
    assert m, "totPl 1226 pin not found"
    new_tot = ("ok(totPl === 1226, `shelf total planned lessons + reviews (got ${totPl})`) "
               "// 1222 planned + the cf ch.1 1.R, ch.2 2.R, ch.3 3.R and ch.4 4.R unit reviews; "
               "CS RUN 8 closing ch.4 nets ZERO (2 planned slots became 2 written lessons — "
               "the RUN 7 pointer's 1227 prediction was an arithmetic slip, corrected 2026-11-26)\n")
    s = s[: m.start()] + new_tot + s[m.end():]
    WRITE(SHELF, s)
    print("JOB 4: shelf gate pins grown csWritten 20 -> 22; totPl stays 1226 (net-zero close, pointer slip corrected)")


def job5_amend_exam_gate() -> None:
    e = READ(EXAM)
    m = re.search(r"ok\(totPl === 1226,[^\n]*\n", e)
    assert m, "exam-coverage census pin 1226 not found"
    new_pin = ("ok(totPl === 1226, `CS shelf census 1,226 lessons (got ${totPl})`) "
               "// unchanged by the CS RUN 8 ch.4 close (2 planned slots became 2 written "
               "lessons — net zero; the 4.R review was already counted in CS RUN 7)\n")
    e = e[: m.start()] + new_pin + e[m.end():]
    WRITE(EXAM, e)
    print("JOB 5: exam-coverage census pin held at 1226 (net-zero close)")


if __name__ == "__main__":
    job1_build_ch04()
    job2_build_verifier()
    job3_refresh_book()
    job4_amend_shelf_gate()
    job5_amend_exam_gate()
    print("ASSEMBLY COMPLETE")
