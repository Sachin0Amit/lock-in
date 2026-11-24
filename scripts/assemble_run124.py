#!/usr/bin/env python3
"""assemble_run124.py — the RUN 124 assembler for the LockIn Library repo.

Opens GEOMETRY (book #5 of the mathematics shelf) chapter 1 'Points, Lines
and Planes: the Axiomatic Idea' from the two verified part files (1.1 +
1.2, delivered by the run-124 swarm at 100/100 and 86/86 green). The
chapter ships IN-PROGRESS: lessons 1.3 + 1.4 deferred to run 125 per the
protocol's time-budget law (their specs + the pin checker are preserved
in docs/research/geo-ch01-wip/ for the resumption).

  JOB 1  build src/.../geometry/ch-01.ts   (two lessons + chapter export,
                                           C/FONT renamed per part tag)
  JOB 2  build scripts/verify-book5-ch01.ts
                                           (the two v-files wrapped whole
                                           as async sections — engines
                                           re-run, pins re-reading the
                                           SHIPPED chapter — plus Z: the
                                           in-progress chapter census)
  JOB 3  swap book.ts                      (chapter1 import replaces the
                                           planned inline object; book
                                           status 'planned' -> 'in-progress')

Run:  cd /home/z/my-project && python3 scripts/assemble_run124.py
"""

import os
import re

ROOT = "/home/z/my-project"
GEO = os.path.join(ROOT, "src/data/library/books/mathematics/geometry")
TR = os.path.join(ROOT, "temporary-references")
CH01 = os.path.join(GEO, "ch-01.ts")
BOOK = os.path.join(GEO, "book.ts")
VER = os.path.join(ROOT, "scripts/verify-book5-ch01.ts")

READ = lambda p: open(p, encoding="utf-8").read()
WRITE = lambda p, s: open(p, "w", encoding="utf-8").write(s)

C_PROPS = [
    "struct", "ink", "mid", "teal", "tealInk", "conn", "accent", "warn",
    "panelA", "panelB", "faint", "white",
]


def strip_import(text: str) -> str:
    return re.sub(
        r"^import type \{ Lesson \} from '\.\./src/data/library/types'\n",
        "",
        text,
        flags=re.M,
    )


def rename_palette(text: str, tag: str) -> tuple[str, int]:
    """Rename `const C` -> `const c<tag>` and `const FONT` -> `const f<tag>`,
    replacing EVERY exact `C.<prop>` property read (word-boundary + dot; prose
    like C(n,2) is untouched) and the whole-word FONT."""
    n = 0
    text = text.replace("const C = {", f"const c{tag} = {{")
    n += 1
    n += len(re.findall(r"\bC\.", text))
    text = re.sub(r"\bC\.", f"c{tag}.", text)
    text = re.sub(r"\bFONT\b", f"f{tag}", text)
    return text, n


# geo102 shipped a cool-tone palette (blue/purple/pink/navy) — a violation of
# the vivid-palette law (warm hues only; never blue/indigo). Caught at the
# integration seam by the orchestrator's audit; remapped here onto the
# BOOK_FORMAT vivid table, role by role. In-table hexes pass through.
VIVID_REMAP = {
    "#1B2A4A": "#166534",  # navy ink -> rich green ink
    "#475569": "#65a30d",  # slate -> bright lime (mid text)
    "#2563EB": "#16a34a",  # blue -> vivid green (structure)
    "#1D4ED8": "#0f766e",  # blueDeep -> teal ink
    "#7C3AED": "#ea580c",  # purple -> vivid orange (accent)
    "#F59E0B": "#d97706",  # amberVivid -> bright amber
    "#059669": "#16a34a",  # emerald -> vivid green
    "#DB2777": "#dc2626",  # pink -> vivid red
    "#DBEAFE": "#ffedd5",  # blueSoft -> orange-100 panel
    "#CCFBF1": "#5eead4",  # tealSoft -> teal-300 faint
    "#EDE9FE": "#fef3c7",  # purpleSoft -> amber-100 panel
    "#FEE2E2": "#ffedd5",  # redSoft -> orange-100 panel
    "#D1FAE5": "#fef3c7",  # greenSoft -> amber-100 panel
    "#E2E8F0": "#fcd34d",  # slateSoft -> amber-300 separators
    "#FFFFFF": "#fffdf5",  # paper -> the light paper plate
}


