#!/usr/bin/env python3
"""assemble_cs6.py — the CS RUN 6 assembler for the LockIn Library repo.

CLOSES Computer Fundamentals chapter 3 'Data Representation: a First
Meeting' COMPLETE: assembles the nine verified part files (the run-5
ship 3.2 + 3.6 + 3.7 at 134/121/131 green, plus the run-6 six-seat
swarm 3.1 + 3.3 + 3.4 + 3.5 + 3.8 + the 3.R review at 116/149/112/
105/107/88 green) into the shipped chapter, grows the verifier to
nine sections + the closed-chapter census, refreshes book.ts, and
amends the two standing census gates (csWritten 11 -> 17, totPl
1224 -> 1225 — the 3.R review is the +1).

Run:  cd /home/z/my-project && python3 scripts/assemble_cs6.py
"""

import os
import re

ROOT = "/home/z/my-project"
CF = os.path.join(ROOT, "src/data/library/books/computer-science/computer-fundamentals")
WIP = os.path.join(ROOT, "docs/research/cf-ch03-wip")
CH03 = os.path.join(CF, "ch-03.ts")
BOOK = os.path.join(CF, "book.ts")
VER = os.path.join(ROOT, "scripts/verify-cs-book2-ch03.ts")
SHELF = os.path.join(ROOT, "scripts/verify-cs-shelf-planning.ts")
EXAM = os.path.join(ROOT, "scripts/verify-cs-exam-coverage.ts")

READ = lambda p: open(p, encoding="utf-8").read()
WRITE = lambda p, s: open(p, "w", encoding="utf-8").write(s)

