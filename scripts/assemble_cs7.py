#!/usr/bin/env python3
"""assemble_cs7.py — CS RUN 7 assembler (time-budget close, the run-5 shape).

OPENS Computer Fundamentals chapter 4 'Inside the Box' IN-PROGRESS: the
three seats that landed whole and green this fire (4.3 + 4.4 + the 4.R
review at 128/83/84 engine green) are assembled into the shipped
chapter; the two deferred seats (4.1 'The Motherboard: the City Plan',
4.2 'The Processor Named Honestly' — 4.2's engine landed 46/47, its
part deferred) stay PLANNED verbatim and ride CS RUN 8 per the
time-budget law. Verifier grown to three sections + the in-progress Z
census; book.ts swapped; shelf gate csWritten 17 -> 20 + totPl
1225 -> 1226 (the 4.R review is the +1; the two deferred titles keep
their planned slots); exam-coverage census pin 1225 -> 1226.

Run:  cd /home/z/my-project && python3 scripts/assemble_cs7.py
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

# (part file, tag, lesson export, engine file, verdict tag)
SEATS = [
    ("part-cf43.ts", "43", "lesson43", "v-cf43.ts", "43"),
    ("part-cf44.ts", "44", "lesson44", "v-cf44.ts", "44"),
    ("part-cf4R.ts", "4R", "lesson4R", "v-cf4R.ts", "4R"),
]

PLANNED = ["The Motherboard: the City Plan", "The Processor Named Honestly"]


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
 * Computer Fundamentals — chapter 4 "Inside the Box" (OPENED
 * IN-PROGRESS by the CS RUN 7 swarm, 2026-11-25, under the
 * whole-chapter cadence AND the time-budget law). The honest shape:
 * the five-seat swarm (four planned lessons + the 4.R review) hit the
 * platform's subagent-deadline wall in three rounds — three seats
 * landed WHOLE and engine-green (4.3 'The First Memory Hierarchy'
 * 128/128 via the round-2 salvage agent, 4.4 'Buses and Ports: How
 * the Pieces Talk' 83/83, the 4.R 'Unit 4 Completion Review' 84/84)
 * and are assembled here; 4.1 'The Motherboard: the City Plan' and
 * 4.2 'The Processor Named Honestly' are preserved PLANNED (4.2's
 * engine landed 46/47 in docs/research/cf-ch04-wip/) and ride CS RUN 8
 * per the time-budget law — never thinned, never half-gated.
 *
 * PROVENANCE: ground = the sanctioned internet fallback (the Drive
 * holds no Computer Fundamentals source — the standing honest note in
 * docs/research/CS_TOC_SURVEY.md): the 2026-11-25 web-verified pins
 * (ATX 1995; Mini-ITX VIA 2001; Dennard 1966/patent 3,387,286 1968;
 * RAMAC 14 September 1956; 4004 15 November 1971; Moore 19 April
 * 1965; the May 2005 dual-core month; USB/HDMI/SATA/PCIe censuses;
 * the Dean latency ladder) banked under citation key
 * `cs-cf-web-ground-ch04`, docs/project/SOURCE_LOG.md.
 * STUDY-NEVER-REPRODUCE absolute: every roster, witness, figure,
 * Illustration, quiz item and exercise below is OUR OWN, engine-pinned
 * in scripts/verify-cs-book2-ch04.ts (which re-runs the three
 * verify-first harnesses against THIS file and closes with the
 * in-progress chapter census).
 */
"""

