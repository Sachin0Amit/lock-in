#!/usr/bin/env python3
"""assemble-aa-swarm.py — the Task A assembler for the PARALLEL-SWARM RUN II
(2026-11-20) in the LockIn Library repo /home/z/my-project.

Assembles the nine authoring agents' banked part files into the shipped
artifacts, mechanically, per the standing precedent (the 2026-11-18 swarm's
scripts/verify-book4-ch04.ts + ch-04.ts + book.ts swap):

  JOB 1  close src/.../ch-05.ts      (insert lesson56 + lessonReview5, close the chapter)
  JOB 2  build src/.../ch-06.ts      (new file, the seven ch.6 lessons in teaching order)
  JOB 3  swap book.ts                (chapter06 import replaces the inline planned object)
  JOB 4  extend scripts/verify-book4-ch05.ts  (SECTION KX + SECTION M + K7.3 title fix + runner)
  JOB 5  build scripts/verify-book4-ch06.ts   (sections A–N from v6-*.ts + census Z + runner)
  JOB 6  move the nine e2e pairs to scripts/ (PAGE_JS_PATH updated, +x)

The agents' check bodies keep their logic IDENTICAL: the only mechanical
edits are the documented strips (imports / export {} / duplicate harness /
export tails) and the ENGINE→letter, PINS→letter array renames (each
agent's engine+pins body is kept inside one block scope, so its local
helper identifiers — fact / C / P / near / expand / F / ... — stay
file-local and never collide; the ch-04 precedent scopes each agent's body
inside `function sectionX(L)`, this assembly uses the equivalent block).

Run:  cd /home/z/my-project && python3 scripts/assemble-aa-swarm.py
"""

import os
import re
import sys

ROOT = "/home/z/my-project"
AA = os.path.join(ROOT, "src/data/library/books/mathematics/advanced-algebra")
CH05 = os.path.join(AA, "ch-05.ts")
CH06 = os.path.join(AA, "ch-06.ts")
BOOK = os.path.join(AA, "book.ts")
VCH05 = os.path.join(ROOT, "scripts/verify-book4-ch05.ts")
VCH06 = os.path.join(ROOT, "scripts/verify-book4-ch06.ts")
W5 = os.path.join(ROOT, "scripts/aa-ch05-work")
W6 = os.path.join(ROOT, "scripts/aa-ch06-work")

READ = lambda p: open(p, encoding="utf-8").read()
WRITE = lambda p, s: open(p, "w", encoding="utf-8").write(s)

# ---------------------------------------------------------------- helpers

HARNESS_INTERFACE = (
    "export interface SectionCheck {\n"
    "  name: string\n"
    "  ok: boolean\n"
    "  detail?: string\n"
    "}\n"
    "\n"
)
HARNESS_CHECK = (
    "function check(name: string, ok: boolean, detail?: string): SectionCheck {\n"
    "  return ok ? { name, ok: true } : { name, ok: false, detail }\n"
    "}\n"
    "\n"
)
HARNESS_COUNTKIND = (
    "function countKind(L: Lesson, kind: string): number {\n"
    "  return L.blocks.filter((b) => b.kind === (kind as never)).length\n"
    "}\n"
    "\n"
)
HARNESS_BANNER = (
    "/* ------------------------------------------------------------------ */\n"
    "/* harness                                                             */\n"
    "/* ------------------------------------------------------------------ */\n"
    "\n"
)
EXPORTS_BANNER = (
    "/* ------------------------------------------------------------------ */\n"
    "/* exports                                                             */\n"
    "/* ------------------------------------------------------------------ */\n"
    "\n"
)


def strip_common(text: str) -> str:
    """Strip the part-file line-1 import, `export {}` lines, and blank runs."""
    lines = text.split("\n")
    out = []
    for ln in lines:
        if ln.startswith("import type { Lesson } from '../../src/data/library/types'"):
            continue
        if ln == "export {}":
            continue
        out.append(ln)
    return "\n".join(out)


def cut_export_tails(text: str) -> str:
    """Cut everything from the first `export const ENGINE_` / `export {` tail."""
    m = re.search(r"^export (const ENGINE_|const PINS_|const ALL_|const LESSON_|\{)", text, re.M)
    if m:
        text = text[: m.start()]
    # also cut a dangling `/* exports */` banner directly above the cut
    if text.rstrip().endswith("*/") and EXPORTS_BANNER.strip() in text:
        idx = text.rstrip().rfind(EXPORTS_BANNER.strip())
        if idx != -1 and text[idx + len(EXPORTS_BANNER.strip()):].strip() == "":
            text = text[:idx]
    return text.rstrip() + "\n"


# ---------------------------------------------------------------- JOB 1

