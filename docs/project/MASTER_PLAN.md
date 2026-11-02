# MASTER PLAN — LockIn Library

> The authoritative project directive. Every session starts by reading this
> file and `RESUME_POINTER.json`. Condensed from the owner's master
> instruction (kept in `upload/` history); when in doubt, the owner's
> instruction wins.

## 1. Mission

A full-stack educational platform where anyone can learn any major subject
**from absolute zero to research level** through complete, professionally
written digital textbooks — with derivations, figures, worked examples and
graded exercises, and full examination coverage as a *by-product* of genuine
understanding, never as the boundary of the content.

**Core philosophy:** books that make people knowledgeable, not books that
merely help them pass examinations.

## 2. Source workflow (Google Drive)

The owner will supply a Google Drive link with a large reference book
collection. Workflow per subject:

1. Survey the Drive listing; identify relevant books for the target subject.
2. Download **only** that subject's books into `temporary-references/`
   (gitignored).
3. Study their TOCs, explanations, derivations, examples and exercises.
4. Write OUR OWN original textbook — reference books inform and verify
   concepts; **never** reproduce or imitate protected expression.
5. Supplement with internet research (official syllabi, university curricula,
   authoritative references) — **explicitly mandated as the fallback whenever
   the Drive has no books for a subject/field.**
6. When the subject's book is complete and verified, delete the downloaded
   working copies (never the Drive originals) and log it in `SOURCE_LOG.md`.
7. Move to the next subject.

**Storage law:** ~9 GB total. One subject at a time. Never bulk-download.
Keep only final textbooks, assets, metadata, project files.

## 3. Examination database (research-first)

Before writing any book: research the relevant examinations. Target registry:
50+ major examinations — ≥10 Indian, ≥20 international, government
recruitment, university entrance, professional licensing, olympiads.

Indian: JEE Main/Advanced, NEET UG + PG medical, UPSC CSE, GATE, UGC NET,
CUET UG/PG, CAT, CLAT, NDA/CDS, SSC, banking, state PSCs, VITEEE, …
International: SAT, ACT, AP, IB, Cambridge A Levels/IGCSE, Gaokao, EJU,
GRE, GMAT, LSAT, MCAT, UCAT, UK professional exams, …
Languages: JLPT, Goethe-Zertifikat, DELF/DALF, DELE, HSK, TOPIK, IELTS, TOEFL.

**Principle:** a syllabus is a coverage checklist, never the boundary of
knowledge. Track in `EXAM_REGISTRY.json`; map exams → books → chapters →
topics before marking a book complete.

## 4. Library scope (the shelves)

Eleven disciplines (`src/data/library/disciplines.ts`):
mathematics · physics · chemistry · computer-science · engineering ·
medical-sciences · biology · economics-commerce · humanities · languages ·
arts-music.

Book lists per discipline live in `SUBJECT_BACKLOG.md` (from the master
instruction §4) and get promoted to real books one at a time.

## 5. How every textbook must be written

- Begin from absolute zero; no unexplained terminology.
- Full chapter anatomy (adapt per subject): introduction → objectives →
  prerequisites → terminology → history where relevant → concepts →
  step-by-step explanations → derivations → figures → worked examples →
  applications → advanced ideas → theorems/proofs → misconceptions →
  comparisons → solved numericals → graded questions (6 levels:
  beginner → intermediate → advanced → competitive → university/professional
  → research/olympiad) → summary → formula sheet → further reading.
- Teaching voice: intuitive first, formal second; every symbol explained;
  assumptions stated; answers verified; alternative methods shown.
- Accuracy over volume: never fabricate formulas, history, data, or exam
  questions. Exam-style items must be labelled "exam-style" unless verified
  against official sources.
- Original figures (inline SVG) with real labels, captions, numbering.

## 6. Quality gates before "complete"

1. Chapters drafted → 2. content verified (math recomputed) →
3. examination coverage audit run → 4. structure/navigation verified →
5. integrated into the reading platform → 6. logged in `PROGRESS.json` +
`WORKLOG.md`. Drafting alone never means complete.

## 7. Non-negotiable rules

1. Completeness > speed. 2. Understanding > memorisation.
3. Accuracy > volume. 4. No artificial length limits or omissions.
5. No filler chapters. 6. No fabricated anything.
7. No duplicate material across books — cross-reference instead.
8. Preserve completed books forever. 9. Keep the 9 GB workflow honest.
10. Every book readable in the web reader, not just present in the repo.