def remap_vivid(text: str) -> int:
    n = 0
    for old, new in VIVID_REMAP.items():
        cnt = text.count(old)
        n += cnt
        text = text.replace(old, new)
        text = text.replace(old.lower(), new)
    return text, n


CHAPTER_HEAD = """import type { Chapter, Lesson } from '../../../types'

/**
 * Geometry — chapter 1 "Points, Lines and Planes: the Axiomatic Idea"
 * (OPENED by the RUN 124 whole-chapter swarm, 2026-11-25: lessons 1.1 and
 * 1.2 delivered whole by the authoring agents geo101 and geo102 —
 * engines 100/100 and 86/86 green BEFORE prose; 7,532 and 8,524 words;
 * the ~2-hour run cap arrived with 1.3 + 1.4 unauthored after three
 * agent rounds, so per the protocol's time-budget law the completed
 * lessons SHIP and the remainder RIDES THE NEXT FIRE — never thinned,
 * never half-gated. The specs, the pre-flight pin checker and the two
 * green v-harnesses are preserved in docs/research/geo-ch01-wip/ for
 * the run-125 resumption.)
 *
 * PROVENANCE: ground = the run-124 web-verified research pass (Euclid's
 * Elements Book I census via Joyce's clarku edition; Hilbert's
 * Grundlagen axiom listing; Playfair 1795; Saccheri 1733 / Lobachevsky
 * 1829 / Bolyai 1832 chronology; the Fano-plane census; de Bruijn–Erdős
 * 1948) — every URL banked in docs/project/SOURCE_LOG.md under the
 * geo-* keys. STUDY-NEVER-REPRODUCE absolute: every roster, witness,
 * figure, Illustration, quiz item and exercise below is OUR OWN,
 * engine-pinned in scripts/verify-book5-ch01.ts (which re-runs both
 * verify-first harnesses against THIS file and closes with the
 * in-progress chapter census).
 */
"""

CHAPTER_TAIL = """

export const chapter1: Chapter = {
  number: 1,
  slug: 'points-lines-and-planes',
  title: 'Points, Lines and Planes: the Axiomatic Idea',
  summary:
    'Geometry restarts from zero — not from shapes but from RULES. The undefined words (point, line, plane), the definitions that ride on them, and Euclid\\u2019s five postulates as the rules of the game. The reader meets the axiomatic method itself: a statement is believed only when proved, and everything before the first proof is either an agreement or a promise. Foundation Mathematics 8\\u2019s shape vocabulary is recalled as the intuition this structure formalises.',
  status: 'in-progress',
  lessons: [lessonGeo101, lessonGeo102],
  plannedLessons: [
    'Axioms, Theorems and the Shape of a Proof',
    'Incidence: how Points, Lines and Planes Interlock',
  ],
}
"""


def job1_build_ch01() -> None:
    parts = []
    for fname, tag in [("part-geo101.ts", "101"), ("part-geo102.ts", "102")]:
        text = READ(os.path.join(TR, fname))
        text = strip_import(text)
        text, n = rename_palette(text, tag)
        if tag == "102":
            text, m = remap_vivid(text)
            print(f"   {fname}: vivid-palette remap ({m} hex reads)")
        print(f"   {fname}: palette renamed ({n} property reads)")
        parts.append(text.strip("\n") + "\n")
    out = CHAPTER_HEAD + "\n".join(parts) + CHAPTER_TAIL
    WRITE(CH01, out)
    print(f"JOB 1: wrote {CH01} ({len(out.splitlines())} lines)")