# (part file, tag, lesson export, engine file, verdict tag)
SEATS = [
    ("part-cf31.ts", "31", "lesson31", "v-cf31.ts", "31"),
    ("part-cf32.ts", "32", "lesson32", "v-cf32.ts", "32"),
    ("part-cf33.ts", "33", "lesson33", "v-cf33.ts", "33"),
    ("part-cf34.ts", "34", "lesson34", "v-cf34.ts", "34"),
    ("part-cf35.ts", "35", "lesson35", "v-cf35.ts", "35"),
    ("part-cf36.ts", "36", "lesson36", "v-cf36.ts", "36"),
    ("part-cf37.ts", "37", "lesson37", "v-cf37.ts", "37"),
    ("part-cf38.ts", "38", "lesson38", "v-cf38.ts", "38"),
    ("part-cf3R.ts", "3R", "lesson3R", "v-cf3R.ts", "3R"),
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
 * Computer Fundamentals — chapter 3 \"Data Representation: a First
 * Meeting\" (CLOSED COMPLETE by the CS RUN 6 whole-chapter swarm,
 * 2026-11-25). The two-fire story, honestly: CS RUN 5 opened the
 * chapter (3.2 'The Numbering Systems: Binary, Octal, Hexadecimal',
 * 3.6 'Decimal to Binary Conversion' and 3.7 'Binary to Decimal
 * Conversion' shipped whole at 134/121/131 engine green) and, hitting
 * the run cap against the platform's subagent-deadline wall, preserved
 * the six remaining seats TRACKED in docs/research/cf-ch03-wip/ per
 * the time-budget law. CS RUN 6 resumed from that kit: one authoring
 * agent per remaining seat — 3.1 'Bits: Why Two Symbols Carry
 * Everything' (116/116), 3.3 'Codes: ASCII, Unicode and BCD'
 * (149/149), 3.4 'Text, Images and Sound as Bits' (112/112), 3.5
 * 'Compression: Lossless and Lossy' (105/105), 3.8 'Decimal and
 * Binary Number System' (107/107) and the 3.R 'Unit 3 Completion
 * Review' (88/88) — every engine GREEN before its prose was declared
 * done, the chapter closed COMPLETE in the single run per the owner's
 * whole-chapter directive (2026-11-24).
 *
 * PROVENANCE: ground = the sanctioned internet fallback (the Drive
 * holds no Computer Fundamentals source — the standing honest note in
 * docs/research/CS_TOC_SURVEY.md): the web-verified canonical arcs
 * banked at planning and the 2026-11-25 verification of every pinned
 * date/number (citation key `cs-cf-web-ground`,
 * docs/project/SOURCE_LOG.md). STUDY-NEVER-REPRODUCE absolute: every
 * roster, witness, figure, Illustration, quiz item and exercise below
 * is OUR OWN, engine-pinned in scripts/verify-cs-book2-ch03.ts (which
 * re-runs the nine verify-first harnesses against THIS file and
 * closes with the closed-chapter census).
 */
"""

CHAPTER_TAIL = """

export const chapter3: Chapter = {
  number: 3,
  slug: 'data-representation-first-meeting',
  title: 'Data Representation: a First Meeting',
  summary:
    'Bits, the binary language, and why two symbols carry everything: the numbering systems census (binary, octal and hexadecimal with the conversion craft), codes (ASCII and its characters, BCD), measuring information (bit, byte, KB to the honest SI ladder), text, images and sound as bits (the multimedia ground), and compression as the packing question (lossless versus lossy — what images and audio actually give up). The full theory hands off to Arithmetic and Number Systems and Digital Logic Design.',
  status: 'complete',
  lessons: [
    lesson31, lesson32, lesson33, lesson34, lesson35,
    lesson36, lesson37, lesson38, lesson3R,
  ],
  plannedLessons: [],
}
"""


def job1_build_ch03() -> None:
    parts = []
    for fname, tag, _lexp, _vf, _vt in SEATS:
        text = READ(os.path.join(WIP, fname))
        text = strip_imports(text)
        text, n = rename_palette(text, tag)
        print(f"   {fname}: palette renamed ({n} property reads)")
        parts.append(text.strip("\n") + "\n")
    out = CHAPTER_HEAD + "\n".join(parts) + CHAPTER_TAIL
    WRITE(CH03, out)
    print(f"JOB 1: wrote {CH03} ({len(out.splitlines())} lines)")


VER_HEAD = """import {
  chapter3, lesson31, lesson32, lesson33, lesson34, lesson35,
  lesson36, lesson37, lesson38, lesson3R,
} from '../src/data/library/books/computer-science/computer-fundamentals/ch-03'
import { computerFundamentals } from '../src/data/library/books/computer-science/computer-fundamentals/book'
import { countLessonWords, type Lesson } from '../src/data/library/types'
import { existsSync, readFileSync } from 'node:fs'

export {}

/**
 * verify-cs-book2-ch03.ts — the chapter verifier for Computer
 * Fundamentals (the CS shelf's book #1), chapter 3 \"Data
 * Representation: a First Meeting\" (CS RUN 5 opened it, CS RUN 6
 * CLOSED it COMPLETE, 2026-11-25, under the whole-chapter cadence).
 * VERIFY-FIRST per the standing protocol: each lesson's ENGINE ran
 * green BEFORE its prose was declared done — by the authoring agent
 * against its part file — and the PIN sections here RE-READ THE
 * SHIPPED CHAPTER (the part imports redirected to ch-03.ts).
 *
 *   (cf31) 3.1 engines + pins    (cf32) 3.2 engines + pins
 *   (cf33) 3.3 engines + pins    (cf34) 3.4 engines + pins
 *   (cf35) 3.5 engines + pins    (cf36) 3.6 engines + pins
 *   (cf37) 3.7 engines + pins    (cf38) 3.8 engines + pins
 *   (cf3R) 3.R engines + pins
 *   (Z)    the closed-chapter census — the honest 9 + 0 shape
 *
 * Assembled by scripts/assemble_cs6.py: each v-file wrapped whole as
 * one async section (its local collectors/helpers stay
 * function-scoped, so nothing collides); the only edits are the
 * documented import redirects and the verdict-block swaps.
 */

type SectionResult = { id: string; pass: number; fail: number }

const CH03_SRC = new URL('../src/data/library/books/computer-science/computer-fundamentals/ch-03.ts', import.meta.url).pathname

"""

VER_TAIL = """
/* ================================================================== */
/* SECTION Z — the closed-chapter census                               */
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
  console.log('== SECTION Z: the closed-chapter census ==')
  z('Z01 chapter number is 3', chapter3.number === 3)
  z('Z02 chapter slug', chapter3.slug === 'data-representation-first-meeting', chapter3.slug)
  z('Z03 chapter title pinned', chapter3.title === 'Data Representation: a First Meeting', chapter3.title)
  z('Z04 chapter status COMPLETE (CS RUN 6 closed it)', chapter3.status === 'complete', chapter3.status)
  z('Z05 nine lessons shipped (8 content + the 3.R review)', chapter3.lessons.length === 9, String(chapter3.lessons.length))
  z('Z06 zero lessons still planned', (chapter3.plannedLessons ?? []).length === 0, String((chapter3.plannedLessons ?? []).length))
  const ids = chapter3.lessons.map((l) => l.id)
  z('Z07 lesson ids in teaching order', JSON.stringify(ids) === JSON.stringify(['cf-bits-why-two-symbols-carry-everything', 'cf-the-numbering-systems-binary-octal-hexadecimal', 'cf-codes-ascii-unicode-and-bcd', 'cf-text-images-and-sound-as-bits', 'cf-compression-lossless-and-lossy', 'cf-decimal-to-binary-conversion', 'cf-binary-to-decimal-conversion', 'cf-decimal-and-binary-number-system', 'cf-unit-3-completion-review']), ids.join(','))
  const nums = chapter3.lessons.map((l) => l.number)
  z('Z08 lesson numbers 3.1..3.8 + 3.R', JSON.stringify(nums) === JSON.stringify(['3.1', '3.2', '3.3', '3.4', '3.5', '3.6', '3.7', '3.8', '3.R']), nums.join(','))
  z('Z08b titles pinned verbatim (the planned-lesson contract)', chapter3.lessons[0].title === 'Bits: Why Two Symbols Carry Everything' && chapter3.lessons[1].title === 'The Numbering Systems: Binary, Octal, Hexadecimal' && chapter3.lessons[2].title === 'Codes: ASCII, Unicode and BCD' && chapter3.lessons[3].title === 'Text, Images and Sound as Bits' && chapter3.lessons[4].title === 'Compression: Lossless and Lossy' && chapter3.lessons[5].title === 'Decimal to Binary Conversion' && chapter3.lessons[6].title === 'Binary to Decimal Conversion' && chapter3.lessons[7].title === 'Decimal and Binary Number System' && chapter3.lessons[8].title === 'Unit 3 Completion Review', chapter3.lessons.map((l) => l.title).join(' | '))
  const wcs = chapter3.lessons.map((l) => countLessonWords(l))
  console.log(`  Z word counts: ${wcs.join(', ')}`)
  z('Z09 word floors (>= 6000 content; >= 5200 review)', wcs.slice(0, 8).every((w) => w >= 6000) && wcs[8] >= 5200, wcs.join(', '))
  for (const [i, l] of chapter3.lessons.entries()) {
    z(`Z10.${i + 1} quiz block present (5 items)`, l.blocks.some((b) => b.kind === 'quiz' && (b as { items: unknown[] }).items.length === 5))
    z(`Z11.${i + 1} exercises block present (15 questions)`, l.blocks.some((b) => b.kind === 'exercises' && (b as { sets: { questions: unknown[] }[] }).sets.reduce((n, s) => n + s.questions.length, 0) === 15))
    z(`Z11b.${i + 1} v9.0 solution figures present`, l.blocks.some((b) => b.kind === 'exercises' && (b as { sets: { questions: { figures?: unknown[] }[] }[] }).sets.some((s) => s.questions.some((q) => (q.figures ?? []).length > 0))))
    z(`Z11c.${i + 1} >= 3 body figures (vivid-palette law)`, l.blocks.filter((b) => b.kind === 'figure').length >= 3)
    z(`Z12.${i + 1} terms + formula cards present`, l.blocks.some((b) => b.kind === 'terms') && l.blocks.some((b) => b.kind === 'formula'))
  }
  z('Z13 the prereq chain pins (the teaching graph)', JSON.stringify(chapter3.lessons[0].prerequisites) === JSON.stringify(['cf-the-basic-structure-and-operation-of-the-computer', 'cf-input-devices-the-human-handshake']) && JSON.stringify(chapter3.lessons[1].prerequisites) === JSON.stringify(['cf-bits-why-two-symbols-carry-everything']) && JSON.stringify(chapter3.lessons[2].prerequisites) === JSON.stringify(['cf-bits-why-two-symbols-carry-everything']) && JSON.stringify(chapter3.lessons[3].prerequisites) === JSON.stringify(['cf-codes-ascii-unicode-and-bcd', 'cf-output-devices-screens-printers-and-sound']) && JSON.stringify(chapter3.lessons[4].prerequisites) === JSON.stringify(['cf-text-images-and-sound-as-bits']) && JSON.stringify(chapter3.lessons[5].prerequisites) === JSON.stringify(['cf-the-numbering-systems-binary-octal-hexadecimal']) && JSON.stringify(chapter3.lessons[6].prerequisites) === JSON.stringify(['cf-the-numbering-systems-binary-octal-hexadecimal']) && JSON.stringify(chapter3.lessons[7].prerequisites) === JSON.stringify(['cf-decimal-to-binary-conversion', 'cf-binary-to-decimal-conversion']) && (chapter3.lessons[8].prerequisites ?? []).length === 8, JSON.stringify(chapter3.lessons.map((l) => l.prerequisites)))
  z('Z13b every lesson carries sources (cs-cf-web-ground)', chapter3.lessons.every((l) => (l.sources ?? []).includes('cs-cf-web-ground')))
  z('Z14 the shipped source exists', existsSync(CH03_SRC))
  const shippedText = readFileSync(CH03_SRC, 'utf8')
  z('Z15 the shipped source exports all nine lessons', ['lesson31', 'lesson32', 'lesson33', 'lesson34', 'lesson35', 'lesson36', 'lesson37', 'lesson38', 'lesson3R'].every((n) => shippedText.includes(`export const ${n}`)))

  // ---- the book census (the honest closed shape) ----
  z('Z16 book status in-progress (chapters 4-8 remain)', computerFundamentals.status === 'in-progress', computerFundamentals.status)
  z('Z17 eight chapters on the book map', computerFundamentals.chapters.length === 8, String(computerFundamentals.chapters.length))
  z('Z18 chapters 1 + 2 + 3 complete', computerFundamentals.chapters[0].status === 'complete' && computerFundamentals.chapters[1].status === 'complete' && computerFundamentals.chapters[2].status === 'complete', computerFundamentals.chapters.slice(0, 3).map((c) => c.status).join(','))
  z('Z19 chapters 4-8 still planned', computerFundamentals.chapters.slice(3).every((c) => c.status === 'planned'))
  z('Z20 the cf- prefix in use', ids.every((id) => id.startsWith('cf-')))
  z('Z21 every lesson carries a real body', chapter3.lessons.every((l) => l.blocks.length >= 40))
  const bookWords = chapter3.lessons.reduce((m, l) => m + countLessonWords(l), 0)
  console.log(`  Z shipped chapter word count: ${bookWords}`)
  z('Z22 the shipped body is non-trivial (> 80,000 words)', bookWords > 80000, String(bookWords))
  z('Z23 the shelf census grows to 17 written lessons (8 + 9)', computerFundamentals.chapters.reduce((n, c) => n + c.lessons.length, 0) === 17, String(computerFundamentals.chapters.reduce((n, c) => n + c.lessons.length, 0)))
  return { id: 'Z', pass, fail }
}