CHAPTER_TAIL = """

export const chapter4: Chapter = {
  number: 4,
  slug: 'inside-the-box',
  title: 'Inside the Box',
  summary:
    'The motherboard as a city plan, the processor named honestly (cores, clock, cache — the vocabulary without the architecture theory), the first memory hierarchy (RAM, ROM, the storage ladder from registers to the cloud), and how the pieces talk: buses and ports at the first-meeting level; Computer Organization and Architecture takes the theory door.',
  status: 'in-progress',
  lessons: [
    lesson43, lesson44, lesson4R,
  ],
  plannedLessons: ['The Motherboard: the City Plan', 'The Processor Named Honestly'],
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
  chapter4, lesson43, lesson44, lesson4R,
} from '../src/data/library/books/computer-science/computer-fundamentals/ch-04'
import { computerFundamentals } from '../src/data/library/books/computer-science/computer-fundamentals/book'
import { countLessonWords, type Lesson } from '../src/data/library/types'
import { existsSync, readFileSync } from 'node:fs'

export {}

/**
 * verify-cs-book2-ch04.ts — the chapter verifier for Computer
 * Fundamentals (the CS shelf's book #1), chapter 4 "Inside the Box"
 * (CS RUN 7 OPENED it IN-PROGRESS, 2026-11-25, under the whole-chapter
 * cadence and the time-budget law: three of five seats shipped whole,
 * two deferred to CS RUN 8 with their wip preserved TRACKED).
 * VERIFY-FIRST per the standing protocol: each shipped lesson's ENGINE
 * ran green BEFORE its prose was declared done — by the authoring
 * agent against its part file — and the PIN sections here RE-READ THE
 * SHIPPED CHAPTER (the part imports redirected to ch-04.ts).
 *
 *   (cf43) 4.3 engines + pins    (cf44) 4.4 engines + pins
 *   (cf4R) 4.R engines + pins
 *   (Z)    the in-progress chapter census — the honest 3 + 2 shape
 *
 * Assembled by scripts/assemble_cs7.py: each v-file wrapped whole as
 * one async section (its local collectors/helpers stay
 * function-scoped, so nothing collides); the only edits are the
 * documented import redirects and the verdict-block swaps.
 */

type SectionResult = { id: string; pass: number; fail: number }

const CH04_SRC = new URL('../src/data/library/books/computer-science/computer-fundamentals/ch-04.ts', import.meta.url).pathname

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
  z('Z01 chapter number is 4', chapter4.number === 4)
  z('Z02 chapter slug', chapter4.slug === 'inside-the-box', chapter4.slug)
  z('Z03 chapter title pinned', chapter4.title === 'Inside the Box', chapter4.title)
  z('Z04 chapter status IN-PROGRESS (CS RUN 7 opened it)', chapter4.status === 'in-progress', chapter4.status)
  z('Z05 three lessons shipped (4.3 + 4.4 + the 4.R review)', chapter4.lessons.length === 3, String(chapter4.lessons.length))
  z('Z06 two lessons still planned (4.1 + 4.2, titles verbatim)', JSON.stringify(chapter4.plannedLessons ?? []) === JSON.stringify(['The Motherboard: the City Plan', 'The Processor Named Honestly']), JSON.stringify(chapter4.plannedLessons ?? []))
  const ids = chapter4.lessons.map((l) => l.id)
  z('Z07 lesson ids in teaching order', JSON.stringify(ids) === JSON.stringify(['cf-the-first-memory-hierarchy', 'cf-buses-and-ports-how-the-pieces-talk', 'cf-unit-4-completion-review']), ids.join(','))
  const nums = chapter4.lessons.map((l) => l.number)
  z('Z08 lesson numbers 4.3, 4.4, 4.R', JSON.stringify(nums) === JSON.stringify(['4.3', '4.4', '4.R']), nums.join(','))
  z('Z08b titles pinned verbatim (the planned-lesson contract)', chapter4.lessons[0].title === 'The First Memory Hierarchy' && chapter4.lessons[1].title === 'Buses and Ports: How the Pieces Talk' && chapter4.lessons[2].title === 'Unit 4 Completion Review', chapter4.lessons.map((l) => l.title).join(' | '))
  const wcs = chapter4.lessons.map((l) => countLessonWords(l))
  console.log(`  Z word counts: ${wcs.join(', ')}`)
  z('Z09 word floors (>= 6000 content; >= 5200 review)', wcs.slice(0, 2).every((w) => w >= 6000) && wcs[2] >= 5200, wcs.join(', '))
  for (const [i, l] of chapter4.lessons.entries()) {
    z(`Z10.${i + 1} quiz block present (5 items)`, l.blocks.some((b) => b.kind === 'quiz' && (b as { items: unknown[] }).items.length === 5))
    z(`Z11.${i + 1} exercises block present (15 questions)`, l.blocks.some((b) => b.kind === 'exercises' && (b as { sets: { questions: unknown[] }[] }).sets.reduce((n, s) => n + s.questions.length, 0) === 15))
    z(`Z11b.${i + 1} v9.0 solution figures present`, l.blocks.some((b) => b.kind === 'exercises' && (b as { sets: { questions: { figures?: unknown[] }[] }[] }).sets.some((s) => s.questions.some((q) => (q.figures ?? []).length > 0))))
    z(`Z11c.${i + 1} >= 3 body figures (vivid-palette law)`, l.blocks.filter((b) => b.kind === 'figure').length >= 3)
    z(`Z12.${i + 1} terms + formula cards present`, l.blocks.some((b) => b.kind === 'terms') && l.blocks.some((b) => b.kind === 'formula'))
  }
  const prereq40 = ['cf-the-motherboard-the-city-plan', 'cf-the-first-memory-hierarchy']
  z('Z13 the prereq chain pins (4.3 <- 4.2 written; 4.4 <- 4.1+4.3 with 4.1 unwritten; 4.R <- the four ch.4 ids)', JSON.stringify(chapter4.lessons[0].prerequisites) === JSON.stringify(['cf-the-processor-named-honestly']) && JSON.stringify(chapter4.lessons[1].prerequisites) === JSON.stringify(prereq40) && JSON.stringify(chapter4.lessons[2].prerequisites) === JSON.stringify(['cf-the-motherboard-the-city-plan', 'cf-the-processor-named-honestly', 'cf-the-first-memory-hierarchy', 'cf-buses-and-ports-how-the-pieces-talk']), JSON.stringify(chapter4.lessons.map((l) => l.prerequisites)))
  z('Z13b every lesson carries sources (cs-cf-web-ground-ch04)', chapter4.lessons.every((l) => (l.sources ?? []).includes('cs-cf-web-ground-ch04')))
  z('Z14 the shipped source exists', existsSync(CH04_SRC))
  const shippedText = readFileSync(CH04_SRC, 'utf8')
  z('Z15 the shipped source exports all three lessons', ['lesson43', 'lesson44', 'lesson4R'].every((n) => shippedText.includes(`export const ${n}`)))

  // ---- the book census (the honest in-progress shape) ----
  z('Z16 book status in-progress (chapter 4 open)', computerFundamentals.status === 'in-progress', computerFundamentals.status)
  z('Z17 eight chapters on the book map', computerFundamentals.chapters.length === 8, String(computerFundamentals.chapters.length))
  z('Z18 chapters 1 + 2 + 3 complete', computerFundamentals.chapters[0].status === 'complete' && computerFundamentals.chapters[1].status === 'complete' && computerFundamentals.chapters[2].status === 'complete', computerFundamentals.chapters.slice(0, 3).map((c) => c.status).join(','))
  z('Z19 chapter 4 in-progress, chapters 5-8 planned', computerFundamentals.chapters[3].status === 'in-progress' && computerFundamentals.chapters.slice(4).every((c) => c.status === 'planned'), computerFundamentals.chapters.map((c) => c.status).join(','))
  z('Z20 the cf- prefix in use', ids.every((id) => id.startsWith('cf-')))
  z('Z21 every lesson carries a real body', chapter4.lessons.every((l) => l.blocks.length >= 40))
  const bookWords = chapter4.lessons.reduce((m, l) => m + countLessonWords(l), 0)
  console.log(`  Z shipped chapter word count: ${bookWords}`)
  z('Z22 the shipped body is non-trivial (> 24,000 words)', bookWords > 24000, String(bookWords))
  const csWritten = computerFundamentals.chapters.reduce((n, c) => n + c.lessons.length, 0)
  z('Z23 the shelf census grows to 20 written lessons (17 + 3)', csWritten === 20, String(csWritten))
  return { id: 'Z', pass, fail }
}

/* ================================================================== */
/* runner                                                              */
/* ================================================================== */
async function main(): Promise<void> {
  const results: SectionResult[] = [
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
  console.log('RESULT: ALL GREEN — chapter 4 OPENED IN-PROGRESS (three seats shipped whole; 4.1 + 4.2 ride CS RUN 8 per the time-budget law).')
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
        # (v-cf43 uses `const mod = await import('./part-cf43')`; the
        # static-import engines (cf44/cf4R) need nothing — their
        # stripped imports fall through to the verifier's top-level ones)
        v = v.replace(
            "const mod = await import('./part-cf" + tag + "')",
            "const mod = await Promise.resolve({ " + lexp + " })",
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
    if "import { chapter3 } from './ch-03'" not in b:
        raise SystemExit("book.ts chapter3 import missing — unexpected state")
    if "import { chapter4 } from './ch-04'" not in b:
        b = b.replace(
            "import { chapter3 } from './ch-03'",
            "import { chapter3 } from './ch-03'\nimport { chapter4 } from './ch-04'",
        )
    while b.count("  chapter4,\n  chapter4,\n") > 0:
        b = b.replace("  chapter4,\n  chapter4,\n", "  chapter4,\n")
    if "  chapter4," not in b:
        b = b.replace("  chapter3,\n", "  chapter3,\n  chapter4,\n")
    # the chapter 4 entry: planned object -> in-progress with the 3 shipped seats
    m = re.search(r"  \{\n    number: 4,\n    slug: 'inside-the-box',.*?\n  \},\n", b, flags=re.S)
    if m:
        b = b[: m.start()] + "  chapter4,\n" + b[m.end():]
    else:
        assert "  chapter4,\n" in b, "chapter4 entry neither planned object nor swapped import"
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
 * prose in every seat), chapter 4 OPENED IN-PROGRESS (CS RUN 7,
 * 2026-11-25: 4.3 'The First Memory Hierarchy' + 4.4 'Buses and
 * Ports: How the Pieces Talk' + the 4.R review shipped whole by the
 * swarm under the time-budget law; 4.1 'The Motherboard: the City
 * Plan' and 4.2 'The Processor Named Honestly' deferred to CS RUN 8
 * with their wip preserved TRACKED in docs/research/cf-ch04-wip/),
 * chapters 5–8 planned (the remaining 15 planned lessons + the two
 * deferred ch.4 titles)."""
    b = b[: old_status.start()] + new_status + b[old_status.end():]
    WRITE(BOOK, b)
    print("JOB 3: book.ts swapped (chapter4 imported, STATUS refreshed)")