VER_HEAD = """import { chapter1, lessonGeo101, lessonGeo102 } from '../src/data/library/books/mathematics/geometry/ch-01'
import { geometry } from '../src/data/library/books/mathematics/geometry/book'
import { countLessonWords, type Lesson } from '../src/data/library/types'
import { existsSync, readFileSync } from 'node:fs'

export {}

/**
 * verify-book5-ch01.ts — the chapter verifier for GEOMETRY (book #5),
 * chapter 1 "Points, Lines and Planes: the Axiomatic Idea" (run 124
 * opened the book: 1.1 + 1.2 shipped whole, 1.3 + 1.4 deferred to run
 * 125 per the time-budget law). VERIFY-FIRST per the standing protocol:
 * each lesson's ENGINE section ran green BEFORE its prose was declared
 * done — by the authoring agent against its part file — and the PIN
 * sections here RE-READ THE SHIPPED CHAPTER (the part imports redirected
 * to ch-01.ts).
 *
 *   (geo101) 1.1 engines + pins    (geo102) 1.2 engines + pins
 *   (Z)      the in-progress chapter census — the honest 2 + 2 shape
 *
 * Assembled by scripts/assemble_run124.py: each v-file wrapped whole as
 * one async section (its local collectors/helpers stay function-scoped,
 * so nothing collides); the only edits are the documented import
 * redirects and the verdict-block swaps.
 */

type SectionResult = { id: string; pass: number; fail: number }

const CH01_SRC = new URL('../src/data/library/books/mathematics/geometry/ch-01.ts', import.meta.url).pathname

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
  z('Z01 chapter number is 1', chapter1.number === 1)
  z('Z02 chapter slug', chapter1.slug === 'points-lines-and-planes', chapter1.slug)
  z('Z03 chapter status in-progress', chapter1.status === 'in-progress', chapter1.status)
  z('Z04 two lessons shipped', chapter1.lessons.length === 2, String(chapter1.lessons.length))
  z('Z05 two lessons planned', (chapter1.plannedLessons ?? []).length === 2, String((chapter1.plannedLessons ?? []).length))
  z('Z06 planned titles exact', JSON.stringify(chapter1.plannedLessons) === JSON.stringify(['Axioms, Theorems and the Shape of a Proof', 'Incidence: how Points, Lines and Planes Interlock']), (chapter1.plannedLessons ?? []).join(' | '))
  const ids = chapter1.lessons.map((l) => l.id)
  z('Z07 lesson ids in teaching order', JSON.stringify(ids) === JSON.stringify(['geo-the-undefined-words-and-the-defined-ones', 'geo-euclids-five-postulates-the-rules-of-the-game']), ids.join(','))
  const nums = chapter1.lessons.map((l) => l.number)
  z('Z08 lesson numbers 1.1, 1.2', JSON.stringify(nums) === JSON.stringify(['1.1', '1.2']), nums.join(','))
  const wcs = chapter1.lessons.map((l) => countLessonWords(l))
  console.log(`  Z word counts: ${wcs.join(', ')}`)
  z('Z09 word floors (>= 6000 each)', wcs.every((w) => w >= 6000), wcs.join(', '))
  for (const [i, l] of chapter1.lessons.entries()) {
    z(`Z10.${i + 1} quiz block present`, l.blocks.some((b) => b.kind === 'quiz'))
    z(`Z11.${i + 1} exercises block present`, l.blocks.some((b) => b.kind === 'exercises'))
    z(`Z12.${i + 1} terms + formula cards present`, l.blocks.some((b) => b.kind === 'terms') && l.blocks.some((b) => b.kind === 'formula'))
    z(`Z13.${i + 1} prerequisites exact`, JSON.stringify(l.prerequisites ?? []) === JSON.stringify(i === 0 ? [] : ['geo-the-undefined-words-and-the-defined-ones']), JSON.stringify(l.prerequisites ?? []))
  }
  z('Z14 the shipped source exists', existsSync(CH01_SRC))
  const shippedText = readFileSync(CH01_SRC, 'utf8')
  z('Z15 the shipped source exports both lessons', ['lessonGeo101', 'lessonGeo102'].every((n) => shippedText.includes(`export const ${n}`)))

  // ---- the book census (the honest in-progress shape) ----
  z('Z16 book status in-progress', geometry.status === 'in-progress', geometry.status)
  z('Z17 twelve chapters planned', geometry.chapters.length === 12, String(geometry.chapters.length))
  z('Z18 chapter 1 carries the shipped lessons', geometry.chapters[0].lessons.length === 2, String(geometry.chapters[0].lessons.length))
  z('Z19 chapters 2-12 still planned', geometry.chapters.slice(1).every((c) => c.status === 'planned'))
  z('Z20 the geo- prefix in use', ids.every((id) => id.startsWith('geo-')))
  z('Z21 every lesson carries a real body', chapter1.lessons.every((l) => l.blocks.length >= 10))
  const bookWords = chapter1.lessons.reduce((m, l) => m + countLessonWords(l), 0)
  console.log(`  Z shipped chapter word count: ${bookWords}`)
  z('Z22 the shipped body is non-trivial (> 12,000 words)', bookWords > 12000, String(bookWords))
  return { id: 'Z', pass, fail }
}

/* ================================================================== */
/* runner                                                              */
/* ================================================================== */
async function main(): Promise<void> {
  const results: SectionResult[] = [
    await sectionGeo101(),
    await sectionGeo102(),
    await sectionZ(),
  ]
  console.log('')
  console.log('================ verify-book5-ch01: verdict ================')
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
  console.log('RESULT: ALL GREEN — chapter 1 shipped in-progress (1.1 + 1.2 whole; 1.3 + 1.4 deferred to run 125).')
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
    return f"async function {fn_name}(): Promise<SectionResult> {{\n{body}\n{tail}\n}}\n\n"


def job2_build_verifier() -> None:
    sections = []
    for key, lesson in [("geo101", "lessonGeo101"), ("geo102", "lessonGeo102")]:
        v = READ(os.path.join(TR, f"v-{key}.ts"))
        v = re.sub(r"^import \{ countLessonWords \} from '\.\./src/data/library/types'\n", "", v, flags=re.M)
        v = re.sub(r"^import type \{ Lesson \} from '\.\./src/data/library/types'\n", "", v, flags=re.M)
        v = v.replace(f"mod = await import('./part-{key}')",
                      f"mod = await Promise.resolve({{ {lesson} }})")
        cut = v.find("/* ------------------------------------------------------------------ */\n/* bottom harness")
        assert cut > 0, f"{key} harness cut not found"
        v = v[:cut]
        sections.append(wrap_section(v, f"section{key.capitalize()}", lesson))
    out = VER_HEAD + "\n".join(sections) + VER_TAIL
    WRITE(VER, out)
    print(f"JOB 2: wrote {VER} ({len(out.splitlines())} lines)")


def job3_swap_book() -> None:
    b = READ(BOOK)
    if "from './ch-01'" in b:
        print("JOB 3: book.ts already swapped — verifying status flips")
        assert b.count("  chapter1,") == 1
        assert "status: 'in-progress',\n  accent: ['#d97706', '#b45309']," in b
        print("JOB 3: verified (import present, book in-progress)")
        return
    b = b.replace(
        "import type { Book, Chapter } from '../../../types'",
        "import type { Book, Chapter } from '../../../types'\nimport { chapter1 } from './ch-01'",
        1,
    )
    # replace the ch.1 inline planned object with the chapter1 import
    m = re.search(
        r"  \{\n    number: 1,\n    slug: 'points-lines-and-planes',.*?\n  \},\n",
        b,
        flags=re.S,
    )
    assert m, "chapter 1 inline object not found"
    b = b[: m.start()] + "  chapter1,\n" + b[m.end():]
    # book status flip + status comment refresh
    b = b.replace(" * STATUS: PLANNED (full-shelf planning pass, 2026-11-10) — 12 chapters /\n * 50 planned lessons, zero written.",
                  " * STATUS: IN-PROGRESS (run 124, 2026-11-25 — chapter 1 opened whole:\n * 1.1 + 1.2 shipped by the authoring swarm, 1.3 + 1.4 ride run 125).\n * Planning pass 2026-11-10: 12 chapters / 50 planned lessons.")
    b = b.replace("  status: 'planned',\n  accent: ['#d97706', '#b45309'],",
                  "  status: 'in-progress',\n  accent: ['#d97706', '#b45309'],")
    WRITE(BOOK, b)
    print(f"JOB 3: swapped {BOOK} (chapter1 import + in-progress status)")


if __name__ == "__main__":
    job1_build_ch01()
    job2_build_verifier()
    job3_swap_book()
    print("assemble_run124: done")
