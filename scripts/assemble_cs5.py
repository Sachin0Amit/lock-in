#!/usr/bin/env python3
"""assemble_cs5.py — the CS RUN 5 assembler for the LockIn Library repo.

Opens Computer Fundamentals (the CS shelf's first book) chapter 3
'Data Representation: a First Meeting' from the three verified part
files delivered by the run-5 swarm's continuation round (3.2 + 3.6 +
3.7, at 134/134 + 121/121 + 131/131 green). The chapter ships
IN-PROGRESS: seats 3.1, 3.3, 3.4, 3.5, 3.8 and the 3.R review are
deferred to CS RUN 6 per the protocol's time-budget law (their engines
already landed green in docs/research/cf-ch03-wip/ — the resumption is
prose-only for five of six seats).

  JOB 1  build src/.../computer-fundamentals/ch-03.ts
                                          (three lessons + chapter export,
                                           palette C/FONT renamed per tag)
  JOB 2  build scripts/verify-cs-book2-ch03.ts
                                          (the three v-files wrapped whole
                                           as async sections — engines
                                           re-run, pins re-reading the
                                           SHIPPED chapter — plus Z: the
                                           in-progress chapter census)
  JOB 3  swap book.ts                     (chapter3 import replaces the
                                           planned inline object; the book
                                           stays in-progress, now with a
                                           written chapter 3)
  JOB 4  amend verify-cs-shelf-planning.ts (csWritten 8 -> 11; totPl
                                           stays 1224 — no review added
                                           while ch.3 is open)

Run:  cd /home/z/my-project && python3 scripts/assemble_cs5.py
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

READ = lambda p: open(p, encoding="utf-8").read()
WRITE = lambda p, s: open(p, "w", encoding="utf-8").write(s)

C_PROPS = [
    "struct", "ink", "mid", "teal", "tealInk", "conn", "accent", "warn",
    "panelA", "panelB", "faint", "white", "paper",
]


def strip_imports(text: str) -> str:
    text = re.sub(
        r"^import type \{ Lesson \} from '\.\./\.\./\.\./src/data/library/types'\n",
        "", text, flags=re.M)
    text = re.sub(
        r"^import \{ countLessonWords \} from '\.\./\.\./\.\./src/data/library/types'\n",
        "", text, flags=re.M)
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
 * Meeting\" (OPENED by the CS RUN 5 whole-chapter swarm, 2026-11-25:
 * lessons 3.2, 3.6 and 3.7 delivered whole by the authoring agents —
 * engines 134/134, 121/121 and 131/131 green, 9,389 / 9,502 / 9,777
 * words; the ~2-hour run cap arrived with seats 3.1, 3.3, 3.4, 3.5,
 * 3.8 and the 3.R review unauthored after two agent rounds against
 * the platform's subagent-deadline wall, so per the protocol's
 * time-budget law the completed lessons SHIP and the remainder RIDES
 * CS RUN 6 — never thinned, never half-gated. The nine specs, the
 * orchestrator's 112/112 pre-flight pin checker and the five landed
 * green engines for the deferred seats are preserved TRACKED in
 * docs/research/cf-ch03-wip/ — five of the six deferred seats are
 * prose-only resumptions.)
 *
 * PROVENANCE: ground = the sanctioned internet fallback (the Drive
 * holds no Computer Fundamentals source — the standing honest note in
 * docs/research/CS_TOC_SURVEY.md): the web-verified canonical arcs
 * banked at planning and this run's 2026-11-25 verification of every
 * pinned date/number (citation key `cs-cf-web-ground`,
 * docs/project/SOURCE_LOG.md). STUDY-NEVER-REPRODUCE absolute: every
 * roster, witness, figure, Illustration, quiz item and exercise below
 * is OUR OWN, engine-pinned in scripts/verify-cs-book2-ch03.ts (which
 * re-runs the three verify-first harnesses against THIS file and
 * closes with the in-progress chapter census).
 */
"""