def job1_close_ch05() -> None:
    print("== JOB 1: closing ch-05.ts ==")
    src = READ(CH05)

    l56 = READ(os.path.join(W5, "l5-6.ts"))
    l5r = READ(os.path.join(W5, "l5-R.ts"))

    for name, part in (("l5-6.ts", l56), ("l5-R.ts", l5r)):
        assert part.split("\n")[0] == "import type { Lesson } from '../../src/data/library/types'", name
    l56 = strip_common(l56)
    l5r = strip_common(l5r)
    l56 = l56.replace("export const lesson56: Lesson = {", "const lesson56: Lesson = {", 1)
    l5r = l5r.replace("export const lessonReview5: Lesson = {", "const lessonReview5: Lesson = {", 1)
    assert "export {" not in l56 and "export const" not in l56
    assert "export {" not in l5r and "export const" not in l5r

    anchor = "\nexport const chapter05: Chapter = {"
    assert src.count(anchor) == 1
    src = src.replace(anchor, "\n" + l56.rstrip() + "\n\n" + l5r.rstrip() + "\n" + anchor, 1)

    # chapter object: lessons array, plannedLessons, status
    old_lessons = "  lessons: [lesson51, lesson52, lesson53, lesson54, lesson55],"
    assert src.count(old_lessons) == 1
    src = src.replace(
        old_lessons,
        "  lessons: [lesson51, lesson52, lesson53, lesson54, lesson55, lesson56, lessonReview5],",
        1,
    )
    old_planned = "  plannedLessons: [\n    'Recurring Series and the Scale of Relation',\n  ],"
    assert src.count(old_planned) == 1
    src = src.replace(old_planned, "  plannedLessons: [],", 1)
    assert src.count("  status: 'in-progress',") == 1
    src = src.replace("  status: 'in-progress',", "  status: 'complete',", 1)

    # header comment: STATUS paragraph + the closing serial-order paragraph
    old_status = (
        " * STATUS: IN-PROGRESS — lessons 5.1 and 5.2 authored this run (run 111,\n"
        " * 2026-11-19); lessons 5.3–5.6 remain planned on the one-unit-at-a-time\n"
        " * cadence. Ground: the Drive `MATHS/M2 Algebra :: 05. Progression and\n"
    )
    new_status = (
        " * STATUS: COMPLETE — the unit is closed. Runs 111–113 (2026-11-19/20,\n"
        " * the single-job hourly cadence) authored lessons 5.1–5.5 in strict\n"
        " * serial order; THIS run (the PARALLEL-SWARM RUN II — owner chat\n"
        " * directive \"launch multiple authoring agents swarm\") authored the\n"
        " * closing pair 5.6 + 5.R as banked part files and closed the unit.\n"
        " * Ground: the Drive `MATHS/M2 Algebra :: 05. Progression and\n"
    )
    assert src.count(old_status) == 1, "ch-05 STATUS header anchor not found"
    src = src.replace(old_status, new_status, 1)

    old_serial = (
        " * The lesson consts below are appended by the run in strict serial order\n"
        " * (the single-job rule — the 2026-11-18 parallel-swarm variant does not\n"
        " * apply to this run): lesson 5.1 first, then lesson 5.2, gates per lesson.\n"
    )
    new_serial = (
        " * The lesson consts 5.1–5.5 were appended in strict serial order by the\n"
        " * single-job runs 111–113 (the 2026-11-18 parallel-swarm variant did not\n"
        " * apply to those runs); THIS run's PARALLEL-SWARM RUN II authored the\n"
        " * closing pair (5.6 + 5.R) as part files and the orchestrator assembled\n"
        " * them here, gates per section.\n"
    )
    assert src.count(old_serial) == 1, "ch-05 serial-order header anchor not found"
    src = src.replace(old_serial, new_serial, 1)

    # summary final clause
    old_clause = "the recurring series close the chapter on the next run."
    assert src.count(old_clause) == 1
    src = src.replace(old_clause, "the recurring series closed the chapter (5.6).", 1)

    WRITE(CH05, src)
    print(f"   ch-05.ts closed: {len(src.splitlines())} lines")


# ---------------------------------------------------------------- JOB 2

CH06_LESSONS = [
    ("l6-1.ts", "lesson61", "const lesson61: Lesson = {"),
    ("l6-2.ts", "lesson62", "export const lesson62: Lesson = {"),
    ("l6-3.ts", "lesson63", "export const lesson63: Lesson = {"),
    ("l6-4.ts", "lesson64", "export const lesson64: Lesson = {"),
    ("l6-5.ts", "lesson65", "export const lesson65: Lesson = {"),
    ("l6-6.ts", "lesson66", "export const lesson66: Lesson = {"),
    ("l6-R.ts", "lessonReview6", "const lessonReview6: Lesson = {"),
]

# top-level declarations that must be unique across the concatenated bodies
CH06_TOP_DECLS = re.compile(r"^(?:const|function|let|var) ([A-Za-z_$][\w$]*)", re.M)


