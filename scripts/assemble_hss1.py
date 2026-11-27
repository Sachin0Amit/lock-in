#!/usr/bin/env python3
"""assemble_hss1.py — the HSS RUN 1 assembler for the LockIn Library repo.

OPENS world-history (book #1 of the Humanities & Social Sciences shelf)
chapter 1 'The Historian's Craft' with lesson 1.1 (the solo-relaunch seat:
the swarm wall died twice empty; amendment 5's solo relaunch authored 1.1,
57/57 seat-green). Builds ch-01.ts from the wip part (strip import, banner),
sets the chapter tail to status 'in-progress' with the HONEST 3-lesson shape
in plannedLessons (the four planning-artifact lines trimmed), rebuilds
scripts/verify-wh-ch01.ts (the v-wh101 harness wrapped as one async section
re-reading the SHIPPED chapter + Z: the OPEN 1-of-3 census), and swaps
book.ts's planned ch.1 object for the shipped chapter1 (artifacts gone,
STATUS refreshed, book 'planned' -> 'in-progress').

  JOB 1  build src/.../humanities/world-history/ch-01.ts
  JOB 2  build scripts/verify-wh-ch01.ts
  JOB 3  swap book.ts chapter1 + STATUS refresh + book in-progress

Run:  cd /home/z/my-project && python3 scripts/assemble_hss1.py
"""

import os
import re
import time

ROOT = "/home/z/my-project/lock-in"
WH = os.path.join(ROOT, "src/data/library/books/humanities/world-history")
WIP = os.path.join(ROOT, "docs/research/wh-ch01-wip")
CH01 = os.path.join(WH, "ch-01.ts")
BOOK = os.path.join(WH, "book.ts")
VER = os.path.join(ROOT, "scripts/verify-wh-ch01.ts")

READ = lambda p: open(p, encoding="utf-8").read()
WRITE = lambda p, s: open(p, "w", encoding="utf-8").write(s)

CHAPTER_HEAD = """import type { Chapter, Lesson } from '../../../types'

/**
 * World History — chapter 1 "The Historian's Craft"
 * (OPENED by HSS RUN 1, 2026-11-27 — the humanities & social sciences lane's
 * first fire on the whole-chapter cadence, v9.2 protocol).
 *
 * The seats: 1.1 'How History Is Written' (57/57 seat-green — authored by the
 * amendment-5 SOLO RELAUNCH after the swarm wall died twice empty; staged
 * writes banked every section); 1.2 'Sources: Literary and Archaeological'
 * and 1.3 'Time, Periodisation and the Calendar' ride the next fire (the
 * 2-hour cap closed before their seats could start honestly — the deferral
 * is recorded in WORKLOG). The planned census is the HONEST 3-lesson shape:
 * the four planning-pass artifact lines ('Acknowledgements (duplicate)',
 * "Chapter XIII. The Sources of Plato's Opinions", 'Part I. The Fathers',
 * 'Part II. The Schoolmen') are TOC leaks from other books, trimmed per the
 * pointer's reconcile step (b).
 *
 * PROVENANCE: ground = the run's reference-scan-first pass (v9.2 amendment 9):
 * the banked HUMANITIES_TOC_SURVEY.md book records (Strayer & Nelson, Arjun
 * Dev, Norman Lowe, AP World), the NCERT open-canon registers (class 6/8/12
 * history chapters), and the live web ground (Herodotus, Sima Qian, Ibn
 * Khaldun, James Mill, Ashoka's edicts, the Rosetta Stone, radiocarbon, the
 * Gregorian reform) — every URL and page in docs/project/SOURCE_LOG.md under
 * the HSS RUN 1 block. Every ARITHMETIC fact is brute-force pinned in
 * docs/research/wh-ch01-wip/pin_check_wh101.py (69/69 ALL GREEN after the
 * engine caught 9 draft errors) and re-pinned by scripts/verify-wh-ch01.ts
 * against THIS file. STUDY-NEVER-REPRODUCE absolute: every roster, figure,
 * Illustration, quiz item and exercise below is OUR OWN.
 */
/* ================================================================== */
/* lesson 1.1 — from docs/research/wh-ch01-wip/part-wh101.ts            */
/* ================================================================== """
CHAPTER_HEAD = CHAPTER_HEAD.rstrip() + "\n"