/* ================================================================== */
/* runner                                                              */
/* ================================================================== */
async function main(): Promise<void> {
  const results: SectionResult[] = [
    await sectionCf31(),
    await sectionCf32(),
    await sectionCf33(),
    await sectionCf34(),
    await sectionCf35(),
    await sectionCf36(),
    await sectionCf37(),
    await sectionCf38(),
    await sectionCf3R(),
    await sectionZ(),
  ]
  console.log('')
  console.log('============= verify-cs-book2-ch03: verdict =============')
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
  console.log('RESULT: ALL GREEN — chapter 3 CLOSED COMPLETE (nine lessons + the review; the whole-chapter cadence honoured).')
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
        # strip the harness header imports + the part import (redirected to the
        # shipped chapter via the verifier's own top-level import)
        v = re.sub(r"^import[^\n]*\n", "", v, flags=re.M)
        v = re.sub(r"^export \{\}\n", "", v, flags=re.M)
        # engines that audit their part SOURCE via Bun.file resolve relative to
        # the wrapped verifier's scripts/ dir — redirect to the wip directory
        v = v.replace(
            "import.meta.dir + '/part-cf",
            "import.meta.dir + '/../docs/research/cf-ch03-wip/part-cf",
        )
        # type-opacify the disjoint-literal comparison the cf33 engine pins
        # (0b01000101 read as pure binary is 69, not the BCD value 45 — the
        # check is semantically exact; only the literal narrowing trips tsc)
        v = v.replace(
            "0b01000101 !== 45",
            "0b01000101 !== (45 as number)",
        )
        # the dynamic part import redirects to the shipped chapter
        v = v.replace(
            "const mod = await import('./part-cf" + tag + "')",
            "const mod = await Promise.resolve({ " + lexp + " })",
        )
        v = v.replace(
            "const mod = (await import('./part-cf" + tag + "').catch(() => null)) as { " + lexp + "?: Lesson } | null",
            "const mod = (await Promise.resolve({ " + lexp + " })) as { " + lexp + "?: Lesson } | null",
        )
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
 * 3.R review by the CS RUN 6 SWARM, 2026-11-25 — the chapter opened
 * and closed across two fires under the time-budget law, engines
 * green before prose in every seat), chapters 4–8 planned (the
 * remaining 19 planned lessons)."""
    b = b[: old_status.start()] + new_status + b[old_status.end():]
    WRITE(BOOK, b)
    print("JOB 3: book.ts STATUS comment refreshed (chapter 3 COMPLETE)")


def job4_amend_shelf_gate() -> None:
    s = READ(SHELF)
    s2 = s.replace(
        "ok(csWritten === 11, 'exactly 11 written lessons in the CS shelf (CS RUN 1 + RUN 2 + RUN 3 + RUN 4 + RUN 5: computer-fundamentals 1.1 + 1.2 + 1.3 + the 1.R review + 2.1 + 2.2 + 2.3 + the 2.R review + 3.2 + 3.6 + 3.7, chapters 1 AND 2 COMPLETE, chapter 3 in-progress) — the pin grows with the cs lane'",
        "ok(csWritten === 17, 'exactly 17 written lessons in the CS shelf (CS RUN 1..6: computer-fundamentals 1.1 + 1.2 + 1.3 + the 1.R review + 2.1 + 2.2 + 2.3 + the 2.R review + the full chapter 3 — 3.1..3.8 + the 3.R review, chapters 1, 2 AND 3 COMPLETE) — the pin grows with the cs lane'",
    )
    assert s2 != s, "csWritten 11 pin not found in shelf gate"
    # totPl 1224 -> 1225 (the 3.R review is the +1)
    s3 = s2.replace(
        "totPl === 1224",
        "totPl === 1225",
    )
    if s3 == s2:
        # fall back: find the totPl pin line generically
        m = re.search(r"totPl === (\\d+)", s2)
        assert m, "totPl pin not found in shelf gate"
        s3 = s2.replace(f"totPl === {m.group(1)}", "totPl === 1225")
    assert "1225" in s3, "totPl re-pin failed"
    WRITE(SHELF, s3)
    print("JOB 4: shelf gate pins grown csWritten 11 -> 17, totPl 1224 -> 1225")


def job5_amend_exam_gate() -> None:
    e = READ(EXAM)
    m = re.search(r"1224", e)
    assert m, "exam-coverage census pin 1224 not found"
    e2 = e.replace("1224", "1225")
    WRITE(EXAM, e2)
    print("JOB 5: exam-coverage census pin grown 1224 -> 1225")


if __name__ == "__main__":
    job1_build_ch03()
    job2_build_verifier()
    job3_refresh_book()
    job4_amend_shelf_gate()
    job5_amend_exam_gate()
    print("ASSEMBLY COMPLETE")