def job2_build_ch06() -> None:
    print("== JOB 2: building ch-06.ts ==")
    bodies = []
    top_names = {}
    for fname, const, decl in CH06_LESSONS:
        part = READ(os.path.join(W6, fname))
        assert part.split("\n")[0] == "import type { Lesson } from '../../src/data/library/types'", fname
        part = strip_common(part)
        # normalize `export const lessonXX` -> `const lessonXX`
        if decl.startswith("export "):
            assert part.count(decl) == 1, fname
            part = part.replace(decl, decl[len("export "):], 1)
        # strip trailing `export { ... }` statements
        part = re.sub(r"\nexport \{[^}]*\}\s*$", "\n", part.rstrip() + "\n")
        assert not re.search(r"^export ", part, re.M), fname
        part = part.lstrip("\n")
        # census of top-level declarations across bodies
        for m in CH06_TOP_DECLS.finditer(part):
            n = m.group(1)
            top_names.setdefault(n, []).append(fname)
        bodies.append(part.rstrip())

    dups = {n: f for n, f in top_names.items() if len(f) > 1}
    assert not dups, f"top-level name collisions across ch-06 bodies: {dups}"
    print(f"   top-level names across the seven bodies: {len(top_names)}, collisions: 0")

    # book.ts's inline ch.6 summary, verbatim
    book = READ(BOOK)
    m = re.search(
        r"  \{\n    number: 6,\n    slug: 'counting-permutations-combinations',\n"
        r"    title: 'Counting: Permutations and Combinations',\n"
        r"    summary:\n(.*?),\n    status: 'planned',",
        book,
        re.S,
    )
    assert m, "book.ts ch.6 summary anchor not found"
    summary_text = m.group(1).strip()  # the indented single-line string literal
    assert summary_text.startswith("'") and summary_text.endswith("'")

    # honest word census via bun later; header uses the engines' pinned counts
    header = """import type { Chapter, Lesson } from '../../../types'

/**
 * Advanced Algebra — chapter 6 "Counting: Permutations and Combinations"
 * (the PARALLEL-SWARM RUN II closed the unit whole, 2026-11-20).
 *
 * PROVENANCE: the 2026-11-18 owner chat directive "launch multiple agents
 * for authoring lessons", honored a SECOND time (the 2026-11-18 ch. 4
 * swarm is the precedent): seven parallel authoring agents — six lessons
 * + the review — authored the unit as part files under
 * scripts/aa-ch06-work/ per the standing master plan
 * docs/research/AA_CH06_MASTER_PLAN.md (§2 pins the teaching order below,
 * §5 the architecture), and the orchestrator (this assembly) merged the
 * seven parts into this ONE self-contained chapter file (the
 * one-file-per-chapter layout the content-completeness audit reads),
 * emptied plannedLessons and closed the book wiring.
 *
 * Ground: the Drive `MATHS/M2 Algebra :: 07. Permutation and Combination`
 * module (citation key `cengage-m2-07`, Drive id
 * `1689UZ9q8ctrhiBtWLNLBpKCcHUQzS-me`, 67.8 MB scanned, 74 PDF pages) —
 * vision-transcribed with the page offset PROVEN from two independent
 * kinds of takes (printed 7.N = PDF N+2, the same offset the
 * m2-02/-03/-05/-06 modules carry) + the banked web canon (NCERT class 11
 * ch. 6 "Permutations and Combinations", the JEE (Main) 2026 syllabus,
 * Hall & Knight Higher Algebra ch. XI, Khattar QA 4e, OpenStax College
 * Algebra 2e). STUDY-NEVER-REPRODUCE honored: the module informed method
 * shapes only; every roster, exhibit, number, figure, quiz item and
 * exercise below is OUR OWN, recomputed by the agents' engines and re-run
 * against this file by scripts/verify-book4-ch06.ts (sections A–N + the
 * assembler's census Z).
 *
 * LESSON CENSUS (the teaching order the master plan §2 pins — book.ts's
 * plannedLessons ARRAY order was non-pedagogical, an artifact of the
 * 2026-11-17 insertion pass; the order below is the pedagogical order:
 * the fundamental principle first, factorials as the bookkeeping, then
 * the two great counts, the restrictions, the selection engine, and the
 * puzzle room where they interlock):
 *   6.1 "The Fundamental Principle of Counting"      (agent 6-a; engines A/B 38+15)
 *   6.2 "Factorials and the Counting Toolkit"        (agent 6-b; engines C/D 77+35)
 *   6.3 "Permutations: the Arrangement Count"       (agent 6-c; engines E/F 69+30)
 *   6.4 "Circular and Restricted Permutations"      (agent 6-d; engines G/H 46+35)
 *   6.5 "Combinations: the Selection Count"         (agent 6-e; engines I/J 87+37)
 *   6.6 "Distributions and the Classic Counting Puzzles" (agent 6-f; engines K/L 52+42)
 *   6.R "Unit 6 Completion Review"                  (agent 6-g; engines M/N 94+34)
 * Seven lessons; every lesson's engine green before its prose was
 * declared done (the run records live in the part-file headers below,
 * kept verbatim); the honest word count and totals are re-run by the
 * verifier's census section Z.
 */

"""

    chapter_tail = (
        "\nexport const chapter06: Chapter = {\n"
        "  number: 6,\n"
        "  slug: 'counting-permutations-combinations',\n"
        "  title: 'Counting: Permutations and Combinations',\n"
        "  summary:\n"
        "    " + summary_text + ",\n"
        "  status: 'complete',\n"
        "  lessons: [lesson61, lesson62, lesson63, lesson64, lesson65, lesson66, lessonReview6],\n"
        "  plannedLessons: [],\n"
        "}\n"
    )

    WRITE(CH06, header + "\n\n".join(bodies) + "\n" + chapter_tail)
    out = READ(CH06)
    print(f"   ch-06.ts built: {len(out.splitlines())} lines")


# ---------------------------------------------------------------- JOB 3

def job3_swap_book() -> None:
    print("== JOB 3: swapping book.ts ==")
    book = READ(BOOK)

    # import + chapters-array swap
    assert book.count("import { chapter05 } from './ch-05'\n") == 1
    book = book.replace(
        "import { chapter05 } from './ch-05'\n",
        "import { chapter05 } from './ch-05'\nimport { chapter06 } from './ch-06'\n",
        1,
    )
    m = re.search(
        r"  \{\n    number: 6,\n    slug: 'counting-permutations-combinations',\n"
        r".*?  \},\n",
        book,
        re.S,
    )
    assert m, "book.ts inline ch.6 object not found"
    book = book[: m.start()] + "  chapter06,\n" + book[m.end():]

    # STATUS header recount (honest: 9 + 5 + 6 + 7 + 7 + 7 = 41 written; 22 planned)
    old_status = (
        " * STATUS: IN-PROGRESS — four chapters COMPLETE, chapters 5-10 planned.\n"
        " * Chapters 1 (Relations and Functions: 8 lessons + 1.R review, 9 written\n"
        " * total), 2 (The Quadratic at Depth: 4 + 2.R), 3 (Complex Numbers: the\n"
        " * New Rung: 5 + 3.R) and 4 (Inequalities: the Classical Engine: 6 + 4.R)\n"
        " * are fully written and gated — 27 written lessons in all; the remaining\n"
        " * 34 planned lessons (chapters 5-10) author on the one-unit-at-a-time\n"
        " * cadence (run 110 closed chapter 3; the 2026-11-18 PARALLEL-SWARM RUN —\n"
        " * owner chat directive \"launch multiple agents for authoring lessons\" —\n"
        " * closed chapter 4 whole-unit in one pass: six parallel lesson agents + a\n"
        " * review agent + orchestrator assembly/gates, recorded in WORKLOG and\n"
        " * docs/research/AA_CH04_MASTER_PLAN.md). Lesson ids use the `aa-` prefix\n"
    )
    new_status = (
        " * STATUS: IN-PROGRESS — SIX chapters COMPLETE (chapters 1–6, each with\n"
        " * its unit review), chapters 7–10 planned. Chapters 1 (Relations and\n"
        " * Functions: 8 lessons + 1.R review, 9 written total), 2 (The Quadratic\n"
        " * at Depth: 4 + 2.R, 5 written), 3 (Complex Numbers: the New Rung: 5 +\n"
        " * 3.R, 6 written), 4 (Inequalities: the Classical Engine: 6 + 4.R, 7\n"
        " * written), 5 (Sequences and Series: 6 + 5.R, 7 written) and 6\n"
        " * (Counting: Permutations and Combinations: 6 + 6.R, 7 written) are\n"
        " * fully written and gated — 41 written lessons in all; the remaining 22\n"
        " * planned lessons (chapters 7–10: 6 + 6 + 6 + 4) author on the\n"
        " * one-unit-at-a-time cadence (run 110 closed chapter 3; the 2026-11-18\n"
        " * PARALLEL-SWARM RUN — owner chat directive \"launch multiple agents for\n"
        " * authoring lessons\" — closed chapter 4 whole-unit; THIS run's\n"
        " * PARALLEL-SWARM RUN II — owner chat directive \"launch multiple\n"
        " * authoring agents swarm\" — closed chapter 5's remainder (5.6 + 5.R)\n"
        " * and chapter 6 whole-unit, recorded in WORKLOG and\n"
        " * docs/research/AA_CH06_MASTER_PLAN.md). Lesson ids use the `aa-` prefix\n"
    )
    assert book.count(old_status) == 1, "book.ts STATUS header anchor not found"
    book = book.replace(old_status, new_status, 1)

    WRITE(BOOK, book)
    print(f"   book.ts swapped: {len(book.splitlines())} lines")