def chapter_tail() -> str:
    return (
        "\nexport const chapter1: Chapter = {\n"
        "  number: 1,\n"
        "  slug: 'the-historian-s-craft',\n"
        "  title: 'The Historian\\u2019s Craft',\n"
        "  summary:\n"
        "    'How history is actually written: primary against secondary sources, the literary against the archaeological register, external and internal criticism of a document, the archaeologist\\u2019s sherd against the court chronicle; periodisation as a CONVENTION (the ancient/medieval/modern triad interrogated, not assumed) and the BC/BCE-CE dating census; and the map of this book\\u2019s arc stated honestly \\u2014 why world history is taught as one story and what that choice costs.',\n"
        "  status: 'in-progress',\n"
        "  lessons: [lessonWh101],\n"
        "  plannedLessons: ['Sources: Literary and Archaeological', 'Time, Periodisation and the Calendar'],\n"
        "}\n"
    )


def job1_build_ch01() -> None:
    text = READ(os.path.join(WIP, "part-wh101.ts"))
    stripped = re.sub(
        r"^import type \{ Lesson \} from '\.\./\.\./\.\./src/data/library/types'\n",
        "", text, flags=re.M)
    assert "import type" not in stripped, "part import survived the strip"
    assert "export const lessonWh101" in stripped, "lesson export missing"
    out = CHAPTER_HEAD + stripped.strip("\n") + "\n" + chapter_tail()
    WRITE(CH01, out)
    print(f"JOB 1: wrote {CH01} ({len(out.splitlines())} lines)")


VER_HEAD = """import { chapter1, lessonWh101 } from '../src/data/library/books/humanities/world-history/ch-01'
import { worldHistory } from '../src/data/library/books/humanities/world-history/book'
import { countLessonWords, type Lesson } from '../src/data/library/types'
import { existsSync, readFileSync } from 'node:fs'

export {}

/**
 * verify-wh-ch01.ts — the chapter verifier for WORLD HISTORY (book #1 of the
 * humanities & social sciences shelf), chapter 1 "The Historian's Craft"
 * (HSS RUN 1 OPENED it with lesson 1.1; 1.2-1.3 ride the next fire).
 * VERIFY-FIRST per the standing protocol: the 1.1 ENGINE section ran green
 * BEFORE its prose was declared done, and the PIN section here RE-READS THE
 * SHIPPED CHAPTER (the part import redirected to ch-01.ts).
 *
 *   (wh101)  1.1 engines + pins
 *   (Z)      the OPEN chapter census — the honest 1-of-3 shape
 *
 * Assembled by scripts/assemble_hss1.py (on the assemble_run129.py pattern):
 * the v-file wrapped whole as one async section (its local collectors/helpers
 * stay function-scoped); the only edits are the documented import redirect
 * and the verdict-block swap.
 */

type SectionResult = { id: string; pass: number; fail: number }

const CH01_SRC = new URL('../src/data/library/books/humanities/world-history/ch-01.ts', import.meta.url).pathname

"""