CHAPTER_TAIL = """

export const chapter3: Chapter = {
  number: 3,
  slug: 'data-representation-first-meeting',
  title: 'Data Representation: a First Meeting',
  summary:
    'Bits, the binary language, and why two symbols carry everything: the numbering systems census (binary, octal and hexadecimal with the conversion craft), codes (ASCII and its characters, BCD), measuring information (bit, byte, KB to the honest SI ladder), text, images and sound as bits (the multimedia ground), and compression as the packing question (lossless versus lossy — what images and audio actually give up). The full theory hands off to Arithmetic and Number Systems and Digital Logic Design.',
  status: 'in-progress',
  lessons: [lesson32, lesson36, lesson37],
  plannedLessons: [
    'Bits: Why Two Symbols Carry Everything',
    'Codes: ASCII, Unicode and BCD',
    'Text, Images and Sound as Bits',
    'Compression: Lossless and Lossy',
    'Decimal and Binary Number System',
  ],
}
"""


def job1_build_ch03() -> None:
    parts = []
    for fname, tag in [
        ("part-cf32.ts", "32"),
        ("part-cf36.ts", "36"),
        ("part-cf37.ts", "37"),
    ]:
        text = READ(os.path.join(WIP, fname))
        text = strip_imports(text)
        text, n = rename_palette(text, tag)
        print(f"   {fname}: palette renamed ({n} property reads)")
        parts.append(text.strip("\n") + "\n")
    out = CHAPTER_HEAD + "\n".join(parts) + CHAPTER_TAIL
    WRITE(CH03, out)
    print(f"JOB 1: wrote {CH03} ({len(out.splitlines())} lines)")