# ---------------------------------------------------------------- JOB 4

KX_SECTION = '''
/* ------------------------------------------------------------------ */
/* SECTION KX — 5.6 K-ext literals (the agent 5-a K-ext additions,      */
/* appended by the PARALLEL-SWARM RUN II assembly; each self-contained) */
/* ------------------------------------------------------------------ */

const KX: SectionCheck[] = []
{
  const push = (name: string, ok: boolean) => KX.push(check(name, ok))
  const expand = (num: number[], den: number[], terms: number): number[] => {
    if (den[0] !== 1) throw new Error('denominator must be monic in this helper')
    const c: number[] = []
    for (let n = 0; n < terms; n++) {
      let acc = n < num.length ? num[n] : 0
      for (let i = 1; i <= Math.min(den.length - 1, n); i++) acc -= den[i] * c[n - i]
      c.push(acc)
    }
    return c
  }
  const F = (n: number): number => { let a = 0, b = 1; for (let i = 0; i < n; i++) { [a, b] = [b, a + b] } return a }
  push('KX1 family C generating function numerator 2 − 5x: (2 − 5x)/(1 − 5x + 6x²) expands to 2, 5, 13, 35, 97, 275, 793', (() => { const c = expand([2, -5], [1, -5, 6], 7); return c.join(',') === '2,5,13,35,97,275,793' })())
  push('KX2 family C sum of the first six terms = 427 ((3⁶ − 1)/2 + (2⁶ − 1) = 364 + 63)', (() => { let a = 0; for (let k = 0; k <= 5; k++) a += 3 ** k + 2 ** k; return a === 427 && (3 ** 6 - 1) / 2 === 364 && 2 ** 6 - 1 === 63 && 364 + 63 === 427 })())
  push('KX3 Fibonacci roster extensions F₁₃ = 233, F₁₄ = 377, Σ_{k=0}^{12} F_k = F₁₄ − 1 = 376', F(13) === 233 && F(14) === 377 && (() => { let a = 0; for (let k = 0; k <= 12; k++) a += F(k); return a === 376 })())
  push('KX4 Cassini literals: 34·13 − 21² = 442 − 441 = 1 (n = 8) and 55·21 − 34² = 1155 − 1156 = −1 (n = 9)', 34 * 13 === 442 && 21 ** 2 === 441 && 34 * 13 - 21 ** 2 === 1 && 55 * 21 === 1155 && 34 ** 2 === 1156 && 55 * 21 - 34 ** 2 === -1)
  push('KX5 tribonacci next term 149 after the roster 1, 1, 2, 4, 7, 13, 24, 44, 81 (81 + 44 + 24 = 149)', 44 + 24 + 13 === 81 && 81 + 44 + 24 === 149)
  push('KX6 family A opening-motivation gap rosters: gaps 3, 10, 32, 100 and second gaps 7, 22, 68 (no row constant)', (() => { const r = [1, 4, 14, 46, 146]; const g = r.slice(1).map((v, i) => v - r[i]); const gg = g.slice(1).map((v, i) => v - g[i]); return g.join(',') === '3,10,32,100' && gg.join(',') === '7,22,68' && gg[0] !== gg[1] && gg[1] !== gg[2] })())
  push('KX7 the wrong-GF quiz distractors expand to 1, 5, 19 / 1, 6, 24 / 4, 19, 71 (the forgetful, the mis-signed, the u₁-seeded numerators)', (() => { const b = expand([1], [1, -5, 6], 3); const c = expand([1, 1], [1, -5, 6], 3); const d = expand([4, -1], [1, -5, 6], 3); return b.join(',') === '1,5,19' && c.join(',') === '1,6,24' && d.join(',') === '4,19,71' })())
  push('KX8 the Pell family (scale 1 − 2x − x²): u(2) = 5 and u(3) = 12 on the roster 1, 2, 5, 12, 29, 70, 169', (() => { const u = [1, 2, 5, 12, 29, 70, 169]; return u[2] === 5 && u[3] === 12 && u.every((v, n) => (n < 2 ? true : 2 * u[n - 1] + u[n - 2] === v)) })())
  push('KX9 family B denominator ladder 1, 3, 7, 15, 31 prices u_n = 3c_n − c_{n−1} (8, 18, 38, 78)', (() => { const c = [1, 3, 7, 15, 31]; return 3 * c[1] - c[0] === 8 && 3 * c[2] - c[1] === 18 && 3 * c[3] - c[2] === 38 && 3 * c[4] - c[3] === 78 })())
}

'''