def job4_amend_shelf_gate() -> None:
    s = READ(SHELF)
    old_pin = re.search(r"ok\(csWritten === 17,[^\n]*\n", s)
    assert old_pin, "csWritten 17 pin not found in shelf gate"
    new_pin = ("ok(csWritten === 20, 'exactly 20 written lessons in the CS shelf "
               "(CS RUN 1..7: computer-fundamentals chapters 1, 2 and 3 COMPLETE "
               "(4 + 4 + 9 written) + chapter 4 IN-PROGRESS (4.3 + 4.4 + the 4.R "
               "review shipped whole by CS RUN 7; 4.1 + 4.2 still planned) — the "
               "pin grows with the cs lane')\n")
    s = s[: old_pin.start()] + new_pin + s[old_pin.end():]
    # totPl 1225 -> 1226 (the 4.R review is the +1; 4.1/4.2 keep planned slots)
    m = re.search(r"totPl === 1225", s)
    assert m, "totPl 1225 pin not found"
    s = s.replace("totPl === 1225", "totPl === 1226")
    s = s.replace(
        "shelf total 1224 planned lessons + reviews",
        "shelf total planned lessons + reviews",
    )
    WRITE(SHELF, s)
    print("JOB 4: shelf gate pins grown csWritten 17 -> 20, totPl 1225 -> 1226")


def job5_amend_exam_gate() -> None:
    e = READ(EXAM)
    n = e.count("1225")
    assert n >= 1, "exam-coverage census pin 1225 not found"
    e2 = e.replace("1225", "1226")
    WRITE(EXAM, e2)
    print(f"JOB 5: exam-coverage census pin grown 1225 -> 1226 ({n} sites)")


if __name__ == "__main__":
    job1_build_ch04()
    job2_build_verifier()
    job3_refresh_book()
    job4_amend_shelf_gate()
    job5_amend_exam_gate()
    print("ASSEMBLY COMPLETE")