VER_HEAD = """import { chapter3, lesson32, lesson36, lesson37 } from '../src/data/library/books/computer-science/computer-fundamentals/ch-03'
import { computerFundamentals } from '../src/data/library/books/computer-science/computer-fundamentals/book'
import { countLessonWords, type Lesson } from '../src/data/library/types'
import { existsSync, readFileSync } from 'node:fs'

export {}

/**
 * verify-cs-book2-ch03.ts — the chapter verifier for Computer
 * Fundamentals (the CS shelf's book #1), chapter 3 \"Data
 * Representation: a First Meeting\" (CS RUN 5, the cs job's fifth
 * honored fire, 2026-11-25, opened the chapter under the whole-chapter
 * cadence). VERIFY-FIRST per the standing protocol: each lesson's
 * ENGINE ran green BEFORE its prose was declared done — by the
 * authoring agent against its part file — and the PIN sections here
 * RE-READ THE SHIPPED CHAPTER (the part imports redirected to
 * ch-03.ts).
 *
 *   (cf32) 3.2 engines + pins    (cf36) 3.6 engines + pins
 *   (cf37) 3.7 engines + pins
 *   (Z)    the in-progress chapter census — the honest 3 + 5 shape
 *
 * Assembled by scripts/assemble_cs5.py: each v-file wrapped whole as
 * one async section (its local collectors/helpers stay function-scoped,
 * so nothing collides); the only edits are the documented import
 * redirects and the verdict-block swaps. The deferred seats' engines
 * (v-cf31 unfinished, v-cf33/34/35/38/3R landed green) stay preserved
 * in docs/research/cf-ch03-wip/ for the CS RUN 6 resumption.
 */

type SectionResult = { id: string; pass: number; fail: number }

const CH03_SRC = new URL('../src/data/library/books/computer-science/computer-fundamentals/ch-03.ts', import.meta.url).pathname

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
  z('Z01 chapter number is 3', chapter3.number === 3)
  z('Z02 chapter slug', chapter3.slug === 'data-representation-first-meeting', chapter3.slug)
  z('Z03 chapter title pinned', chapter3.title === 'Data Representation: a First Meeting', chapter3.title)
  z('Z04 chapter status in-progress (CS RUN 5 opened; the close rides CS RUN 6)', chapter3.status === 'in-progress', chapter3.status)
  z('Z05 three lessons shipped (3.2 + 3.6 + 3.7)', chapter3.lessons.length === 3, String(chapter3.lessons.length))
  z('Z06 five lessons still planned', (chapter3.plannedLessons ?? []).length === 5, String((chapter3.plannedLessons ?? []).length))
  z('Z06b planned titles exact and in order', JSON.stringify(chapter3.plannedLessons) === JSON.stringify(['Bits: Why Two Symbols Carry Everything', 'Codes: ASCII, Unicode and BCD', 'Text, Images and Sound as Bits', 'Compression: Lossless and Lossy', 'Decimal and Binary Number System']), (chapter3.plannedLessons ?? []).join(' | '))
  const ids = chapter3.lessons.map((l) => l.id)
  z('Z07 lesson ids in teaching order', JSON.stringify(ids) === JSON.stringify(['cf-the-numbering-systems-binary-octal-hexadecimal', 'cf-decimal-to-binary-conversion', 'cf-binary-to-decimal-conversion']), ids.join(','))
  const nums = chapter3.lessons.map((l) => l.number)
  z('Z08 lesson numbers 3.2, 3.6, 3.7', JSON.stringify(nums) === JSON.stringify(['3.2', '3.6', '3.7']), nums.join(','))
  z('Z08b titles pinned verbatim (the planned-lesson contract)', chapter3.lessons[0].title === 'The Numbering Systems: Binary, Octal, Hexadecimal' && chapter3.lessons[1].title === 'Decimal to Binary Conversion' && chapter3.lessons[2].title === 'Binary to Decimal Conversion', chapter3.lessons.map((l) => l.title).join(' | '))
  const wcs = chapter3.lessons.map((l) => countLessonWords(l))
  console.log(`  Z word counts: ${wcs.join(', ')}`)
  z('Z09 word floors (>= 6000 each; the shipped seats all cleared 9,000)', wcs.every((w) => w >= 6000), wcs.join(', '))
  for (const [i, l] of chapter3.lessons.entries()) {
    z(`Z10.${i + 1} quiz block present (5 items)`, l.blocks.some((b) => b.kind === 'quiz' && (b as { items: unknown[] }).items.length === 5))
    z(`Z11.${i + 1} exercises block present (15 questions)`, l.blocks.some((b) => b.kind === 'exercises' && (b as { sets: { questions: unknown[] }[] }).sets.reduce((n, s) => n + s.questions.length, 0) === 15))
    z(`Z11b.${i + 1} v9.0 solution figures present`, l.blocks.some((b) => b.kind === 'exercises' && (b as { sets: { questions: { figures?: unknown[] }[] }[] }).sets.some((s) => s.questions.some((q) => (q.figures ?? []).length > 0))))
    z(`Z11c.${i + 1} >= 3 body figures (vivid-palette law)`, l.blocks.filter((b) => b.kind === 'figure').length >= 3)
    z(`Z12.${i + 1} terms + formula cards present`, l.blocks.some((b) => b.kind === 'terms') && l.blocks.some((b) => b.kind === 'formula'))
  }
  z('Z13 the prereq chain pins (3.2 <- 3.1-unwritten; 3.6 + 3.7 <- 3.2)', JSON.stringify(chapter3.lessons[0].prerequisites) === JSON.stringify(['cf-bits-why-two-symbols-carry-everything']) && JSON.stringify(chapter3.lessons[1].prerequisites) === JSON.stringify(['cf-the-numbering-systems-binary-octal-hexadecimal']) && JSON.stringify(chapter3.lessons[2].prerequisites) === JSON.stringify(['cf-the-numbering-systems-binary-octal-hexadecimal']), JSON.stringify(chapter3.lessons.map((l) => l.prerequisites)))
  z('Z13b every lesson carries sources (cs-cf-web-ground)', chapter3.lessons.every((l) => (l.sources ?? []).includes('cs-cf-web-ground')))
  z('Z14 the shipped source exists', existsSync(CH03_SRC))
  const shippedText = readFileSync(CH03_SRC, 'utf8')
  z('Z15 the shipped source exports all three lessons', ['lesson32', 'lesson36', 'lesson37'].every((n) => shippedText.includes(`export const ${n}`)))

  // ---- the book census (the honest in-progress shape) ----
  z('Z16 book status in-progress', computerFundamentals.status === 'in-progress', computerFundamentals.status)
  z('Z17 eight chapters on the book map', computerFundamentals.chapters.length === 8, String(computerFundamentals.chapters.length))
  z('Z18 chapters 1 + 2 complete, chapter 3 in-progress', computerFundamentals.chapters[0].status === 'complete' && computerFundamentals.chapters[1].status === 'complete' && computerFundamentals.chapters[2].status === 'in-progress', computerFundamentals.chapters.slice(0, 3).map((c) => c.status).join(','))
  z('Z19 chapters 4-8 still planned', computerFundamentals.chapters.slice(3).every((c) => c.status === 'planned'))
  z('Z20 the cf- prefix in use', ids.every((id) => id.startsWith('cf-')))
  z('Z21 every lesson carries a real body', chapter3.lessons.every((l) => l.blocks.length >= 40))
  const bookWords = chapter3.lessons.reduce((m, l) => m + countLessonWords(l), 0)
  console.log(`  Z shipped chapter word count: ${bookWords}`)
  z('Z22 the shipped body is non-trivial (> 24,000 words)', bookWords > 24000, String(bookWords))
  z('Z23 the shelf census grows to 11 written lessons (8 + 3)', computerFundamentals.chapters.reduce((n, c) => n + c.lessons.length, 0) === 11, String(computerFundamentals.chapters.reduce((n, c) => n + c.lessons.length, 0)))
  return { id: 'Z', pass, fail }
}

/* ================================================================== */
/* runner                                                              */
/* ================================================================== */
async function main(): Promise<void> {
  const results: SectionResult[] = [
    await sectionCf32(),
    await sectionCf36(),
    await sectionCf37(),
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
  console.log('RESULT: ALL GREEN — chapter 3 shipped in-progress (3.2 + 3.6 + 3.7 whole; 3.1, 3.3, 3.4, 3.5, 3.8 + the 3.R review ride CS RUN 6).')
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
    for key, lesson, fn, sid in [
        ("cf32", "lesson32", "sectionCf32", "cf32 engines+pins"),
        ("cf36", "lesson36", "sectionCf36", "cf36 engines+pins"),
        ("cf37", "lesson37", "sectionCf37", "cf37 engines+pins"),
    ]:
        v = READ(os.path.join(WIP, f"v-{key}.ts"))
        # strip the harness header imports + the part import (redirected to the
        # shipped chapter via the verifier's own top-level import)
        v = re.sub(r"^import \{ countLessonWords \} from '\.\./\.\./\.\./src/data/library/types'\n", "", v, flags=re.M)
        v = re.sub(r"^import type \{ Lesson \} from '\.\./\.\./\.\./src/data/library/types'\n", "", v, flags=re.M)
        v = re.sub(r"^export \{\}\n", "", v, flags=re.M)
        v = re.sub(r"^import \{ " + lesson + r" \} from '\./part-" + key + r"'\n", "", v, flags=re.M)
        v = re.sub(r"^import \{ " + lesson + r" as L\d+ \} from '\./part-" + key + r"'\n", "", v, flags=re.M)
        v = re.sub(r"^import \{ countLessonWords, type Lesson \} from '\.\./\.\./\.\./src/data/library/types'\n", "", v, flags=re.M)
        # the dynamic part import (v-cf32's form) redirects to the shipped chapter
        v = v.replace(
            "const mod = await import('./part-" + key + "')",
            "const mod = await Promise.resolve({ " + lesson + " })",
        )
        # cut the verdict tail (from the final V-CFxx console.log onward)
        m = re.search(r"^console\.log\(`V-" + key.upper() + r":.*$", v, flags=re.M)
        assert m, f"{key} verdict line not found"
        v = v[: m.start()]
        # the [SUMMARY]/report stray console.logs are harmless; drop a bare blank-report header if present
        v = re.sub(r"/\* -{20,} \*/\n/\* the report +\*/\n/\* -{20,} \*/\n\nconsole\.log\(''\)\n$", "", v)
        sections.append(wrap_section(v, fn, sid))
    out = VER_HEAD + "\n".join(sections) + VER_TAIL
    WRITE(VER, out)
    print(f"JOB 2: wrote {VER} ({len(out.splitlines())} lines)")


def job3_swap_book() -> None:
    b = READ(BOOK)
    if "from './ch-03'" in b:
        print("JOB 3: book.ts already swapped — nothing to do")
        return
    b = b.replace(
        "import { chapter02 } from './ch-02'",
        "import { chapter02 } from './ch-02'\nimport { chapter3 } from './ch-03'",
        1,
    )
    # replace the ch.3 inline planned object with the chapter3 import
    m = re.search(
        r"  \{\n    number: 3,\n    slug: 'data-representation-first-meeting',.*?\n  \},\n",
        b, flags=re.S,
    )
    assert m, "chapter 3 inline object not found"
    b = b[: m.start()] + "  chapter3,\n" + b[m.end():]
    # refresh the STATUS comment honestly
    b = b.replace(
        " * STATUS: IN-PROGRESS — chapter 1 COMPLETE (4 written lessons: 1.1 +\n * 1.2 by the CS RUN 1 SWARM, 1.3 + the 1.R unit completion review by\n * the CS RUN 2 SWARM), chapter 2 COMPLETE (2.1 'Input Devices: the\n * Human Handshake' + 2.2 'Output Devices: Screens, Printers and Sound'\n * by the CS RUN 3 SWARM, 2026-11-23; 2.3 'Interacting Well: the First\n * Usability Instincts' + the 2.R 'Unit 2 Completion Review' by the CS\n * RUN 4 SWARM, 2026-11-24 — the whole-chapter cadence, the chapter\n * closed COMPLETE in one fire), chapters 3–8 planned (the remaining 24\n * planned lessons), authoring on the whole-chapter cadence (CS RUN 5\n * opens chapter 3 'Data Representation: a First Meeting').",
        " * STATUS: IN-PROGRESS — chapter 1 COMPLETE (4 written lessons: 1.1 +\n * 1.2 by the CS RUN 1 SWARM, 1.3 + the 1.R unit completion review by\n * the CS RUN 2 SWARM), chapter 2 COMPLETE (2.1 'Input Devices: the\n * Human Handshake' + 2.2 'Output Devices: Screens, Printers and Sound'\n * by the CS RUN 3 SWARM, 2026-11-23; 2.3 'Interacting Well: the First\n * Usability Instincts' + the 2.R 'Unit 2 Completion Review' by the CS\n * RUN 4 SWARM, 2026-11-24 — the whole-chapter cadence, the chapter\n * closed COMPLETE in one fire), chapter 3 OPENED IN-PROGRESS by the CS\n * RUN 5 SWARM, 2026-11-25 (3.2 'The Numbering Systems: Binary, Octal,\n * Hexadecimal' + 3.6 'Decimal to Binary Conversion' + 3.7 'Binary to\n * Decimal Conversion' shipped whole; 3.1, 3.3, 3.4, 3.5, 3.8 + the 3.R\n * review ride CS RUN 6 per the time-budget law — the preserved\n * engines + specs live in docs/research/cf-ch03-wip/), chapters 4–8\n * planned (the remaining 19 planned lessons).",
    )
    WRITE(BOOK, b)
    print(f"JOB 3: swapped {BOOK} (chapter3 import)")


def job4_amend_shelf_gate() -> None:
    s = READ(SHELF)
    s2 = s.replace(
        "ok(csWritten === 8, 'exactly 8 written lessons in the CS shelf (CS RUN 1 + RUN 2 + RUN 3 + RUN 4: computer-fundamentals 1.1 + 1.2 + 1.3 + the 1.R review + 2.1 + 2.2 + 2.3 + the 2.R review, chapters 1 AND 2 COMPLETE) — the pin grows with the cs lane'",
        "ok(csWritten === 11, 'exactly 11 written lessons in the CS shelf (CS RUN 1 + RUN 2 + RUN 3 + RUN 4 + RUN 5: computer-fundamentals 1.1 + 1.2 + 1.3 + the 1.R review + 2.1 + 2.2 + 2.3 + the 2.R review + 3.2 + 3.6 + 3.7, chapters 1 AND 2 COMPLETE, chapter 3 in-progress) — the pin grows with the cs lane'",
    )
    assert s2 != s, "csWritten pin not found"
    WRITE(SHELF, s2)
    print("JOB 4: shelf gate csWritten pin grown 8 -> 11 (totPl stays 1224: no review added while ch.3 is open)")


if __name__ == "__main__":
    job1_build_ch03()
    job2_build_verifier()
    job3_swap_book()
    job4_amend_shelf_gate()
    print("ASSEMBLY COMPLETE")