M_SECTION = '''
/* ------------------------------------------------------------------ */
/* SECTION M — 5.R engines (the task 5-b part engine v5-R.ts's          */
/* ENGINE_5R, appended by the PARALLEL-SWARM RUN II assembly: every    */
/* number in the review recomputed — NEW numbers flagged M-, the rest  */
/* reconciling sections A–KX)                                          */
/* ------------------------------------------------------------------ */

const M: SectionCheck[] = []
{
  const push = (name: string, ok: boolean) => M.push(check(name, ok))
  const expand = (num: number[], den: number[], terms: number): number[] => {
    if (den[0] !== 1) throw new Error('denominator must be monic in this helper')
    const c: number[] = []
    for (let n = 0; n < terms; n++) {
      let acc = n < num.length ? num[n] : 0
      for (let i = 1; i <= Math.min(den.length - 1, n); i++) acc -= den[i] * c[n - i]
      c.push(acc)
    }
    return c
  }
  const F = (n: number): number => { let a = 0, b = 1; for (let i = 0; i < n; i++) { [a, b] = [b, a + b] } return a }
%%ENGINE_BODY%%
}
'''


def job4_extend_ch05_verifier() -> None:
    print("== JOB 4: extending verify-book4-ch05.ts ==")
    v = READ(VCH05)

    # 1 · the K7.3 title fix: the true family-B numerator is 3 − x
    old_title = "push('K7.3 generating function (3 + 2x)/(1 − 3x + 2x²)"
    assert v.count(old_title) == 1, "K7.3 title anchor not found"
    v = v.replace(old_title, "push('K7.3 generating function (3 − x)/(1 − 3x + 2x²)", 1)

    # 2 · extract the ENGINE_5R body from v5-R.ts (the M-numbered checks)
    v5r = READ(os.path.join(W5, "v5-R.ts"))
    m = re.search(
        r"const ENGINE: SectionCheck\[\] = \[\]\n\n\{\n"
        r"  const push = \(name: string, ok: boolean\) => ENGINE\.push\(check\(name, ok\)\)\n(.*?)\n\}\n",
        v5r,
        re.S,
    )
    assert m, "v5-R.ts ENGINE block not found"
    engine_body = m.group(1)
    assert engine_body.count("push('M") >= 60, "the M-numbered engine looks short"
    m_section = M_SECTION.replace("%%ENGINE_BODY%%", engine_body)

    # 3 · doc-header: record the appended sections
    old_doc = (
        " *   (Z) census at close — chapter assembled, book.ts wiring, plannedLessons\n"
        " *       emptied, ids unique library-wide, pack integrity\n"
    )
    new_doc = (
        " *   (KX) 5.6 K-ext literals — the agent 5-a K-ext additions pinned at\n"
        " *       the PARALLEL-SWARM RUN II assembly (family C's GF numerator and\n"
        " *       six-term sum, the Fibonacci roster extensions, the Cassini\n"
        " *       literals, the tribonacci next term, the family-A gap rosters,\n"
        " *       the wrong-GF quiz distractors, the Pell values, the family-B\n"
        " *       denominator ladder)\n"
        " *   (M) 5.R engines — the task 5-b part engine v5-R.ts's ENGINE_5R\n"
        " *       appended at the PARALLEL-SWARM RUN II assembly (every number in\n"
        " *       the review recomputed; NEW numbers flagged M-, reconciliations\n"
        " *       noted)\n"
        " *   (Z) census at close — chapter assembled, book.ts wiring, plannedLessons\n"
        " *       emptied, ids unique library-wide, pack integrity\n"
    )
    assert v.count(old_doc) == 1, "verifier doc header anchor not found"
    v = v.replace(old_doc, new_doc, 1)

    # 4 · insert KX before SECTION L, M before SECTION M/N
    anchor_l = "/* ------------------------------------------------------------------ */\n/* SECTION L — 5.6 pins (guarded: `pending` until the lesson ships)    */"
    assert v.count(anchor_l) == 1
    v = v.replace(anchor_l, KX_SECTION.rstrip("\n") + "\n\n" + anchor_l, 1)
    anchor_mn = "/* ------------------------------------------------------------------ */\n/* SECTION M/N — 5.R (unit review, guarded)                            */"
    assert v.count(anchor_mn) == 1
    v = v.replace(anchor_mn, m_section.rstrip("\n") + "\n\n" + anchor_mn, 1)

    # 5 · runner tally list
    old_runner = "const results = [tally('A (5.1 engines)', A), tally('B (5.1 pins)', B), tally('C (5.2 engines)', C), tally('D (5.2 pins)', D), tally('E (5.3 engines)', E), tally('F (5.3 pins)', F), tally('G (5.4 engines)', G), tally('H (5.4 pins)', H), tally('I (5.5 engines)', I), tally('J (5.5 pins)', J), tally('K (5.6 engines)', K), tally('L (5.6 pins)', L), tally('N (5.R pins)', MN), tally('Z (census)', Z)]"
    new_runner = "const results = [tally('A (5.1 engines)', A), tally('B (5.1 pins)', B), tally('C (5.2 engines)', C), tally('D (5.2 pins)', D), tally('E (5.3 engines)', E), tally('F (5.3 pins)', F), tally('G (5.4 engines)', G), tally('H (5.4 pins)', H), tally('I (5.5 engines)', I), tally('J (5.5 pins)', J), tally('K (5.6 engines)', K), tally('KX (5.6 K-ext literals)', KX), tally('L (5.6 pins)', L), tally('M (5.R engines)', M), tally('N (5.R pins)', MN), tally('Z (census)', Z)]"
    assert v.count(old_runner) == 1
    v = v.replace(old_runner, new_runner, 1)

    WRITE(VCH05, v)
    print(f"   verify-book4-ch05.ts extended: {len(v.splitlines())} lines")


# ---------------------------------------------------------------- JOB 5

V6_FILES = [
    ("v6-1.ts", None, None),  # already ch04-shaped exported functions
    ("v6-2.ts", "C", "D"),
    ("v6-3.ts", "E", "F"),
    ("v6-4.ts", "G", "H"),
    ("v6-5.ts", "I", "J"),
    ("v6-6.ts", "K", "L"),
    ("v6-R.ts", "M", "N"),
]