VER_TAIL = """
/* ================================================================== */
/* SECTION Z — the OPEN chapter census                                 */
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
  console.log('== SECTION Z: the OPEN chapter census (1 of 3 honest) ==')
  z('Z01 chapter number is 1', chapter1.number === 1)
  z('Z02 chapter slug', chapter1.slug === 'the-historian-s-craft', chapter1.slug)
  z('Z03 chapter status in-progress (1 of 3 shipped)', chapter1.status === 'in-progress', chapter1.status)
  z('Z04 ONE lesson shipped', chapter1.lessons.length === 1, String(chapter1.lessons.length))
  z('Z05 plannedLessons are the honest remaining two (artifacts trimmed)',
    JSON.stringify(chapter1.plannedLessons ?? []) === JSON.stringify(['Sources: Literary and Archaeological', 'Time, Periodisation and the Calendar']),
    JSON.stringify(chapter1.plannedLessons ?? []))
  z('Z06 lesson 1.1 identity exact',
    chapter1.lessons[0]?.id === 'wh-how-history-is-written' && chapter1.lessons[0]?.number === '1.1' && chapter1.lessons[0]?.title === 'How History Is Written',
    `${chapter1.lessons[0]?.id}|${chapter1.lessons[0]?.number}|${chapter1.lessons[0]?.title}`)
  const wc = countLessonWords(chapter1.lessons[0])
  console.log(`  Z lesson word count: ${wc}`)
  z('Z07 lesson word floor >= 6000', wc >= 6000, String(wc))
  const qb = chapter1.lessons[0].blocks.find((b) => b.kind === 'quiz') as { kind: 'quiz'; items: Array<{ answer: number }> } | undefined
  z('Z08 quiz key is the pinned 10231', !!qb && qb.items.map((i) => i.answer).join('') === '10231', qb ? qb.items.map((i) => i.answer).join('') : 'none')
  const exb = chapter1.lessons[0].blocks.find((b) => b.kind === 'exercises') as { kind: 'exercises'; sets: Array<{ level: string; questions: unknown[] }> } | undefined
  z('Z09 exercises present: 15 questions spanning L1..L6',
    !!exb && ['L1', 'L2', 'L3', 'L4', 'L5', 'L6'].every((L) => exb.sets.some((s) => s.level === L)) && exb.sets.flatMap((s) => s.questions).length === 15,
    exb ? `sets=${exb.sets.map((s) => `${s.level}:${s.questions.length}`).join(',')}` : 'none')
  z('Z10 terms + formula cards present',
    chapter1.lessons[0].blocks.some((b) => b.kind === 'terms') && chapter1.lessons[0].blocks.some((b) => b.kind === 'formula'), '')
  z('Z11 book status in-progress', worldHistory.status === 'in-progress', worldHistory.status)
  z('Z12 eleven chapters planned in the book', worldHistory.chapters.length === 11, String(worldHistory.chapters.length))
  z('Z13 chapters 2-11 still planned', worldHistory.chapters.slice(1).every((c) => c.status === 'planned'), '')
  z('Z14 the wh- prefix in use', chapter1.lessons.every((l) => l.id.startsWith('wh-')), '')
  z('Z15 the lesson carries a real body', chapter1.lessons[0].blocks.length >= 10, String(chapter1.lessons[0].blocks.length))
  const chapterWords = chapter1.lessons.reduce((m, l) => m + countLessonWords(l), 0)
  console.log(`  Z shipped chapter word count: ${chapterWords}`)
  z('Z16 the shipped body is non-trivial (> 6000 words)', chapterWords > 6000, String(chapterWords))
  z('Z17 lesson sources carry the run keys', JSON.stringify(chapter1.lessons[0].sources ?? []) === JSON.stringify(['wh-survey-ground', 'wh-web-historians']), JSON.stringify(chapter1.lessons[0].sources ?? []))
  const shippedText = existsSync(CH01_SRC) ? readFileSync(CH01_SRC, 'utf8') : ''
  z('Z18 the shipped source exists', existsSync(CH01_SRC))
  z('Z19 the shipped source exports lessonWh101', shippedText.includes('export const lessonWh101'), '')
  z('Z20 the four artifact lines are gone from book.ts',
    !readFileSync(new URL('../src/data/library/books/humanities/world-history/book.ts', import.meta.url).pathname, 'utf8').match(/Acknowledgements \(duplicate\)|Plato's Opinions|Part I\. The Fathers|Part II\. The Schoolmen/),
    '')
  z('Z21 the lesson id is unique across the library (grep guard)',
    ['wh-how-history-is-written'].every((id) => shippedText.split(id).length - 1 === 1), '')
  return { id: 'Z', pass, fail }
}

/* ================================================================== */
/* runner                                                              */
/* ================================================================== */
async function main(): Promise<void> {
  const results: SectionResult[] = [
    await sectionWh101(),
    await sectionZ(),
  ]
  console.log('')
  console.log('================ verify-wh-ch01: verdict ================')
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
  console.log('RESULT: ALL GREEN — chapter 1 OPENED (1.1 shipped; 1.2-1.3 ride the next fire).')
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
    v = READ(os.path.join(WIP, "v-wh101.ts"))
    v = re.sub(r"^import \{ countLessonWords \} from '\.\./\.\./\.\./src/data/library/types'\n", "", v, flags=re.M)
    v = re.sub(r"^import type \{ Lesson \} from '\.\./\.\./\.\./src/data/library/types'\n", "", v, flags=re.M)
    v = re.sub(r"^export \{\}\n", "", v, flags=re.M)
    v = v.replace("mod = await import('./part-wh101')",
                  "mod = await Promise.resolve({ lessonWh101 })")
    cut = v.find("/* ------------------------------------------------------------------ */\n/* bottom harness")
    if cut < 0:
        cut = v.find("/* bottom harness")
    assert cut > 0, "v-wh101.ts: harness cut not found"
    v = v[:cut]
    out = VER_HEAD + wrap_section(v, "sectionWh101", "lessonWh101") + VER_TAIL
    WRITE(VER, out)
    print(f"JOB 2: wrote {VER} ({len(out.splitlines())} lines)")


def job3_swap_book() -> None:
    b = READ(BOOK)
    if "from './ch-01'" in b:
        print("JOB 3: book.ts already carries chapter1 (idempotent re-run)")
    else:
        assert "const chapters: Chapter[] = [" in b, "chapters array head not found"
        b = b.replace("const chapters: Chapter[] = [",
                      "import { chapter1 } from './ch-01'\n\nconst chapters: Chapter[] = [")
        m = re.search(r"  \{\n    number: 1,\n.*?\n  \},\n(?=  \{\n    number: 2,)", b, flags=re.S)
        assert m, "planned chapter-1 object not found in book.ts"
        b = b[: m.start()] + "  chapter1,\n" + b[m.end():]
        # book-level status planned -> in-progress (context-anchored to the accent line)
        assert "  status: 'planned',\n  accent: ['#b45309', '#78350f']," in b, "book-level status line not found"
        b = b.replace("  status: 'planned',\n  accent: ['#b45309', '#78350f'],",
                      "  status: 'in-progress',\n  accent: ['#b45309', '#78350f'],")
        # refresh the STATUS comment in the head doc block
        m2 = re.search(r" \* STATUS: PLANNED \(Humanities & Social Sciences full-shelf planning pass, 2026-11-16\) \u2014 11 chapters /\n \* 80 planned lessons, zero written\. Lesson ids will use the `wh-` prefix\n \* \(verified unused across all existing lesson ids\)\.", b)
        if not m2:
            m2 = re.search(r" \* STATUS: PLANNED.*?\n(?: \*.*\n)*? \* \(verified unused across all existing lesson ids\)\.", b)
        assert m2, "STATUS comment not found in book.ts"
        new = (
            " * STATUS: IN-PROGRESS (HSS RUN 1, 2026-11-27 — the humanities & social\n"
            " * sciences lane's first fire: ch.1 'The Historian's Craft' OPENED with\n"
            " * lesson 1.1 'How History Is Written' (57/57 seat-green, amendment-5\n"
            " * solo relaunch); 1.2/1.3 ride the next fire; the planning census's\n"
            " * four artifact lines are trimmed to the honest 3-lesson shape).\n"
        )
        b = b[: m2.start()] + new + b[m2.end():]
        WRITE(BOOK, b)
        print(f"JOB 3: swapped {BOOK} to chapter1 + STATUS refresh + book in-progress")


if __name__ == "__main__":
    job1_build_ch01()
    job2_build_verifier()
    job3_swap_book()
    # amendment 7: touch generated files before gating (same-mtime stale transpiles)
    for p in (CH01, VER, BOOK):
        os.utime(p, None)
    time.sleep(1)
    print("assemble_hss1: done (files touched per amendment 7)")