def extract_v6(fname: str, eng_letter: str | None, pins_letter: str | None) -> str:
    text = READ(os.path.join(W6, fname))
    # strip import lines + export {}
    lines = [l for l in text.split("\n") if not (l.startswith("import ") or l == "export {}")]
    text = "\n".join(lines)
    # strip the duplicate harness (interface + check [+ countKind for v6-1])
    for block in (HARNESS_INTERFACE, HARNESS_CHECK, HARNESS_COUNTKIND):
        if block in text:
            text = text.replace(block, "", 1)
    # replace the dangling `harness` banner with an honest dedupe note
    if HARNESS_BANNER in text:
        text = text.replace(
            HARNESS_BANNER,
            "/* (this part file's own harness — interface SectionCheck / check"
            + (" / countKind" if fname == "v6-1.ts" else "")
            + " — was deduped into the shared harness at the top of this file) */\n\n",
            1,
        )
    # cut the export tails (ENGINE_6X / PINS_6X / ALL_6X / LESSON_6X / CENSUS_6R)
    text = cut_export_tails(text)
    if eng_letter is None:
        # v6-1: strip the `export ` prefix from sectionA/sectionB
        assert text.count("export function sectionA") == 1
        assert text.count("export function sectionB") == 1
        text = text.replace("export function sectionA", "function sectionA", 1)
        text = text.replace("export function sectionB", "function sectionB", 1)
        return text.rstrip() + "\n"

    # v6-2..R: ENGINE -> eng_letter, PINS -> pins_letter (exact-line edits),
    # then wrap the whole body in one block scope so every agent-local
    # helper identifier (fact / C / P / near / expand / F / ...) stays
    # file-local — the ch-04 precedent's function-scoping, block form.
    assert text.count("const ENGINE: SectionCheck[] = []") == 1, fname
    assert text.count("const PINS: SectionCheck[] = []") == 1, fname
    text = text.replace("const ENGINE: SectionCheck[] = []\n", "", 1)
    text = text.replace("const PINS: SectionCheck[] = []\n", "", 1)
    # v6-6 only: the agent's own `const L = lesson66` would SHADOW the
    # section-L array (the pins letter for 6.6). Rename that one identifier
    # deterministically (L -> L66: declaration + property/argument refs;
    # the doc-comment/banner mentions of the SECTION letter L stay) — this
    # MUST run before the PINS->letter push replacement below.
    if "L" in (eng_letter, pins_letter):
        m_decl = re.search(r"^const L = (lesson\w+)$", text, re.M)
        assert m_decl, f"{fname}: expected `const L = lessonXX` declaration"
        text = re.sub(r"\bL\b(?=\.)", "L66", text)
        text = re.sub(r"\bL\b(?=\))", "L66", text)
        text = text.replace(f"const L = {m_decl.group(1)}", f"const L66 = {m_decl.group(1)}", 1)
        left = len(re.findall(r"(?<![\w_])L(?![\w_])", text))
        assert left == 2, f"{fname}: expected only the 2 section-letter comment mentions of L, got {left}"
        print(f"   {fname}: renamed the lesson ref L -> L66 (the one agent whose body collides with its section letter)")

    if text.count(") => ENGINE.push(check(name, ok, detail))") == 1:
        text = text.replace(") => ENGINE.push(check(name, ok, detail))", f") => {eng_letter}.push(check(name, ok, detail))", 1)
    else:
        assert text.count(") => ENGINE.push(check(name, ok))") == 1, fname
        text = text.replace(") => ENGINE.push(check(name, ok))", f") => {eng_letter}.push(check(name, ok))", 1)
    assert text.count(") => PINS.push(check(name, ok, detail))") == 1, fname
    text = text.replace(") => PINS.push(check(name, ok, detail))", f") => {pins_letter}.push(check(name, ok, detail))", 1)
    assert not re.search(r"(?<![\w_])ENGINE(?![\w_])", text), f"{fname}: leftover ENGINE reference"
    assert not re.search(r"(?<![\w_])PINS(?![\w_])", text), f"{fname}: leftover PINS reference"

    banner = (
        f"/* (assembled section mapping: this agent's ENGINE array -> section {eng_letter}, "
        f"its PINS array -> section {pins_letter}; the declarations were lifted to module "
        f"scope and the agent-local helper identifiers below stay inside this block, so "
        f"no top-level name can collide across agents) */\n"
    )
    return (
        banner
        + f"const {eng_letter}: SectionCheck[] = []\n"
        + f"const {pins_letter}: SectionCheck[] = []\n"
        + "{\n"
        + text.rstrip()
        + "\n}\n"
    )


Z_SECTION = '''
// ------------------------------------------------------------------
// SECTION Z (the assembler's census) — the shipped chapter as an object:
// the plannedLessons contract discharged (the six planned titles written in
// the master plan §2 teaching order + the 6.R review), the ids pinned and
// globally unique, every sources key banked in docs/project/SOURCE_LOG.md,
// the word floors, the quiz-key pins, the whole-unit totals.
// ------------------------------------------------------------------
type QuizBlockShape = { items: { answer: number }[] }

function sectionZ(): SectionCheck[] {
  const c: SectionCheck[] = []
  const Ls = chapter06.lessons
  c.push(check('Z1 chapter fields (6 / counting-permutations-combinations / complete)', chapter06.number === 6 && chapter06.slug === 'counting-permutations-combinations' && chapter06.title === 'Counting: Permutations and Combinations' && chapter06.status === 'complete'))
  c.push(check('Z2 plannedLessons empty — all six written + the review', (chapter06.plannedLessons ?? []).length === 0))
  c.push(check('Z3 seven lessons (6 + the review)', Ls.length === 7, `got ${Ls.length}`))
  const numbers = Ls.map((l) => l.number).join(',')
  c.push(check('Z4 numbers 6.1..6.6 + 6.R', numbers === '6.1,6.2,6.3,6.4,6.5,6.6,6.R', numbers))
  // the SHIPPED TEACHING ORDER (master plan §2; book.ts's plannedLessons
  // array order was non-pedagogical)
  const planned = ['The Fundamental Principle of Counting', 'Factorials and the Counting Toolkit', 'Permutations: the Arrangement Count', 'Circular and Restricted Permutations', 'Combinations: the Selection Count', 'Distributions and the Classic Counting Puzzles', 'Unit 6 Completion Review']
  c.push(check('Z5 titles are the six book.ts plannedLessons strings + the review, in the master-plan teaching order', Ls.every((l, i) => l.title === planned[i]), Ls.map((l) => l.title).join(' | ')))
  const pinnedIds = ['aa-the-fundamental-principle-of-counting', 'aa-factorials-and-the-counting-toolkit', 'aa-permutations-the-arrangement-count', 'aa-circular-and-restricted-permutations', 'aa-combinations-the-selection-count', 'aa-distributions-and-the-classic-counting-puzzles', 'aa-counting-permutations-combinations-unit-6-review']
  c.push(check('Z6 ids pinned (the 6.R id follows the 3.R/4.R/5.R slug convention)', Ls.every((l, i) => l.id === pinnedIds[i]), Ls.map((l) => l.id).join(' | ')))

  // global uniqueness across the whole library (grep-verified)
  const dupes: string[] = []
  const ch06Path = '/home/z/my-project/src/data/library/books/mathematics/advanced-algebra/ch-06.ts'
  const walk = (dir: string) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name)
      if (e.isDirectory()) walk(p)
      else if (/\\.ts$/.test(e.name)) {
        const src = fs.readFileSync(p, 'utf8')
        for (const id of pinnedIds) {
          const n = (src.match(new RegExp(`\\\\bid: '${id}'`, 'g')) || []).length
          if (n > 0 && p !== ch06Path) dupes.push(`${id} also in ${p}`)
        }
      }
    }
  }
  walk('/home/z/my-project/src/data/library')
  c.push(check('Z7 ids globally unique (no other library file carries them)', dupes.length === 0, dupes.join('; ')))
  const ch06src = fs.readFileSync(ch06Path, 'utf8')
  c.push(check('Z8 each id appears exactly once in ch-06.ts', pinnedIds.every((id) => (ch06src.match(new RegExp(`\\\\bid: '${id}'`, 'g')) || []).length === 1)))

  const sourceLog = fs.readFileSync('/home/z/my-project/docs/project/SOURCE_LOG.md', 'utf8')
  const allSources = new Set(Ls.flatMap((l) => l.sources ?? []))
  const missing = [...allSources].filter((k) => !sourceLog.includes('`' + k + '`'))
  c.push(check('Z9 every sources key banked in SOURCE_LOG.md', missing.length === 0, `missing: ${missing.join(', ')}`))

  const floors: Record<string, number> = { '6.1': 4500, '6.2': 4500, '6.3': 4500, '6.4': 4500, '6.5': 4500, '6.6': 4500, '6.R': 4000 }
  for (const l of Ls) {
    const w = countLessonWords(l)
    c.push(check(`Z10 words ${l.number} ≥ ${floors[l.number]} (got ${w})`, w >= floors[l.number]))
  }

  const pinnedQuiz: Record<string, number[]> = { '6.1': [1, 2, 1, 2, 3], '6.2': [2, 3, 0, 2, 1], '6.3': [0, 1, 2, 3, 1], '6.4': [1, 1, 2, 0, 3], '6.5': [0, 1, 1, 1, 3], '6.6': [2, 2, 1, 3, 0], '6.R': [1, 0, 3, 0, 1] }
  for (const l of Ls) {
    const quizzes = l.blocks.filter((b) => b.kind === 'quiz')
    if (quizzes.length !== 1) {
      c.push(check(`Z11 ${l.number} exactly one quiz block`, false, `got ${quizzes.length}`))
      continue
    }
    const items = (quizzes[0] as unknown as QuizBlockShape).items
    const got = items.map((it) => it.answer)
    const want = pinnedQuiz[l.number]
    c.push(check(`Z12 ${l.number} quiz keys [${want.join(', ')}]`, got.length === 5 && got.every((v, i) => v === want[i]), `got [${got.join(', ')}]`))
  }

  c.push(check('Z13 no leftover placeholders in ch-06.ts', !/TODO|XXX|待补充|【/.test(ch06src)))
  const totalWords = Ls.reduce((a, l) => a + countLessonWords(l), 0)
  console.log(`  [Z] chapter totals: ${Ls.length} lessons, ${totalWords} words, engines A–N re-run in this file`)
  return c
}
'''

RUNNER = '''
// ------------------------------------------------------------------
// the harness
// ------------------------------------------------------------------
const SECTIONS: [string, SectionCheck[]][] = [
  ['A', sectionA(lesson61)], ['B', sectionB(lesson61)],
  ['C', C], ['D', D],
  ['E', E], ['F', F],
  ['G', G], ['H', H],
  ['I', I], ['J', J],
  ['K', K], ['L', L],
  ['M', M], ['N', N],
  ['Z', sectionZ()],
]

let totalOk = 0
let totalChecks = 0
const allFails: string[] = []
for (const [name, checks] of SECTIONS) {
  const t = tally(name, checks)
  totalOk += t.ok
  totalChecks += t.total
  allFails.push(...t.fail)
  console.log(`${name}: ${t.ok}/${t.total}${t.fail.length ? ' — FAIL: ' + t.fail.join(' ; ') : ''}`)
}
console.log(`verify-book4-ch06: ${totalOk}/${totalChecks}`)
if (allFails.length) {
  allFails.forEach((f) => console.log('  FAIL ' + f))
  process.exit(1)
}
'''

V06_HEADER = """import { chapter06 } from '../src/data/library/books/mathematics/advanced-algebra/ch-06'
import { countLessonWords, type Lesson } from '../src/data/library/types'
import * as fs from 'fs'
import * as path from 'path'

export {}

/**
 * verify-book4-ch06.ts — the whole-unit verifier for Advanced Algebra (book
 * #4), chapter 6 "Counting: Permutations and Combinations", assembled
 * 2026-11-20 from the PARALLEL-SWARM RUN II's per-lesson engines (the
 * 2026-11-18 owner chat directive "launch multiple agents for authoring
 * lessons", honored a second time; the 2026-11-18 ch. 4 swarm is the
 * precedent this file mirrors). Every lesson's sections grew green inside
 * its authoring agent BEFORE that lesson's prose was declared done — the
 * verify-first discipline kept per-agent; this file re-runs the identical
 * section bodies against the ASSEMBLED chapter file, plus the assembler's
 * census (section Z). Authoring master plan:
 * docs/research/AA_CH06_MASTER_PLAN.md. Study-never-reproduce honored: the
 * transcribed m2-07 module informed method shapes only.
 *
 *   (A) 6.1 engines + (B) 6.1 pins  — agent 6-a (38 + 15)
 *   (C) 6.2 engines + (D) 6.2 pins  — agent 6-b (77 + 35)
 *   (E) 6.3 engines + (F) 6.3 pins  — agent 6-c (69 + 30)
 *   (G) 6.4 engines + (H) 6.4 pins  — agent 6-d (46 + 35)
 *   (I) 6.5 engines + (J) 6.5 pins  — agent 6-e (87 + 37)
 *   (K) 6.6 engines + (L) 6.6 pins  — agent 6-f (52 + 42)
 *   (M) 6.R engines + (N) 6.R pins  — agent 6-g (94 + 34)
 *   (Z) the assembler's census — the shipped chapter as an object.
 *
 * The harness below maps the chapter's lessons by number and runs every
 * section; the run record comment above each body is its agent's own. The
 * shared harness (SectionCheck / check / countKind / tally) is inlined
 * once at the top — each part file's own duplicate harness was deduped at
 * assembly; each agent's engine+pins body rides inside one block scope so
 * its agent-local helper identifiers never collide across agents (the
 * ch-04 precedent's function-scoping, block form; the only renames are
 * ENGINE→<section letter> and PINS→<section letter>, per file).
 */

// ------------------------------------------------------------------
// the shared harness (inlined once — the ch-04 assembled precedent)
// ------------------------------------------------------------------

interface SectionCheck {
  name: string
  ok: boolean
  detail?: string
}

function check(name: string, ok: boolean, detail?: string): SectionCheck {
  return ok ? { name, ok: true } : { name, ok: false, detail }
}

function countKind(L: Lesson, kind: string): number {
  return L.blocks.filter((b) => b.kind === (kind as never)).length
}

function tally(section: string, checks: SectionCheck[]) {
  const fail = checks.filter((c) => !c.ok).map((c) => `${c.name}${c.detail ? ' — ' + c.detail : ''}`)
  return { section, ok: checks.length - fail.length, total: checks.length, fail }
}

// the shipped chapter's lessons, mapped by number (the same objects the
// per-agent engines were grown against, re-read through the assembled file)
const byNumber = new Map<string, Lesson>(chapter06.lessons.map((l) => [l.number, l] as const))
const lesson61 = byNumber.get('6.1') as Lesson
const lesson62 = byNumber.get('6.2') as Lesson
const lesson63 = byNumber.get('6.3') as Lesson
const lesson64 = byNumber.get('6.4') as Lesson
const lesson65 = byNumber.get('6.5') as Lesson
const lesson66 = byNumber.get('6.6') as Lesson
const lessonReview6 = byNumber.get('6.R') as Lesson

"""


def job5_build_ch06_verifier() -> None:
    print("== JOB 5: building verify-book4-ch06.ts ==")
    parts = [V06_HEADER]
    for fname, eng, pins in V6_FILES:
        body = extract_v6(fname, eng, pins)
        parts.append("\n" + body.rstrip() + "\n")
    parts.append(Z_SECTION)
    parts.append(RUNNER)
    out = "\n".join(parts)
    WRITE(VCH06, out)
    print(f"   verify-book4-ch06.ts built: {len(out.splitlines())} lines")


# ---------------------------------------------------------------- JOB 6

E2E_MOVES = [
    (W5, ["e2e-aa-56.sh", "e2e-aa-56.page.js", "e2e-aa-5R.sh", "e2e-aa-5R.page.js"], "aa-ch05-work"),
    (W6, ["e2e-aa-61.sh", "e2e-aa-61.page.js", "e2e-aa-62.sh", "e2e-aa-62.page.js",
          "e2e-aa-63.sh", "e2e-aa-63.page.js", "e2e-aa-64.sh", "e2e-aa-64.page.js",
          "e2e-aa-65.sh", "e2e-aa-65.page.js", "e2e-aa-66.sh", "e2e-aa-66.page.js",
          "e2e-aa-6R.sh", "e2e-aa-6R.page.js"], "aa-ch06-work"),
]


def job6_move_e2e() -> None:
    print("== JOB 6: moving the e2e pairs to scripts/ ==")
    moved = []
    for wdir, files, workname in E2E_MOVES:
        for f in files:
            src = os.path.join(wdir, f)
            dst = os.path.join(ROOT, "scripts", f)
            assert os.path.exists(src), src
            data = READ(src)
            if f.endswith(".sh"):
                # update PAGE_JS_PATH to the new scripts/ location (the
                # agents' own assembly note instructs this)
                old_path = f'scripts/{workname}/{f.replace(".sh", ".page.js")}'
                new_path = f'scripts/{f.replace(".sh", ".page.js")}'
                assert data.count(old_path) == 1, (f, old_path)
                data = data.replace(old_path, new_path, 1)
            with open(dst, "w", encoding="utf-8") as fh:
                fh.write(data)
            os.chmod(dst, 0o755)
            os.remove(src)
            moved.append(f)
    print(f"   moved + chmod +x: {', '.join(moved)}")


# ---------------------------------------------------------------- main

if __name__ == "__main__":
    os.chdir(ROOT)
    selected = sys.argv[1:]
    jobs = {
        "1": job1_close_ch05,
        "2": job2_build_ch06,
        "3": job3_swap_book,
        "4": job4_extend_ch05_verifier,
        "5": job5_build_ch06_verifier,
        "6": job6_move_e2e,
    }
    for key in (selected or list(jobs)):
        jobs[key]()
    print("\nASSEMBLY COMPLETE — run the gates:")
    print("  bun run scripts/verify-book4-ch05.ts")
    print("  bun run scripts/verify-book4-ch06.ts")
    print("  bunx tsc --noEmit && bun run lint")
