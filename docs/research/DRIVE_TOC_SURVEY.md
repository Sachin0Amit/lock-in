# DRIVE TOC SURVEY — the Mathematics shelf's reference evidence base

> Built by the **full-shelf planning pass** of 2026-11-10 (owner directive:
> download the Drive's mathematics books one by one, extract EVERY table of
> contents — vision model transcription for the scanned ones — arrange it
> all book-wise/theory-wise, and plan the entire Mathematics shelf from
> it). Working copies were deleted after extraction per the storage law;
> Drive originals untouched. This file is the durable record: every TOC
> below is transcribed in full, each source is mapped to the shelf book(s)
> it informs, and the exam typology census records the exercise types the
> reference books actually carry. The 23 book plans it produced live in
> `src/data/library/books/mathematics/<slug>/book.ts` (status 'planned').

## Method

53 sources processed, one at a time: **42 Cengage JEE module chapter PDFs**
(MATHS subfolder M1–M5, all scanned) + **11 root-level classics**. Digital
PDFs → `pdftotext` front matter; scanned PDFs → front pages rendered at
120 dpi → transcribed by the vision model (`z-ai vision`, one book per
call, 6 pages for module chapter-books / 16 for the classic tomes) with a
transcribe-everything prompt (topic numbers, titles, subtopics, exercise
types, page numbers). VLM output saved per source below. Downloads and
renders driven by `scripts/extract_drive_tocs.sh` + the chunked
`scripts/toc_pipeline_chunk.sh` (the sandbox reaps background daemons, so
the pipeline ran as bounded chunks inside single invocations).

**Census: 53/53 TOCs extracted — nothing missed.**

The 24 planned shelf books this evidence base informed (ids as registered
in `src/data/library/index.ts`): `geometry`, `coordinate-geometry`,
`trigonometry`, `differential-calculus`, `integral-calculus`,
`multivariable-calculus`, `differential-equations`, `linear-algebra`,
`discrete-mathematics`, `number-theory`, `set-theory`,
`mathematical-logic`, `combinatorics`, `probability-theory`,
`statistics`, `real-analysis`, `complex-analysis`, `abstract-algebra`,
`topology`, `numerical-analysis`, `mathematical-methods-for-engineering`,
`optimization-and-operations-research`, `advanced-mathematical-foundations`,
and `quantitative-aptitude` (added by the topic-inclusion guarantee pass,
2026-11-10 — the Khattar aptitude census's commercial family given its
own home; see the audit section at the end of this file).
The books whose evidence is web-researched rather than Drive-extracted
(Number Theory, Set Theory's axiomatic arc, Mathematical Logic beyond the
module chapter, Combinatorics beyond the AA bank, Complex Analysis's
Churchill arc, Abstract Algebra, Topology, Numerical Analysis's Burden
arc, Optimization/OR, the Foundations capstone, and Geometry's school
canon) carry their verified classic arcs in their book.ts research
headers — summarized in the web-research section below.

## The Drive collection's mathematics map

- `MATHS/M1 Trigonometry` (7 chapter PDFs) → the **Trigonometry** book's
  core (its ch. 1 'Logarithm and Its Properties' belongs to Advanced
  Algebra ch. 9 — cross-referenced, no duplication).
- `MATHS/M2 Algebra` (14 chapter PDFs) → ch. 01–08 banked by **Advanced
  Algebra** (run 89); ch. 09/14 → **Probability Theory**; ch. 10 →
  **Mathematical Logic**; ch. 11 → **Statistics**; ch. 12–13 → **Linear
  Algebra**.
- `MATHS/M3 Coordinate Goemetry` (7) + `MATHS/M5 3D Geometry` (4) → the
  **Coordinate Geometry** book (M5's vector algebra is the MATHS shelf's
  own home for vectors; vector CALCULUS stays in Multivariable Calculus).
- `MATHS/M4 Calculus` (10) → ch. 01 → AA ch. 1 (cross-ref); ch. 02–06 →
  **Differential Calculus**; ch. 07–09 → **Integral Calculus**; ch. 10 →
  **Differential Equations**.
- The Khattar aptitude census (40 chapters): the commercial family
  (Partnership, Profit and Loss, Time and Work, Pipes and Cisterns, Time
  and Distance, Boats and Streams, Races, Alligation, Problems on Ages,
  Simple and Compound Interest, Stocks and Debentures, True and Banker's
  Discount, Series, Clocks and Calendar, Data Sufficiency) → the
  **Quantitative Aptitude** book (added by the topic-inclusion guarantee
  pass, 2026-11-10); the theory chapters route to their shelf books
  (Numbers/HCF-LCM/Binary → ANS, Simplification/Percentage/Average/Ratio
  → FM, Logarithms/Progression/P&C/Quadratic → AA, Polynomials/Linear
  Equations → AL, Set Theory → Set Theory, Probability → Probability,
  Mensuration → Geometry, Trigonometric Ratios/Heights → Trigonometry,
  Plane/Co-ordinate Geometry → Geometry and Coordinate Geometry, Data
  Interpretation → Statistics).
- Root classics: Loney **Trigonometry** (1893 classic, scanned); Thomas'
  Calculus 14e + Stewart ET (the two calculus sequencing poles; their
  multivariable chapters are the **Multivariable Calculus** spine);
  Kreyszig (the **Mathematical Methods** spine + DE/NA/OR applied arcs);
  Rudin PMA 3e (the **Real Analysis** spine, scanned); Rosen 8e (the
  **Discrete Mathematics** spine); Strang/Axler/Lay (the three **Linear
  Algebra** poles); Khattar QA (the aptitude census); Hall & Knight
  Elementary Algebra (the banked AL classic, identified this pass).
- Same-arc editions available on the Drive but not re-downloaded for this
  survey (ids in `temporary-references/inventory.json`): Anton Calculus
  10e, Larson 11e, Larson ETF 7e, Stewart 8e (dokumen), Stewart 9e
  SOLUTIONS, Schaum's Linear Algebra 6e, Strang LAA 4e, Hall & Knight
  Higher Algebra ×2 (TOC banked run 66). They are per-unit download
  candidates at authoring time.

# The extracted TOCs, source by source
Arranged module-wise then classic-wise; each entry: Drive id, page count, method (text layer or VLM vision), the shelf mapping, and the complete transcription.

## m1-01 — M1 Trigonometry :: 1. Logarithm and Its Properties
- Drive file id: `1hPWvsTTo3qv3jC9ir2Kx8qU_RnJ79F7V`- Method: VLM vision transcription (scanned)- Maps to: Trigonometry (cross-ref: AA ch. 9 owns logs)- Shelf book: `advanced-algebra`
```text
Trigonometry
CHAPTER 1
Logarithm and Its Properties — 1.1–1.26
Introduction to 3D Coordinate System — 1.1
Exponential Function — 1.1
Graph of Exponential Function and Its Properties — 1.1
Graph of Exponential Function for Different Bases — 1.2
Concept Application Exercise 1.1 — 1.3
Logarithmic Function — 1.3
Graph of the Logarithmic Function — 1.3
Graph of the Logarithmic Function for Different Bases — 1.4
Concept Application Exercise 1.2 — 1.6
Fundamental Laws of Logarithm — 1.6
Addition and Subtraction of Logarithm — 1.6
Exponents of Argument and Base of Logarithm — 1.7
Reciprocal of Logarithm — 1.8
Change of Base — 1.9
f(f⁻¹(x)) where f(x) is Exponential Function — 1.9
Concept Application Exercise 1.3 — 1.10
Logarithmic Equations — 1.11
Concept Application Exercise 1.4 — 1.12
Logarithmic Inequalities — 1.12
Standard Logarithmic Inequalities — 1.12
Concept Application Exercise 1.5 — 1.15
Finding Logarithm — 1.16
Characteristic and Mantissa of Logarithm — 1.16
Finding Mantissa Using Log Table — 1.16
Negative Characteristics — 1.17
Antilogarithm — 1.18
To Find Antilog of a Number — 1.18
Concept Application Exercise 1.6 — 1.20
Exercises — 1.21
Single Correct Answer Type — 1.21
Multiple Correct Answers Type — 1.23
Linked Comprehension Type — 1.23
Matrix Match Type — 1.24
Numerical Value Type — 1.24
Archives — 1.25
Answers Key — 1.25
```

## m1-02 — M1 Trigonometry :: 2. Trigonometric Functions
- Drive file id: `1QadrR-QPDBKfIOCKHJpLBtBh5BMhE4lj`- Method: VLM vision transcription (scanned)- Maps to: Trigonometry ch. 2- Shelf book: `trigonometry`
```text
Trigonometry

[cover/title page]

CHAPTER 2

Trigonometric Functions — 2.1–2.30

Trigonometric Ratios/Functions of Acute Angles — 2.1
  Trigonometric Ratios of Standard Angles — 2.1
Concept Application Exercise 2.1 — 2.4
Trigonometric Identities — 2.4
Concept Application Exercise 2.2 — 2.6
Measurement of Angle — 2.7
  Degree Measurement — 2.7
  Radian Measurement — 2.7
  Conversion between Radians and Degrees — 2.7
  Relation between Radians and Real Numbers — 2.7
Concept Application Exercise 2.3 — 2.9
Trigonometric Functions of an Angle — 2.9
  Angles in Trigonometry — 2.9
  Trigonometric Functions of Any Angle — 2.11
Concept Application Exercise 2.4 — 2.12
Behaviour of Trigonometric Functions — 2.12
  Trigonometric Functions Defined as Circular Functions — 2.12
  Graph of Trigonometric Functions — 2.13
Concept Application Exercise 2.5 — 2.19
Trigonometric Ratios of Allied Angles — 2.19
  Trigonometric Ratios of Allied Angles
    n × 90° ± θ when n is Even — 2.19
  Trigonometric Ratios of Allied Angles
    n × 90° ± θ when n is Odd — 2.20
Concept Application Exercise 2.6 — 2.23
Exercises — 2.24
  Single Correct Answer Type — 2.24
  Multiple Correct Answers Type — 2.26
  Linked Comprehension Type — 2.27
  Matrix Match Type — 2.28
  Numerical Value Type — 2.28
Archives — 2.29
Answers Key — 2.29

[cover/title page]

[cover/title page]

[cover/title page]

[cover/title page]

[cover/title page]

[cover/title page]
```

## m1-03 — M1 Trigonometry :: 3. Trigonometric Ratios and Transformation Formulas
- Drive file id: `1I9nEXrvv_XGhOxx3jYi0YwTIt34zUX2K`- Method: VLM vision transcription (scanned)- Maps to: Trigonometry ch. 3- Shelf book: `trigonometry`
```text
[cover/title page]

Trigonometry
CHAPTER 3
Trigonometric Ratios and Transformation Formulas  3.1–3.44
Compound Angle Formulas for Cosine and Sine  3.1
  Cosine of the Difference and Sum of the Angles  3.1
  Sine of the Difference and Sum of The Angles  3.1
  Some More Results  3.1
  Expression a cos x + b sin x  3.4
Concept Application Exercise 3.1  3.5
Compound Angle Formulas for Tangent  3.6
Concept Application Exercise 3.2  3.8
Transformation Formula  3.8
  Formula to Transform the Product into Sum or Difference  3.8
  Formulas to Transform the Sum or Difference into Product  3.8
Concept Application Exercise 3.3  3.11
Trigonometric Ratios of Multiple Angles  3.11
  Formulas for Sine and Cosine of Multiple Angles  3.11
  Formulas for Tangent and Cotangent of Multiple Angles  3.16
Concept Application Exercise 3.4  3.17
Values of Trigonometric Ratios of Typical Angles  3.18
Concept Application Exercise 3.5  3.21
Some Important Results and Their Applications  3.21
Concept Application Exercise 3.6  3.23
Sum of Cosines and Sines when Angles are in A.P.  3.23
Concept Application Exercise 3.7  3.24
Conditional Identities  3.24
  Some Standard Identities in Triangle  3.24
Concept Application Exercise 3.8  3.27
Finding Range of Expression Using Trigonometric Substitution  3.27
Concept Application Exercise 3.9  3.28
Inequalities in Triangle  3.28
  Some Standard Inequalities in Triangle  3.28
Concept Application Exercise 3.10  3.31
Exercises  3.32
  Single Correct Answer Type  3.32
  Multiple Correct Answers Type  3.37
  Linked Comprehension Type  3.38
  Matrix Match Type  3.39
  Numerical Value Type  3.40
Archives  3.42
Answers Key  3.43

[cover/title page]

[cover/title page]
```

## m1-04 — M1 Trigonometry :: 4. Trigonometric Equations
- Drive file id: `1pjIuzXG67dIBcC5MStLf4czZ46jVzlOQ`- Method: VLM vision transcription (scanned)- Maps to: Trigonometry ch. 4- Shelf book: `trigonometry`
```text
[cover/title page]

CHAPTER 4
Trigonometric Equations    4.1–4.28

Trigonometric Equations    4.1
    Important Points in Solving Trigonometric Equations    4.3
Concept Application Exercise 4.1    4.4
Trigonometric Equation sin x = sin α .    4.4
Concept Application Exercise 4.2    4.6
Trigonometric Equation cos x = cos α    4.6
Concept Application Exercise 4.3    4.8
Trigonometric Equation tan x = tan α    4.8
Concept Application Exercise 4.4    4.10
Trigonometric Equation (f(x))² = (f(α))²,
where f(x) is Trigonometric Function    4.10
Concept Application Exercise 4.5    4.11
Trigonometric Equation a cos x + b sin x = c    4.11
Concept Application Exercise 4.6    4.12
Solving Trigonometric Equations
Using Maximum/Minimum Value of Function    4.13
Concept Application Exercise 4.7    4.14
Solving Equations Using Graphs    4.14
Concept Application Exercise 4.8    4.16
Trigonometric Inequalities    4.16
Concept Application Exercise 4.9    4.17

Exercises    4.18
    Single Correct Answer Type    4.18
    Multiple Correct Answers Type    4.22
    Linked Comprehension Type    4.24
    Matrix Match Type    4.25
    Numerical Value Type    4.26
Archives    4.26
Answers Key    4.28

[remaining pages: not table of contents — chapter content (Chapter 4, Trigonometric Equations, Illustrations 4.1–4.18, Concept Application Exercise 4.1)]
```

## m1-05 — M1 Trigonometry :: 5. Properties and Solutions of Triangle
- Drive file id: `1iZUJ4mPLLn91ytdOUV9PdfKa6Qi3gE5n`- Method: VLM vision transcription (scanned)- Maps to: Trigonometry ch. 6- Shelf book: `trigonometry`
```text
Trigonometry

CHAPTER 5

Properties and Solutions of Triangle    5.1–5.46

Introduction    5.1
Sine Rule    5.1
    Napier Formula (tan rule)    5.4
    m–n Theorem    5.5
Concept Application Exercise 5.1    5.6
Cosine Rule    5.6
Concept Application Exercise 5.2    5.9
Projection Rule    5.9
Concept Application Exercise 5.3    5.9
Half Angle Formulas    5.9
    Half Angle Formulas for Sine    5.9
    Half Angle Formulas for Cosine    5.10
Concept Application Exercise 5.4    5.11
Area of Triangle    5.11
    Area of Quadrilateral    5.14
Concept Application Exercise 5.5    5.14
Solutions of Triangle    5.14
    Three Sides (SSS)    5.15
    Two Sides and the Included Angle (SAS)    5.15
    A Side and the Two Angles Adjacent to It (ASA)    5.15
    A Side, the Angle Opposite to It and an Angle
    Adjacent to It (AAS)    5.15
    Two Sides and an Angle not Included between Them (SSA)    5.15
    Three Angles (AAA)    5.16
Concept Application Exercise 5.6    5.17
Circumcircle and Circumcentre    5.17
    Properties of Circumcircle and Circumcentre    5.17
Concept Application Exercise 5.7    5.19
Incircle and Incentre    5.19
    Length of Tangent from Vertices to the Incircle    5.19
    Distance of Incentre from the Vertices of Triangle    5.19
    Different Formulas for Inradius    5.19
    Length of Angle Bisector    5.20
    Division of Opposite Side by the Internal Angle Bisector    5.20
Concept Application Exercise 5.8    5.25
Orthocentre and Centroid    5.25
    Distance of Orthocentre from Vertices and Sides    5.25
    Pedal Triangle and Orthic Triangle    5.26
    Centroid of Triangle    5.27
Concept Application Exercise 5.9    5.29
Escribed Circle and Excentre    5.29
    Radii of Excircles (Exradii)    5.29
    Distance between Incentre and Excentre    5.31
    Distance between Excentres    5.31
Concept Application Exercise 5.10    5.32
Regular Polygon    5.32
    Radii of the Inscribed and the Circumscribed
    Circles of a Regular Polygon    5.32
    Area of Regular Polygon    5.32
Concept Application Exercise 5.11    5.33
Exercises    5.34
    Single Correct Answer Type    5.34
    Multiple Correct Answers Type    5.38
    Linked Comprehension Type    5.39
    Matrix Match Type    5.41
    Numerical Value Type    5.42
Archives    5.43
Answers Key    5.45

Pages 5–12 (chapter body, Illustrations 5.1–5.11, Napier Formula (tan Rule)) are not table-of-contents pages; no further contents entries appear in the provided scans.
```

## m1-06 — M1 Trigonometry :: 6. Height and Distance
- Drive file id: `1u6BNksP9-eU8gSeyayydfnn-WS_0Pe4D`- Method: VLM vision transcription (scanned)- Maps to: Trigonometry ch. 7- Shelf book: `trigonometry`
```text
Trigonometry

CHAPTER 6
Height and Distance — 6.1–6.4
Introduction — 6.1
Exercises — 6.2
Single Correct Answer Type — 6.2
Answers Key — 6.3

[cover/title page]
[cover/title page]
[chapter opener, 6.1]
[page 6.1 continued]
Exercises — 6.2
Single Correct Answer Type (Q. 1–15)
[page 6.2 continued, Q. 16–18]
Answers Key — 6.3
EXERCISES
Single Correct Answer Type
[answers 1. (2) 2. (2) 3. (4) 4. (2) 5. (4) 6. (1) 7. (3) 8. (3) 9. (2) 10. (1) 11. (3) 12. (4) 13. (3) 14. (3) 15. (3) 16. (2) 17. (2) 18. (2)]
[blank page]
[blank page]
Chapter 6 — Hints and Solutions
Exercises
Single Correct Answer Type
1. (2), 2. (2), 3. (4), 4. (2), 5. (4) [solutions]
[page continued]
```

## m1-07 — M1 Trigonometry :: 7. Inverse Trigonometric Functions
- Drive file id: `1UmMcumRvuYUo75ujdKVgd1JUaM1h_AP5`- Method: VLM vision transcription (scanned)- Maps to: Trigonometry ch. 5- Shelf book: `trigonometry`
```text
Trigonometry

CHAPTER 7
Inverse Trigonometric Functions 7.1–7.40

Introduction 7.1
Inverse Trigonometric Functions 7.1
Graph of Inverse Trigonometric Function 7.2
Function f (f^{-1}(x)), where f (x) is Trigonometric Function 7.3
Concept Application Exercise 7.1 7.7
Principal Values of Function f^{-1}(f (x)) 7.7
Principal Value of sin^{-1}(sin x) 7.7
Principal Value of cos^{-1}(cos x) 7.9
Principal Value of tan^{-1} (tan x) 7.10
Principal Value of cot^{-1}(cot x) 7.10
Principal Value of cosec^{-1}(cosec x) 7.10
Principal Value of sec^{-1}(sec x) 7.10
Concept Application Exercise 7.2 7.11
Relating Different Inverse Trigonometric Functions 7.11
Simplifying Expression Using Trigonometric Substitution 7.12
Relating f^{-1}(x) with f^{-1}(−x) 7.13
Relating f^{-1}(x) with f^{-1}(1/x) 7.14
Concept Application Exercise 7.3 7.16
Complementary Angles 7.16
Concept Application Exercise 7.4 7.18
Sum and Difference of Angles in Terms of tan^{-1} 7.19
Concept Application Exercise 7.5 7.23
Sum and Difference of Angles in Terms of sin^{-1} and cos^{-1} 7.24
Multiple Angles in Terms of sin^{-1}x and cos^{-1}x 7.26
Concept Application Exercise 7.6 7.29
Exercises 7.30
Single Correct Answer Type 7.30
Multiple Correct Answers Type 7.34
Linked Comprehension Type 7.36
Matrix Match Type 7.37
Numerical Value Type 7.37
Archives 7.38
Answers Key 7.40
```

## m2-01 — M2 Algebra :: 01. Set Theory and THe Real Number System
- Drive file id: `1g4l8TWPBOMrDdGeGJ8VE9hWtEv-QA0Xn`- Method: VLM vision transcription (scanned)- Maps to: Set Theory ch. 1 recall / ANS bank- Shelf book: `set-theory`
```text
Algebra

CHAPTER 1
Set Theory and Real Number System    1.1–1.24

Sets    1.1
    Representation of Set    1.1
    Different Types of Sets    1.2
    Subset    1.3
    Proper Subset of a Set    1.3
    Power Set    1.3
    Universal Set    1.3
    Venn Diagram    1.3
    Operation on Sets    1.4
    Complement of a Set    1.5
    Symmetric Difference of Sets    1.5
    Venn Diagrams of Operations of Sets    1.5
    Intervals as Subset of Set R    1.7
    Cardinal number of Set    1.8
Concept Application Exercise 1.1    1.9
Inequalities    1.9
    Values of x² from Given Values of x    1.11
    Values of 1/x from Given Values of x    1.12
Concept Application Exercise 1.2    1.13
Sign Scheme Method    1.13
Concept Application Exercise 1.3    1.16
Modulus of Real Numbers    1.16
    Graph of Modulus Function    1.16
    Absolute Value as Square Root Function    1.17
    Modulus of any Expression    1.18
Concept Application Exercise 1.4    1.20
Inequalities Involving Modulus    1.20
    Modulus of Addition and Subtraction    1.21
Concept Application Exercise 1.5    1.22
Exercises    1.23
    Single Correct Answer Type    1.23
Answers Key    1.24
```

## m2-02 — M2 Algebra :: 02. Theory of Equations
- Drive file id: `1b4ZfmNHpNaN3LBbJWDx0tp9fINUUM1m6`- Method: VLM vision transcription (scanned)- Maps to: Advanced Algebra ch. 2/8 (banked run 89)- Shelf book: `advanced-algebra`
```text
CHAPTER 2
Theory of Equations    2.1–2.50

Some Definitions    2.1
    Real Polynomial    2.1
    Complex Polynomial    2.1
    Rational Expression or Rational Function    2.1
    Degree of a Polynomial    2.1
    Polynomial Equation    2.1
    Roots of an Equation    2.1
    Solution Set    2.1
Concept Application Exercise 2.1    2.2
Remainder and Factor Theorems    2.2
    Remainder Theorem    2.2
    Factor Theorem    2.3
Concept Application Exercise 2.2    2.4
Identity Equation and Inequalities    2.4
    Some Standard Identities    2.4
Concept Application Exercise 2.3    2.5
Graphical Interpretation of Zero of an Expression
and Root of an Equation    2.5
    Zeros of Expression    2.5
    Roots of the Equation f(x) = g(x)    2.6
Concept Application Exercise 2.4    2.7
Key Points in Solving an Equation    2.8
    Domain of Equation    2.8
    Extraneous Roots    2.8
    Loss of Root    2.8
Concept Application Exercise 2.5    2.8
Graphs of Polynomial Functions    2.9
    Test 1: Leading Coefficient    2.9
    Test 2: Zeros of Polynomial    2.9
Concept Application Exercise 2.6    2.11
Equations Reducible to Quadratic    2.11
Concept Application Exercise 2.7    2.13
Quadratic Equation and Nature of Roots    2.13
    Quadratic Equation with Real Coefficients    2.13
    Quadratic Equation with Non-Real Coefficients    2.15
    Finding Range of Function Involving Quadratic Expression    2.15
    Quadratic Expression in Two Variables    2.16
Concept Application Exercise 2.8    2.16
Relation between Roots and Coefficients
of the Quadratic Equation    2.17
Symmetric Functions of Roots    2.17
Concept Application Exercise 2.9    2.22
Common Roots    2.23
    Condition for One Common Root    2.23
    Condition for Both Common Roots    2.23
Concept Application Exercise 2.10    2.24
Relation between Roots and Coefficients of
Higher Degree Equations    2.25
    Solving Cubic Equation    2.25
    Repeated Roots    2.27
Concept Application Exercise 2.11    2.27
Quadratic Function    2.28
Concept Application Exercise 2.12    2.30
Location of Roots of Quadratic Equation    2.31
    Rolle's Theorem to Locate the Roots    2.35
    Solving Inequalities Using Location of Roots    2.36
Concept Application Exercise 2.13    2.37
Exercises    2.38
    Single Correct Answer Type    2.38
    Multiple Correct Answers Type    2.42
    Linked Comprehension Type    2.44
    Matrix Match Type    2.46
    Numerical Value Type    2.47
Archives    2.48
Answers Key    2.49

Pages 4–12: [chapter content — Theory of Equations, pages 2.1–2.4, not part of the table of contents]
```

## m2-03 — M2 Algebra :: 03. Complex Numbers
- Drive file id: `16g5wQMSErdcQYqZYabVIIEkA5wcNiYoh`- Method: VLM vision transcription (scanned)- Maps to: Advanced Algebra ch. 3 (banked run 89)- Shelf book: `advanced-algebra`
```text
[cover/title page]

CHAPTER 3
Complex Numbers	3.1–3.52
Introduction	3.1
Imaginary Number	3.1
Integral Powers of Iota (i)	3.1
Concept Application Exercise 3.1	3.2
Complex Number	3.2
Representation of Complex Numbers	3.2
Algebraic Operations on Complex Numbers	3.3
Conjugate of Complex Number	3.4
Section Formula in Complex Numbers	3.5
Concept Application Exercise 3.2	3.6
Equality of Complex Numbers	3.6
Square Root of Complex Number	3.7
Concept Application Exercise 3.3	3.9
Cube Roots of Unity	3.9
Properties of Cube Roots of Unity	3.9
Concept Application Exercise 3.4	3.11
Polar Form of Complex Number	3.11
Modulus of Complex Number	3.11
Argument of Complex Number	3.11
Euler's Form of Complex Number	3.15
Logarithm of Complex Number	3.15
Concept Application Exercise 3.5	3.16
Multiplication and Division of Complex Numbers in Polar Form	3.16
Concept Application Exercise 3.6	3.18
De Moivre's Theorem	3.19
Concept Application Exercise 3.7	3.20
Important Properties of Modulus	3.20
Concept Application Exercise 3.8	3.24
Locus Based on Distance Formula	3.24
Concept Application Exercise 3.9	3.27
Angle between Two Lines and Rotation Formula	3.27
Angle between Two Rays	3.27
Equation of Ray	3.27
Equation of Straight Line	3.30
Condition for Three Points to Represent Equilateral Triangle	3.31
Equation of Arc	3.32
Equation of Circle whose Diametric End Points are Given	3.32
Condition for Four Points to be Concyclic	3.32
Rotation Formula	3.33
Concept Application Exercise 3.10	3.34
The nth Roots of Unity	3.35
Properties of nth Roots of Unity	3.35
Concept Application Exercise 3.11	3.37
Exercises	3.38
Single Correct Answer Type	3.38
Multiple Correct Answers Type	3.42
Linked Comprehension Type	3.45
Matrix Match Type	3.47
Numerical Value Type	3.48
Archives	3.49
Answers Key	3.52
```

## m2-04 — M2 Algebra :: 04. Principle of Mathematical Induction
- Drive file id: `1o_KwANO0z6_wNKE7rdGYtADqKLYf7G11`- Method: VLM vision transcription (scanned)- Maps to: Advanced Algebra ch. 7 (banked run 89)- Shelf book: `advanced-algebra`
```text
[cover/title page]

[cover/title page]

[blank page]

[blank page]

Chapter 4 — Principle of Mathematical Induction .......... 4.1–4.2

Mathematical Induction .......... 4.1

Exercises .......... 4.2

[This page (4.1) is chapter body text — "Mathematical Induction" section, no contents entries]

[This page (4.2) is the "Exercises" section, no contents entries]

[This page is "Chapter 4" solutions body text — no contents entries]

[This page (S.80) is solutions body text — no contents entries]
```

## m2-05 — M2 Algebra :: 05. Progression and Series
- Drive file id: `1m_rsi-kLcVQEhwC_v445TkRGVzDSY77k`- Method: VLM vision transcription (scanned)- Maps to: Advanced Algebra ch. 5 (banked run 89)- Shelf book: `advanced-algebra`
```text
[cover/title page]
[cover/title page]

Algebra
CHAPTER 5
Progression and Series — 5.1–5.44
Introduction — 5.1
Concept Application Exercise 5.1 — 5.2
Arithmetic Progression (Difference Series) — 5.2
Properties of Terms of A.P. — 5.4
Arithmetic Mean — 5.6
Concept Application Exercise 5.2 — 5.6
Sum of Terms of Arithmetic Progression — 5.7
Sum of n Terms of an A.P. — 5.7
Sum of Arithmetic Means Inserted between Two Numbers — 5.8
Concept Application Exercise 5.3 — 5.9
Geometric Progression (Ratio Series) — 5.9
Increasing and Decreasing G.P. — 5.9
Properties of Terms of G.P. — 5.11
Geometric Mean — 5.12
Relation between Arithmetic Mean and Geometric Mean — 5.12
Concept Application Exercise 5.4 — 5.13
Sum of Terms of Geometric Progression — 5.14
Sum of Infinite Terms of G.P. — 5.16
Concept Application Exercise 5.5 — 5.18
Harmonic Progression — 5.18
Harmonic Mean — 5.20
Relation between A.M., G.M. and H.M. of Two Positive Numbers — 5.21
Concept Application Exercise 5.6 — 5.22
Arithmetico-Geometric Progression (A.G.P.) — 5.22
Sum of n terms of A.G.P. — 5.22
Sum of Infinite Terms of A.G.P. — 5.23
Concept Application Exercise 5.7 — 5.24
Sigma Notation and its Applications — 5.24
Properties of Sigma Notation — 5.24
Sum of Squares of First n Natural Numbers — 5.24
Sum of Cubes of First n Natural Numbers — 5.25
Sum of the Series when Differences of Consecutive Terms Form A.P. or G.P. — 5.26
Sigma Notation for Independent Variables — 5.27
Sigma Notation for Dependent Variables — 5.28
Concept Application Exercise 5.8 — 5.29
Sum of the Series by Cancellation Method — 5.29
Concept Application Exercise 5.9 — 5.32
Exercises — 5.33
Single Correct Answer Type — 5.33
Multiple Correct Answers Type — 5.37
Linked Comprehension Type — 5.39
Matrix Match Type — 5.41
Numerical Value Type — 5.41
Archives — 5.42
Answers Key — 5.44

[cover/title page]
[cover/title page]
[cover/title page]
[cover/title page]
[cover/title page]
[cover/title page]
```

## m2-06 — M2 Algebra :: 06. Inequalities Involving Means
- Drive file id: `12CiHJdju-UwSlkUc1spPagX6gCfPc4Eg`- Method: VLM vision transcription (scanned)- Maps to: Advanced Algebra ch. 4 (banked run 89)- Shelf book: `advanced-algebra`
```text
Algebra [cover/title page]

CHAPTER 6
Inequalities Involving Means 6.1–6.14
Simple Means of Two Positive Numbers 6.1
Concept Application Exercise 6.1 6.2
Simple Means of n Positive Numbers 6.2
AM-GM Inequality 6.3
GM-HM Inequality 6.4
Concept Application Exercise 6.2 6.6
Weighted Means 6.6
Concept Application Exercise 6.3 6.8
Means of mth Power 6.8
Concept Application Exercise 6.4 6.10
Exercises 6.11
Single Correct Answer Type 6.11
Multiple Correct Answers Type 6.12
Linked Comprehension Type 6.12
Numerical Value Type 6.12
Archives 6.13
Answers Key 6.13

[cover/title page]

[blank page]

[blank page]

[chapter opener — Inequalities Involving Means, Chapter 6]

[blank page]

6.2 Algebra [page]

6.2 Algebra [page]

Inequalities Involving Means 6.3 [page]

6.4 Algebra [page]

Inequalities Involving Means 6.5 [page]
```

## m2-07 — M2 Algebra :: 07. Permutation and Combination
- Drive file id: `1689UZ9q8ctrhiBtWLNLBpKCcHUQzS-me`- Method: VLM vision transcription (scanned)- Maps to: Advanced Algebra ch. 6 (banked run 89); Combinatorics ch. 1 recall- Shelf book: `advanced-algebra`
```text
Algebra

CHAPTER 7
Permutation and Combination    7.1–7.48

Fundamental Principle of Counting    7.1
    Multiplication Rule    7.1
    Addition Rule    7.1
Concept Application Exercise 7.1    7.5
Factorial Notation    7.6
    Exponent of Prime in n!    7.6
Concept Application Exercise 7.2    7.7
Permutation    7.7
    Formula for Permutation    7.8
Concept Application Exercise 7.3    7.10
Permutation when all Objects are Not Distinct    7.10
Concept Application Exercise 7.4    7.12
Permutation Under Restriction    7.12
Concept Application Exercise 7.5    7.13
Combination: Elementary    7.13
    Properties of nCr    7.14
Concept Application Exercise 7.6    7.19
Combination and Arrangement    7.19
Concept Application Exercise 7.7    7.21
Circular Permutation    7.22
    Clockwise and Anticlockwise Arrangements    7.22
Concept Application Exercise 7.8    7.23
All Possible Combinations    7.23
    Selection of Zero or More Objects from n Different Objects    7.23
    Selection of at Least One Object from n Different Objects    7.24
    Selection from Identical Objects    7.24
    Number of Divisors    7.25
Concept Application Exercise 7.9    7.26
Division and Distribution of Distinct Objects    7.26
    Division and Distribution of (m + n) Distinct Objects into Two Groups of Sizes m and n (m ≠ n)    7.26
    Division and Distribution of (m + n + p) Distinct Objects into Three Groups of Sizes m, n and p (m ≠ n ≠ p)    7.27
    General Formula of Division and Distribution    7.27
    Division and Distribution of Distinct Objects into Groups of Equal Size    7.27
    Distribution of Distinct Objects when Group Sizes are not Fixed    7.28
Concept Application Exercise 7.10    7.28
Distribution of Identical Objects    7.29
    Distribution of Identical Objects when Empty Groups are not Allowed    7.29
    Distribution of Identical Objects when Empty Groups are Allowed    7.29
    Number of Integral Solutions Using Series (Multinomial Theorem)    7.31
Concept Application Exercise 7.11    7.33
Principle of Inclusion and Exclusion    7.33
    Distribution of Distinct Objects if Empty Groups are not Allowed    7.34
    Derangement    7.34
Concept Application Exercise 7.12    7.35
Exercises    7.36
    Single Correct Answer Type    7.36
    Multiple Correct Answers Type    7.41
    Linked Comprehension Type    7.42
    Matrix Match Type    7.43
    Numerical Value Type    7.44
Archives    7.45
Answers Key    7.47
```

## m2-08 — M2 Algebra :: 08. Binomial Theorem
- Drive file id: `1ybH8EEGhqyk0gnqosFGtqQPJ9mCnKkEM`- Method: VLM vision transcription (scanned)- Maps to: Advanced Algebra ch. 7 (banked run 89)- Shelf book: `advanced-algebra`
```text
Chapter 8 Binomial Theorem — 8.1–8.40

Binomial Expansion — 8.1
    Pascal's Triangle — 8.1
    Some Standard Expansions — 8.2
    Conjugate Expansions — 8.5
    Binomial Expansions Using Complex Numbers — 8.5
    Middle Terms — 8.6
    Multinomial Expansion — 8.7
Concept Application Exercise 8.1 — 8.8
Applications of Binomial Expansion — 8.8
Concept Application Exercise 8.2 — 8.10
Coefficients of Terms in Binomial Expansion — 8.10
Concept Application Exercise 8.3 — 8.12
Sum of Coefficients in an Expansion — 8.12
    Sum of Coefficients in Binomial Expansion — 8.12
    Sum of Coefficients in any Expansion — 8.15
Concept Application Exercise 8.4 — 8.16
Ratio of Consecutive Coefficients/Terms in Binomial Expansion — 8.16
    Greatest Coefficient/Term in Binomial Expansion — 8.17
Concept Application Exercise 8.5 — 8.19
Series Involving Binomial Coefficients — 8.19
Concept Application Exercise 8.6 — 8.22
Miscellaneous Series — 8.23
    Series Resulting from Product of Two Expansions — 8.23
    Binomial Inside Binomial — 8.25
Concept Application Exercise 8.7 — 8.26
Binomial Theorem for any Index — 8.26
    Some Frequently Used Expansions — 8.27
Concept Application Exercise 8.8 — 8.28
Exercises — 8.30
    Single Correct Answer Type — 8.30
    Multiple Correct Answers Type — 8.34
    Linked Comprehension Type — 8.35
    Matrix Match Type — 8.36
    Numerical Value Type — 8.37
Archives — 8.38
Answers Key — 8.38

(Pages 5–12 of the scan are chapter content pages (Binomial Theorem, Illustrations 8.1–8.14, standard expansions), not part of the table of contents; pages 1–2 and 3–4 are duplicate scans of the same two TOC pages.)
```

## m2-09 — M2 Algebra :: 09. Probability I
- Drive file id: `1ExRYbEReP5abiht5Ft0MuyCFcIbc1PYc`- Method: VLM vision transcription (scanned)- Maps to: Probability Theory ch. 1-2- Shelf book: `probability-theory`
```text
Algebra
CHAPTER 9
Probability I    9.1–9.20
Some Definitions    9.1
  Experiment    9.1
  Random Experiment    9.1
  Sample Space    9.1
  Event    9.1
  Different Types of Events    9.2
  Axiomatic Approach to Probability    9.3
Concept Application Exercise 9.1    9.5
Mathematical or Classical Definition of Probability    9.5
  Value of Probability of Occurrence of an Event    9.5
  Value of Probability of Complement Event    9.6
  Odds in Favour and Odds Against an Event    9.6
Concept Application Exercise 9.2    9.10
Addition Theorem of Probability    9.10
  General Form of Addition Theorem of Probability    9.11
Concept Application Exercise 9.3    9.13
Exercises    9.14
  Single Correct Answer Type    9.14
  Multiple Correct Answers Type    9.16
  Linked Comprehension Type    9.17
  Matrix Match Type    9.18
  Numerical Value Type    9.18
Archives    9.18
Answers Key    9.20
[cover/title page]
[cover/title page]
[cover/title page]
[cover/title page]
```

## m2-10 — M2 Algebra :: 10. Mathematical Reasoning
- Drive file id: `17AI7PYq-iT_GozGaiy3ofts2efszhMn1`- Method: VLM vision transcription (scanned)- Maps to: Mathematical Logic ch. 1- Shelf book: `mathematical-logic`
```text
Algebra

CHAPTER 10
Mathematical Reasoning 10.1–10.8

Introduction 10.1
Compound Statement and Basic Logical Connectives 10.2
  Truth Table of Compound Statements
  Using Connectives 'AND' and 'OR' 10.2
  Conditional Statements 10.2
  Biconditional Statements 10.3
  Logical Equivalence 10.3
  Converse, Inverse and Contrapositive of Statement 10.3
Concept Application Exercise 10.1 10.4
Tautology and Contradiction (Fallacy) 10.4
Algebra of Statements 10.5
Concept Application Exercise 10.2 10.5
Exercises 10.6
  Single Correct Answer Type 10.6
Answers Key 10.7

[cover/title page]
[cover/title page]
[cover/title page]
[cover/title page]
[cover/title page]
[cover/title page]
[cover/title page]
[cover/title page]
[cover/title page]
```

## m2-11 — M2 Algebra :: 11. Statistics
- Drive file id: `147s9HBsCmll8R2B7hEPdn7Lnz6tExXmH`- Method: VLM vision transcription (scanned)- Maps to: Statistics ch. 2-3- Shelf book: `statistics`
```text
Algebra
[cover/title page]

CHAPTER 11
Statistics 11.1–11.10
Measures of Central Tendency 11.1
Mean 11.1
Median 11.3
Mode 11.4
Relation between Mean, Mode and Median 11.4
Concept Application Exercise 11.1 11.4
Measures of Dispersion 11.5
Range 11.5
Mean Deviation 11.5
Variance 11.5
Standard Deviation (S.D.) 11.6
Concept Application Exercise 11.2 11.7
Exercises 11.8
Single Correct Answer Type 11.8
Answers Key 11.10
[cover/title page]
[cover/title page]
[cover/title page]
[cover/title page]
[cover/title page]
[cover/title page]
[cover/title page]
[cover/title page]
```

## m2-12 — M2 Algebra :: 12. Determinants
- Drive file id: `1Kyv34fwODzljyKtw2Abk382wQdWhBJ2B`- Method: VLM vision transcription (scanned)- Maps to: Linear Algebra ch. 2- Shelf book: `linear-algebra`
```text
Page 1: [contents page — Chapter 12 Determinants, 12.1–12.40]
Introduction 12.1
Expansion of Determinant 12.2
Minors and Cofactors 12.2
Sarrus Rule for Expansion 12.3
Concept Application Exercise 12.1 12.4
Elementary Properties of Determinant 12.4
Concept Application Exercise 12.2 12.7
More Properties of Determinant 12.7
Concept Application Exercise 12.3 12.14
Determinants in Coordinate Geometry 12.15
Area of Triangle 12.15
Condition for Three Lines to be Concurrent 12.16
Condition for General Second-Degree Equation
in x and y to Represent Pair of Straight Lines 12.17
Concept Application Exercise 12.4 12.17
Product of Two Determinants 12.17
Determinant Formed by Cofactors 12.17
Concept Application Exercise 12.5 12.19
Differentiation and Integration of Determinant 12.20
Differentiation of Determinant 12.20
Integration of Determinant 12.22
Concept Application Exercise 12.6 12.23
System of Equations 12.23

Page 2: [duplicate of page 1]

Page 3:
System of Two Linear Equations in Two Variables 12.23
System of Three Linear Equations in Two Variables 12.24
Non-Homogeneous System of Three Linear
Equations in Three Variables 12.24
Homogeneous System of Three Linear Equations
in Three Variables 12.26
Concept Application Exercise 12.7 12.27
Exercises 12.28
Single Correct Answer Type 12.28
Multiple Correct Answers Type 12.33
Linked Comprehension Type 12.35
Matrix Match Type 12.37
Numerical Value Type 12.38
Archives 12.39
Answers Key 12.39

Page 4: [duplicate of page 3]

Page 5: [chapter opener — 12 Determinants, Introduction]
Page 6: [duplicate of page 5]
Page 7: [12.2 — Expansion of Determinant; Minors and Cofactors; Illustrations 12.1, 12.2]
Page 8: [duplicate of page 7]
Page 9: [12.3 — Illustrations 12.3–12.6; Sarrus Rule for Expansion]
Page 10: [duplicate of page 9]
Page 11: [12.4 — Illustrations 12.7, 12.8; Concept Application Exercise 12.1; Elementary Properties of Determinant]
Page 12: [duplicate of page 11]
```

## m2-13 — M2 Algebra :: 13. Matrices
- Drive file id: `1d9rOcp5VII5gHc7M1_S09byOzutNbapm`- Method: VLM vision transcription (scanned)- Maps to: Linear Algebra ch. 1- Shelf book: `linear-algebra`
```text
Algebra
CHAPTER 13
Matrices	13.1–13.40
Knowing Matrices	13.1
Matrix: Definition	13.1
Classification of Matrices	13.1
Negative of Matrix	13.3
Trace of Matrix	13.3
Transpose of Matrix	13.3
Determinant of Square Matrix	13.3
Concept Application Exercise 13.1	13.4
Elementary Algebraic Operations on Matrix	13.4
Addition and Subtraction of Matrices	13.4
Scalar Multiplication of Matrix	13.5
Concept Application Exercise 13.2	13.6
Product of Matrices	13.7
Concept Application Exercise 13.3	13.10
Properties of Product of Matrices	13.10
Special Matrices	13.14
Concept Application Exercise 13.4	13.16
Adjoint and Inverse of Matrix	13.16
Adjoint of Matrix	13.16
Properties of Adjoint of Matrix	13.17
Inverse of Matrix	13.18
Properties of Inverse of Matrix	13.19
Transformation of Matrix by Elementary Operations	13.21
Inverse of Matrix Using Elementary Transformations	13.22
Solution of System of Linear Equations Using Matrix	13.23
Characteristic Roots and Characteristic Vector of a Square Matrix	13.24
Concept Application Exercise 13.5	13.25
Exercises	13.27
Single Correct Answer Type	13.27
Multiple Correct Answers Type	13.30
Linked Comprehension Type	13.33
Matrix Match Type	13.34
Numerical Value Type	13.35
Archives	13.36
Answers Key	13.39

[Pages 5–10 are chapter body pages (page 13 Matrices content, pp. 13.1–13.4), not table of contents pages.]
```

## m2-14 — M2 Algebra :: 14. Probability II
- Drive file id: `1-TeV6PewhaHD3hhVfFpNb68mZsqgS2nm`- Method: VLM vision transcription (scanned)- Maps to: Probability Theory ch. 2-3, 5- Shelf book: `probability-theory`
```text
Algebra

CHAPTER 14
Probability II — 14.1–14.28

Conditional Probability — 14.1
Properties of Conditional Probability — 14.1
Concept Application Exercise 14.1 — 14.3
Multiplication Theorem of Probability — 14.4
Multiplication Rule of Probability of More than Two Events — 14.4
Concept Application Exercise 14.2 — 14.5
Independent Events — 14.5
Properties of Independent Events — 14.6
Concept Application Exercise 14.3 — 14.8
Total Probability Theorem — 14.9
Partition of a Sample Space — 14.9
Total Probability Theorem — 14.9
Concept Application Exercise 14.4 — 14.11
Bayes' Theorem — 14.12
Concept Application Exercise 14.5 — 14.14
Bernoulli Trial and Binomial Distribution — 14.14
Probability Involving Bernoulli Trials — 14.14
Concept Application Exercise 14.6 — 14.16
Exercises — 14.17
Single Correct Answer Type — 14.17
Multiple Correct Answers Type — 14.20
Linked Comprehension Type — 14.22
Matrix Match Type — 14.23
Numerical Value Type — 14.24
Archives — 14.24
Answers Key — 14.27

[Pages 5–12 are chapter content (chapter opener and illustrations), not table of contents entries]
```

## m3-01 — M3 Coordinate Goemetry :: 1. Coordinate System
- Drive file id: `1AuIAZzVJ_Sy5NR8y7_Y7DupzQaCHU9ME`- Method: VLM vision transcription (scanned)- Maps to: Coordinate Geometry ch. 1- Shelf book: `coordinate-geometry`
```text
Coordinate Geometry

CHAPTER 1
Coordinate System — 1.1–1.30
Introduction — 1.1
Rectangular (or Cartesian) Coordinate System — 1.1
  Transformation of Axes — 1.2
Concept Application Exercise 1.1 — 1.4
Distance Formula and Area of Polygon — 1.4
  Distance Formula — 1.4
  Area of a Polygon — 1.6
Concept Application Exercise 1.2 — 1.8
Section Formula — 1.9
  Internal Division — 1.9
  External Division — 1.9
Coordinates of Different Centres of Triangle — 1.10
  Centroid — 1.10
  Circumcentre — 1.11
  Orthocentre — 1.12
  Incentre — 1.13
  Excentres of Triangle — 1.14
Slope of a Line — 1.15
Concept Application Exercise 1.3 — 1.15
  Slope of Line Joining Given Two Points — 1.16
  Slope of Line Having Given Equation — 1.16
  Angle between Two Lines — 1.17
Concept Application Exercise 1.4 — 1.19
Polar Coordinates — 1.19
  Coordinate Conversion — 1.20
Concept Application Exercise 1.5 — 1.21
Locus and its Equation — 1.21
  Finding Equation of Locus by Elimination of Given Variable — 1.23
Concept Application Exercise 1.6 — 1.23
Exercises — 1.24
  Single Correct Answer Type — 1.24
  Multiple Correct Answers Type — 1.27
  Linked Comprehension Type — 1.28
  Matrix Match Type — 1.28
  Numerical Value Type — 1.29
Answers Key — 1.30
[cover/title page] — Chapter 1, Coordinate System (chapter opener, page 1.1)
1.2 Coordinate Geometry
1.3 Coordinate System
1.4 Coordinate Geometry
```

## m3-02 — M3 Coordinate Goemetry :: 2. Straight Lines
- Drive file id: `1wifONnO0kG7i_PHnTklqf7kTGwRfupNk`- Method: VLM vision transcription (scanned)- Maps to: Coordinate Geometry ch. 2- Shelf book: `coordinate-geometry`
```text
[cover/title page — Coordinate Geometry, Chapter 2 Straight Lines contents]

CHAPTER 2
Straight Lines    2.1–2.38
Equation of Line in Different Forms    2.1
    Equation of Line in Point–Slope Form    2.1
    Equation of Line Passing Through Two Points (Two Points Form)    2.3
    Equation of Line in Intercept Form    2.5
    Equation of Line in Normal Form    2.7
Concept Application Exercise 2.1    2.8
Equation of Straight Line in Symmetric form (Parametric or Distance form)    2.9
Concept Application Exercise 2.2    2.11
Distance of a Point from a Line    2.11
Concept Application Exercise 2.3    2.14
Position of a Point w.r.t. a Line    2.15
    Division of Plane by Line    2.17
Concept Application Exercise 2.4    2.19
Image of a Point in a Line and Equation of Angle Bisectors    2.19
    Foot of Perpendicular Drawn from a Point on a Line and Image of Point in a Line    2.19
    Equations of Bisectors of the Angles between the Lines    2.21
    Bisector Containing the Given Point    2.21
Concept Application Exercise 2.5    2.24
Concurrency of Three Lines and Family of Straight Lines    2.24
    Concurrency of Three Lines    2.24
    Family of Lines    2.25
Concept Application Exercise 2.6    2.27
Exercises    2.28
    Single Correct Answer Type    2.28
    Multiple Correct Answers Type    2.32
    Linked Comprehension Type    2.34
    Matrix Match Type    2.35
    Numerical Value Type    2.36
Archives    2.37
Answers Key    2.38

[cover/title page — Coordinate Geometry, Chapter 2 Straight Lines contents (repeat of contents page)]

CHAPTER 2
Straight Lines    2.1–2.38
Equation of Line in Different Forms    2.1
    Equation of Line in Point–Slope Form    2.1
    Equation of Line Passing Through Two Points (Two Points Form)    2.3
    Equation of Line in Intercept Form    2.5
    Equation of Line in Normal Form    2.7
Concept Application Exercise 2.1    2.8
Equation of Straight Line in Symmetric form (Parametric or Distance form)    2.9
Concept Application Exercise 2.2    2.11
Distance of a Point from a Line    2.11
Concept Application Exercise 2.3    2.14
Position of a Point w.r.t. a Line    2.15
    Division of Plane by Line    2.17
Concept Application Exercise 2.4    2.19
Image of a Point in a Line and Equation of Angle Bisectors    2.19
    Foot of Perpendicular Drawn from a Point on a Line and Image of Point in a Line    2.19
    Equations of Bisectors of the Angles between the Lines    2.21
    Bisector Containing the Given Point    2.21
Concept Application Exercise 2.5    2.24
Concurrency of Three Lines and Family of Straight Lines    2.24
    Concurrency of Three Lines    2.24
    Family of Lines    2.25
Concept Application Exercise 2.6    2.27
Exercises    2.28
    Single Correct Answer Type    2.28
    Multiple Correct Answers Type    2.32
    Linked Comprehension Type    2.34
    Matrix Match Type    2.35
    Numerical Value Type    2.36
Archives    2.37
Answers Key    2.38

[chapter opening page 2.1 — Straight Lines: Equation of Line in Different Forms, Equation of Line in Point–Slope Form, Equation of Line Parallel to an Axis, Equation of Line Parallel or Perpendicular to the Given Line, Illustration 2.1]

[page 2.2 — Illustrations 2.2, 2.3, 2.4, 2.5 with Solutions]

[page 2.3 — Illustrations 2.6, 2.7 with Solutions; Equation of Line Passing Through Two Points (Two Points Form); Illustration 2.8]

[page 2.4 — Illustrations 2.9, 2.10, 2.11, 2.12 with Solutions]

[page 2.4 (repeat) — Illustrations 2.9, 2.10, 2.11, 2.12 with Solutions]
```

## m3-03 — M3 Coordinate Goemetry :: 3. Pair of Straight Lines
- Drive file id: `1Ld8NHfuZa-nObOkzf-yAG6cupiKhc-6P`- Method: VLM vision transcription (scanned)- Maps to: Coordinate Geometry ch. 3- Shelf book: `coordinate-geometry`
```text
Coordinate Geometry

CHAPTER 3
Pair of Straight Lines	3.1–3.10
Equation of Pair of Straight Lines	3.1
    General Equation of the Second Degree in
    Two Variables	3.1
Concept Application Exercise 3.1	3.2
Second-Degree Homogeneous Equation	3.3
    Angle between Pair of Straight Lines	3.4
    Equation of Pair of Angle Bisectors of Given
    Pair of Straight Lines	3.4
Homogenization of Second Degree Equation	3.5
Concept Application Exercise 3.2	3.5
Exercises	3.7
    Single Correct Answer Type	3.7
    Multiple Correct Answers Type	3.8
    Linked Comprehension Type	3.8
    Numerical Value Type	3.9
Answers Key	3.9

[cover/title page]

3 Pair of Straight Lines

[content page – not part of table of contents]

[content page – not part of table of contents]

[content page – not part of table of contents]

[content page – not part of table of contents]

[content page – not part of table of contents]

[content page – not part of table of contents]
```

## m3-04 — M3 Coordinate Goemetry :: 4. Circle
- Drive file id: `1T3kPyP7pRDQGYnbBWMX8vUpZLPn8iL5B`- Method: VLM vision transcription (scanned)- Maps to: Coordinate Geometry ch. 4- Shelf book: `coordinate-geometry`
```text
CHAPTER 4
Circle 4.1–4.50
Definition 4.1
Equation of Circle in Centre–Radius Form 4.1
Equation of Circle Touching One or Both the Coordinate Axes 4.4
General Form of Equation of Circle 4.5
Equation of Circle Passing through Three Points 4.7
Concept Application Exercise 4.1 4.8
Some More Forms of Equation of Circle 4.8
Equation of Circle Having Given End Points of Chord which Subtends Given Angle at the Circumference 4.8
Equation of Circle Having Given End Points of Diameter 4.9
Equation of Circle in Parametric Form 4.10
Equation of Circle Circumscribing Triangle and Quadrilateral 4.11
Concept Application Exercise 4.2 4.12
Geometry with Circle 4.12
Position of Point w.r.t. Circle 4.12
Maximum and Minimum Distance of a Point from the Circle 4.13
Intersection of Line and Circle 4.14
Length of Tangent to Circle 4.15
Secant of Circle 4.16
Equation of Chord of Circle Bisected at Given Point 4.18
Concept Application Exercise 4.3 4.18
Tangent and Normal to Circle 4.19
Equation of Tangent to Circle at a Given Point on the Circle 4.19
Equation of Tangent to Circle Having Given Slope 4.20
Equation of Tangents to Circle Drawn from External Point 4.21
Equation of Pair of Tangents 4.22
Chord of Contact 4.23
Director Circle 4.23
Normal to Circle 4.24
Concept Application Exercise 4.4 4.25
Different Cases of Two Circles 4.25
Radical Axis of Two Circles 4.25
Radical Axes of Three Circles Taken Two at a Time and Radical Centre 4.26
Two Disjoint Circles 4.26
Two Circles Touching Externally 4.27
Two Circles Touching Internally 4.28
Two Intersecting Circles 4.29
One Circle Contained in the Other Circle without Touching 4.32
Concept Application Exercise 4.5 4.33
Family of Circles 4.33
Concept Application Exercise 4.6 4.35
Exercises 4.36
Single Correct Answer Type 4.36
Multiple Correct Answers Type 4.42
Linked Comprehension Type 4.43
Matrix Match Type 4.46
Numerical Value Type 4.47
Archives 4.47
Answers Key 4.50
```

## m3-05 — M3 Coordinate Goemetry :: 5. Parabola
- Drive file id: `13bU6vtG7_lRAW-f8foYKH40cseChqKWy`- Method: VLM vision transcription (scanned)- Maps to: Coordinate Geometry ch. 5- Shelf book: `coordinate-geometry`
```text
CHAPTER 5
Parabola 5.1–5.44
Conic Section: Introduction 5.1
Conic Section as Locus of a Point 5.1
Standard Equation of Parabola 5.2
Equation of Chord of Parabola Bisected at Given Point 5.4
Position of a Point with Respect to a Parabola 5.5
Parametric Form of Parabola 5.5
Concept Application Exercise 5.1 5.6
Other Forms of Parabola 5.7
Equation of Parabola Having Axis Parallel to x-Axis 5.7
Equation of Parabola Having Axis Parallel to y-Axis 5.7
Equation of Parabola with Given Focus and Directrix 5.10
Concept Application Exercise 5.2 5.12
Focal Chord and its Properties 5.12
Concept Application Exercise 5.3 5.14
Tangent to Parabola 5.14
Intersection of a Line and a Parabola 5.14
Equation of Tangent to Standard Parabola 5.14
Equation of Tangent to any Parabola 5.17
Equation of Pair of Tangents 5.18
Equation of Chord of Contact 5.19
Concept Application Exercise 5.4 5.20
Properties of Tangent 5.20
Locus of Point of Intersection of Tangent
under Different Conditions 5.22
Concept Application Exercise 5.5 5.23
Normal to Parabola 5.23
Normal to Parabola from a Point not Lying on it 5.25
Concept Application Exercise 5.6 5.27
Properties of Normal 5.27
Conormal Point and its Properties 5.29
Concept Application Exercise 5.7 5.31
Exercises 5.32
Single Correct Answer Type 5.32
Multiple Correct Answers Type 5.36
Linked Comprehension Type 5.38
Matrix Match Type 5.39
Numerical Value Type 5.40
Archives 5.40
Answers Key 5.43
```

## m3-06 — M3 Coordinate Goemetry :: 6. Ellipse
- Drive file id: `1-H--38D6RFecf3IBiX5jyu6wTN8javWY`- Method: VLM vision transcription (scanned)- Maps to: Coordinate Geometry ch. 6- Shelf book: `coordinate-geometry`
```text
CHAPTER 6
Ellipse    6.1–6.38
Definition    6.1
Concept Application Exercise 6.1    6.3
Equation of Ellipse in Different Forms    6.3
    Standard Equation of Ellipse    6.3
    Equation of Ellipse Having Axes Parallel to Coordinate Axes    6.6
    Equation of an Ellipse Referred to Two
    Perpendicular Lines as Axes    6.7
    Area of Ellipse    6.7
    Position of a Point w.r.t. Ellipse    6.8
    Important Property of Focal Chord    6.8
    Equation of Chord of Ellipse Bisected at Given Point    6.9
Concept Application Exercise 6.2    6.9
Parametric Form of Ellipse    6.10
    Some Important Properties of Ellipse    6.13
    Equation of Chord of Ellipse    6.14
Concept Application Exercise 6.3    6.14
Tangent to Ellipse    6.14
    A Line and an Ellipse    6.14
    Equation of Tangent to Ellipse Having Given Slope    6.15
    Equation of Tangent to Ellipse at a Given Point on it    6.16
    Equation of Tangent to Ellipse from External Point    6.18
    Equation of Pair of Tangents from External Point    6.18
    Director Circle    6.19
    Chord of Contact    6.19
Properties of Tangent    6.21
Concept Application Exercise 6.4    6.23
Normal to Ellipse    6.23
    Equation of Normal to Ellipse at a Given Point on it    6.23
    Equation of Normal to Ellipse with Given Slope    6.24
    Important Property of Normal    6.25
    Conormal Points    6.26
Concept Application Exercise 6.5    6.26
Exercises    6.28
    Single Correct Answer Type    6.28
    Multiple Correct Answers Type    6.31
    Linked Comprehension Type    6.32
    Matrix Match Type    6.34
    Numerical Value Type    6.35
Archives    6.35
Answers Key    6.38

[duplicate of table of contents page 1]
[duplicate of table of contents page 2]
[duplicate of chapter opener/content page 6.1]
[duplicate of chapter opener/content page 6.1]
[duplicate of content page 6.2]
[duplicate of content page 6.2]
[duplicate of content page 6.3]
[duplicate of content page 6.3]
[duplicate of content page 6.4]
[duplicate of content page 6.4]
```

## m3-07 — M3 Coordinate Goemetry :: 7. Hyperbola
- Drive file id: `19aRPSgJOexhlW_JZwMF8JTW2FpcRtZpm`- Method: VLM vision transcription (scanned)- Maps to: Coordinate Geometry ch. 7-8- Shelf book: `coordinate-geometry`
```text
[cover/title page]
[cover/title page]
Coordinate Geometry
CHAPTER 7
Hyperbola    7.1–7.40
Definition    7.1
Concept Application Exercise 7.1    7.3
Equation of Hyperbola and Its Properties    7.3
Standard Equation of Hyperbola    7.3
Hyperbola Having Axes Parallel to Coordinate Axes    7.7
Equation of Hyperbola Referred to
Two Perpendicular Lines as Axes    7.9
Division of Plane by Hyperbola    7.9
Important Property of Focal Chord    7.10
Equation of Chord of Hyperbola Bisected
at Given Point    7.10
Parametric Form of Hyperbola    7.11
Important Property of Auxiliary Circle    7.11
Equation of Chord of Hyperbola    7.12
Concept Application Exercise 7.2    7.13
Tangent to Hyperbola    7.13
A Line and a Hyperbola    7.13
Equation of Tangent to Hyperbola Having Given Slope    7.14
Equation of Tangent to Hyperbola at a Point on it    7.15
Tangents to Hyperbola from a Point not
Lying on it and Chord of Contact    7.16
Director Circle    7.17
Properties of Tangent to Hyperbola    7.18
[cover/title page]
[cover/title page]
Concept Application Exercise 7.3    7.18
Asymptotes of Hyperbola (Tangent at Infinity)    7.19
Properties of Asymptotes    7.20
Concept Application Exercise 7.4    7.21
Normal to Hyperbola    7.22
Equation of Normal to Hyperbola at a Point on it    7.22
Equation of Normal to Hyperbola Having Given Slope    7.22
Important Property of Normal    7.24
Concept Application Exercise 7.5    7.25
Hyperbola Having Asymptotes as Coordinate Axes    7.25
Tangent and Normal to Hyperbola    7.26
Concept Application Exercise 7.6    7.28
Exercises    7.29
Single Correct Answer Type    7.29
Multiple Correct Answers Type    7.33
Linked Comprehension Type    7.34
Matrix Match Type    7.35
Numerical Value Type    7.36
Archives    7.37
Answers Key    7.39
[cover/title page]
[cover/title page]
[cover/title page]
[cover/title page]
[cover/title page]
[cover/title page]
[cover/title page]
```

## m4-01 — M4 Calculus :: 1. Relations and Functions
- Drive file id: `1koE8vUUMJHEN582NTiVuwP1nzktn8Xzj`- Method: VLM vision transcription (scanned)- Maps to: Cross-ref: AA ch. 1 owns relations/functions- Shelf book: `advanced-algebra`
```text
[cover/title page]

[cover/title page]

Calculus

CHAPTER 1
Relations and Functions — 1.1 – 1.80

Real Number System and Inequalities — 1.1
  Intervals as Subset of Set R — 1.1
  Inequalities — 1.2
  Sign Scheme Method to Solve Inequalities — 1.4
  Modulus of Real Number — 1.6
  Modulus of Addition and Subtraction — 1.9
Concept Application Exercise 1.1 — 1.9
Relation — 1.10
  Domain of Relation — 1.10
  Range and Codomain of Relation — 1.10
  Number of Relations — 1.10
  Types of Relation — 1.11
Concept Application Exercise 1.2 — 1.13
Function (Mapping) — 1.13
  Domain, Codomain and Range of Function — 1.13
  Function as a Relation between Independent and Dependent Variables — 1.14
  Vertical Line Test — 1.15
  Some Elementary Functions — 1.16
  Identical Functions — 1.18
  Piecewise Functions — 1.18
  Algebra of Functions — 1.19
Concept Application Exercise 1.3 — 1.19
Different Types of Functions (Mappings) — 1.20
  One–One and Many–One Functions — 1.20
  Onto and Into Functions — 1.21
Concept Application Exercise 1.4 — 1.24
Algebraic Functions — 1.24
  Quadratic Functions — 1.24
Concept Application Exercise 1.5 — 1.25
Trigonometric Functions — 1.26
Concept Application Exercise 1.6 — 1.29
Inverse Trigonometric Functions — 1.29
Concept Application Exercise 1.7 — 1.32
Exponential and Logarithmic Functions — 1.32
  Exponential Function — 1.32
  Logarithmic Function — 1.33
Concept Application Exercise 1.8 — 1.36
Some More Functions — 1.36
  Greatest Integer Function — 1.36
  Fractional Part Function — 1.39
  Signum Function — 1.41
  Functions of the Form f(x) = max. {g1(x), g2(x), …, gn(x)} or f(x) = min. {g1(x), g2(x), …, gn(x)} — 1.41
Concept Application Exercise 1.9 — 1.42
Even and Odd Functions — 1.43
  Even Function — 1.43
  Odd Function — 1.43
  Even and Odd Extension of Function — 1.44
Concept Application Exercise 1.10 — 1.44
Periodic Functions — 1.45
  Period of Some Elementary Functions — 1.45
  Period of Transformed Functions — 1.45
  Period of Composite Functions — 1.46
  Period of Functions Resulting from Algebraic Operations of Functions — 1.47
Concept Application Exercise 1.11 — 1.48
Composite Functions — 1.49
Injective and Surjective Nature of Composite Function — 1.49
Concept Application Exercise 1.12 — 1.51
Inverse Functions — 1.52
  Properties of Inverse Function — 1.54
Concept Application Exercise 1.13 — 1.54
Functional Equations — 1.54
  Problems Based on Finding the Value of Function at Some Point — 1.55
  Problems Based on Finding Function — 1.56
  Problems Based on Properties of Function — 1.57
Concept Application Exercise 1.14 — 1.58
Transformation of Graphs — 1.59
  Vertical Shift — 1.59
  Horizontal Shift — 1.59
  Horizontal Stretch or Squeeze — 1.60
  Vertical Stretch or Squeeze — 1.60
  Vertical and Horizontal Flip — 1.60
  Transformation Related to Modulus — 1.60
  The Graph of y = [f(x)] from the Known Graph of y = f(x), where [.] Represents the Greatest Integer Function — 1.62
Concept Application Exercise 1.15 — 1.63
Exercises — 1.64
  Single Correct Answer Type — 1.64
  Multiple Correct Answers Type — 1.71
  Linked Comprehension Type — 1.73
  Matrix Match Type — 1.75
  Numerical Value Type — 1.76
Archives — 1.77
Answers Key — 1.78

[end of table of contents]

[pages 5–8 of the scan are chapter content pages (Chapter 1 opening, Real Number System and Inequalities, Inequalities), not table of contents entries]
```

## m4-10 — M4 Calculus :: 10. Differential Equations
- Drive file id: `1x8gKv1MPm-vYzpjY4hsOdQX27qRpRGv1`- Method: VLM vision transcription (scanned)- Maps to: Differential Equations ch. 1-2- Shelf book: `differential-equations`
```text
Calculus

CHAPTER 10
Differential Equations — 10.1–10.32

Differential Equation — 10.1
  Order and Degree of Differential Equation — 10.1
Concept Application Exercise 10.1 — 10.2
Formation of Differential Equation — 10.2
Concept Application Exercise 10.2 — 10.4
Solving Differential Equation of Variable Separable Type — 10.4
  Differential Equations Reducible to the Variable Separable Type — 10.6
Concept Application Exercise 10.3 — 10.6
Homogeneous Differential Equation — 10.6
Concept Application Exercise 10.4 — 10.9
Solving Differential Equation Using General Form of Variable Separation — 10.10
Concept Application Exercise 10.5 — 10.11
Linear Differential Equations — 10.11
Concept Application Exercise 10.6 — 10.13
Differential Equations Reducible To Linear Differential Equations — 10.13
Concept Application Exercise 10.7 — 10.14
Application of Differential Equation in Curve — 10.14
  Isogonal Trajectory — 10.17
Concept Application Exercise 10.8 — 10.17
Miscellaneous Applications of Differential Equation — 10.18
Concept Application Exercise 10.9 — 10.20
Exercises — 10.21
  Single Correct Answer Type — 10.21
  Multiple Correct Answers Type — 10.26
  Linked Comprehension Type — 10.27
  Matrix Match Type — 10.29
  Numerical Value Type — 10.29
Archives — 10.30
Answers Key — 10.32

[chapter content pages — not part of the table of contents]
```

## m4-02 — M4 Calculus :: 2. Limits
- Drive file id: `10daJBYF8xj6K5VdCrV4uPA5E8u-IPtiK`- Method: VLM vision transcription (scanned)- Maps to: Differential Calculus ch. 1- Shelf book: `differential-calculus`
```text
[cover/title page]

[cover/title page]

CHAPTER 2 — Limits — 2.1 – 2.40
Limit of a Function — 2.1
	Neighbourhood (NBD) of Real Number — 2.1
	Limiting Value of a Function — 2.1
	Existence of Limit of a Function at x = a — 2.2
Concept Application Exercise 2.1 — 2.4
Rules to Find Limit — 2.5
	Algebra of Limits — 2.5
	Finding Limit Using Direct Substitution — 2.5
	Important Concepts — 2.6
	Sandwich Rule — 2.7
Concept Application Exercise 2.2 — 2.8
Limit of Indeterminate Forms — 2.8
	Indeterminate Forms — 2.8
	Finding Limits Using Rationalization Method — 2.9
	Finding Limits at Infinity — 2.10
	Standard Formula for Limits — 2.13
Concept Application Exercise 2.3 — 2.15
Limits Using Expansion — 2.15
Concept Application Exercise 2.4 — 2.17
Trigonometric Limits — 2.17
Concept Application Exercise 2.5 — 2.22
Exponential and Logarithmic Limits — 2.23
Concept Application Exercise 2.6 — 2.25
Limit of indeterminate Form 1^∞ — 2.25
	Easier Method to Find Limit of the form 1^∞ — 2.26
Concept Application Exercise 2.7 — 2.27
L'Hospital's Rule — 2.27
	Indeterminate Forms 0^0 and ∞^0 — 2.29
Concept Application Exercise 2.8 — 2.30
Exercises — 2.31
	Single Correct Answer Type — 2.31
	Multiple Correct Answers Type — 2.34
	Linked Comprehension Type — 2.36
	Matrix Match Type — 2.37
	Numerical Value Type — 2.38
Archives — 2.39
Answers Key — 2.40

[cover/title page]

[cover/title page]

[cover/title page]

[cover/title page]
```

## m4-03 — M4 Calculus :: 3. Differentiation
- Drive file id: `11ukc00ShHEgk77BoPspt3e-W1HqmYqbp`- Method: VLM vision transcription (scanned)- Maps to: Differential Calculus ch. 3-4- Shelf book: `differential-calculus`
```text
[cover/title page]
[cover/title page]
[cover/title page]
[cover/title page]

Calculus
CHAPTER 3
Differentiation    3.1–3.34
Differentiation: Definition    3.1
    Differentiation as Slope of a Tangent to a Curve    3.1
Concept Application Exercise 3.1    3.5
Rules of Differentiation    3.5
    Derivative of Composite Function (Chain Rule)    3.6
    Product Rule for Differentiation    3.9
    Quotient Rule for Differentiation    3.9
Concept Application Exercise 3.2    3.11
Differentiation of Implicit Functions    3.11
Concept Application Exercise 3.3    3.13
Differentiation of Functions In Parametric Form    3.13
Concept Application Exercise 3.4    3.14
Differentiation Using Logarithm    3.14
Concept Application Exercise 3.5    3.16
Differentiation of One Function w.r.t. Another Function    3.16
Concept Application Exercise 3.6    3.17
Differentiation of Determinant    3.17
Concept Application Exercise 3.7    3.18
Higher Order Derivatives    3.18
Concept Application Exercise 3.8    3.20
Differentiation of Functional Relations    3.21
Concept Application Exercise 3.9    3.23
Exercises    3.24
Single Correct Answer Type    3.24
Multiple Correct Answers Type    3.28
Linked Comprehension Type    3.29
Matrix Match Type    3.30
Numerical Value Type    3.31
Archives    3.31
Answers Key    3.33

[Remaining pages are chapter body pages, not table of contents]
```

## m4-04 — M4 Calculus :: 4. Continuity and Differentiability
- Drive file id: `1Ql7ZG8_x-muueRArc8Hl60D9yLdvYK9_`- Method: VLM vision transcription (scanned)- Maps to: Differential Calculus ch. 2-3- Shelf book: `differential-calculus`
```text
[cover/title page]
CHAPTER 4
Continuity and Differentiability — 4.1–4.42
Continuity of Function — 4.1
    Continuity — 4.1
    Discontinuity and its Types — 4.3
    Directional Continuity — 4.5
    Continuity in Interval — 4.5
    Continuity and Discontinuity of Functions
    Obtained by Algebraic Operations on Two
    Given Functions — 4.8
Concept Application Exercise 4.1 — 4.9
Continuity of Few Specific Functions — 4.10
    Continuity of Function Involving Greatest Integer Function — 4.10
    Continuity of Function Involving Signum Function — 4.12
    Continuity of Function Involving Limit at Infinity — 4.13
    Continuity of Function Differently Defined for
    Rational and Irrational Values — 4.14
    Continuity of Composite Function — 4.15
Concept Application Exercise 4.2 — 4.15
Intermediate Value Theorem (IVT) — 4.16
Concept Application Exercise 4.3 — 4.17
Differentiability: Definition — 4.17
    Differentiability and Continuity — 4.18
    Reasons for Non-Differentiability — 4.18
    Differentiability in an Interval — 4.18
Concept Application Exercise 4.4 — 4.20
Examining Differentiability Using Differentiation
and Graph of the Function — 4.20
    Differentiability of Functions Obtained by
    Algebraic Operations on Two Given Functions — 4.25
    Continuity of Derivative — 4.26
Concept Application Exercise 4.5 — 4.27
Exercises — 4.29
    Single Correct Answer Type — 4.29
    Multiple Correct Answers Type — 4.33
    Linked Comprehension Type — 4.36
    Matrix Match Type — 4.37
    Numerical Value Type — 4.38
Archives — 4.39
Answers Key — 4.41
```

## m4-05 — M4 Calculus :: 5. Application of Derivatives
- Drive file id: `1Puq82R9yt9OdApHeasiaDeb8mtoE7Dms`- Method: VLM vision transcription (scanned)- Maps to: Differential Calculus ch. 5, 7- Shelf book: `differential-calculus`
```text
Calculus

CHAPTER 5
Application of Derivatives — 5.1–5.32

Tangent and Normal — 5.1
  Tangent and Normal at a Point on the Curve — 5.1
  Tangent and Normal from External Point — 5.4
  Condition for which Given Line is Tangent or Normal to Given Curve — 5.5
Concept Application Exercise 5.1 — 5.6
Angle between Curves — 5.6
  Orthogonal Intersection of Curves — 5.7
Concept Application Exercise 5.2 — 5.8
Tangent, Normal, Subtangent and Subnormal — 5.8
Concept Application Exercise 5.3 — 5.9
Applications of Tangent and Normal — 5.9
Concept Application Exercise 5.4 — 5.12
Derivative as Rate Measure — 5.12
Concept Application Exercise 5.5 — 5.15
Approximation Using Derivative — 5.16
Concept Application Exercise 5.6 — 5.17
Rolle's Theorem — 5.17
  Graphical Interpretation of Rolle's Theorem — 5.17
  Application of Rolle's Theorem and Selection of Function — 5.18
Concept Application Exercise 5.7 — 5.19
Mean Value Theorems — 5.19
  Lagrange's Mean Value Theorem (LMVT) — 5.19
  Cauchy's Mean Value Theorem — 5.22
Concept Application Exercise 5.8 — 5.23
Exercises — 5.24
  Single Correct Answer Type — 5.24
  Multiple Correct Answers Type — 5.27
  Linked Comprehension Type — 5.28
  Matrix Match Type — 5.29
  Numerical Value Type — 5.30
Archives — 5.31
Answers Key — 5.31
```

## m4-06 — M4 Calculus :: 6. Monotonicity and Maxima-Minima of Functions
- Drive file id: `123Imldpqr-bg4aS4UQtUZYgdLK0S4vLy`- Method: VLM vision transcription (scanned)- Maps to: Differential Calculus ch. 6, 8- Shelf book: `differential-calculus`
```text
[cover/title page]

CHAPTER 6
Monotonicity and Maxima-Minima of Functions    6.1–6.52

Introduction    6.1
Classification of Functions Based on Monotonicity    6.1
  Increasing Function    6.1
  Strictly Increasing Function    6.1
  Decreasing Function    6.1
  Strictly Decreasing Function    6.2
  Nature of the Composite Functions    6.4
  Monotonic Function    6.5
  Non-Monotonic Function    6.5
Concept Application Exercise 6.1    6.7
Applications of Monotonicity    6.8
  Finding Range of the Function and Number
  of Roots of the Equation Using Monotonicity    6.8
  Proving Inequalities Using Monotonicity    6.9
Concept Application Exercise 6.2    6.11
Concavity of Curve and Point of Inflection    6.11
  Inequalities Using Concavity    6.12
  Point of Inflection    6.13
Concept Application Exercise 6.3    6.14
Maxima and Minima of Function    6.15
  Identifying Maxima and Minima by Checking
  Value of Function in the Neighbourhood of Point
  of Extrema    6.16

Second Derivative Test for Maxima and
Minima of Differentiable Function    6.18
First Derivative Test for Maxima/Minima of
Differentiable Function    6.19
  Tests for Maxima and Minima of Discontinuous and
  Non-Differentiable Functions    6.20
  Global (Absolute) Maximum and Minimum    6.23
Concept Application Exercise 6.4    6.24
Applications of Extrema in Curve Tracing and
Analysing Roots of Equation    6.25
Concept Application Exercise 6.5    6.29
Applications of Extrema in Optimization,
Plane Geometry and Coordinate Geometry    6.30
Concept Application Exercise 6.6    6.33
Applications of Extrema in Solid Geometry    6.33
Concept Application Exercise 6.7    6.35
Exercises    6.36
  Single Correct Answer Type    6.36
  Multiple Correct Answers Type    6.41
  Linked Comprehension Type    6.43
  Matrix Match Type    6.46
  Numerical Value Type    6.47
Archives    6.48
Answers Key    6.51
```

## m4-07 — M4 Calculus :: 7. Indefinite Integration
- Drive file id: `1m0Ipep3WSVXewhdhFC6ZHVHbMj0spCfd`- Method: VLM vision transcription (scanned)- Maps to: Integral Calculus ch. 1-2- Shelf book: `integral-calculus`
```text
[cover/title page]
[cover/title page]
[cover/title page]
[cover/title page]
[cover/title page]
[cover/title page]
[cover/title page]
[cover/title page]
[cover/title page]
[cover/title page]
[cover/title page]
[cover/title page]

Calculus

CHAPTER 7
Indefinite Integration — 7.1–7.42

Integration as Reverse Process of Differentiation — 7.1
    Integration of Commonly Used Functions — 7.1
    Basic Properties of Indefinite Integration — 7.1
Concept Application Exercise 7.1 — 7.2
Integration of Function f(ax + b) — 7.3
Concept Application Exercise 7.2 — 7.4
Integration Using Substitution — 7.4
    Integration of tan, cot, sec and cosec Functions — 7.6
    Some Standard Trigonometric Substitutions — 7.8
Concept Application Exercise 7.3 — 7.9
Integration of Function f(g(x))g′(x) — 7.10
Concept Application Exercise 7.4 — 7.13
Integration of Function which is Reciprocal of Quadratic — 7.14
    Integration of Function in which Linear Function is Divided by Quadratic — 7.15
    Integration of Expressions Involving Biquadratic Function — 7.15
Concept Application Exercise 7.5 — 7.17
Integration of Function which is Reciprocal of Square Root of Quadratic — 7.17
    Integration of Function in which Linear Function is Divided by Square Root of Quadratic — 7.19
Concept Application Exercise 7.6 — 7.19
Integration of Functions of Some Standard Forms — 7.19
Concept Application Exercise 7.7 — 7.22
Integration by Partial Fractions — 7.22
Concept Application Exercise 7.8 — 7.25
Integration by Parts — 7.25
    Integration of e^(ax) sin bx and e^(ax) cos bx — 7.28
    Integration of Square Root of Quadratic — 7.28
    Integration by Cancellation — 7.29
Concept Application Exercise 7.9 — 7.30
Exercises — 7.32
    Single Correct Answer Type — 7.32
    Multiple Correct Answers Type — 7.38
    Linked Comprehension Type — 7.39
    Matrix Match Type — 7.40
    Numerical Value Type — 7.41
Archives — 7.41
Answers Key — 7.41
```

## m4-08 — M4 Calculus :: 8. Definite Integration
- Drive file id: `1bx_i6agggS_MWPaSkecTZiwqAlzHmpmM`- Method: VLM vision transcription (scanned)- Maps to: Integral Calculus ch. 3-4- Shelf book: `integral-calculus`
```text
Calculus
CHAPTER 8
Definite Integration — 8.1–8.54
Definite Integration as Limit of Sum — 8.1
    Definite Integration as Area Function — 8.2
Concept Application Exercise 8.1 — 8.5
Fundamental Theorems of Integral Calculus — 8.5
    Definite Integration by Parts — 8.7
    Sum of Infinite Series Using Integration — 8.9
Concept Application Exercise 8.2 — 8.9
Inequalities in Definite Integration — 8.10
Concept Application Exercise 8.3 — 8.12
Elementary Properties of Definite Integration — 8.12
Concept Application Exercise 8.4 — 8.16
Replacing Dummy Variable with Sum of the Limits Minus Dummy Variable — 8.16
Concept Application Exercise 8.5 — 8.20
Halving The Upper Limit — 8.20
    Important Result — 8.22
Concept Application Exercise 8.6 — 8.23
Definite Integration of Odd and Even Functions — 8.23
Concept Application Exercise 8.7 — 8.25
Definite Integration of Periodic Functions — 8.26
Concept Application Exercise 8.8 — 8.28
Leibniz's Rule (Differentiation Under Integral Sign) — 8.28
    Leibniz's Rule when Integrand is f(x, t) — 8.30
Concept Application Exercise 8.9 — 8.31
Definite Integration by Typical Substitution — 8.31
Concept Application Exercise 8.10 — 8.33
Definite Integration by Reduction Formula — 8.34
Concept Application Exercise 8.11 — 8.35
Exercises — 8.36
    Single Correct Answer Type — 8.36
    Multiple Correct Answers Type — 8.42
    Linked Comprehension Type — 8.44
    Matrix Match Type — 8.46
    Numerical Value Type — 8.48
Archives — 8.49
Answers Key — 8.54

[pages 5–12 contain chapter body text, not table of contents]
```

## m4-09 — M4 Calculus :: 9. Area
- Drive file id: `1K0mwnF-KsltKT6-M9oMd_teQ0pceTKnK`- Method: VLM vision transcription (scanned)- Maps to: Integral Calculus ch. 5- Shelf book: `integral-calculus`
```text
[cover/title page]
[cover/title page]

Calculus
CHAPTER 9
Area 9.1–9.26

Area Bounded by Curve and Axis 9.1
  Area Bounded by Curve and Axis when
  Graph of Function Intersects x-axis 9.5
  Area Using Integration along y-Axis 9.5
Concept Application Exercise 9.1 9.6
Area Bounded By Two Curves 9.6
  Area Bounded by Curves in Given Interval 9.6
  Area Bounded by Two Curves when Curves
  Intersect at Two Points 9.7
  Area Bounded by Two Curves when Curves
  Intersect at more than Two Points 9.10
Concept Application Exercise 9.2 9.12
Area Bounded By Miscellaneous Curves 9.12
  Concept of Variable Area 9.12
  Area Bounded by Inequalities 9.13
  Area Bounded by Inverse of Given Function
  without Getting Inverse Function 9.15
Concept Application Exercise 9.3 9.16
Exercises 9.17
  Single Correct Answer Type 9.17
  Multiple Correct Answers Type 9.19
  Linked Comprehension Type 9.20
  Matrix Match Type 9.22
Numerical Value Type 9.22
Archives 9.23
Answers Key 9.24

[cover/title page]
[cover/title page]

9 Area

AREA BOUNDED BY CURVE AND AXIS
Illustration 9.1
Illustration 9.2
Note:
Illustration 9.3
Illustration 9.4
Illustration 9.5
Illustration 9.6
Illustration 9.7
Illustration 9.8
Illustration 9.9
Illustration 9.10

[cover/title page]
[cover/title page]
```

## m5-01 — M5 3D Geometry :: 1. Introduction to 3D Geometry
- Drive file id: `1CH3p3FGbH-v7L_y8u8hTcfZThybianEd`- Method: VLM vision transcription (scanned)- Maps to: Coordinate Geometry ch. 9- Shelf book: `coordinate-geometry`
```text
[cover/title page]
CHAPTER 1
Introduction to 3D Geometry 1.1–1.24
Introduction to 3D Coordinate System 1.1
Understanding Coordinates of Point in 3D System 1.2
Direction Angles and Direction Cosines 1.5
Plane Perpendicular to One of the Three Axes 1.7
Line Parallel to One of the Three Axes 1.8
Concept Application Exercise 1.1 1.9
Distance Formula 1.10
Distance between Two Points Lying on the Same Axis 1.10
Distance between Two Points Lying on the Line Parallel to One of the Axes 1.10
Distance between Two Points 1.10
Concept Application Exercise 1.2 1.12
Section Formula 1.13
Concept Application Exercise 1.3 1.17
Sphere 1.18
General Equation of Sphere 1.19
Concept Application Exercise 1.4 1.21
Exercises 1.22
Single Correct Answer Type 1.22
Answers Key 1.23
[cover/title page]
[content page — chapter opener, Introduction to 3D Geometry, not a contents page]
[content page — 1.2 Vectors and 3D Geometry, not a contents page]
[content page — 1.3, not a contents page]
[content page — 1.4, not a contents page]
[content page — 1.5, not a contents page]

Note: Pages 3–12 of the scan are chapter content pages (chapter opener and pages 1.2–1.5), not further table-of-contents pages. The complete printed table of contents (which appears only on the first contents page) is transcribed above in full, in printed order.
```

## m5-02 — M5 3D Geometry :: 2. Introduction to Vectors
- Drive file id: `10JG98rLZm_zIbjRkeoDLzcqbGU7heaFz`- Method: VLM vision transcription (scanned)- Maps to: Coordinate Geometry ch. 10- Shelf book: `coordinate-geometry`
```text
[cover/title page]
[cover/title page]

Vectors and 3D Geometry

CHAPTER 2

Introduction to Vectors	2.1–2.52

Coordinate Axes and
Coordinate Planes in Three-Dimensional Space	2.1
    Coordinates of a Point in Space	2.1
    Distance between Two Points	2.2
    Section Formula	2.2
Vector Concept	2.3
    Definition	2.4
    Position Vector	2.4
    Direction Cosines and Direction Ratios	2.4
    Types of Vectors	2.5
    Addition of Vectors	2.6
    Components of a Vector	2.11
    Multiplication of a Vector by a Scalar	2.14
    Vector Joining Two Points	2.15
    Section Formula	2.17
    Vector Along the Bisector of Given Two Vectors	2.26
Concept Application Exercise 2.1	2.27
Linear Combination of Vectors	2.29
    Linear Combination of Vectors	2.29
    Linearly Independent Vectors	2.29
    Linearly Dependent Vectors	2.30
Concept Application Exercise 2.2	2.41
Exercises	2.42
    Single Correct Answer Type	2.42
    Multiple Correct Answers Type	2.46
    Linked Comprehension Type	2.47
    Matrix Match Type	2.49
    Numerical Value Type	2.49
Archives	2.50
Answers Key	2.51
```

## m5-03 — M5 3D Geometry :: 3. Different Products of Vectors
- Drive file id: `1pUzCU8iRNpYxLIzvpkRuw4wDx-y5836K`- Method: VLM vision transcription (scanned)- Maps to: Coordinate Geometry ch. 11- Shelf book: `coordinate-geometry`
```text
[cover/title page]
CHAPTER 3
Different Products of Vectors — 3.1–3.90
Dot (Scalar) Product of Vectors — 3.1
Physical Interpretation of Scalar Product — 3.1
Geometrical Interpretation of Scalar Product — 3.1
Properties of Dot (Scalar) Product — 3.2
Applications of Dot (Scalar) Product — 3.3
Concept Application Exercise 3.1 — 3.18
Vector (or Cross) Product of Two Vectors — 3.20
Properties of Cross Product — 3.21
Physical Interpretation of Cross Product as a Moment of Force — 3.21
Geometric Interpretation of Cross Product — 3.22
Concept Application Exercise 3.2 — 3.35
Scalar Triple Product — 3.36
Geometrical Interpretation — 3.37
Volume of Tetrahedron — 3.38
Properties of Scalar Triple Product — 3.38
Vector Triple Product — 3.46
Lagrange's Identity — 3.47
Reciprocal System of Vectors — 3.55
Properties — 3.55
Concept Application Exercise 3.3 — 3.58
Exercises — 3.60
Single Correct Answer Type — 3.60
Multiple Correct Answers Type — 3.70
Linked Comprehension Type — 3.76
Matrix Match Type — 3.80
Numerical Value Type — 3.82
Archives — 3.83
Answers Key — 3.88
[cover/title page]
[cover/title page]
[cover/title page]
[cover/title page]
[cover/title page]
[cover/title page]
[cover/title page]
[cover/title page]
```

## m5-04 — M5 3D Geometry :: 4. Line and Plane
- Drive file id: `1aiYZKfxM0WEvx4SWu96mOgpsPODN7n39`- Method: VLM vision transcription (scanned)- Maps to: Coordinate Geometry ch. 12- Shelf book: `coordinate-geometry`
```text
Vectors and 3D Geometry

[cover/title page]
[cover/title page]
[cover/title page]
[cover/title page]
[cover/title page]
[cover/title page]
[cover/title page]
[cover/title page]

CHAPTER 4
Line and Plane    4.1–4.74

Direction Cosines and Direction Ratios    4.1
  Direction Ratios    4.1
Concept Application Exercise 4.1    4.7
Line in Space    4.7
  Equation of Straight Line Passing through a Given Point and Parallel to a Given Vector    4.7
  Equation of Line Passing Through Two Given Points    4.9
  Angle between Two Lines    4.14
  Point and Line    4.16
  Shortest Distance between Two Lines    4.18
Concept Application Exercise 4.2    4.24
Plane in Space    4.26
  Equation of a Plane in Normal Form    4.26
  Equation of a Plane Passing through a Given Point and Normal to a Given Vector    4.28
  Equation of a Plane Passing through Three Given Points    4.29
  Equation of the Plane that Passes through Point A with Position Vector a and is Parallel to Given Vectors b and c    4.31
  Cartesian Form    4.31
  Equation of a Plane Passing through a Given Point and Line    4.32
  Intercept Form of a Plane    4.33
  Equation of a Plane Passing through Two Parallel Lines    4.33
  Equation of a Plane Parallel to a Given Plane    4.33
  Angle between Two Planes    4.34
  Line of Intersection of Two Planes    4.35
  Angle between a Line and a Plane    4.40
  Equation of a Plane Passing through the Line of Intersection of Two Planes    4.41
  Distance of a Point from a Plane    4.43
  Distance between Parallel Planes    4.45
  Equation of a Plane Bisecting the Angle between Two Planes    4.48
  Two Sides of a Plane    4.50
Regular Tetrahedron    4.51
  Angle between any Edge and Face not Containing that Edge of Regular Tetrahedron    4.51
  Angle between the Two Faces of Regular Tetrahedron    4.51
  Height of Regular Tetrahedron    4.52
Concept Application Exercise 4.3    4.53
Exercises    4.55
  Single Correct Answer Type    4.55
  Multiple Correct Answers Type    4.64
  Linked Comprehension Type    4.66
  Matrix Match Type    4.67
  Numerical Value Type    4.68
Archives    4.69
Answers Key    4.73

[cover/title page]
[cover/title page]
[cover/title page]
[cover/title page]
[cover/title page]
```

## root-loney-trigonometry — Trigonometry-Loney.pdf (classic)
- Drive file id: `15kAmmhJyUwhJ69JjK1UvrrTliC1bM1R-`- Method: VLM vision transcription (scanned)- Maps to: Trigonometry depth pole (classic, 1893)- Shelf book: `trigonometry`
```text
[cover/title page]
[cover/title page]
[cover/title page]
[cover/title page]

First Edition, 1893.
Second Edition, 1895.
Third Edition, 1896.
Reprinted 1898, 1901, 1903, 1906, 1908, 1910, 1912.
New Edition with a set of Miscellaneous Examples
and Five-figure Tables, 1918.

PREFACE.

On a first reading also the articles marked with an asterisk should be omitted.
Considerable attention has been paid to the printing of the book and I am under great obligation to the Syndics of the Press for their liberality in this matter, and to the officers and workmen of the Press for the trouble they have taken.
I am indebted to Mr W. J. Dobbs, B.A., late Scholar of St John's College, for his kindness in reading and correcting the proof-sheets and for many valuable suggestions.
For any corrections and suggestions for improvement I shall be thankful.
S. L. LONEY.
ROYAL HOLLOWAY COLLEGE, EGHAM, SURREY. September 12, 1893.

PREFACE TO THE SECOND EDITION.
The Second Edition has been carefully revised, and it is hoped that few serious mistakes remain either in the text or the answers.
Some changes have been made in the chapters on logarithms and logarithmic tables, and an additional chapter has been added on Projections.
April 25, 1895.

CONTENTS.

PART I
I.    Measurement of angles. Sexagesimal and Centesimal Measure ... 1
      Circular, or Radian, Measure ... 5
II.   Trigonometrical Ratios for angles less than a right angle ... 19
      Values for angles of 45°, 30°, 60°, 90°, and 0° ... 32
III.  Simple problems in Heights and Distances ... 40
IV.   Applications of algebraic signs to Trigonometry ... 47
      Tracing the changes in the ratios ... 52
V.    Trigonometrical ratios of any size. Ratios for −θ, 90°−θ, 90°+θ, ... 64
VI.   General expressions for all angles having a given trigonometrical ratio ... 76
VII.  Ratios of the sum and difference of two angles ... 87
      Product Formulae ... 93
VIII. Ratios of multiple and submultiple angles ... 105
      Explanation of ambiguities ... 114
      Angles of 18°, 36°, and 9° ... 126
IX.   Identities and trigonometrical equations ... 131
X.    Logarithms ... 146
      Tables of logarithms ... 152
XI.   Principle of Proportional Parts ... 159
XII.  Sides and Angles of a triangle ... 174
XIII. Solution of triangles ... 189
      Given two sides and the included angle ... 195
      Ambiguous Case ... 201
XIV.  Heights and Distances ... 211
XV.   Properties of a triangle ... 228
      The circles connected with a triangle ... 230
      Orthocentre and Pedal triangle ... 238
      Centroid and Medians ... 241
XVI.  Quadrilaterals ... 251
      Regular Polygons ... 257
XVII. Trigonometrical ratios of small angles. sin θ < θ < tan θ ... 262
      Area of a Circle ... 268
      Dip of the horizon ... 270
XVIII. Inverse circular functions ... 273
XIX.  Some simple trigonometrical Series ... 283
XX.   Elimination ... 290
XXI.  Projections ... 295
      Miscellaneous Examples ... 301
      ANSWERS ... i
      Five-figure Logarithmic and Trigonometrical Tables ... xix

THE PRINCIPAL FORMULAE IN TRIGONOMETRY.
PART I
I.  Circumference of a circle = 2πr. (Art. 12.)
    π = 3·14159... [Approximations are 22/7 and 355/113]. (Art. 13.)
    A Radian = 57° 17′ 44·8″ nearly. (Art. 16.)
    Two right angles = 180° = 200^g = π radians. (Art. 19.)
    Angle = (arc/radius) × Radian. (Art. 21.)
II. sin²θ + cos²θ = 1; sec²θ = 1 + tan²θ; cosec²θ = 1 + cot²θ. (Art. 27.)
III. sin 0° = 0; cos 0° = 1. (Art. 36.)
    sin 30° = 1/2; cos 30° = √3/2. (Art. 34.)
    sin 45° = cos 45° = 1/√2. (Art. 33.)
    sin 60° = √3/2; cos 60° = 1/2. (Art. 35.)
    sin 90° = 1; cos 90° = 0. (Art. 37.)
    sin 15° = (√3−1)/(2√2); cos 15° = (√3+1)/(2√2). (Art. 106.)
    sin 18° = (√5−1)/4; cos 36° = (√5+1)/4. (Arts. 120, 121.)
IV. sin(−θ) = −sin θ; cos(−θ) = cos θ. (Art. 68.)
    sin(90°−θ) = cos θ; cos(90°−θ) = sin θ. (Art. 69.)
    sin(90°+θ) = cos θ; cos(90°+θ) = −sin θ. (Art. 70.)
    sin(180°−θ) = sin θ; cos(180°−θ) = −cos θ. (Art. 72.)
    sin(180°+θ) = −sin θ; cos(180°+θ) = −cos θ. (Art. 73.)
V.  If sin θ = sin α, then θ = nπ + (−1)ⁿα. (Art. 82.)
    If cos θ = cos α, then θ = 2nπ ± α. (Art. 83.)
    If tan θ = tan α, then θ = nπ + α. (Art. 84.)
VI. sin(A+B) = sin A cos B + cos A sin B.
    cos(A+B) = cos A cos B − sin A sin B. (Art. 88.)
    sin(A−B) = sin A cos B − cos A sin B.
    cos(A−B) = cos A cos B + sin A sin B. (Art. 90.)
    sin C + sin D = 2 sin((C+D)/2) cos((C−D)/2).
    sin C − sin D = 2 cos((C+D)/2) sin((C−D)/2).
    cos C + cos D = 2 cos((C+D)/2) cos((C−D)/2).
    cos D − cos C = 2 sin((C+D)/2) sin((C−D)/2). (Art. 94.)
    2 sin A cos B = sin(A+B) + sin(A−B).
    2 cos A sin B = sin(A+B) − sin(A−B).
    2 cos A cos B = cos(A+B) + cos(A−B).
    2 sin A sin B = cos(A−B) − cos(A+B). (Art. 97.)
    tan(A+B) = (tan A + tan B)/(1 − tan A tan B).
    tan(A−B) = (tan A − tan B)/(1 + tan A tan B). (Art. 98.)
    sin 2A = 2 sin A cos A.
    cos 2A = cos²A − sin²A = 1 − 2 sin²A = 2 cos²A − 1. (Art. 105.)
    sin 2A = 2 tan A/(1 + tan²A); cos 2A = (1 − tan²A)/(1 + tan²A). (Art. 109.)
    tan 2A = 2 tan A/(1 − tan²A). (Art. 105.)
    sin 3A = 3 sin A − 4 sin³A.
    cos 3A = 4 cos³A − 3 cos A.
    tan 3A = (3 tan A − tan³A)/(1 − 3 tan²A). (Art. 107.)
    sin(A/2) = ±√((1−cos A)/2); cos(A/2) = ±√((1+cos A)/2). (Art. 110.)
    2 sin(A/2) = ±√(1 + sin A) ± √(1 − sin A).
    2 cos(A/2) = ±√(1 + sin A) ± √(1 − sin A). (Art. 113.)
    tan(A₁ + A₂ + ... + Aₙ) = (s₁ − s₃ + s₅ − ...)/(1 − s₂ + s₄ − ...). (Art. 125.)
VII. log_a mn = log_a m + log_a n.
    log_a (m/n) = log_a m − log_a n.
    log_a mⁿ = n log_a m. (Art. 136.)
    log_b m = log_a m × log_b a. (Art. 147.)
VIII. sin A/a = sin B/b = sin C/c. (Art. 163.)
    cos A = (b² + c² − a²)/2bc, ... (Art. 164.)
    sin(A/2) = √((s−b)(s−c)/bc), ... (Art. 165.)
    cos(A/2) = √(s(s−a)/bc), ... (Art. 166.)
    tan(A/2) = √((s−b)(s−c)/(s(s−a))), ... (Art. 167.)
    sin A = (2/bc)√(s(s−a)(s−b)(s−c)), ... (Art. 169.)
    a = b cos C + c cos B, ... (Art. 170.)
    tan((B−C)/2) = ((b−c)/(b+c)) cot(A/2), ... (Art. 171.)
    S = √(s(s−a)(s−b)(s−c)) = (1/2)bc sin A = (1/2)ca sin B = (1/2)ab sin C. (Art. 198.)
IX. R = a/(2 sin A) = b/(2 sin B) = c/(2 sin C) = abc/(4S). (Arts. 200, 201.)
    r = S/s = (s−a) tan(A/2) = ... (Arts. 202, 203.)
    r₁ = S/(s−a) = s tan(A/2). (Arts. 205, 206.)
    Area of a quadrilateral inscribed in a circle = √((s−a)(s−b)(s−c)(s−d)). (Art. 219.)
    (sin θ)/θ = 1, when θ is very small. (Art. 228.)
    Area of a circle = πr². (Art. 233.)
X.  sin α + sin(α+β) + sin(α+2β) + ... to n terms = [sin{α + ((n−1)/2)β} sin(nβ/2)]/sin(β/2). (Art. 241.)
    cos α + cos(α+β) + cos(α+2β) + ... to n terms = [cos{α + ((n−1)/2)β} sin(nβ/2)]/sin(β/2). (Art. 242.)

[blank page]

CHAPTER I
MEASUREMENT OF ANGLES, SEXAGESIMAL, CENTESIMAL, AND CIRCULAR MEASURE.

1. In geometry angles are measured in terms of a right angle...
2. In the Sexagesimal system of measurement a right angle is divided into 90 equal parts called Degrees...
3. On this account another system of measurement called the Centesimal, or French, system has been proposed...
4. This system would be much more convenient to use than the ordinary Sexagesimal System...
5. To convert Sexagesimal into Centesimal Measure, and vice versa...
Ex. 1. Reduce 63° 14′ 51″ to the Centesimal Measure.
Ex. 2. Reduce 94° 23′ 87″ to Sexagesimal Measure.
6. Angles of any size...
```

## root-thomas-calculus-14e — Thomas-Calculus-14th-Edition.pdf (late-transcendental pole)
- Drive file id: `1qXv8ncUgfOeCuu7b90fRhTPPhn1A5MXJ`- Method: pdftotext (digital text layer)- Maps to: Differential + Integral Calculus depth pole; Multivariable Calculus spine- Shelf book: `multivariable-calculus`
```text
[front-matter page 1: not contents — omitted]

[front-matter page 2: not contents — omitted]

[front-matter page 3: not contents — omitted]

                       Contents

                                       Preface       ix




                       1               Functions          1
                               1.1     Functions and Their Graphs 1
                               1.2     Combining Functions; Shifting and Scaling Graphs     14
                               1.3     Trigonometric Functions 21
                               1.4     Graphing with Software 29
                                       Questions to Guide Your Review 33
                                       Practice Exercises 34
                                       Additional and Advanced Exercises 35
                                       Technology Application Projects 37



                       2               Limits and Continuity             38
                               2.1     Rates of Change and Tangent Lines to Curves 38
                               2.2     Limit of a Function and Limit Laws 45
                               2.3     The Precise Definition of a Limit 56
                               2.4     One-Sided Limits 65
                               2.5     Continuity 72
                               2.6     Limits Involving Infinity; Asymptotes of Graphs 83
                                       Questions to Guide Your Review 96
                                       Practice Exercises 97
                                       Additional and Advanced Exercises 98
                                       Technology Application Projects 101



                       3               Derivatives            102
                               3.1     Tangent Lines and the Derivative at a Point 102
                               3.2     The Derivative as a Function 106
                               3.3     Differentiation Rules 115
                               3.4     The Derivative as a Rate of Change 124
                               3.5     Derivatives of Trigonometric Functions 134
                               3.6     The Chain Rule 140
                               3.7     Implicit Differentiation 148
                               3.8     Related Rates 153
                               3.9     Linearization and Differentials 162
                                       Questions to Guide Your Review 174
                                       Practice Exercises 174
                                       Additional and Advanced Exercises 179
                                       Technology Application Projects 182




                                                                                                      iii




A01_HASS8986_14_SE_FM_i-xviii.indd 3                                                             16/01/17 9:36 AM

      iv           Contents




               4                Applications of Derivatives                183
                        4.1     Extreme Values of Functions on Closed Intervals 183
                        4.2     The Mean Value Theorem 191
                        4.3     Monotonic Functions and the First Derivative Test 197
                        4.4     Concavity and Curve Sketching 202
                        4.5     Applied Optimization 214
                        4.6     Newton’s Method 226
                        4.7     Antiderivatives 231
                                Questions to Guide Your Review 241
                                Practice Exercises 241
                                Additional and Advanced Exercises 244
                                Technology Application Projects 247



               5                Integrals       248
                        5.1     Area and Estimating with Finite Sums 248
                        5.2     Sigma Notation and Limits of Finite Sums 258
                        5.3     The Definite Integral 265
                        5.4     The Fundamental Theorem of Calculus 278
                        5.5     Indefinite Integrals and the Substitution Method 289
                        5.6     Definite Integral Substitutions and the Area Between Curves   296
                                Questions to Guide Your Review 306
                                Practice Exercises 307
                                Additional and Advanced Exercises 310
                                Technology Application Projects 313



               6                Applications of Definite Integrals                 314
                        6.1     Volumes Using Cross-Sections 314
                        6.2     Volumes Using Cylindrical Shells 325
                        6.3     Arc Length 333
                        6.4     Areas of Surfaces of Revolution 338
                        6.5     Work and Fluid Forces 344
                        6.6     Moments and Centers of Mass 353
                                Questions to Guide Your Review 365
                                Practice Exercises 366
                                Additional and Advanced Exercises 368
                                Technology Application Projects 369



               7                Transcendental Functions                 370
                        7.1     Inverse Functions and Their Derivatives 370
                        7.2     Natural Logarithms 378
                        7.3     Exponential Functions 386
                        7.4     Exponential Change and Separable Differential Equations   397
                        7.5     Indeterminate Forms and L’Hôpital’s Rule 407
                        7.6     Inverse Trigonometric Functions 416
                        7.7     Hyperbolic Functions 428




A01_HASS8986_14_SE_FM_i-xviii.indd 4                                                                16/01/17 9:36 AM

                                                                                                    Contents        v


                               7.8     Relative Rates of Growth 436
                                       Questions to Guide Your Review 441
                                       Practice Exercises 442
                                       Additional and Advanced Exercises 445



                       8               Techniques of Integration                447
                               8.1     Using Basic Integration Formulas 447
                               8.2     Integration by Parts 452
                               8.3     Trigonometric Integrals 460
                               8.4     Trigonometric Substitutions 466
                               8.5     Integration of Rational Functions by Partial Fractions 471
                               8.6     Integral Tables and Computer Algebra Systems 479
                               8.7     Numerical Integration 485
                               8.8     Improper Integrals 494
                               8.9     Probability 505
                                       Questions to Guide Your Review 518
                                       Practice Exercises 519
                                       Additional and Advanced Exercises 522
                                       Technology Application Projects 525



                       9               First-Order Differential Equations                   526
                               9.1     Solutions, Slope Fields, and Euler’s Method 526
                               9.2     First-Order Linear Equations 534
                               9.3     Applications 540
                               9.4     Graphical Solutions of Autonomous Equations 546
                               9.5     Systems of Equations and Phase Planes 553
                                       Questions to Guide Your Review 559
                                       Practice Exercises 559
                                       Additional and Advanced Exercises 561
                                       Technology Application Projects 562



                       10              Infinite Sequences and Series                  563
                               10.1 Sequences 563
                               10.2 Infinite Series 576
                               10.3 The Integral Test 586
                               10.4 Comparison Tests 592
                               10.5 Absolute Convergence; The Ratio and Root Tests 597
                               10.6 Alternating Series and Conditional Convergence 604
                               10.7 Power Series 611
                               10.8 Taylor and Maclaurin Series 622
                               10.9 Convergence of Taylor Series 627
                               10.10 Applications of Taylor Series 634
                                     Questions to Guide Your Review 643
                                     Practice Exercises 644
                                     Additional and Advanced Exercises 646
                                     Technology Application Projects 648




A01_HASS8986_14_SE_FM_i-xviii.indd 5                                                                           16/01/17 9:36 AM

      vi           Contents




               11               Parametric Equations and Polar Coordinates               649
                        11.1    Parametrizations of Plane Curves 649
                        11.2    Calculus with Parametric Curves 658
                        11.3    Polar Coordinates 667
                        11.4    Graphing Polar Coordinate Equations 671
                        11.5    Areas and Lengths in Polar Coordinates 675
                        11.6    Conic Sections 680
                        11.7    Conics in Polar Coordinates 688
                                Questions to Guide Your Review 694
                                Practice Exercises 695
                                Additional and Advanced Exercises 697
                                Technology Application Projects 699



               12               Vectors and the Geometry of Space                  700
                        12.1    Three-Dimensional Coordinate Systems 700
                        12.2    Vectors 705
                        12.3    The Dot Product 714
                        12.4    The Cross Product 722
                        12.5    Lines and Planes in Space 728
                        12.6    Cylinders and Quadric Surfaces 737
                                Questions to Guide Your Review 743
                                Practice Exercises 743
                                Additional and Advanced Exercises 745
                                Technology Application Projects 748



               13               Vector-Valued Functions and Motion in Space               749
                        13.1    Curves in Space and Their Tangents 749
                        13.2    Integrals of Vector Functions; Projectile Motion 758
                        13.3    Arc Length in Space 767
                        13.4    Curvature and Normal Vectors of a Curve 771
                        13.5    Tangential and Normal Components of Acceleration 777
                        13.6    Velocity and Acceleration in Polar Coordinates 783
                                Questions to Guide Your Review 787
                                Practice Exercises 788
                                Additional and Advanced Exercises 790
                                Technology Application Projects 791




A01_HASS8986_14_SE_FM_i-xviii.indd 6                                                            16/01/17 9:36 AM

                                                                                                             Contents       vii



                       14              Partial Derivatives            792
                               14.1 Functions of Several Variables 792
                               14.2 Limits and Continuity in Higher Dimensions 800
                               14.3 Partial Derivatives 809
                               14.4 The Chain Rule 821
                               14.5 Directional Derivatives and Gradient Vectors 831
                               14.6 Tangent Planes and Differentials 839
                               14.7 Extreme Values and Saddle Points 849
                               14.8 Lagrange Multipliers 858
                               14.9 Taylor’s Formula for Two Variables 868
                               14.10 Partial Derivatives with Constrained Variables 872
                                     Questions to Guide Your Review 876
                                     Practice Exercises 877
                                     Additional and Advanced Exercises 880
                                     Technology Application Projects 882



                       15              Multiple Integrals            883
                               15.1    Double and Iterated Integrals over Rectangles 883
                               15.2    Double Integrals over General Regions 888
                               15.3    Area by Double Integration 897
                               15.4    Double Integrals in Polar Form 900
                               15.5    Triple Integrals in Rectangular Coordinates 907
                               15.6    Applications 917
                               15.7    Triple Integrals in Cylindrical and Spherical Coordinates   927
                               15.8    Substitutions in Multiple Integrals 939
                                       Questions to Guide Your Review 949
                                       Practice Exercises 949
                                       Additional and Advanced Exercises 952
                                       Technology Application Projects 954



                       16              Integrals and Vector Fields                 955
                               16.1    Line Integrals of Scalar Functions 955
                               16.2    Vector Fields and Line Integrals: Work, Circulation, and Flux 962
                               16.3    Path Independence, Conservative Fields, and Potential Functions 975
                               16.4    Green’s Theorem in the Plane 986
                               16.5    Surfaces and Area 998
                               16.6    Surface Integrals 1008
                               16.7    Stokes’ Theorem 1018
                               16.8    The Divergence Theorem and a Unified Theory 1031
                                       Questions to Guide Your Review 1044
                                       Practice Exercises 1044
                                       Additional and Advanced Exercises 1047
                                       Technology Application Projects 1048




A01_HASS8986_14_SE_FM_i-xviii.indd 7                                                                                    16/01/17 9:36 AM

[front-matter page 9: not contents — omitted]

[front-matter page 10: not contents — omitted]

[front-matter page 11: not contents — omitted]

                                                                                                                                Preface         xi


             Content Enhancements

             Chapter 1                                                           Chapter 5
             • Shortened 1.4 to focus on issues arising in use of mathe-         • Improved discussion in 5.4 and added new Figure 5.18 to
                 matical software and potential pitfalls. Removed peripheral        illustrate the Mean Value Theorem.
                 material on regression, along with associated exercises.
                                                                                 • Added new Exercises: 5.2: 33–36; PE: 45–46.
             • Added new Exercises: 1.1: 59–62, 1.2: 21–22; 1.3: 64–65,
                 PE: 29–32.                                                      Chapter 6

             Chapter 2
                                                                                 • Clarified cylindrical shell method.
             • Added definition of average speed in 2.1.                         • Converted 6.5 Example 4 to metric units.
             • Clarified definition of limits to allow for arbitrary domains.    • Added introductory discussion of mass distribution along a
                                                                                    line, with figure, in 6.6.
                 The definition of limits is now consistent with the defini-
                 tion in multivariable domains later in the text and with more   • Added new Exercises: 6.1: 15–16; 6.2: 45–46; 6.5: 1–2;
                 general mathematical usage.                                        6.6: 1–6, 19–20; PE: 17–18, 35–36.
             • Reworded limit and continuity definitions to remove impli-        Chapter 7
                 cation symbols and improve comprehension.
                                                                                 • Added explanation for the terminology “indeterminate
             • Added new Example 7 in 2.4 to illustrate limits of ratios of         form.”
                 trig functions.
                                                                                 • Clarified discussion of separable differential equations in 7.4.
             • Rewrote 2.5 Example 11 to solve the equation by finding a
                 zero, consistent with previous discussion.                      • Replaced sin-1 notation for the inverse sine function with
                                                                                    arcsin as default notation in 7.6, and similarly for other trig
             • Added new Exercises: 2.1: 15–18; 2.2: 3h–k, 4f–i; 2.4:               functions.
                 19–20, 45–46; 2.6: 69–72; PE: 49–50; AAE: 33.
                                                                                 • Added new Exercises: 7.2: 5–6, 75–76; 7.3: 5–6, 31–32,
             Chapter 3                                                              123–128, 149–150; 7.6: 43–46, 95–96; AAE: 9–10, 23.

             • Clarified relation of slope and rate of change.                   Chapter 8
             • Added new Figure 3.9 using the square root function to            • Updated 8.2 Integration by Parts discussion to emphasize
                 illustrate vertical tangent lines.                                 u(x) y′(x) dx form rather than u dy. Rewrote Examples 1–3
             • Added figure of x sin (1>x) in 3.2 to illustrate how oscilla-        accordingly.
                 tion can lead to nonexistence of a derivative of a continuous   • Removed discussion of tabular integration and associated
                 function.                                                          exercises.
             • Revised product rule to make order of factors consistent          • Updated discussion in 8.5 on how to find constants in the
                 throughout text, including later dot product and cross prod-       method of partial fractions.
                 uct formulas.
                                                                                 • Updated notation in 8.8 to align with standard usage in sta-
             • Added new Exercises: 3.2: 36, 43–44; 3.3: 51–52; 3.5:                tistics.
                 43–44, 61bc; 3.6: 65–66, 97–99; 3.7: 25–26; 3.8: 47;
                 AAE: 24–25.                                                     • Added new Exercises: 8.1: 41–44; 8.2: 53–56, 72–73; 8.3:
                                                                                    75–76; 8.4: 49–52; 8.5: 51–66, 73–74; 8.8: 35–38, 77–78;
             Chapter 4                                                              PE: 69–88.

             • Added summary to 4.1.                                             Chapter 9
             • Added new Example 3 with new Figure 4.27 to give basic            • Added new Example 3 with Figure 9.3 to illustrate how to
                 and advanced examples of concavity.
                                                                                    construct a slope field.
             • Added new Exercises: 4.1: 61–62; 4.3: 61–62; 4.4: 49–50,          • Added new Exercises: 9.1: 11–14; PE: 17–22, 43–44.
                 99–104; 4.5: 37–40; 4.6: 7–8; 4.7: 93–96; PE: 1–10; AAE:
                 19–20, 33. Moved Exercises 4.1: 53–68 to PE.




A01_HASS8986_14_SE_FM_i-xviii.indd 11                                                                                                       16/01/17 9:36 AM

      xii             Preface



      Chapter 10                                                            Chapter 13
      • Clarified the differences between a sequence and a series.          • Added sidebars on how to pronounce Greek letters such as
                                                                               kappa, tau, etc.
      • Added new Figure 10.9 to illustrate sum of a series as area
            of a histogram.                                                 • Added new Exercises: 13.1: 1–4, 27–36; 13.2: 15–16,
                                                                               19–20; 13.4: 27–28; 13.6: 1–2.
      • Added to 10.3 a discussion on the importance of bounding
            errors in approximations.
                                                                            Chapter 14
      • Added new Figure 10.13 illustrating how to use integrals to         • Elaborated on discussion of open and closed regions in 14.1.
            bound remainder terms of partial sums.
      • Rewrote Theorem 10 in 10.4 to bring out similarity to the           • Standardized notation for evaluating partial derivatives, gra-
                                                                               dients, and directional derivatives at a point, throughout the
            integral comparison test.
                                                                               chapter.
      • Added new Figure 10.16 to illustrate the differing behaviors        • Renamed “branch diagrams” as “dependency diagrams,”
            of the harmonic and alternating harmonic series.
                                                                               which clarifies that they capture dependence of variables.
      • Renamed the nth-Term Test the “nth-Term Test for Diver-             • Added new Exercises: 14.2: 51–54; 14.3: 51–54, 59–60,
            gence” to emphasize that it says nothing about convergence.
                                                                               71–74, 103–104; 14.4: 20–30, 43–46, 57–58; 14.5: 41–44;
      • Added new Figure 10.19 to illustrate polynomials converg-              14.6: 9–10, 61; 14.7: 61–62.
            ing to ln (1 + x), which illustrates convergence on the half-
            open interval (-1, 14 .                                         Chapter 15
      • Used red dots and intervals to indicate intervals and points        • Added new Figure 15.21b to illustrate setting up limits of a
            where divergence occurs, and blue to indicate convergence,         double integral.
            throughout Chapter 10.
                                                                            • Added new 15.5 Example 1, modified Examples 2 and 3, and
      • Added new Figure 10.21 to show the six different possibili-            added new Figures 15.31, 15.32, and 15.33 to give basic ex-
            ties for an interval of convergence.                               amples of setting up limits of integration for a triple integral.
      • Added new Exercises: 10.1: 27–30, 72–77; 10.2: 19–22,               • Added new material on joint probability distributions as an
            73–76, 105; 10.3: 11–12, 39–42; 10.4: 55–56; 10.5: 45–46,          application of multivariable integration.
            65–66; 10.6: 57–82; 10.7: 61–65; 10.8: 23–24, 39–40; 10.9:
            11–12, 37–38; PE: 41–44, 97–102.
                                                                            • Added new Examples 5, 6 and 7 to Section 15.6.
                                                                            • Added new Exercises: 15.1: 15–16, 27–28; 15.6: 39–44;
      Chapter 11                                                               15.7: 1–22.
      • Added new Example 1 and Figure 11.2 in 11.1 to give a
            straightforward first example of a parametrized curve.          Chapter 16

      • Updated area formulas for polar coordinates to include con-         • Added new Figure 16.4 to illustrate a line integral of a
            ditions for positive r and nonoverlapping u.                       function.

      • Added new Example 3 and Figure 11.37 in 11.4 to illustrate          • Added new Figure 16.17 to illustrate a gradient field.
            intersections of polar curves.                                  • Added new Figure 16.18 to illustrate a line integral of a
      • Added new Exercises: 11.1: 19–28; 11.2: 49–50; 11.4: 21–24.            vector field.

      Chapter 12
                                                                            • Clarified notation for line integrals in 16.2.
      • Added new Figure 12.13(b) to show the effect of scaling a           • Added discussion of the sign of potential energy in 16.3.
            vector.                                                         • Rewrote solution of Example 3 in 16.4 to clarify connection
                                                                               to Green’s Theorem.
      • Added new Example 7 and Figure 12.26 in 12.3 to illustrate
            projection of a vector.                                         • Updated discussion of surface orientation in 16.6 along with
                                                                               Figure 16.52.
      • Added discussion on general quadric surfaces in 12.6, with
            new Example 4 and new Figure 12.48 illustrating the de-         • Added new Exercises: 16.2: 37–38, 41–46; 16.4: 1–6; 16.6:
            scription of an ellipsoid not centered at the origin via com-      49–50; 16.7: 1–6; 16.8: 1–4.
            pleting the square.
                                                                            Appendices: Rewrote Appendix A7 on complex numbers.
      • Added new Exercises: 12.1: 31–34, 59–60, 73–76; 12.2:
            43–44; 12.3: 17–18; 12.4: 51–57; 12.5: 49–52.




A01_HASS8986_14_SE_FM_i-xviii.indd 12                                                                                                              16/01/17 9:36 AM

[front-matter page 14: not contents — omitted]

[front-matter page 15: not contents — omitted]

[front-matter page 16: not contents — omitted]

[front-matter page 17: not contents — omitted]

[front-matter page 18: not contents — omitted]

[front-matter page 19: not contents — omitted]

[front-matter page 20: not contents — omitted]

[front-matter page 21: not contents — omitted]

[front-matter page 22: not contents — omitted]
```

## root-stewart-et-metric — calculus-early-transcendentals-international-metric-edition.pdf (early-transcendental pole)
- Drive file id: `11yoxqMcnVd-vzYmYell_9xl32tvEYmaZ`- Method: pdftotext (digital text layer)- Maps to: Calculus sequencing cross-check; Multivariable vector-calc arc- Shelf book: `multivariable-calculus`
```text
[front-matter page 2: not contents — omitted]

[front-matter page 3: not contents — omitted]

[front-matter page 4: not contents — omitted]

[front-matter page 5: not contents — omitted]

[front-matter page 6: not contents — omitted]

[front-matter page 7: not contents — omitted]

Contents
                                                                               Preface x
                                                                               A Tribute to James Stewart                                xxii
                                                                               About the Authors                         xxiii
                                                                               Technology in the Ninth Edition                                     xxiv
                                                                               To the Student xxv
                                                                               Diagnostic Tests                     xxvi


                                                                               A Preview of Calculus 1


                                                                 1 Functions and Models                                                                                                                                                          7
                                                                               1.1         Four Ways to Represent a Function 8
                                                                               1.2         Mathematical Models: A Catalog of Essential Functions 21
                                                                               1.3         New Functions from Old Functions 36
                                                                               1.4         Exponential Functions 45
                                                                               1.5         Inverse Functions and Logarithms 54
                                                                                           Review 67

                                                                               Principles of Problem Solving 70



                                                                 2 Limits and Derivatives                                                                                                                                                        77
                                                                               2.1         The Tangent and Velocity Problems 78
                                                                               2.2         The Limit of a Function 83
                                                                               2.3         Calculating Limits Using the Limit Laws 94
                                                                               2.4         The Precise Definition of a Limit 105
                                                                               2.5         Continuity 115
                                                                               2.6         Limits at Infinity; Horizontal Asymptotes 127
                                                                               2.7         Derivatives and Rates of Change 140
                                                                                                 wr i t in g pr oj ec t           • Early Methods for Finding Tangents 152
                                                                               2.8 The Derivative as a Function 153
                                                                                           Review 166

                                                                               Problems Plus 171


                                                                                                                                                                                                                                                      iii

    Copyright 2021 Cengage Learning. All Rights Reserved. May not be copied, scanned, or duplicated, in whole or in part. Due to electronic rights, some third party content may be suppressed from the eBook and/or eChapter(s).
Editorial review has deemed that any suppressed content does not materially affect the overall learning experience. Cengage Learning reserves the right to remove additional content at any time if subsequent rights restrictions require it.

iv      CONTENTS



                                                   3              Differentiation Rules                                                                                                                                            173
                                                                  3.1 Derivatives of Polynomials and Exponential Functions 174
                                                                                    applied pr oj ec t              • Building a Better Roller Coaster 184
                                                                  3.2 The Product and Quotient Rules 185
                                                                  3.3 Derivatives of Trigonometric Functions 191
                                                                  3.4 The Chain Rule 199
                                                                                    applied pr oj ec t              • Where Should a Pilot Start Descent? 209
                                                                  3.5 Implicit Differentiation 209
                                                                                    d is cov ery pr oj ec t             • Families of Implicit Curves 217
                                                                  3.6 Derivatives of Logarithmic and Inverse Trigonometric Functions 217
                                                                  3.7 Rates of Change in the Natural and Social Sciences 225
                                                                  3.8 Exponential Growth and Decay 239
                                                                                    applied pr oj ec t              • Controlling Red Blood Cell Loss During Surgery 247
                                                                  3.9 Related Rates 247
                                                                  3.10 Linear Approximations and Differentials 254
                                                                                    d is cov ery pr oj ec t             • Polynomial Approximations 260
                                                                  3.11 Hyperbolic Functions 261
                                                                              Review             269

                                                                  Problems Plus 274



                                                   4              Applications of Differentiation                                                                                                                                  279
                                                                  4.1 Maximum and Minimum Values 280
                                                                                    applied pr oj ec t              • The Calculus of Rainbows 289
                                                                  4.2 The Mean Value Theorem 290
                                                                  4.3 What Derivatives Tell Us about the Shape of a Graph 296
                                                                  4.4 Indeterminate Forms and l’Hospital’s Rule 309
                                                                                    wr itin g pr oj ec t            • The Origins of l’Hospital’s Rule 319
                                                                  4.5 Summary of Curve Sketching 320
                                                                  4.6 Graphing with Calculus and Technology 329
                                                                  4.7 Optimization Problems 336
                                                                                    applied pr oj ec t              • The Shape of a Can 349
                                                                                    applied pr oj ec t              • Planes and Birds: Minimizing Energy                                      350
                                                                  4.8 Newton’s Method 351
                                                                  4.9 Antiderivatives 356
                                                                              Review             364

                                                                  Problems Plus 369




         Copyright 2021 Cengage Learning. All Rights Reserved. May not be copied, scanned, or duplicated, in whole or in part. Due to electronic rights, some third party content may be suppressed from the eBook and/or eChapter(s).
     Editorial review has deemed that any suppressed content does not materially affect the overall learning experience. Cengage Learning reserves the right to remove additional content at any time if subsequent rights restrictions require it.

                                                                                                                                                                                                                       CONTENTS                        v


                                                                5              Integrals                                                                                                                                                         371
                                                                               5.1 The Area and Distance Problems 372
                                                                               5.2 The Definite Integral 384
                                                                                                 d is cov ery pr oj ec t              • Area Functions 398
                                                                               5.3 The Fundamental Theorem of Calculus 399
                                                                               5.4 Indefinite Integrals and the Net Change Theorem 409
                                                                                                 wr i t in g pr oj ec t           • Newton, Leibniz, and the Invention of Calculus 418
                                                                               5.5 The Substitution Rule 419
                                                                                           Review 428

                                                                               Problems Plus 432


                                                                6              Applications of Integration                                                                                                                                       435
                                                                               6.1 Areas Between Curves 436
                                                                                                 applied pr oj ec t              • The Gini Index 445
                                                                               6.2         Volumes 446
                                                                               6.3         Volumes by Cylindrical Shells 460
                                                                               6.4         Work 467
                                                                               6.5         Average Value of a Function 473
                                                                                                 applied pr oj ec t              • Calculus and Baseball 476
                                                                                                 applied pr oj ec t              • Where to Sit at the Movies 478
                                                                                           Review 478

                                                                               Problems Plus 481


                                                                7              Techniques of Integration                                                                                                                                         485
                                                                               7.1         Integration by Parts 486
                                                                               7.2         Trigonometric Integrals 493
                                                                               7.3         Trigonometric Substitution 500
                                                                               7.4         Integration of Rational Functions by Partial Fractions 507
                                                                               7.5         Strategy for Integration 517
                                                                               7.6         Integration Using Tables and Technology 523
                                                                                                 d is cov ery pr oj ec t              • Patterns in Integrals 528
                                                                               7.7 Approximate Integration 529
                                                                               7.8 Improper Integrals 542
                                                                                           Review 552

                                                                               Problems Plus 556




    Copyright 2021 Cengage Learning. All Rights Reserved. May not be copied, scanned, or duplicated, in whole or in part. Due to electronic rights, some third party content may be suppressed from the eBook and/or eChapter(s).
Editorial review has deemed that any suppressed content does not materially affect the overall learning experience. Cengage Learning reserves the right to remove additional content at any time if subsequent rights restrictions require it.

vi      CONTENTS



                                                   8              Further Applications of Integration                                                                                                                              559
                                                                  8.1 Arc Length 560
                                                                                    d is cov ery pr oj ec t             • Arc Length Contest 567
                                                                  8.2 Area of a Surface of Revolution 567
                                                                                    d is cov ery pr oj ec t             • Rotating on a Slant 575
                                                                  8.3 Applications to Physics and Engineering 576
                                                                                    d is cov ery pr oj ec t             • Complementary Coffee Cups 587
                                                                  8.4 Applications to Economics and Biology 587
                                                                  8.5 Probability 592
                                                                              Review             600

                                                                  Problems Plus 602



                                                   9              Differential Equations                                                                                                                                           605
                                                                  9.1 Modeling with Differential Equations 606
                                                                  9.2 Direction Fields and Euler’s Method 612
                                                                  9.3 Separable Equations 621
                                                                                    applied pr oj ec t              • How Fast Does a Tank Drain? 630
                                                                  9.4 Models for Population Growth 631
                                                                  9.5 Linear Equations 641
                                                                                    applied pr oj ec t              • Which Is Faster, Going Up or Coming Down? 648
                                                                  9.6 Predator-Prey Systems 649
                                                                              Review             656

                                                                  Problems Plus 659



                                                10 Parametric Equations and Polar Coordinates                                                                                                                                      661
                                                                  10.1              Curves Defined by Parametric Equations 662
                                                                                          d is cov ery pr oj ec t             • Running Circles Around Circles 672
                                                                  10.2              Calculus with Parametric Curves                                    673
                                                                                          d is cov ery pr oj ec t             • Bézier Curves 684
                                                                  10.3              Polar Coordinates                      684
                                                                                          d is cov ery pr oj ec t             • Families of Polar Curves 694
                                                                  10.4              Calculus in Polar Coordinates                                694
                                                                  10.5              Conic Sections 702




         Copyright 2021 Cengage Learning. All Rights Reserved. May not be copied, scanned, or duplicated, in whole or in part. Due to electronic rights, some third party content may be suppressed from the eBook and/or eChapter(s).
     Editorial review has deemed that any suppressed content does not materially affect the overall learning experience. Cengage Learning reserves the right to remove additional content at any time if subsequent rights restrictions require it.

                                                                                                                                                                                                                    CONTENTS                       vii

                                                                               10.6              Conic Sections in Polar Coordinates 711
                                                                                                 Review 719

                                                                               Problems Plus 722


                                                             11 Sequences, Series, and Power Series                                                                                                                                              723
                                                                               11.1              Sequences 724
                                                                                                       d is cov ery pr oj ec t              • Logistic Sequences 738
                                                                               11.2              Series           738
                                                                               11.3              The Integral Test and Estimates of Sums 751
                                                                               11.4              The Comparison Tests 760
                                                                               11.5              Alternating Series and Absolute Convergence 765
                                                                               11.6              The Ratio and Root Tests 774
                                                                               11.7              Strategy for Testing Series 779
                                                                               11.8              Power Series 781
                                                                               11.9              Representations of Functions as Power Series 787
                                                                               11.10             Taylor and Maclaurin Series 795
                                                                                                       d is cov ery pr oj ec t              • An Elusive Limit 810
                                                                                                       wr i t in g pr oj ec t           • How Newton Discovered the Binomial Series 811
                                                                               11.11 Applications of Taylor Polynomials 811
                                                                                                       applied pr oj ec t              • Radiation from the Stars 820
                                                                                                 Review 821

                                                                               Problems Plus 825


                                                             12 Vectors and the Geometry of Space                                                                                                                                                829
                                                                               12.1              Three-Dimensional Coordinate Systems 830
                                                                               12.2              Vectors 836
                                                                                                       d is cov ery pr oj ec t              • The Shape of a Hanging Chain 846
                                                                               12.3              The Dot Product 847
                                                                               12.4              The Cross Product 855
                                                                                                       d is cov ery pr oj ec t              • The Geometry of a Tetrahedron 864
                                                                               12.5              Equations of Lines and Planes 864
                                                                                                       d is cov ery pr oj ec t              • Putting 3D in Perspective 874
                                                                               12.6              Cylinders and Quadric Surfaces 875
                                                                                                 Review 883

                                                                               Problems Plus 887




    Copyright 2021 Cengage Learning. All Rights Reserved. May not be copied, scanned, or duplicated, in whole or in part. Due to electronic rights, some third party content may be suppressed from the eBook and/or eChapter(s).
Editorial review has deemed that any suppressed content does not materially affect the overall learning experience. Cengage Learning reserves the right to remove additional content at any time if subsequent rights restrictions require it.

viii      CONTENTS



                                                  13 Vector Functions                                                                                                                                                                889
                                                                    13.1              Vector Functions and Space Curves 890
                                                                    13.2              Derivatives and Integrals of Vector Functions 898
                                                                    13.3              Arc Length and Curvature 904
                                                                    13.4              Motion in Space: Velocity and Acceleration 916
                                                                                            applied pr oj ec t              • Kepler’s Laws 925
                                                                                      Review             927

                                                                    Problems Plus 930


                                                  14 Partial Derivatives                                                                                                                                                             933
                                                                    14.1              Functions of Several Variables 934
                                                                    14.2              Limits and Continuity 951
                                                                    14.3              Partial Derivatives 961
                                                                                            d is cov ery pr oj ec t             • Deriving the Cobb-Douglas Production Function 973
                                                                    14.4              Tangent Planes and Linear Approximations                                                974
                                                                                            applied pr oj ec t              • The Speedo LZR Racer 984
                                                                    14.5              The Chain Rule 985
                                                                    14.6              Directional Derivatives and the Gradient Vector 994
                                                                    14.7              Maximum and Minimum Values 1008
                                                                                            d is cov ery pr oj ec t             • Quadratic Approximations and Critical Points 1019
                                                                    14.8              Lagrange Multipliers 1020
                                                                                            applied pr oj ec t              • Rocket Science 1028
                                                                                            applied pr oj ec t              • Hydro-Turbine Optimization 1030
                                                                                      Review             1031

                                                                    Problems Plus 1035


                                                  15 Multiple Integrals                                                                                                                                                           1037
                                                                    15.1              Double Integrals over Rectangles 1038
                                                                    15.2              Double Integrals over General Regions 1051
                                                                    15.3              Double Integrals in Polar Coordinates 1062
                                                                    15.4              Applications of Double Integrals 1069
                                                                    15.5              Surface Area 1079
                                                                    15.6              Triple Integrals 1082
                                                                                            d is cov ery pr oj ec t             • Volumes of Hyperspheres 1095
                                                                    15.7              Triple Integrals in Cylindrical Coordinates 1095
                                                                                            d is cov ery pr oj ec t             • The Intersection of Three Cylinders                                    1101




           Copyright 2021 Cengage Learning. All Rights Reserved. May not be copied, scanned, or duplicated, in whole or in part. Due to electronic rights, some third party content may be suppressed from the eBook and/or eChapter(s).
       Editorial review has deemed that any suppressed content does not materially affect the overall learning experience. Cengage Learning reserves the right to remove additional content at any time if subsequent rights restrictions require it.

                                                                                                                                                                                                                      CONTENTS                        ix

                                                                               15.8              Triple Integrals in Spherical Coordinates 1102
                                                                                                       applied pr oj ec t              • Roller Derby 1108
                                                                               15.9              Change of Variables in Multiple Integrals 1109
                                                                                                 Review 1117

                                                                               Problems Plus 1121


                                                             16 Vector Calculus                                                                                                                                                              1123
                                                                               16.1              Vector Fields                 1124
                                                                               16.2              Line Integrals 1131
                                                                               16.3              The Fundamental Theorem for Line Integrals 1144
                                                                               16.4              Green’s Theorem 1154
                                                                               16.5              Curl and Divergence 1161
                                                                               16.6              Parametric Surfaces and Their Areas 1170
                                                                               16.7              Surface Integrals 1182
                                                                               16.8              Stokes’ Theorem 1195
                                                                               16.9              The Divergence Theorem 1201
                                                                               16.10             Summary 1208
                                                                                                 Review 1209

                                                                               Problems Plus 1213


                                                                               Appendixes                                                                                                                                                        A1
                                                                               A           Numbers, Inequalities, and Absolute Values A2
                                                                               B           Coordinate Geometry and Lines A10
                                                                               C           Graphs of Second-Degree Equations A16
                                                                               D           Trigonometry A24
                                                                               E           Sigma Notation A36
                                                                               F           Proofs of Theorems A41
                                                                               G           The Logarithm Defined as an Integral A53
                                                                               H           Answers to Odd-Numbered Exercises A61


                                                                               Index A143




    Copyright 2021 Cengage Learning. All Rights Reserved. May not be copied, scanned, or duplicated, in whole or in part. Due to electronic rights, some third party content may be suppressed from the eBook and/or eChapter(s).
Editorial review has deemed that any suppressed content does not materially affect the overall learning experience. Cengage Learning reserves the right to remove additional content at any time if subsequent rights restrictions require it.

[front-matter page 15: not contents — omitted]

[front-matter page 16: not contents — omitted]

[front-matter page 17: not contents — omitted]

[front-matter page 18: not contents — omitted]

[front-matter page 19: not contents — omitted]

[front-matter page 20: not contents — omitted]

[front-matter page 21: not contents — omitted]

[front-matter page 22: not contents — omitted]
```

## root-kreyszig-eng-math — advanced-engineering-mathematics.pdf
- Drive file id: `1qc-ZpcbOVaEGciwOItdtOLM26vD68MzV`- Method: pdftotext (digital text layer)- Maps to: Differential Equations, Mathematical Methods, Numerical Analysis, Optimization and OR reference spine- Shelf book: `mathematical-methods-for-engineering`
```text
[front-matter page 2: not contents — omitted]

[front-matter page 3: not contents — omitted]

[front-matter page 4: not contents — omitted]

[front-matter page 5: not contents — omitted]

[front-matter page 6: not contents — omitted]

[front-matter page 7: not contents — omitted]

[front-matter page 8: not contents — omitted]

[front-matter page 9: not contents — omitted]

[front-matter page 10: not contents — omitted]

[front-matter page 11: not contents — omitted]

fpref.qxd   11/8/10    3:16 PM     Page viii




            viii                   Preface


                                      PARTS AND CHAPTERS OF THE BOOK


                                  PART A                                           PART B
                             Chaps. 1–6                                           Chaps. 7–10
               Ordinary Differential Equations (ODEs)                   Linear Algebra. Vector Calculus
                                  Chaps. 1–4                              Chap. 7                 Chap. 9
                                 Basic Material                          Matrices,           Vector Differential
                                                                      Linear Systems              Calculus
                       Chap. 5                     Chap. 6
                   Series Solutions          Laplace Transforms           Chap. 8                 Chap. 10
                                                                    Eigenvalue Problems   Vector Integral Calculus



                                  PART C                                           PART D
                              Chaps. 11–12                                       Chaps. 13–18
                   Fourier Analysis. Partial Differential                      Complex Analysis,
                            Equations (PDEs)                                   Potential Theory
                                    Chap. 11                                        Chaps. 13–17
                                 Fourier Analysis                                  Basic Material

                                    Chap. 12                                         Chap. 18
                         Partial Differential Equations                          Potential Theory



                                   PART E                                           PART F
                               Chaps. 19–21                                     Chaps. 22–23
                             Numeric Analysis                                Optimization, Graphs
                Chap. 19            Chap. 20           Chap. 21          Chap. 22                Chap. 23
               Numerics in          Numeric          Numerics for   Linear Programming      Graphs, Optimization
                General          Linear Algebra     ODEs and PDEs



                                  PART G                               GUIDES AND MANUALS
                              Chaps. 24–25                                Maple Computer Guide
                           Probability, Statistics                      Mathematica Computer Guide
                                  Chap. 24                                 Student Solutions Manual
                       Data Analysis. Probability Theory                       and Study Guide
                                  Chap. 25
                            Mathematical Statistics                           Instructor’s Manual

[front-matter page 13: not contents — omitted]

[front-matter page 14: not contents — omitted]

[front-matter page 15: not contents — omitted]

[front-matter page 16: not contents — omitted]

[front-matter page 17: not contents — omitted]

[front-matter page 18: not contents — omitted]

ftoc.qxd   11/4/10   11:48 AM   Page xv




               CONTENTS
               PART A             Ordinary Differential Equations (ODEs) 1
                                  CHAPTER 1 First-Order ODEs           2
                                  1.1  Basic Concepts. Modeling 2
                                  1.2 Geometric Meaning of y⬘ ⫽ ƒ(x, y). Direction Fields, Euler’s Method 9
                                  1.3 Separable ODEs. Modeling 12
                                  1.4 Exact ODEs. Integrating Factors 20
                                  1.5 Linear ODEs. Bernoulli Equation. Population Dynamics 27
                                  1.6 Orthogonal Trajectories. Optional 36
                                  1.7 Existence and Uniqueness of Solutions for Initial Value Problems 38
                                  Chapter 1 Review Questions and Problems 43
                                  Summary of Chapter 1 44

                                  CHAPTER 2 Second-Order Linear ODEs              46
                                  2.1 Homogeneous Linear ODEs of Second Order 46
                                  2.2 Homogeneous Linear ODEs with Constant Coefficients 53
                                  2.3 Differential Operators. Optional 60
                                  2.4 Modeling of Free Oscillations of a Mass–Spring System 62
                                  2.5 Euler–Cauchy Equations 71
                                  2.6 Existence and Uniqueness of Solutions. Wronskian 74
                                  2.7 Nonhomogeneous ODEs 79
                                  2.8 Modeling: Forced Oscillations. Resonance 85
                                  2.9 Modeling: Electric Circuits 93
                                  2.10 Solution by Variation of Parameters 99
                                  Chapter 2 Review Questions and Problems 102
                                  Summary of Chapter 2 103

                                  CHAPTER 3 Higher Order Linear ODEs          105
                                  3.1 Homogeneous Linear ODEs 105
                                  3.2 Homogeneous Linear ODEs with Constant Coefficients 111
                                  3.3 Nonhomogeneous Linear ODEs 116
                                  Chapter 3 Review Questions and Problems 122
                                  Summary of Chapter 3 123

                                  CHAPTER 4 Systems of ODEs. Phase Plane. Qualitative Methods                 124
                                  4.0 For Reference: Basics of Matrices and Vectors 124
                                  4.1 Systems of ODEs as Models in Engineering Applications 130
                                  4.2 Basic Theory of Systems of ODEs. Wronskian 137
                                  4.3 Constant-Coefficient Systems. Phase Plane Method 140
                                  4.4 Criteria for Critical Points. Stability 148
                                  4.5 Qualitative Methods for Nonlinear Systems 152
                                  4.6 Nonhomogeneous Linear Systems of ODEs 160
                                  Chapter 4 Review Questions and Problems 164
                                  Summary of Chapter 4 165

                                  CHAPTER 5 Series Solutions of ODEs. Special Functions             167
                                  5.1 Power Series Method 167
                                  5.2 Legendre’s Equation. Legendre Polynomials Pn(x) 175

                                                                                                                    xv

ftoc.qxd   11/4/10   11:48 AM   Page xvi




            xvi                 Contents

                                5.3 Extended Power Series Method: Frobenius Method 180
                                5.4 Bessel’s Equation. Bessel Functions J␯ (x) 187
                                5.5 Bessel Functions of the Y␯ (x). General Solution 196
                                Chapter 5 Review Questions and Problems 200
                                Summary of Chapter 5 201


                                CHAPTER 6 Laplace Transforms             203
                                6.1 Laplace Transform. Linearity. First Shifting Theorem (s-Shifting) 204
                                6.2 Transforms of Derivatives and Integrals. ODEs 211
                                6.3 Unit Step Function (Heaviside Function).
                                     Second Shifting Theorem (t-Shifting) 217
                                6.4 Short Impulses. Dirac’s Delta Function. Partial Fractions 225
                                6.5 Convolution. Integral Equations 232
                                6.6 Differentiation and Integration of Transforms.
                                     ODEs with Variable Coefficients 238
                                6.7 Systems of ODEs 242
                                6.8 Laplace Transform: General Formulas 248
                                6.9 Table of Laplace Transforms 249
                                Chapter 6 Review Questions and Problems 251
                                Summary of Chapter 6 253



            PART B              Linear Algebra. Vector Calculus 255
                                CHAPTER 7    Linear Algebra: Matrices, Vectors, Determinants.
                                             Linear Systems    256
                                7.1 Matrices, Vectors: Addition and Scalar Multiplication 257
                                7.2 Matrix Multiplication 263
                                7.3 Linear Systems of Equations. Gauss Elimination 272
                                7.4 Linear Independence. Rank of a Matrix. Vector Space 282
                                7.5 Solutions of Linear Systems: Existence, Uniqueness 288
                                7.6 For Reference: Second- and Third-Order Determinants 291
                                7.7 Determinants. Cramer’s Rule 293
                                7.8 Inverse of a Matrix. Gauss–Jordan Elimination 301
                                7.9 Vector Spaces, Inner Product Spaces. Linear Transformations. Optional 309
                                Chapter 7 Review Questions and Problems 318
                                Summary of Chapter 7 320

                                CHAPTER 8 Linear Algebra: Matrix Eigenvalue Problems               322
                                8.1 The Matrix Eigenvalue Problem.
                                     Determining Eigenvalues and Eigenvectors 323
                                8.2 Some Applications of Eigenvalue Problems 329
                                8.3 Symmetric, Skew-Symmetric, and Orthogonal Matrices 334
                                8.4 Eigenbases. Diagonalization. Quadratic Forms 339
                                8.5 Complex Matrices and Forms. Optional 346
                                Chapter 8 Review Questions and Problems 352
                                Summary of Chapter 8 353

ftoc.qxd   11/4/10   11:48 AM   Page xvii




               Contents                                                                                           xvii


                                  CHAPTER 9 Vector Differential Calculus. Grad, Div, Curl             354
                                  9.1 Vectors in 2-Space and 3-Space 354
                                  9.2 Inner Product (Dot Product) 361
                                  9.3 Vector Product (Cross Product) 368
                                  9.4 Vector and Scalar Functions and Their Fields. Vector Calculus: Derivatives 375
                                  9.5 Curves. Arc Length. Curvature. Torsion 381
                                  9.6 Calculus Review: Functions of Several Variables. Optional 392
                                  9.7 Gradient of a Scalar Field. Directional Derivative 395
                                  9.8 Divergence of a Vector Field 402
                                  9.9 Curl of a Vector Field 406
                                  Chapter 9 Review Questions and Problems 409
                                  Summary of Chapter 9 410

                                  CHAPTER 10 Vector Integral Calculus. Integral Theorems              413
                                  10.1 Line Integrals 413
                                  10.2 Path Independence of Line Integrals 419
                                  10.3 Calculus Review: Double Integrals. Optional 426
                                  10.4 Green’s Theorem in the Plane 433
                                  10.5 Surfaces for Surface Integrals 439
                                  10.6 Surface Integrals 443
                                  10.7 Triple Integrals. Divergence Theorem of Gauss 452
                                  10.8 Further Applications of the Divergence Theorem 458
                                  10.9 Stokes’s Theorem 463
                                  Chapter 10 Review Questions and Problems 469
                                  Summary of Chapter 10 470


               PART C             Fourier Analysis. Partial Differential Equations (PDEs) 473
                                  CHAPTER 11 Fourier Analysis          474
                                  11.1 Fourier Series 474
                                  11.2 Arbitrary Period. Even and Odd Functions. Half-Range Expansions 483
                                  11.3 Forced Oscillations 492
                                  11.4 Approximation by Trigonometric Polynomials 495
                                  11.5 Sturm–Liouville Problems. Orthogonal Functions 498
                                  11.6 Orthogonal Series. Generalized Fourier Series 504
                                  11.7 Fourier Integral 510
                                  11.8 Fourier Cosine and Sine Transforms 518
                                  11.9 Fourier Transform. Discrete and Fast Fourier Transforms 522
                                  11.10 Tables of Transforms 534
                                  Chapter 11 Review Questions and Problems 537
                                  Summary of Chapter 11 538

                                  CHAPTER 12 Partial Differential Equations (PDEs)             540
                                  12.1 Basic Concepts of PDEs 540
                                  12.2 Modeling: Vibrating String, Wave Equation 543
                                  12.3 Solution by Separating Variables. Use of Fourier Series 545
                                  12.4 D’Alembert’s Solution of the Wave Equation. Characteristics 553
                                  12.5 Modeling: Heat Flow from a Body in Space. Heat Equation 557

ftoc.qxd   11/4/10   11:48 AM   Page xviii




            xviii               Contents

                                12.6 Heat Equation: Solution by Fourier Series.
                                      Steady Two-Dimensional Heat Problems. Dirichlet Problem 558
                                12.7 Heat Equation: Modeling Very Long Bars.
                                      Solution by Fourier Integrals and Transforms 568
                                12.8 Modeling: Membrane, Two-Dimensional Wave Equation 575
                                12.9 Rectangular Membrane. Double Fourier Series 577
                                12.10 Laplacian in Polar Coordinates. Circular Membrane. Fourier–Bessel Series 585
                                12.11 Laplace’s Equation in Cylindrical and Spherical Coordinates. Potential 593
                                12.12 Solution of PDEs by Laplace Transforms 600
                                Chapter 12 Review Questions and Problems 603
                                Summary of Chapter 12 604

            PART D              Complex Analysis 607
                                CHAPTER 13   Complex Numbers and Functions.
                                             Complex Differentiation 608
                                13.1 Complex Numbers and Their Geometric Representation 608
                                13.2 Polar Form of Complex Numbers. Powers and Roots 613
                                13.3 Derivative. Analytic Function 619
                                13.4 Cauchy–Riemann Equations. Laplace’s Equation 625
                                13.5 Exponential Function 630
                                13.6 Trigonometric and Hyperbolic Functions. Euler’s Formula 633
                                13.7 Logarithm. General Power. Principal Value 636
                                Chapter 13 Review Questions and Problems 641
                                Summary of Chapter 13 641

                                CHAPTER 14 Complex Integration           643
                                14.1 Line Integral in the Complex Plane 643
                                14.2 Cauchy’s Integral Theorem 652
                                14.3 Cauchy’s Integral Formula 660
                                14.4 Derivatives of Analytic Functions 664
                                Chapter 14 Review Questions and Problems 668
                                Summary of Chapter 14 669

                                CHAPTER 15 Power Series, Taylor Series           671
                                15.1 Sequences, Series, Convergence Tests 671
                                15.2 Power Series 680
                                15.3 Functions Given by Power Series 685
                                15.4 Taylor and Maclaurin Series 690
                                15.5 Uniform Convergence. Optional 698
                                Chapter 15 Review Questions and Problems 706
                                Summary of Chapter 15 706

                                CHAPTER 16 Laurent Series. Residue Integration             708
                                16.1 Laurent Series 708
                                16.2 Singularities and Zeros. Infinity 715
                                16.3 Residue Integration Method 719
                                16.4 Residue Integration of Real Integrals 725
                                Chapter 16 Review Questions and Problems 733
                                Summary of Chapter 16 734
```

## root-rudin-pma-3e — Principles-of-Mathematical-Analysis-Rudin-3rd.pdf
- Drive file id: `1nRWalBPsIlcyQe99EFsuvUUAMdCN1YCM`- Method: VLM vision transcription (scanned)- Maps to: Real Analysis spine (classic, scanned)- Shelf book: `real-analysis`
```text
[cover/title page]

[cover/title page]

[cover/title page]

[cover/title page]

This book was set in Times New Roman.
The editors were A. Anthony Arthur and Shelly Levine Langman;
the production supervisor was Leroy A. Young.
R. R. Donnelley & Sons Company was printer and binder.

This book is printed on acid-free paper.

Library of Congress Cataloging in Publication Data
Rudin, Walter, date
    Principles of mathematical analysis.
    (International series in pure and applied mathematics)
    Bibliography: p.
    Includes index.
    1. Mathematical analysis. I. Title.
QA300.R8 1976        515        75-17903
ISBN 0-07-054235-X

PRINCIPLES OF MATHEMATICAL ANALYSIS
Copyright © 1964, 1976 by McGraw-Hill, Inc. All rights reserved.
Copyright 1953 by McGraw-Hill, Inc. All rights reserved.
Printed in the United States of America. No part of this publication may be reproduced, stored in a retrieval system, or transmitted, in any form or by any means, electronic, mechanical, photocopying, recording, or otherwise, without the prior written permission of the publisher.
28 29 30 DOC/DOC 0 9 8 7 6 5 4 3 2 1 0

CONTENTS

Preface — ix

Chapter 1 — The Real and Complex Number Systems — 1
Introduction — 1
Ordered Sets — 3
Fields — 5
The Real Field — 8
The Extended Real Number System — 11
The Complex Field — 12
Euclidean Spaces — 16
Appendix — 17
Exercises — 21

Chapter 2 — Basic Topology — 24
Finite, Countable, and Uncountable Sets — 24
Metric Spaces — 30
Compact Sets — 36
Perfect Sets — 41
Connected Sets — 42
Exercises — 43

Chapter 3 — Numerical Sequences and Series — 47
Convergent Sequences — 47
Subsequences — 51
Cauchy Sequences — 52
Upper and Lower Limits — 55
Some Special Sequences — 57
Series — 58
Series of Nonnegative Terms — 61
The Number e — 63
The Root and Ratio Tests — 65
Power Series — 69
Summation by Parts — 70
Absolute Convergence — 71
Addition and Multiplication of Series — 72
Rearrangements — 75
Exercises — 78

Chapter 4 — Continuity — 83
Limits of Functions — 83
Continuous Functions — 85
Continuity and Compactness — 89
Continuity and Connectedness — 93
Discontinuities — 94
Monotonic Functions — 95
Infinite Limits and Limits at Infinity — 97
Exercises — 98

Chapter 5 — Differentiation — 103
The Derivative of a Real Function — 103
Mean Value Theorems — 107
The Continuity of Derivatives — 108
L'Hospital's Rule — 109
Derivatives of Higher Order — 110
Taylor's Theorem — 110
Differentiation of Vector-valued Functions — 111
Exercises — 114

Chapter 6 — The Riemann-Stieltjes Integral — 120
Definition and Existence of the Integral — 120
Properties of the Integral — 128
Integration and Differentiation — 133
Integration of Vector-valued Functions — 135
Rectifiable Curves — 136
Exercises — 138

Chapter 7 — Sequences and Series of Functions — 143
Discussion of Main Problem — 143
Uniform Convergence — 147
Uniform Convergence and Continuity — 149
Uniform Convergence and Integration — 151
Uniform Convergence and Differentiation — 152
Equicontinuous Families of Functions — 154
The Stone-Weierstrass Theorem — 159
Exercises — 165

Chapter 8 — Some Special Functions — 172
Power Series — 172
The Exponential and Logarithmic Functions — 178
The Trigonometric Functions — 182
The Algebraic Completeness of the Complex Field — 184
Fourier Series — 185
The Gamma Function — 192
Exercises — 196

Chapter 9 — Functions of Several Variables — 204
Linear Transformations — 204
Differentiation — 211
The Contraction Principle — 220
The Inverse Function Theorem — 221
The Implicit Function Theorem — 223
The Rank Theorem — 228
Determinants — 231
Derivatives of Higher Order — 235
Differentiation of Integrals — 236
Exercises — 239

Chapter 10 — Integration of Differential Forms — 245
Integration — 245
Primitive Mappings — 248
Partitions of Unity — 251
Change of Variables — 252
Differential Forms — 253
Simplexes and Chains — 266
Stokes' Theorem — 273
Closed Forms and Exact Forms — 275
Vector Analysis — 280
Exercises — 288

Chapter 11 — The Lebesgue Theory — 300
Set Functions — 300
Construction of the Lebesgue Measure — 302
Measure Spaces — 310
Measurable Functions — 310
Simple Functions — 313
Integration — 314
Comparison with the Riemann Integral — 322
Integration of Complex Functions — 325
Functions of Class L² — 325
Exercises — 332

Bibliography — 335

List of Special Symbols — 337

Index — 339

PREFACE

This book is intended to serve as a text for the course in analysis that is usually taken by advanced undergraduates or by first-year students who study mathematics.

The present edition covers essentially the same topics as the second one, with some additions, a few minor omissions, and considerable rearrangement. I hope that these changes will make the material more accessible amd more attractive to the students who take such a course.

Experience has convinced me that it is pedagogically unsound (though logically correct) to start off with the construction of the real numbers from the rational ones. At the beginning, most students simply fail to appreciate the need for doing this. Accordingly, the real number system is introduced as an ordered field with the least-upper-bound property, and a few interesting applications of this property are quickly made. However, Dedekind's construction is not omitted. It is now in an Appendix to Chapter 1, where it may be studied and enjoyed whenever the time seems ripe.

The material on functions of several variables is almost completely rewritten, with many details filled in, and with more examples and more motivation. The proof of the inverse function theorem—the key item in Chapter 9—is

x PREFACE

simplified by means of the fixed point theorem about contraction mappings. Differential forms are discussed in much greater detail. Several applications of Stokes' theorem are included.

As regards other changes, the chapter on the Riemann-Stieltjes integral has been trimmed a bit, a short do-it-yourself section on the gamma function has been added to Chapter 8, and there is a large number of new exercises, most of them with fairly detailed hints.

I have also included several references to articles appearing in the American Mathematical Monthly and in Mathematics Magazine, in the hope that students will develop the habit of looking into the journal literature. Most of these references were kindly supplied by R. B. Burckel.

Over the years, many people, students as well as teachers, have sent me corrections, criticisms, and other comments concerning the previous editions of this book. I have appreciated these, and I take this opportunity to express my sincere thanks to all who have written me.

WALTER RUDIN

1
THE REAL AND COMPLEX NUMBER SYSTEMS

INTRODUCTION

A satisfactory discussion of the main concepts of analysis (such as convergence, continuity, differentiation, and integration) must be based on an accurately defined number concept. We shall not, however, enter into any discussion of the axioms that govern the arithmetic of the integers, but assume familiarity with the rational numbers (i.e., the numbers of the form m/n, where m and n are integers and n ≠ 0).

The rational number system is inadequate for many purposes, both as a field and as an ordered set. (These terms will be defined in Secs. 1.6 and 1.12.) For instance, there is no rational p such that p² = 2. (We shall prove this presently.) This leads to the introduction of so-called "irrational numbers" which are often written as infinite decimal expansions and are considered to be "approximated" by the corresponding finite decimals. Thus the sequence

1, 1.4, 1.41, 1.414, 1.4142, . . .

"tends to √2". But unless the irrational number √2 has been clearly defined, the question must arise: Just what is it that this sequence "tends to"?

2 PRINCIPLES OF MATHEMATICAL ANALYSIS

This sort of question can be answered as soon as the so-called "real number system" is constructed.

1.1 Example — We now show that the equation

(1)        p² = 2

is not satisfied by any rational p. If there were such a p, we could write p = m/n where m and n are integers that are not both even. Let us assume this is done. Then (1) implies

(2)        m² = 2n²,

This shows that m² is even. Hence m is even (if m were odd, m² would be odd), and so m² is divisible by 4. It follows that the right side of (2) is divisible by 4, so that n² is even, which implies that n is even.

The assumption that (1) holds thus leads to the conclusion that both m and n are even, contrary to our choice of m and n. Hence (1) is impossible for rational p.

We now examine this situation a little more closely. Let A be the set of all positive rationals p such that p² < 2 and let B consist of all positive rationals p such that p² > 2. We shall show that A contains no largest number and B contains no smallest.

More explicitly, for every p in A we can find a rational q in A such that p < q, and for every p in B we can find a rational q in B such that q < p.

To do this, we associate with each rational p > 0 the number

(3)        q = p − (p² − 2)/(p + 2) = (2p + 2)/(p + 2).

Then

(4)        q² − 2 = 2(p² − 2)/(p + 2)².

If p is in A then p² − 2 < 0, (3) shows that q > p, and (4) shows that q² < 2. Thus q is in A.

If p is in B then p² − 2 > 0, (3) shows that 0 < q < p, and (4) shows that q² > 2. Thus q is in B.

1.2 Remark — The purpose of the above discussion has been to show that the rational number system has certain gaps, in spite of the fact that between any two rationals there is another: If r < s then r < (r + s)/2 < s. The real number system fills these gaps. This is the principal reason for the fundamental role which it plays in analysis.

THE REAL AND COMPLEX NUMBER SYSTEMS 3

In order to elucidate its structure, as well as that of the complex numbers, we start with a brief discussion of the general concepts of ordered set and field.

Here is some of the standard set-theoretic terminology that will be used throughout this book.

1.3 Definitions — If A is any set (whose elements may be numbers or any other objects), we write x ∈ A to indicate that x is a member (or an element) of A.

If x is not a member of A, we write: x ∉ A.

The set which contains no element will be called the empty set. If a set has at least one element, it is called nonempty.

If A and B are sets, and if every element of A is an element of B, we say that A is a subset of B, and write A ⊂ B, or B ⊃ A. If, in addition, there is an element of B which is not in A, then A is said to be a proper subset of B. Note that A ⊂ A for every set A.

If A ⊂ B and B ⊂ A, we write A = B. Otherwise A ≠ B.

1.4 Definition — Throughout Chap. 1, the set of all rational numbers will be denoted by Q.

ORDERED SETS

1.5 Definition — Let S be a set. An order on S is a relation, denoted by <, with the following two properties:

(i) If x ∈ S and y ∈ S then one and only one of the statements

x < y,    x = y,    y < x

is true.

(ii) If x, y, z ∈ S, if x < y and y < z, then x < z.

The statement "x < y" may be read as "x is less than y" or "x is smaller than y" or "x precedes y".

It is often convenient to write y > x in place of x < y.

The notation x ≤ y indicates that x < y or x = y, without specifying which of these two is to hold. In other words, x ≤ y is the negation of x > y.

1.6 Definition — An ordered set is a set S in which an order is defined.

For example, Q is an ordered set if r < s is defined to mean that s − r is a positive rational number.

1.7 Definition — Suppose S is an ordered set, and E ⊂ S. If there exists a β ∈ S such that x ≤ β for every x ∈ E, we say that E is bounded above, and call β an upper bound of E.

Lower bounds are defined in the same way (with ≥ in place of ≤).

4 PRINCIPLES OF MATHEMATICAL ANALYSIS

1.8 Definition — Suppose S is an ordered set, E ⊂ S, and E is bounded above. Suppose there exists an α ∈ S with the following properties:

(i) α is an upper bound of E.
(ii) If γ < α then γ is not an upper bound of E.

Then α is called the least upper bound of E [that there is at most one such α is clear from (ii)] or the supremum of E, and we write

α = sup E.

The greatest lower bound, or infimum, of a set E which is bounded below is defined in the same manner: The statement

α = inf E

means that α is a lower bound of E and that no β with β > α is a lower bound of E.

1.9 Examples

(a) Consider the sets A and B of Example 1.1 as subsets of the ordered set Q. The set A is bounded above. In fact, the upper bounds of A are exactly the members of B. Since B contains no smallest member, A has no least upper bound in Q.

Similarly, B is bounded below: The set of all lower bounds of B consists of A and of all r ∈ Q with r ≤ 0. Since A has no lasgest member, B has no greatest lower bound in Q.

(b) If α = sup E exists, then α may or may not be a member of E. For instance, let E₁ be the set of all r ∈ Q with r < 0. Let E₂ be the set of all r ∈ Q with r ≤ 0. Then

sup E₁ = sup E₂ = 0,

and 0 ∉ E₁, 0 ∈ E₂.

(c) Let E consist of all numbers 1/n, where n = 1, 2, 3, . . . . Then sup E = 1, which is in E, and inf E = 0, which is not in E.

1.10 Definition — An ordered set S is said to have the least-upper-bound property if the following is true:

If E ⊂ S, E is not empty, and E is bounded above, then sup E exists in S.

Example 1.9(a) shows that Q does not have the least-upper-bound property.

We shall now show that there is a close relation between greatest lower bounds and least upper bounds, and that every ordered set with the least-upper-bound property also has the greatest-lower-bound property.

THE REAL AND COMPLEX NUMBER SYSTEMS 5

1.11 Theorem — Suppose S is an ordered set with the least-upper-bound property, B ⊂ S, B is not empty, and B is bounded below. Let L be the set of all lower bounds of B. Then

α = sup L

exists in S, and α = inf B.

In particular, inf B exists in S.

Proof — Since B is bounded below, L is not empty. Since L consists of exactly those y ∈ S which satisfy the inequality y ≤ x for every x ∈ B, we see that every x ∈ B is an upper bound of L. Thus L is bounded above. Our hypothesis about S implies therefore that L has a supremum in S; call it α.

If γ < α then (see Definition 1.8) γ is not an upper bound of L, hence γ ∉ B. It follows that α ≤ x for every x ∈ B. Thus α ∈ L.

If α < β then β ∉ L, since α is an upper bound of L.

We have shown that α ∈ L but β ∉ L if β > α. In other words, α is a lower bound of B, but β is not if β > α. This means that α = inf B.

FIELDS

1.12 Definition — A field is a set F with two operations, called addition and multiplication, which satisfy the following so-called "field axioms" (A), (M), and (D):

(A) Axioms for addition

(A1) If x ∈ F and y ∈ F, then their sum x + y is in F.
(A2) Addition is commutative: x + y = y + x for all x, y ∈ F.
(A3) Addition is associative: (x + y) + z = x + (y + z) for all x, y, z ∈ F.
(A4) F contains an element 0 such that 0 + x = x for every x ∈ F.
(A5) To every x ∈ F corresponds an element −x ∈ F such that

x + (−x) = 0.

(M) Axioms for multiplication

(M1) If x ∈ F and y ∈ F, then their product xy is in F.
(M2) Multiplication is commutative: xy = yx for all x, y ∈ F.
(M3) Multiplication is associative: (xy)z = x(yz) for all x, y, z ∈ F.
(M4) F contains an element 1 ≠ 0 such that 1x = x for every x ∈ F.
(M5) If x ∈ F and x ≠ 0 then there exists an element 1/x ∈ F such that

x · (1/x) = 1.

6 PRINCIPLES OF MATHEMATICAL ANALYSIS

(D) The distributive law

x(y + z) = xy + xz

holds for all x, y, z ∈ F.

1.13 Remarks

(a) One usually writes (in any field)

x − y, x/y, x + y + z, xyz, x², x³, 2x, 3x, . . .

in place of

x + (−y), x · (1/y), (x + y) + z, (xy)z, xx, xxx, x + x, x + x + x, . . . .

(b) The field axioms clearly hold in Q, the set of all rational numbers, if addition and multiplication have their customary meaning. Thus Q is a field.

(c) Although it is not our purpose to study fields (or any other algebraic structures) in detail, it is worthwhile to prove that some familiar properties of Q are consequences of the field axioms; once we do this, we will not need to do it again for the real numbers and for the complex numbers.

1.14 Proposition — The axioms for addition imply the following statements.

(a) If x + y = x + z then y = z.
(b) If x + y = x then y = 0.
(c) If x + y = 0 then y = −x.
(d) −(−x) = x.

Statement (a) is a cancellation law. Note that (b) asserts the uniqueness of the element whose existence is assumed in (A4), and that (c) does the same for (A5).

Proof — If x + y = x + z, the axioms (A) give

y = 0 + y = (−x + x) + y = −x + (x + y)
     = −x + (x + z) = (−x + x) + z = 0 + z = z.

This proves (a). Take z = 0 in (a) to obtain (b). Take z = −x in (a) to obtain (c).

Since −x + x = 0, (c) (with −x in place of x) gives (d).

THE REAL AND COMPLEX NUMBER SYSTEMS 7

1.15 Proposition — The axioms for multiplication imply the following statements.

(a) If x ≠ 0 and xy = xz then y = z.
(b) If x ≠ 0 and xy = x then y = 1.
(c) If x ≠ 0 and xy = 1 then y = 1/x.
(d) If x ≠ 0 then 1/(1/x) = x.

The proof is so similar to that of Proposition 1.14 that we omit it.

1.16 Proposition — The field axioms imply the following statements, for any x, y, z ∈ F.

(a) 0x = 0.
(b) If x ≠ 0 and y ≠ 0 then xy ≠ 0.
(c) (−x)y = −(xy) = x(−y).
(d) (−x)(−y) = xy.

Proof — 0x + 0x = (0 + 0)x = 0x. Hence 1.14(b) implies that 0x = 0, and (a) holds.

Next, assume x ≠ 0, y ≠ 0, but xy = 0. Then (a) gives

1 = (1/y)(1/x)xy = (1/y)(1/x)0 = 0,

a contradiction. Thus (b) holds.

The first equality in (c) comes from

(−x)y + xy = (−x + x)y = 0y = 0,

combined with 1.14(c); the other half of (c) is proved in the same way.

Finally,

(−x)(−y) = −[x(−y)] = −[−(xy)] = xy

by (c) and 1.14(d).

1.17 Definition — An ordered field is a field F which is also an ordered set, such that

(i) x + y < x + z if x, y, z ∈ F and y < z,
(ii) xy > 0 if x ∈ F, y ∈ F, x > 0, and y > 0.

If x > 0, we call x positive; if x < 0, x is negative.

For example, Q is an ordered field.

All the familiar rules for working with inequalities apply in every ordered field: Multiplication by positive [negative] quantities preserves [reverses] inequalities, no square is negative, etc. The following proposition lists some of these.
```

## root-rosen-discrete-8e — RosenDiscreteMath8Ed.pdf
- Drive file id: `1z2Wleas8Pjha1YWOskgo3GB7X-vVYUhq`- Method: pdftotext (digital text layer)- Maps to: Discrete Mathematics spine; Mathematical Logic ch. 2-4 cross-check- Shelf book: `discrete-mathematics`
```text
[front-matter page 1: not contents — omitted]

[front-matter page 2: not contents — omitted]

[front-matter page 3: not contents — omitted]

Contents
About the Author vi
Preface vii
Online Resources xvi
To the Student xix

1     The Foundations: Logic and Proofs . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1
1.1   Propositional Logic . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1
1.2   Applications of Propositional Logic . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 17
1.3   Propositional Equivalences . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 26
1.4   Predicates and Quantiﬁers . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 40
1.5   Nested Quantiﬁers . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 60
1.6   Rules of Inference. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .73
1.7   Introduction to Proofs . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 84
1.8   Proof Methods and Strategy . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 96
      End-of-Chapter Material . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 115

2     Basic Structures: Sets, Functions, Sequences, Sums,
      and Matrices . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 121
2.1   Sets . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 121
2.2   Set Operations . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 133
2.3   Functions . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 147
2.4   Sequences and Summations . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 165
2.5   Cardinality of Sets . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 179
2.6   Matrices . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 188
      End-of-Chapter Material . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 195

3     Algorithms . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 201
3.1   Algorithms . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 201
3.2   The Growth of Functions . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 216
3.3   Complexity of Algorithms . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 231
      End-of-Chapter Material . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 244

4     Number Theory and Cryptography . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 251
4.1   Divisibility and Modular Arithmetic . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 251
4.2   Integer Representations and Algorithms . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 260
4.3   Primes and Greatest Common Divisors . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 271
4.4   Solving Congruences. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .290
4.5   Applications of Congruences . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 303
4.6   Cryptography . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 310
      End-of-Chapter Material . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 324

                                                                                                                                                          iii

iv   Contents


                5     Induction and Recursion . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 331
                5.1   Mathematical Induction . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 331
                5.2   Strong Induction and Well-Ordering . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 354
                5.3   Recursive Deﬁnitions and Structural Induction . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 365
                5.4   Recursive Algorithms . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 381
                5.5   Program Correctness . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 393
                      End-of-Chapter Material . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 398


                6     Counting . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 405
                6.1   The Basics of Counting. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .405
                6.2   The Pigeonhole Principle . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 420
                6.3   Permutations and Combinations . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 428
                6.4   Binomial Coeﬃcients and Identities . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 437
                6.5   Generalized Permutations and Combinations . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 445
                6.6   Generating Permutations and Combinations . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 457
                      End-of-Chapter Material . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 461


                7     Discrete Probability . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 469
                7.1   An Introduction to Discrete Probability . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 469
                7.2   Probability Theory . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 477
                7.3   Bayes’ Theorem . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 494
                7.4   Expected Value and Variance . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 503
                      End-of-Chapter Material . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 520


                8     Advanced Counting Techniques . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 527
                8.1   Applications of Recurrence Relations . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 527
                8.2   Solving Linear Recurrence Relations . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 540
                8.3   Divide-and-Conquer Algorithms and Recurrence Relations . . . . . . . . . . . . . . . . . . . . . . 553
                8.4   Generating Functions . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 563
                8.5   Inclusion–Exclusion . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 579
                8.6   Applications of Inclusion–Exclusion . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 585
                      End-of-Chapter Material . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 592


                9     Relations . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 599
                9.1   Relations and Their Properties . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 599
                9.2   n-ary Relations and Their Applications . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 611
                9.3   Representing Relations . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 621
                9.4   Closures of Relations. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .628
                9.5   Equivalence Relations . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 638
                9.6   Partial Orderings . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 650
                      End-of-Chapter Material . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 665

                                                                                                                                      Contents v


10     Graphs . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 673
10.1   Graphs and Graph Models . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 673
10.2   Graph Terminology and Special Types of Graphs . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 685
10.3   Representing Graphs and Graph Isomorphism . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 703
10.4   Connectivity . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 714
10.5   Euler and Hamilton Paths . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 728
10.6   Shortest-Path Problems . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 743
10.7   Planar Graphs . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 753
10.8   Graph Coloring . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 762
       End-of-Chapter Material . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 771

11     Trees . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 781
11.1   Introduction to Trees . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 781
11.2   Applications of Trees . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 793
11.3   Tree Traversal . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 808
11.4   Spanning Trees . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 821
11.5   Minimum Spanning Trees . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 835
       End-of-Chapter Material . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 841

12     Boolean Algebra . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 847
12.1   Boolean Functions . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 847
12.2   Representing Boolean Functions . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 855
12.3   Logic Gates . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 858
12.4   Minimization of Circuits . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 864
       End-of-Chapter Material . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 879

13     Modeling Computation . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 885
13.1   Languages and Grammars . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 885
13.2   Finite-State Machines with Output . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 897
13.3   Finite-State Machines with No Output . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 904
13.4   Language Recognition . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 917
13.5   Turing Machines . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 927
       End-of-Chapter Material . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 938

       Appendices . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . A-1
1      Axioms for the Real Numbers and the Positive Integers . . . . . . . . . . . . . . . . . . . . . . . . . . A-1
2      Exponential and Logarithmic Functions . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . A-7
3      Pseudocode . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . A-11

Suggested Readings B-1
Answers to Odd-Numbered Exercises S-1
Index of Biographies I-1
Index I-2

[front-matter page 7: not contents — omitted]

[front-matter page 8: not contents — omitted]

[front-matter page 9: not contents — omitted]

[front-matter page 10: not contents — omitted]

[front-matter page 11: not contents — omitted]

[front-matter page 12: not contents — omitted]

[front-matter page 13: not contents — omitted]

                                                                                                    Preface   xiii


                            Chapter 1

                            Chapter 2*
                                                         Chapter 12
                            Chapter 3*
              Chapter 9*
                            Chapter 4*
              Chapter 10*                 Chapter 13
                            Chapter 5*
              Chapter 11
                            Chapter 6*


              Chapter 7                   Chapter 8


Ancillaries
              STUDENT’S SOLUTIONS GUIDE                    This student manual, available separately, contains
              full solutions to all odd-numbered exercises in the exercise sets. These solutions explain why
              a particular method is used and why it works. For some exercises, one or two other possible
              approaches are described to show that a problem can be solved in several diﬀerent ways. Sug-
              gested references for the writing projects found at the end of each chapter are also included in
              this volume. Also included are a guide to writing proofs and an extensive description of com-
              mon mistakes students make in discrete mathematics, plus sample tests and a sample crib sheet
              for each chapter designed to help students prepare for exams.

              INSTRUCTOR’S RESOURCE GUIDE                       This manual, available on the website and in
              printed form by request for instructors, contains full solutions to even-numbered exercises in
              the text. Suggestions on how to teach the material in each chapter of the book are provided,
              including the points to stress in each section and how to put the material into perspective. It
              also oﬀers sample tests for each chapter and a test bank containing over 1500 exam questions to
              choose from. Answers to all sample tests and test bank questions are included. Finally, sample
              syllabi are presented for courses with diﬀering emphases and student ability levels.


Acknowledgments
              I would like to thank the many instructors and students at a variety of schools who have used
              this book and provided me with their valuable feedback and helpful suggestions. Their input
              has made this a much better book than it would have been otherwise. I especially want to thank
              Jerrold Grossman and Dan Jordan for their technical reviews of the eighth edition and their
              “eagle eyes,” which have helped ensure the accuracy and quality of this book. Both have proof-
              read every part of the book many times as it has gone through the diﬀerent steps of production
              and have helped eliminate old errata and prevented the insertion of new errata.
                   Thanks go to Dan Jordan for his work on the student solutions manual and instructor’s
              resource guide. He has done an admirable job updating these ancillaries. Jerrold Grossman,
              the author of these ancillaries for the ﬁrst seven editions of the book, has provided valuable
              assistance to Dan. I would also like to express my gratitude to the many people who have helped
              create and maintain the online resources for this book. In particular, special thanks go to Dan
              Jordan and Rochus Boerner for their extensive work improving online questions for the Connect
              Site, described later in this preface.
                   I thank the reviewers of this eighth and all previous editions. These reviewers have provided
              much helpful criticism and encouragement to me. I hope this edition lives up to their high
              expectations. There have been well in excess of 200 reviewers of this book since its ﬁrst edition,
              with many from countries other than the United States. The most recent reviewers are listed
              here.

[front-matter page 15: not contents — omitted]

[front-matter page 16: not contents — omitted]

[front-matter page 17: not contents — omitted]

[front-matter page 18: not contents — omitted]

[front-matter page 19: not contents — omitted]

[front-matter page 20: not contents — omitted]

[front-matter page 21: not contents — omitted]

[front-matter page 22: not contents — omitted]
```

## root-strang-intro-la-5e — Introduction-to-Linear-Algebra-Gilbert-Strang-5th.pdf
- Drive file id: `1jlyeOlJjdjWZJIwHniAxChf4YV7ybP7i`- Method: pdftotext (digital text layer)- Maps to: Linear Algebra computational pole- Shelf book: `linear-algebra`
```text
[front-matter page 2: not contents — omitted]

[front-matter page 3: not contents — omitted]

Table of Contents


1   Introduction to Vectors                                 1
    1.1 Vectors and Linear Combinations.                    2
    1.2 Lengths and Dot Products.                          11
    1.3 Matrices .........                                 22

2 Solving Linear Equations                                 31
  2.1 Vectors and Linear Equations .                       31
  2.2 The Idea of Elimination ...                          46
  2.3 Elimination Using Matrices .                         58
  2.4 Rules for Matrix Operations                          70
  2.5 Inverse Matrices .......                             83
  2.6 Elimination= Factorization: A= LU                    97
  2.7 Transposes and Permutations . . . . . .             109

3 Vector Spaces and Subspaces                             123
  3.1 Spaces of Vectors ....... . . . . . . . . . . . .   123
  3.2 The Nullspace of A: Solving Ax = 0 and Rx = 0       135
  3.3 The Complete Solution to Ax = b                     150
  3.4 Independence, Basis and Dimension                   164
  3.5 Dimensions of the Four Subspaces                    181

4 Orthogonality                                           194
  4.1 Orthogonality of the Four Subspaces                 194
  4.2 Projections . . . . . . . . . . . . .               206
  4.3 Least Squares Approximations ...                    219
  4.4 Orthonormal Bases and Gram-Schmidt.                 233

5 Determinants                                            247
  5.1 The Properties of Determinants .                    247
  5.2 Permutations and Cofactors ...                      258
  5.3 Cramer's Rule, Inverses, and Volumes                273

                                       iii

iv                                                         Table of Contents

6 Eigenvalues and Eigenvectors                                          288
  6.1 Introduction to Eigenvalues..                                     2 88
  6.2 Diagonalizing a Matrix ....                                       30 4
  6.3 Systems of Differential Equations                                 319
  6.4 Symmetric Matrices........                                        338
  6.5 Positive Definite Matrices.....                                   350

7 The Singular Value Decomposition (SVD)                                364
  7.1 Image Processing by Linear Algebra ....                           36 4
  7.2 Bases and Matrices in the SVD .......                             371
  7.3 Principal Component Analysis (PCA by the SVD).                    382
  7.4 The Geometry of the SVD .............                             39 2
8 Linear Transformations                                                401
  8.1 The Idea of a Linear Transformation                               40 1
  8.2 The Matrix of a Linear Transformation.                            411
  8.3 The Search for a Good Basis ......                                42 1

9 Complex Vectors and Matrices                                         430
  9.1 Complex Numbers ......                                           431
  9.2 Hermitian and Unitary Matrices                                   438
  9.3 The Fast Fourier Transform.                                      445
10 Applications                                                        452
   10.1 Graphs and Networks .............                              452
   10.2 Matrices in Engineering............                            46 2
   10.3 Markov Matrices, Population, and Economics                     474
   10.4 Linear Programming .............                               483
   10.5 Fourier Series: Linear Algebra for Functions.                  49 0
   10.6 Computer Graphics ........                                     49 6
   10.7 Linear Algebra for Cryptography.......                         50 2
11 Numerical Linear Algebra                                            508
   11.1 Gaussian Elimination in Practice                               50 8
   11.2 Norms and Condition Numbers.                                   518
   11.3 Iterative Methods and Preconditioners                          52 4

12 Linear Algebra in Probability & Statistics                          535
   12.1 Mean, Variance, and Probability ......                         535
   12.2 Covariance Matrices and Joint Probabilities                    546
   12.3 Multivariate Gaussian and Weighted Least Squares               555

Matrix Factorizations                                                  563
Index                                                                  565
Six Great Theorems/ Linear Algebra in a Nutshell                       574

[front-matter page 6: not contents — omitted]

[front-matter page 7: not contents — omitted]

[front-matter page 8: not contents — omitted]

[front-matter page 9: not contents — omitted]

[front-matter page 10: not contents — omitted]

[front-matter page 11: not contents — omitted]

[front-matter page 12: not contents — omitted]

[front-matter page 13: not contents — omitted]

[front-matter page 14: not contents — omitted]

[front-matter page 15: not contents — omitted]

[front-matter page 16: not contents — omitted]

[front-matter page 17: not contents — omitted]

[front-matter page 18: not contents — omitted]

[front-matter page 19: not contents — omitted]

[front-matter page 20: not contents — omitted]

[front-matter page 21: not contents — omitted]

[front-matter page 22: not contents — omitted]
```

## root-axler-ladr-4e — dokumen.pub_linear-algebra-done-right-4th (Axler)
- Drive file id: `12MEhSOQCcHgOoWDAyIMj2V8HUaAi_t3-`- Method: pdftotext (digital text layer)- Maps to: Linear Algebra proof-first pole- Shelf book: `linear-algebra`
```text
[front-matter page 1: not contents — omitted]

[front-matter page 2: not contents — omitted]

[front-matter page 3: not contents — omitted]

[front-matter page 4: not contents — omitted]

[front-matter page 5: not contents — omitted]

[front-matter page 6: not contents — omitted]

                              Contents



About the Author v

Preface for Students xii

Preface for Instructors xiii

Acknowledgments xvii

Chapter 1
Vector Spaces 1
   1A 𝐑𝑛 and 𝐂𝑛 2
            Complex Numbers 2
            Lists 5
            𝐅𝑛 6
            Digression on Fields 10
            Exercises 1A 10
   1B Definition of Vector Space 12
            Exercises 1B 16
   1C Subspaces 18
            Sums of Subspaces 19
            Direct Sums 21
            Exercises 1C 24

Chapter 2
Finite-Dimensional Vector Spaces 27
   2A Span and Linear Independence 28
            Linear Combinations and Span 28
            Linear Independence 31
            Exercises 2A 37

                                              vi

                                                          Contents   vii

   2B Bases 39
            Exercises 2B 42
   2C Dimension 44
            Exercises 2C 48

Chapter 3
Linear Maps 51
   3A Vector Space of Linear Maps 52
            Definition and Examples of Linear Maps 52
            Algebraic Operations on ℒ(𝑉, 𝑊) 55
            Exercises 3A 57
   3B Null Spaces and Ranges 59
            Null Space and Injectivity 59
            Range and Surjectivity 61
            Fundamental Theorem of Linear Maps 62
            Exercises 3B 66
   3C Matrices 69
            Representing a Linear Map by a Matrix 69
            Addition and Scalar Multiplication of Matrices 71
            Matrix Multiplication 72
            Column–Row Factorization and Rank of a Matrix 77
            Exercises 3C 79
   3D Invertibility and Isomorphisms 82
            Invertible Linear Maps 82
            Isomorphic Vector Spaces 86
            Linear Maps Thought of as Matrix Multiplication 88
            Change of Basis 90
            Exercises 3D 93
   3E Products and Quotients of Vector Spaces 96
            Products of Vector Spaces 96
            Quotient Spaces 98
            Exercises 3E 103
   3F Duality 105
            Dual Space and Dual Map 105
            Null Space and Range of Dual of Linear Map 109

viii      Contents

             Matrix of Dual of Linear Map 113
             Exercises 3F 115

Chapter 4
Polynomials 119
             Zeros of Polynomials 122
             Division Algorithm for Polynomials 123
             Factorization of Polynomials over 𝐂 124
             Factorization of Polynomials over 𝐑 127
             Exercises 4 129

Chapter 5
Eigenvalues and Eigenvectors 132
       5A Invariant Subspaces 133
             Eigenvalues 133
             Polynomials Applied to Operators 137
             Exercises 5A 139
       5B The Minimal Polynomial 143
             Existence of Eigenvalues on Complex Vector Spaces 143
             Eigenvalues and the Minimal Polynomial 144
             Eigenvalues on Odd-Dimensional Real Vector Spaces 149
             Exercises 5B 150
       5C Upper-Triangular Matrices 154
             Exercises 5C 160
       5D Diagonalizable Operators 163
             Diagonal Matrices 163
             Conditions for Diagonalizability 165
             Gershgorin Disk Theorem 170
             Exercises 5D 172
       5E Commuting Operators 175
             Exercises 5E 179

Chapter 6
Inner Product Spaces 181
       6A Inner Products and Norms 182
             Inner Products 182

                                                         Contents   ix

            Norms 186
            Exercises 6A 191
   6B Orthonormal Bases 197
            Orthonormal Lists and the Gram–Schmidt Procedure 197
            Linear Functionals on Inner Product Spaces 204
            Exercises 6B 207
   6C Orthogonal Complements and Minimization Problems 211
            Orthogonal Complements 211
            Minimization Problems 217
            Pseudoinverse 220
            Exercises 6C 224

Chapter 7
Operators on Inner Product Spaces 227
   7A Self-Adjoint and Normal Operators 228
            Adjoints 228
            Self-Adjoint Operators 233
            Normal Operators 235
            Exercises 7A 239
   7B Spectral Theorem 243
            Real Spectral Theorem 243
            Complex Spectral Theorem 246
            Exercises 7B 247
   7C Positive Operators 251
            Exercises 7C 255
   7D Isometries, Unitary Operators, and Matrix Factorization 258
            Isometries 258
            Unitary Operators 260
            QR Factorization 263
            Cholesky Factorization 266
            Exercises 7D 268
   7E Singular Value Decomposition 270
            Singular Values 270
            SVD for Linear Maps and for Matrices 273
            Exercises 7E 278

x    Contents

    7F Consequences of Singular Value Decomposition 280
            Norms of Linear Maps 280
            Approximation by Linear Maps with Lower-Dimensional Range 283
            Polar Decomposition 285
            Operators Applied to Ellipsoids and Parallelepipeds 287
            Volume via Singular Values 291
            Properties of an Operator as Determined by Its Eigenvalues 293
            Exercises 7F 294

Chapter 8
Operators on Complex Vector Spaces 297
    8A Generalized Eigenvectors and Nilpotent Operators 298
            Null Spaces of Powers of an Operator 298
            Generalized Eigenvectors 300
            Nilpotent Operators 303
            Exercises 8A 306
    8B Generalized Eigenspace Decomposition 308
            Generalized Eigenspaces 308
            Multiplicity of an Eigenvalue 310
            Block Diagonal Matrices 314
            Exercises 8B 316
    8C Consequences of Generalized Eigenspace Decomposition 319
            Square Roots of Operators 319
            Jordan Form 321
            Exercises 8C 324
    8D Trace: A Connection Between Matrices and Operators 326
            Exercises 8D 330

Chapter 9
Multilinear Algebra and Determinants 332
    9A Bilinear Forms and Quadratic Forms 333
            Bilinear Forms 333
            Symmetric Bilinear Forms 337
            Quadratic Forms 341
            Exercises 9A 344

                                                        Contents   xi

   9B Alternating Multilinear Forms 346
         Multilinear Forms 346
         Alternating Multilinear Forms and Permutations 348
         Exercises 9B 352
   9C Determinants 354
         Defining the Determinant 354
         Properties of Determinants 357
         Exercises 9C 367
  9D Tensor Products 370
         Tensor Product of Two Vector Spaces 370
         Tensor Product of Inner Product Spaces 376
         Tensor Product of Multiple Vector Spaces 378
         Exercises 9D 380

Photo Credits 383

Symbol Index 384

Index 385

Colophon: Notes on Typesetting 390

[front-matter page 13: not contents — omitted]

[front-matter page 14: not contents — omitted]

[front-matter page 15: not contents — omitted]

[front-matter page 16: not contents — omitted]

[front-matter page 17: not contents — omitted]

[front-matter page 18: not contents — omitted]

[front-matter page 19: not contents — omitted]

[front-matter page 20: not contents — omitted]

[front-matter page 21: not contents — omitted]

[front-matter page 22: not contents — omitted]
```

## root-lay-laa-5e — Linear-Algebra-and-Its-Applications-Lay-5th.pdf
- Drive file id: `1GwxD5B1XwENJiG5_4LHUTJQlu68ejxFE`- Method: pdftotext (digital text layer)- Maps to: Linear Algebra applications pole- Shelf book: `linear-algebra`
```text
[front-matter page 2: not contents — omitted]

[front-matter page 3: not contents — omitted]

[front-matter page 4: not contents — omitted]

[front-matter page 5: not contents — omitted]

            Contents

          Preface   viii
          A Note to Students   xv

$IBQUFS  Linear Equations in Linear Algebra                 1

          */530%6$503: &9".1-& Linear Models in Economics and Engineering     1
          1.1   Systems of Linear Equations 2
          1.2   Row Reduction and Echelon Forms 12
          1.3   Vector Equations 24
          1.4   The Matrix Equation Ax D b 35
          1.5   Solution Sets of Linear Systems 43
          1.6   Applications of Linear Systems 50
          1.7   Linear Independence 56
          1.8   Introduction to Linear Transformations 63
          1.9   The Matrix of a Linear Transformation 71
          1.10  Linear Models in Business, Science, and Engineering 81
                Supplementary Exercises 89

$IBQUFS  Matrix Algebra             93

          */530%6$503: &9".1-& Computer Models in Aircraft Design        93
          2.1   Matrix Operations 94
          2.2   The Inverse of a Matrix 104
          2.3   Characterizations of Invertible Matrices 113
          2.4   Partitioned Matrices 119
          2.5   Matrix Factorizations 125
          2.6   The Leontief Input–Output Model 134
          2.7   Applications to Computer Graphics 140
          2.8   Subspaces of Rn 148
          2.9   Dimension and Rank 155
                Supplementary Exercises 162

$IBQUFS  Determinants              165

          */530%6$503: &9".1-& Random Paths and Distortion         165
          3.1   Introduction to Determinants 166
          3.2   Properties of Determinants 171
          3.3   Cramer’s Rule, Volume, and Linear Transformations   179
                Supplementary Exercises 188

                                                                                   W




                                                    REVISED PAGES

WJ   $POUFOUT


                $IBQUFS  Vector Spaces        191

                          */530%6$503: &9".1-& Space Flight and Control Systems 191
                          4.1   Vector Spaces and Subspaces 192
                          4.2   Null Spaces, Column Spaces, and Linear Transformations 200
                          4.3   Linearly Independent Sets; Bases 210
                          4.4   Coordinate Systems 218
                          4.5   The Dimension of a Vector Space 227
                          4.6   Rank 232
                          4.7   Change of Basis 241
                          4.8   Applications to Difference Equations 246
                          4.9   Applications to Markov Chains 255
                                Supplementary Exercises 264


                $IBQUFS  Eigenvalues and Eigenvectors              267

                          */530%6$503: &9".1-& Dynamical Systems and Spotted Owls       267
                          5.1   Eigenvectors and Eigenvalues 268
                          5.2   The Characteristic Equation 276
                          5.3   Diagonalization 283
                          5.4   Eigenvectors and Linear Transformations 290
                          5.5   Complex Eigenvalues 297
                          5.6   Discrete Dynamical Systems 303
                          5.7   Applications to Differential Equations 313
                          5.8   Iterative Estimates for Eigenvalues 321
                                Supplementary Exercises 328


                $IBQUFS  Orthogonality and Least Squares                 331

                          */530%6$503: &9".1-& The North American Datum
                          and GPS Navigation 331
                          6.1    Inner Product, Length, and Orthogonality 332
                          6.2    Orthogonal Sets 340
                          6.3    Orthogonal Projections 349
                          6.4    The Gram–Schmidt Process 356
                          6.5    Least-Squares Problems 362
                          6.6    Applications to Linear Models 370
                          6.7    Inner Product Spaces 378
                          6.8    Applications of Inner Product Spaces 385
                                 Supplementary Exercises 392




                                                                   REVISED PAGES

                                                                               $POUFOUT   WJJ


 $IBQUFS  Symmetric Matrices and Quadratic Forms                        395

            */530%6$503: &9".1-& Multichannel Image Processing         395
            7.1   Diagonalization of Symmetric Matrices 397
            7.2   Quadratic Forms 403
            7.3   Constrained Optimization 410
            7.4   The Singular Value Decomposition 416
            7.5   Applications to Image Processing and Statistics 426
                  Supplementary Exercises 434

 $IBQUFS  The Geometry of Vector Spaces                    437

            */530%6$503: &9".1-& The Platonic Solids        437
            8.1   Afﬁne Combinations 438
            8.2   Afﬁne Independence 446
            8.3   Convex Combinations 456
            8.4   Hyperplanes 463
            8.5   Polytopes 471
            8.6   Curves and Surfaces 483

 $IBQUFS  Optimization (Online)
            */530%6$503: &9".1-& The Berlin Airlift
            9.1   Matrix Games
            9.2   Linear Programming—Geometric Method
            9.3   Linear Programming—Simplex Method
            9.4   Duality

$IBQUFS  Finite-State Markov Chains (Online)
            */530%6$503: &9".1-& Googling Markov Chains
            10.1  Introduction and Examples
            10.2  The Steady-State Vector and Google’s PageRank
            10.3  Communication Classes
            10.4  Classiﬁcation of States and Periodicity
            10.5  The Fundamental Matrix
            10.6  Markov Chains and Baseball Statistics

            Appendixes
            A      Uniqueness of the Reduced Echelon Form     A1
            B      Complex Numbers A2

            Glossary A7
            Answers to Odd-Numbered Exercises   A17
            Index I1
            Photo Credits P1




                                                      REVISED PAGES

[front-matter page 9: not contents — omitted]

[front-matter page 10: not contents — omitted]

[front-matter page 11: not contents — omitted]

[front-matter page 12: not contents — omitted]

[front-matter page 13: not contents — omitted]

[front-matter page 14: not contents — omitted]

[front-matter page 15: not contents — omitted]

[front-matter page 16: not contents — omitted]

[front-matter page 17: not contents — omitted]

[front-matter page 18: not contents — omitted]

[front-matter page 19: not contents — omitted]

[front-matter page 20: not contents — omitted]

[front-matter page 21: not contents — omitted]

[front-matter page 22: not contents — omitted]
```

## root-khattar-qa — Quantitative-Aptitude-Competitive-Examinations-Khattar.pdf
- Drive file id: `12YnlSYX16Hl-Oze9Io7bBN0hZ_2qRcbi`- Method: pdftotext (digital text layer)- Maps to: Aptitude-exam scope (Geometry/Number Theory/Trigonometry aptitude cross-checks; Statistics DI chapters)- Shelf book: `statistics`
```text
                                        


  Quantitative
  Aptitude                                                                                                                                                                                                                                                   

                                                         Dinesh Khattar
                                                                                                                                                                                                                       Quantitative



                                                                                                                                                                                               Quantitative Aptitude
                                                                                                                                                                       
                                                                                                                                                                                                                        Aptitude
  Quantitative Aptitude forms an integral part for aspirants preparing for any competitive examination. This
  edition of Quantitative Apptitude For Competitive Examinations has been conceptualized for the aspirants
  aiming for Bank, LIC, Railways, SSC and similar government vacancy examinations.

  Each chapter of the book provides lucid, explicit and concise deﬁnitions and explanations of the basic
  principles, which are well-supported with the fully–solved examples for better understanding of the aspirants.
  The book comprises variety of problems followed by apt solutions along with previous years’ questions from
  various competitive examinations. The huge repository of problems will enable aspirants to understand the
  exam patterns and build proﬁciency in solving questions.

                                                                                                                                                                                                                            
       More than 7000 fully solved questions
       Fully–solved solution of past 8 years’ (Available online also)
       Short cut methods provided in each chapter with examples
       Comprehensive coverage of topics




                                                                                                                              Cover Image: Stilesta.shutterstock.com
  Dinesh Khattar, M.Sc. (Mathematics), M.Phil., Ph.D., has impeccable academic credentials. He is a gold                                                                                                                                         
  medalist and topper of B.Sc. (Mathematics) and M.Sc. (Mathematics) from University of Delhi. Besides teaching
  mathematics, for more than 25 years to undergraduates and postgraduates, he is also actively involved in                                                                                                                                         
  research projects. He has also presented research papers in prestigious international conferences across
  several countries. He has authored more than 20 books on mathematics with renowned publications.                                                                                                                                                


                                                                                            MRP Inclusive
                                                                                                                `799.00
                                                                                                                                                                         
                                                                                              of all Taxes



                                                                                                             in.pearson.com                                                
        www.pearsoned.co.in/DineshKhattar

                                                                                                                                                                                                                                                                       Dinesh Khattar
                                                                                                                                                                       Khattar


Size: 203x254mm                     Spine: 34mm       ISBN: 9789353439552   Title       Sub Title                   Edition                                            Authors / Editors Name                          With CD   Red Band   Territory line       URL    Price   mQuest

---PAGEBREAK---
                     About Pearson
Pearson is the world’s learning company, with presence across 70 countries
worldwide. Our unique insights and world-class expertise comes from a long
history of working closely with renowned teachers, authors and thought
leaders, as a result of which, we have emerged as the preferred choice for
millions of teachers and learners across the world.
We believe learning opens up opportunities, creates fulfilling careers and
hence better lives. We hence collaborate with the best of minds to deliver you
class-leading products, spread across the Higher Education and K12 spectrum.
Superior learning experience and improved outcomes are at the heart of
everything we do. This product is the result of one such effort.
Your feedback plays a critical role in the evolution of our products and you
can contact us - reachus@pearson.com. We look forward to it.

---PAGEBREAK---
This page is intentionally left blank

---PAGEBREAK---
 The Pearson Guide to


Quantitative
 Aptitude
 For Competitive Examinations

---PAGEBREAK---
This page is intentionally left blank

---PAGEBREAK---
 The Pearson Guide to


Quantitative
 Aptitude
 For Competitive Examinations
         (Fourth Edition)




        Dinesh Khattar
         Acting Principal
        Kirori Mal College
        University of Delhi

---PAGEBREAK---
Copyright © 2019 Pearson India Education Services Pvt. Ltd

Published by Pearson India Education Services Pvt. Ltd, CIN: U72200TN2005PTC057128.

No part of this eBook may be used or reproduced in any manner whatsoever without the publisher’s
prior written consent.

This eBook may or may not include all assets that were part of the print version. The publisher
reserves the right to remove any material in this eBook at any time.

ISBN 978-93-534-3955-2
eISBN:

Head Office: 15th Floor, Tower-B, World Trade Tower, Plot No. 1, Block-C, Sector-16,
Noida 201 301,Uttar Pradesh, India.
Registered Office: 4th Floor, Software Block, Elnet Software City, TS-140, Block 2 & 9,
Rajiv Gandhi Salai, Taramani, Chennai 600 113, Tamil Nadu, India.
Fax: 080-30461003, Phone: 080-30461060
www.in.pearson.com, Email: companysecretary.india@pearson.com

---PAGEBREAK---
                                          Contents



		Preface to the Fourth Edition           viii   19 Logarithms19.1–19.8
		Preface to the First Edition            ix     20 Stocks, Shares and Debentures     20.1–20.14
		Acknowledgement                         x      21 Discount (True and Banker’s)      21.1–21.18
		Competitive Examinations: An Overview   xi
                                                 22 Binary Number System               22.1–22.6
                                                 23 Series23.1–23.28
                                                 24 Clocks and Calendar               24.1–24.12
		1 Numbers1.1–1.28
                                                 25 Polynomials25.1–25.12
		2 H.C.F. and L.C.M. of Numbers    2.1–2.18
                                                 26 H.C.F. and L.C.M. of Polynomials   26.1–26.6
		3 Square Root and Cube Root       3.1–3.18
                                                 27 Linear Equations                  27.1–27.16
		4 Simplification                  4.1–4.48
                                                 28 Quadratic Equations               28.1–28.28
		5 Percentage5.1–5.38
                                                 29 Progression29.1–29.16
		6 Average6.1–6.32
                                                 30 Set Theory                        30.1–30.16
		7 Ratio and Proportion            7.1–7.34
                                                 31 Permutations and Combinations     31.1–31.20
		8 Partnership8.1–8.8
                                                 32 Probability32.1–32.24
		9 Profit and Loss                 9.1–9.48
                                                 33 Mensuration I: Area and Perimeter 33.1–33.56
 10 Time and Work, Work and Wages 10.1–10.32
                                                 34 Mensuration II:
 11 Pipes and Cisterns            11.1–11.12        Volume and Surface Area          34.1–34.50
 12 Time and Distance             12.1–12.36    35 Trigonometric Ratios              35.1–35.40
 13 Boats and Streams             13.1–13.12    36 Heights and Distance              36.1–36.18
 14 Races and Games of Skill       14.1–14.6    37 Plane Geometry                    37.1–37.78
 15 Alligation or Mixture         15.1–15.18    38 Co-ordinate Geometry              38.1–38.12
 16 Problems on Ages              16.1–16.14    39 Data Interpretation               39.1–39.90
 17 Simple Interest               17.1–17.24    40 Data Sufficiency                  40.1–40.14
 18 Compound Interest             18.1–18.22

---PAGEBREAK---
                         Preface to the Fourth Edition

Since the publication of last edition of this book, I have received immense support from readers, and a lot of inputs
on how this book could be improved. With the aid of all this information, it gives me immense pleasure to present
a completely updated fourth edition of the book.
    Following are noteworthy inclusion in this edition:
    1.	The book is updated with latest previous years’ questions asked in various competitive examination with
        explanatory answers.
    2.	Alternated solutions have been given for teaching multiple approaches to learner.
    3.	Solution to each and every question in the book.
    In order to provide a more focused approach, the obsolete previous years’ questions have been deleted in
every chapter, however the basic structure of the book has been kept intact. In preparing this fourth edition, I am
greatly indebted to many teachers at various coaching centers as wells students throughout the country who made
constructive criticism and extended valuable suggestions for the improvement of the book. Any suggestions to
ensure further improvement of the book will be greatly acknowledged.
    I am extremely thankful to editorial team of Pearson Education for all the hard work they had put in this book
and made possible the publishing of this book in timely and precious manner.


                                                                                                Dinesh Khattar

---PAGEBREAK---
                           Preface to the First Edition

With so many books available in the market on quantitative aptitude for students appearing in different competitive
examinations, the publication of yet another volume on the subject requires some explanation. It has been my
experience that the average student needs the treatment of theory in a manner easily understandable to him. An
effort, therefore, has been made, in this book to put across concepts in a lucid and unambiguous manner. The book
aims at helping students enhance their knowledge of quantitative aptitude and equipping them with the skills that
will enable them to succeed in any competitive examination.
     The book is noteworthy in the following aspects:

 1. Each chapter contains concise definitions and explanations of basic/fundamental principles, which are further
    augmented with illustrative examples to enable students to learn and recall fast.
 2. Each chapter has a separate section on short-cut methods covering all kinds of questions asked in competitive
    examinations. In addition, each short-cut method is explained with the help of illustrative examples.
 3. Completely worked-out solutions to a large range of problems have been included in the text. The number of
    questions in each chapter has been kept sufficiently large to provide rigorous practice.
 4. A large number of problems that have been asked in the competitive examinations in recent times are included
    in every chapter with explanatory answers.
 5. Practice exercises covering all the topics in each chapter are provided for self-assessment and to facilitate
    understanding of the pattern and the type of questions asked in the examinations.
Every care has been taken to minimise typographical as well as factual errors. However, it is possible that a few
errors might have managed to dodge the vigilant eye. I will be grateful to the readers for bringing these errors to
my notice as also for their valuable suggestions. It is earnestly hoped that the book will help the students grasp
the subject and help them in obtaining a commendable score in the examination.
     In preparing this edition, my deepest appreciation goes to many teachers at various coaching centres as well
as students throughout the editorial who made constructive criticism and extended valuable suggestions. I am also
extremely thankful to Pearson editorial team, for their unfailing cooperation.
     I am deeply indebted to my parents without whose encouragement this dream could not have been translated
into reality. And last, but not the least, it was the cherubic smiles of my daughters Nikita and Nishita that inspired
me to treat my work as worship.


                                                                                                  Dinesh Khattar

---PAGEBREAK---
                                   Acknowledgement
I would like to express my gratitude to my father to whom I owe all my achievements. Whatever I have achieved
in life is because of the dreams and wishes which he has always nurtured about me.

---PAGEBREAK---
                 ComPetitive eXaminations: an overview



                                  ssC ComPetitive eXaminations


sCheme of the eXamination for ComBined graduate level eXaminations

The Scheme of the Examination will be conducted in three tiers as indicated below:
●● 1st Tier-I Written Examination (Objective Multiple Choice Type)
●● 2nd Tier-II Main Written Examination (Objective Multiple Choice Type)
●● 3rd Tier-III Personality Test/Interview or Skill Test, where applicable Candidates opting for post of Sub-Inspector

   in CPOs will be required to undergo Physical Endurance Test (PET)/Medical Examination at any convenient time
   after declaration of result of Tier-I.


ComBineD GrADuATe level (Tier-i) exAminATion

Tier-I of the Combined Graduate level Examination would be common for all categories of posts and will be held
in one session. Total duration of the examination = 2 hours.

                          Part     Subject                                 Maximum Marks/Questions

                             I.    General Intelligence and Reasoning                   50
                            II.    General Awareness                                    50
                           III.    Numerical Aptitude                                   50
                           IV.     English Comprehension                                50


Syllabus of Numerical Aptitude: The questions are designed to test the ability of appropriate use of numbers
and number sense of the candidate. It will test sense of order among numbers, ability to translate from one name
to another, sense or order of magnitude, estimation or prediction of the outcome of computation, selection of an
appropriate operation for the solution of real life problems and knowledge of alternative computation procedures
tofindanswers.Thequestionswouldalsobebasedonarithmeticalconceptsandrelationshipbetweennumbersand
not on complicated arithmetical computation (The standard of the questions will be of 10 + 2 level).

ComBineD GrADuATe level (Tier-ii) exAminATion

Tier-II of the Combined Graduate Level Examination is an objective multiple-choice and is conducted over two
days during a weekend. It will consist of three different papers/subjects and depending upon the category of posts
applied for, the candidate will be required to appear in one, two or three papers, as the case may be.
For the post of Assistants, Inspector of Income Tax/Inspector (Central Excise, Inspector (PO), Inspector
(Examiner), Sub Inspector in CBI, Inspector of Posts, Assistant Enforcement Ofﬁcer, Divisional Accountants,
Accountants, Auditors, Tax Assistants, UDCS, the examination will consist of two papers as under:

---PAGEBREAK---
xii    Competitive Examinations: An Overview


       Part      Subject                Maximum Marks/Questions Duration For General              Duration For
                                                                Candidates                        Vh Candidates

            I    Arithmetical Ability             200/100                     2 Hours             2 Hours and 40 Minutes
           II    English Language and              200                        2 Hours             2 Hours and 40 Minutes
                 Comprehension

For the post of Statistical Investigators GR.II & Compilers, the examination will consist of three papers as
under:

      Part      Subject                 Maximum Marks/Questions       Duration For General         Duration For
                                                                      Candidates                   Vh Candidates

       I        Arithmetical Ability              200/100                     2 Hours              2 Hours and 40 Minutes
       II       English Language and              200/200                     2 Hours              2 Hours and 40 Minutes
                Comprehension
      III       Commerce/Mathematics              200/200                     2 Hours              2 Hours and 40 Minutes
                Statistics/Economics


For The post of Sub-Inspector in Central Police Organisations, the examination will consist of one Paper as under:

                  Paper    Subject                Maximum Marks/Questions     Duration For General Candidates

                    I      English Language and             200/200                          2 Hours
                           Comprehension


Syllabus For Tier-I (Paper-I): Arithmetic Ability—This paper will include questions on problems relating to
Number Systems, Computation of Whole Numbers, Decimals and Fractions and relationship between Numbers,
Fundamental Arithmetical Operations, Percentage, Ratio and Proportion, Average, Interest, Profit and Loss, Discount,
Use of Table and Graphs, Mensuration, Time and Distance, Ratio and Time, etc.


Clerks’ Grade Examination

Clerks Grade Examination is conducted by the Staff Selection Commission for recruitment to the posts of clerks
for the following groups of services/offices:

Group X
●● Indian Foreign Service (B) Grade VI
●● Railway Board Secretarial Clerical Service Grade II
●● Central Secretariat Clerical Service—Lower Division Grade

●● Armed Forces Headquarters Clerical Service—Lower Division Grade

●● Ministry of Parliamentary Affairs

●● President’s Secretariat




Group Y
●● Equivalent/comparable posts in Subordinate offices of Government of India located throughout India.
●● Offices of the Controller and Auditor General of India, Accountants General (Audit) and Accountants General
   (Accounts and Estt.) in various states.
●● Controller General of Defence Accounts.

---PAGEBREAK---
                                                                                     Competitive Examinations: An Overview   xiii

●● Central Vigilance Commission.
●● Equivalent/comparable posts in other Departments and Attached Offices of Government of India not mentioned in
   group ‘X’.
●● Equivalent/comparable posts in the offi
                                             ces of public sector undertakings, autonomous bodies, like Employees State
   Insurance Corporation
●● Delhi Administration

●● Municipal Corporation of Delhi and New Delhi Municipal Corporation

●● University of Delhi




Age
18 to 25 years on the 1stAugust of the year of examination. Upper age limit relaxable for SC/ST etc.

Educational Qualifications
Matriculation or equivalent.

examination
Plan of the Examination: The examination shall consist of two parts. Part I-Written Examination and Part II-
Typewriting Test for those candidates who attain such minimum standards in the written test as may be fixed by
the commission in their discretion.
Examination Subjects: The subjects of written examination, the time allowed and the maximum marks for each
subject will be as follows:

                                 S.No    Subject                       Duration     Max. Marks

                                   1     General Intelligence and                        50
                                         Clerical Aptitude
                                   2     English Language              2 Hours           50
                                   3     Numerical Aptitude                              50
                                   4     General Awareness                               50

 Notes
  (i) The questions in all the four tests will be Objective-Multiple Choice Type.
 (ii) Candidates will be required to qualify in each of the tests separately.

Syllabus of Numerical Aptitude Test: Questions will be designed to test the ability of arithmetical computation
of whole numbers, decimals and fractions and relationship between numbers. The questions would be based on
arithmetical concepts and relationship between numbers and not on complicated arithmetical computation.


                        l.i.C/g.i.C. ComPetitive eXaminations

l.i.C. offiCers’ exAminATion

A competitive examination for the recruitment of the Assistant Administrative Officers etc, in Life Insurance
Corporation (LIC) it is held once a year, generally in the month of June. The blank application form and particulars
are published in the Employment News, usually the second week of May every year.

---PAGEBREAK---
xiv   Competitive Examinations: An Overview


Age
21 to 28 years on the 1st April of the year of examination. Upper age limit is relaxable for SC/ST, confirmed
L.I.C. employees, etc.

Educational Qualifications
Bachelor’s/Master’s Degree from a recognised Indian or Foreign University with a minimum of 50% marks (relaxable
in the case of SC/ST candidates to 40%) in aggregate in either of the degrees.

Examination
Plan of the Examination: The examination comprises (i) written examination and (ii) interview of candidates who
qualify in the written test.
Examination Subjects: The written examination consists of the following papers:

Paper I (Objective)
 1. Reasoning Ability (Bilingual)
 2. General Knowledge and Current Affairs (Bilingual)
 3. Numerical Ability (Bilingual): The purpose of this test is to ascertain how quick you are in working at numerical
    calculations
 4. English Language with special emphasis on grammar and vocabulary

Paper II (Descriptive)
 1. Test on Essay (can be written in Hindi or English)
 2. Precise and Comprehension in English

LIC Development Officers’ Examination

A competitive examination for the recruitment of Assistant Development Officers’ in the Life Insurance Corporation
is held once a year, generally in the month of September. The blank application forms and particulars are published
in the Employment News, generally in the month of July and the last date for submission of applications is generally
the first week of August.
Age
The applicants should have completed the age of 21 years on the 1st July of the year of examination.
Educational Qualifications
Candidates must hold a bachelor’s degree in arts, science, commerce, agriculture or law of an Indian or foreign
university or an equivalent qualification.
Examination
Plan of the Examination: The examination comprises (i) written examination (ii) interview of such candidates,
who qualify in the written test.
Examination Subjects: The written test will consist of (i) test of reasoning and numerical ability and (ii) general
English/Hindi and general knowledge. The test papers will be set bilingual and the candidates will have choice to
write answers either in English or in Hindi.

G.I.C. Assistants’ Examination

This examination is held once a year, generally in the month of August. The blank application and particulars are
published in the Employment News, usually in the month of March. The last date for the submission of applications
is usually first week of April every year.

---PAGEBREAK---
                                                                                       Competitive Examinations: An Overview        xv

Age
18 to 28 years on 1 June of the year of examination.
Educational Qualifications
Pass in higher secondary with 60% marks or graduate of a recognised university.
examination
Plan of the Examination: The examination comprises (i) written examination and (ii) interview of candidates
qualifying the written test.
Examination Subjects: (i) The written test will be objective type, consisting of test of reasoning, numerical ability,
clerical aptitude, English language and general knowledge. (ii) There will also be a descriptive test on essay, letter
and precise writing in English. Objective tests except English will be bilingual, i.e., both in English and Hindi.




                                Banking serviCes eXaminations
Banking has emerged as one of the most challenging sectors in the country. Openings are available at various
levels,frombankclericaltoprobationaryofficers(PO).Recruitmentforthepublicsectorbanksisdonethroughthe
Banking Service Recruitment Boards (BSRBs). The advertisements for recruitment appear in newspapers as well as
the Employment News. Recruitment is done on the basis of a written test, which consists of (a) test of reasoning,
(b) quantitative aptitude, (c) general awareness, (d) English language and (e) descriptive test.
     The test is qualifying in nature and the marks obtained are not added in the final merit list. It is held on
Sundays. Except for the descriptive portion, all other sections contain objective-type questions. In the reasoning
test, there are verbal and non-verbal sections. In English, the test is aimed at judging the overall comprehension
and understanding of the language. The descriptive paper can be answered in English or Hindi. It judges the written
expression of the candidates.All sections must be qualified.

reserve Bank of india

sTAff offiCers’ GrADe-A exAminATion

Selection for this class I post is made on all-India basis by Reserve Bank of India Services Board, Hong Kong
Building, 6th Floor, M.G. Road, P.O. Box 10009, Hutatma Chow, Mumbai 400 001. Set up in July 1968, the Board
functions on the lines of the UPSC and conducts various examinations for recruitment of officers grade. There is
reservation of posts for SC/ST categories.
Age
21–26 years
Educational Qualifications
Bachelor’s/Master’sDegree(50%)orChartered/CostAccountantwithBachelor’sDegreeorDegreeinManagement.
examination
Subjects: Written test consists of
  (i) Paper I (Objective Type)—Test of reasoning, test of quantitative aptitude, test of English language, general awareness.
 (ii) Paper II (Descriptive Type)—English essay, precise writing/comprehension.
(iii) Paper III (Descriptive Type)—Economic and social problems. Those who qualify the written test are called for interview.

---PAGEBREAK---
xvi   Competitive Examinations: An Overview

Staff Officer Grade B Examination

Age
21–28 years (maximum 26 years for degree holders). Relaxable by 5 years for SC/ST and Ex-Servicemen, and by
3 years for OBC candidates.
Educational Qualifications
Min 60% marks (50% for SC/ST candidates) in bachelor’s degree as well as in 10th and 12th Standard.
Examination
Subjects: Written test consists of
 (i) Phase 1: Paper I (Objective Type)—Test of Reasoning, Quantitative Aptitude, General Awareness and English Language.
Phase 2: Paper I—English (writing skills); Paper II—Economic and Social Issues; Paper III (optional)—Finance
and Management/ Economics/ Statistics.
Note
Written test is followed by interview which carries 50 marks.

State Bank Group

Probationary Officers’ Examination

This examination is held by Central Recruitment Board (State Bank Group) Madhuli, Second Floor, H/2 Shiv Nagar
Estate, Dr. Annie Besant Road, Worli, Mumbai 400 018 for recruitment of Probationary Officers in State Bank of
India and its associates banks, namely, State Bank of Bikaner and Jaipur, State Bank of Hyderabad, State Bank
of Indore, State Bank of Mysore, State Bank of Patiala, State Bank of Saurashtra and State Bank of Travancore.
There is reservation of posts for SC/ST, Ex-Servicemen, OBC, etc.
Age
18–26 years, relaxable for SC/ST, OBC and Ex-Servicemen
Educational Qualifications
Degree
Examination
Subjects: Written test consists of
 (i) Paper I (Objective Type)—Test of Reasoning Ability, Quantitative Aptitude, English Comprehension, General Awareness.
(ii) Paper II (Descriptive Type)—Essay, letter writing or precise writing in English.

 Note
Those who qualify the written test are called for interview.

Clerical Cadre Examination (Regional Recruitment Board)

This examination is generally held annually to recruit the clerical cadre in State Bank of India and its associate
banks. There is resonation of posts for SC/ST, Ex-Servicemen and OBC, etc.
Age
18–26 years, relaxable for various categories as per rules.
Educational Qualifications
Degree

---PAGEBREAK---
                                                                              Competitive Examinations: An Overview xvii

Examination
Subjects: Written test consists of
 (i) Paper I—General Awareness, Reasoning Ability, English Language, Numerical Ability
(ii) Paper II—Essay writing, Letter writing, Precise writing

Nationalized Banks

In nationalized banks, the recruitment is made through competitive test held by Banking Service Recruitment Board.

Probationary Officers Examination

There are 15 Banking Service Recruitment Boards in the country. These Boards recruit probationary officers and
clerical cadre for the nationalised banks. There is reservation of posits for SC/ST, Ex-Servicemen, etc.
Age
21–28 years, relaxable for SC/ST, OBC and Ex-Servicemen

Educational Qualifications
Degree

Examination
Subjects: Written test consists of
 (i) Paper I (Objective Type)—Test of reasoning ability, quantitative aptitude, English comprehension, general awareness.
(ii) Paper II (Descriptive Type)—Essay (in English or regional language), letter writing or precise writing in English.

Clerical Cadre Examination

Age
18–26 years, relaxable for certain categories as per rules.
Educational Qualifications
For Clerks, Typists—Degree or 10 + 2 (50%) or diploma in banking (50%) or matriculation (60%).
For Stenographers—matriculation.
Relaxation in percentage of marks in qualifying examination for SC/ST, Ex-Servicemen and physically handicapped.
Examination
Subjects: Written examination (200 marks)
 (i) Paper I (Objective Type)—Reasoning Ability, English language, Numerical Ability, Clerical Aptitude
(ii) Paper II (Descriptive Type)—Three out of four questions of short essay or exposition type on a given proposition,
     situation to be answered in Hindi or English.
For the posts of typists and stenographers, proficiency in typing and shorthand with the following minimum speed
is required:
  (i) English typing speed 30 wpm
 (ii) English shorthand speed 80 wpm
(iii) Hindi typing speed 25 wpm
(iv) Hindi shorthand speed 60 wpm
Proficiency test for typist/stenographer is held if they qualify the written test. Those ranking high in the written
examination are called for an interview (100 marks). Final selection is on the basis of candidate’s performance in
written tests and interview taken together. Probationary period is six months.

---PAGEBREAK---
xviii Competitive Examinations: An Overview

National Bank for Agriculture and Rural Development (NABARD)

Development Officer Grade B Examination

Age
24–32 years, relaxable for certain categories as per rules

Educational Qualifications
Master’s Degree in economics/agricultural economics (50%), Ph.D is desirable

Examination
Subjects: Written test consists of
Preliminary examination (objective type): General Awareness, English Language, Quantitative Aptitude, Reasoning
Ability.
Main examination:
  (i) Paper I—General English and General Awareness
 (ii) Paper II—Economic and Social Problems
(iii) Paper III—Economics/Agricultural Economics

Assistant Development Officer Grade ‘A’ Examination

Age
21–26 years. Relaxable for certain categories as per rules.

Educational Qualifications
Bachelor’s Degree/Master’s Degree (50%)

Examination
Subjects: Written test consists of
Preliminary Examination (Objective Type)—General Awareness, English Language, Quantitative Aptitude, Reasoning Ability.
Main Examination:
 (i) Paper I—General English and General Awareness.
(ii) Paper II—Economic and Social Problems.

---PAGEBREAK---
                  CHAPT E R

                                 1                                                                                                  Numbers




Introduction                                                                                                                           The set of all natural numbers can be represented by
In Hindu Arabic System, we use ten symbols 0, 1, 2,                                                                                                 N = {1, 2, 3, 4, 5, ...}
3, 4, 5, 6, 7, 8, 9 called digits to represent any number.
This is the decimal system where we use the numbers                                                                                Whole Numbers
0 to 9. 0 is called insignificant digit whereas 1, 2, 3, 4,                                                                        If we include 0 among the natural numbers, then the
5, 6, 7, 8, 9 are called significant digits.                                                                                       numbers 0, 1, 2, 3, 4, 5, ... are called whole numbers.
     A group of figures, denoting a number is called a                                                                                 The set of whole numbers can be represented by
numeral. For a given numeral, we start from extreme right
as Unit’s place, Ten’s place, Hundred’s place and so on.                                                                                          W = {0, 1, 2, 3, 4, 5, ...}

Illustration 1: We represent the number 309872546                                                                                      Clearly, every natural number is a whole number
as shown below:                                                                                                                    but 0 is a whole number which is not a natural number.

                                                                                                                                   Integers
                                                           Ten Thousand 104




                                                                                                                                   All counting numbers and their negatives including zero
  Ten Crore 108




                                                                              Thousand 103
                               (million) 106




                                                                                             Hundred 102




                                                                                                                                   are known as integers.
                  Crores 107

                               Ten Lakhs


                                               Lakhs 105




                                                                                                                       Units 100
                                                                                                           Ten’s 101




                                                                                                                                       The set of integers can be represented by
                                                                                                                                       Z or I = {..., – 4, –3, –2, –1, 0, 1, 2, 3, 4, ...}
       3              0              9            8              7                 2             5            4           6
                                                                                                                                   Positive Integers
     We read it as
     ‘Thirty crores, ninety-eight lakhs, seventy-two                                                                               The set I + = {1, 2, 3, 4, ....} is the set of all positive
thousands five hundred and forty-six.’                                                                                             integers. Clearly, positive integers and natural numbers
                                                                                                                                   are synonyms.
     In this numeral:
     The place value of 6 is 6 × 1 = 6                                                                                             Negative Integers
     The place value of 4 is 4 × 10 = 40                                                                                           The set I – = {–1, –2, –3, ...} is the set of all negative
     The place value of 5 is 5 × 100 = 500                                                                                         integers. 0 is neither positive nor negative.
     The place value of 2 is 2 × 1000 = 2000 and so on.
     The face value of a digit in a number is the value                                                                            Non-negative Integers
itself wherever it may be.                                                                                                         The set {0, 1, 2, 3, ...} is the set of all non-negative
     Thus, the face value of 7 in the above numeral is 7.                                                                          integers.
The face value of 6 in the above numeral is 6 and so on.
                                                                                                                                   Rational Numbers
                                                                                                                                                           p
Number System                                                                                                                      The numbers of the form q , where p and q are integers
Natural Numbers                                                                                                                    and q ≠ 0, are known as rational numbers, e.g., 4 , 3 ,
Counting numbers 1, 2, 3, 4, 5, ... are known as natural                                                                             5 0     2                                     7 2
                                                                                                                                   - , , - , etc.
numbers.                                                                                                                             8 1     3

---PAGEBREAK---
 1.2   Chapter 1


     The set of all rational numbers is denoted by Q.           Note that the sum, difference or product of a rational
                           p                                and irrational number is irrational, e.g., 3 + 2 , 4 − 3 ,
     That is, Q = {x:x = ; p, q ∈ I, q ≠ 0}
                           q                                 2
                                                     a         - 5 , 4 3 , - 7 5 are all irrational.
     Since every natural number ‘a’ can be written as ,      5
                                                     1
every natural number is a rational number. Since 0 can      even numbers
               0                                            All those numbers which are exactly divisible by 2 are
be written as     and every non-zero integer ‘a’ can be
               1                                            called even numbers, e.g., 2, 6, 8, 10, etc., are even
            a                                               numbers.
written as , every integer is a rational number.
            1
     Every rational number has a peculiar characteristic
                                                            odd numbers
that when expressed in decimal form is expressible
either in terminating decimals or in non-terminating        All those numbers which are not exactly divisible by
repeating decimals.                                         2 are called odd numbers, e.g., 1, 3, 5, 7, etc., are odd
                  1       1           22                    numbers.
     For example, = 0.2, = 0.333...,     = 3.1428714287,
                  5       3           7
 8                                                          Prime numbers
    = 0.181818 ..., etc.
 44                                                         A natural number other than 1, is a prime number if it
    The recurring decimals have been given a short          is divisible by 1 and itself only.
notation as                                                      For example, each of the numbers 2, 3, 5, 7, etc.,
                                                            are prime numbers.
                        0.333... = 0. 3
                       4.1555... = 4.05                     composite numbers
                    0.323232... = 0.32                      Natural numbers greater than 1 which are not prime,
                                                            are known as composite numbers.
Irrational numbers                                               For example, each of the numbers 4, 6, 8, 9, 12,
                                                            etc., are composite numbers.
Those numbers which when expressed in decimal form
are neither terminating nor repeating decimals are known
                                                            Notes
as irrational numbers, e.g., 2 , 3 , 5 , π, etc.
                                                               1. The number 1 is neither a prime number nor a
                                         22 22                    composite number.
    Note that the exact value of π is not ⋅ is rational
                                          7 7                  2. 2 is the only even number which is prime.
                              22
while π is irrational number.     is approximate value of      3. Prime numbers up to 100 are:
                               7                                  2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43,
π. Similarly, 3.14 is not an exact value of it.                   47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, i.e.,
                                                                  25 prime numbers between 1 and 100.
                                                               4. Two numbers which have only 1 as the common
real numbers                                                      factor are called co-primes or relatively prime to
The rational and irrational numbers combined together              each other, e.g., 3 and 5 are co-primes.
                            13 2      3
to form real numbers, e.g.,   , , - , 3 , 4 + 2 , etc.
are real numbers.
                            21 5      7                         Note that the numbers which are relatively prime
     The set of all real numbers is denoted by R.           need not necessarily be prime numbers, e.g., 16 and
                                                            17 are relatively prime, although 16 is not a prime
                                                            number.

---PAGEBREAK---
                                                                                                         Numbers     1.3



                                                baSIc formulae

addItIon and SubtractIon                                      Solution: (a) 3893 × 99 = 389300 – 3893 = 385407
Addition and Subtraction is best illustrated with the help              (b) 4327 × 999 = 4327000 – 4327 = 4322673
of following example:                                                   (c) 5863 × 9999 = 58630000 – 5863 = 58624137
Illustration 1:   54321 – (9876 + 8967 + 7689) = ?            02    Multiplication of a given number by 11, 101,
Step 1   Add Ist column:                     54321                  1001, etc., that is, by 10n + 1.
               6 + 7 + 9 = 22                  9876            Method: Place n zeros to the right of the multiplicant
         To obtain 1 at unit’s place add 9     8967            and then add the multiplicant to the number so obtained.
         to make 31. In the answer, write      7689
                                                              Illustration 3: Multiply:
         9 at unit’s place and carry over 3. 2 7 7 8 9
                                                                    (a) 4782 × 11           (b) 9836 × 101
Step 2   Add 2nd column:                                            (c) 6538 × 1001
                  3 + 7 + 6 + 8 = 24                          Solution: (a) 4782 × 11 = 47820 + 4782 = 52602
          To obtain 2 at ten’s place, add 8 to make 32.                  (b) 9836 × 101 = 983600 + 9836 = 993436
          In the answer, write 8 at ten’s place and carry                (c) 6538 × 1001 = 6538000 + 6538 = 6544538
          over 3.
                                                              03    Multiplication of a given number by 15, 25, 35,
Step 3   Add 3rd column:                                            etc.
                  3 + 8 + 9 + 6 = 26                           Method: Double the multiplier and then multiply the
         To obtain 3 at hundred’s place, add 7 to make         multiplicant by this new number and finally divide the
         33. In the answer, write 7 at hundred’s place         product by 2.
         and carry over 3.
                                                              Illustrations 4: Multiply:
Step 4   Add 4th column:
                                                                    (a) 7054 × 15             (b) 3897 × 25
                  3 + 9 + 8 + 7 = 27
                                                                    (c) 4563 × 35
         To obtain 4 at thousand’s place, add 7 to make
         34. In the answer, write 7 at thousand’s place                                      1
                                                              Solution: (a) 7054 × 15 =        (7054 × 30)
         and carry over 3.                                                                   2
Step 5  5th column:                                                                      1
                                                                                         = (211620) = 105810
        To obtain 5 at ten-thousand’s place add 2 to                                     2
        it to make 5. In the answer, write 2 at the                                     1               1
                                                                        (b) 3897 × 25 = (3897 × 50) = (194850)
        ten-thousand’s place.                                                           2               2
      ∴ 54321 – (9876 + 8967 + 7689)                                                  = 97425
        = 27789.                                                                        1               1
                                                                        (c) 4536 × 35 = (4563 × 70) = (319410)
                                                                                        2               2
multIPlIcatIon                                                                        = 159705

                                                              04    Multiplication of a given number by 5, 25, 125,
 01    Multiplication of a given number by 9, 99, 999,
                                                                    625, etc., that is, by a number which is some power
       etc., that is by 10n – 1
                                                                    of 5.
 Method: Put as many zeros to the right of the
                                                               Method: Place as many zeros to the right of the
 multiplicant as there are nines in the multiplier and from
                                                               multiplicant as is the power of 5 in the multiplier, then
 the result subtract the multiplicant and get the answer.
                                                               divide the number so obtained by 2 raised to the same
                                                               power as is the power of 5.
                                                              Illustration 5: Multiply:
Illustration 2: Multiply:
                                                                    (a) 3982 × 5              (b) 4739 × 25
      (a) 3893 by 99            (b) 4327 by 999
                                                                    (c) 7894 × 125            (d) 4863 × 625
      (c) 5863 by 9999

---PAGEBREAK---
```

## root-elementary-algebra-text — Elementary-Algebra_text.pdf (identify)
- Drive file id: `13p83Jss_D7bSgAXh1juKHKI69oKpBxWL`- Method: pdftotext (digital text layer)- Maps to: IDENTIFIED: Hall & Knight, Elementary Algebra for Schools — the AL book's banked classic (hall-knight-elementary-algebra key)- Shelf book: `elementary-algebra`
```text
[front-matter page 2: not contents — omitted]

[front-matter page 3: not contents — omitted]

[front-matter page 4: not contents — omitted]

[front-matter page 5: not contents — omitted]

[front-matter page 6: not contents — omitted]

[front-matter page 7: not contents — omitted]

vm                        CONTENTS
      (nup.                                                   PAOB
     XXIL     Miscbllaxious FkACTI05S                          170

              Miscellankous Exabtfles IV                       181

  XXIII.      Harder Equations           ....                  188

     XXIV.    Harder Problems                         -       202
     XXV. Quadratic Equations            ....         -       208

     XXVI.    Simultaneous Quadratic Equations   -    -       220

  xxvn. Problems liadino to Quadratic Equations               227

 XXVIII.      Harder Factors     .   '   -                    283

     XXIX.    Miscellaneous Theorems and Examples             240

     XXX. The Teeobt of Indices                               258

     XXXI.    Elementary Surds           ....                 271

 xxxn.        Ratio, Proportion, and Variation                288

 xxxni. ARITHMEnCAL PbOOKESSION              -                307

 XXXIV. Geometrical Progression                               314

  XXXV. Habmonical Proores^on                             '
                                                              321

        Miscellaneous Examples V             -                329

 XXXVI. Theory or Quadratic Equations.                        333

XXXVTI.       Permutations and Combinations -                 343

XXXVIII.      Binomial Theorem                                355

 XXXIX. Logarithms                                            368

       XL.    Scales or Notation         ....                 383

      XLI.    Exponential and Logarithmic Series -            389

     XLH. Miscellaneous Equations            •                395

     XLHI.    Interest and Annuities                          401

     XUV.     Graphical Representation or Functions           405

              Miscellaneous Examples VI               .       466

[front-matter page 9: not contents — omitted]

[front-matter page 10: not contents — omitted]

[front-matter page 11: not contents — omitted]

[front-matter page 12: not contents — omitted]

[front-matter page 13: not contents — omitted]

[front-matter page 14: not contents — omitted]

[front-matter page 15: not contents — omitted]

[front-matter page 16: not contents — omitted]

[front-matter page 17: not contents — omitted]

[front-matter page 18: not contents — omitted]

[front-matter page 19: not contents — omitted]
```


# The exam/exercise typology census
What the reference books actually drill — the typology the shelf's planned books mirror in their graded exercise levels (L1–L6) and "exam-style" labelling discipline (MASTER_PLAN §5: exam-style items labelled honestly; real past-paper items only when verified).
- **module**: Concept Application Exercise (inline, per topic) — the Cengage drill; end-of-chapter Exercises: Single Correct Answer Type, Multiple Correct Answers Type, Linked Comprehension Type, Matrix Match Type, Numerical Value Type; Archives (past-year JEE Main + JEE Advanced questions); Answers Key; per-chapter Hints and Solutions sections.
- **loney**: Classic exercise arc: graduated Examples with solutions, Miscellaneous Examples, five-figure tables (the 1918 edition note).
- **kreyszig**: Problem Sets per section; Chapter Review Questions and Problems; the applied-engineering problem style (GATE-scope cousin).
- **burden**: University-course problem style: regular exercises, applied exercises, and computational projects (the GATE numerical-methods cousin).

## Competitive-scope notes (web-checked 2026-11-10)

- **JEE Main 2026 syllabus (7 units, fetched this pass)**: sets/relations/
  functions; algebra (complex numbers + quadratics, matrices and
  determinants, P&C, binomial, sequences and series); calculus (limits/
  continuity/differentiability, integral calculus, differential
  equations); coordinate geometry (straight lines and conics); 3D and
  vectors; statistics and probability; trigonometry. **Removed in the
  2024 revision** (verified, correcting run 89's record in the AA
  header): mathematical induction, mathematical reasoning, linear
  programming, heights and distances.
- **NCERT school canon**: class 9 rationalized (12 chapters — Euclid,
  lines and angles, triangles, quadrilaterals, circles, Heron, solids);
  class 10 rationalized (14 chapters — constructions dropped); class 11
  rationalized (14 chapters — PMI and mathematical reasoning dropped);
  class 12 rationalized (13 chapters incl. LPP, vectors, 3D). The NEP
  transition books (class 9 'Ganita Manjari' 2025-26 roll-out) are
  noted in the Geometry book's research notes as the live curriculum
  change to watch.
- **University/competitive poles**: GATE (engineering mathematics:
  linear algebra, calculus, ODEs/PDEs, complex methods, probability,
  numerical methods, OR) and IIT-JAM (real analysis, linear algebra,
  abstract algebra, complex analysis) own the L5 scope of the deeper
  books; the olympiad ladder (RMO/IMO) owns the L6 craft chapters.
- **Aptitude side (Khattar QA 4e, TOC extracted)**: 40 chapters from
  Numbers through Data Interpretation/Sufficiency — the SSC/banking/
  CAT-style census the aptitude-relevant shelf chapters cross-reference
  (Geometry mensuration, Number Theory speed work, Heights and
  Distances, Statistics DI).


# Web-research findings (the no-Drive subjects)
The Drive carries no dedicated reference for: Geometry (classical), Number Theory, Set Theory (axiomatic), Mathematical Logic (beyond the module's chapter), Combinatorics (beyond the AA bank), Abstract Algebra, Topology, Complex Analysis (beyond Kreyszig), Numerical Analysis (beyond Kreyszig), Optimization/OR, and the Foundations capstone. Those books' research phases ran on web-checked classic arcs:
- **Munkres, Topology 2e**: Part I General Topology (Set Theory and Logic; Topological Spaces and Continuous Functions; Connectedness and Compactness; Countability and Separation Axioms; Tychonoff; Metrization and Paracompactness; Complete Metric Spaces and Function Spaces), Part II Algebraic Topology (Fundamental Group; Separation of the Plane; Seifert-van Kampen; Classification of Surfaces and Covering Spaces).
- **Gallian, Contemporary Abstract Algebra**: Part 1 Integers and Equivalence Relations (ch. 0 Preliminaries), the group arc (Introduction to Groups → Fundamental Theorem of Finite Abelian Groups), the ring arc (Introduction to Rings → Divisibility in Integral Domains), the fields/extensions arc (Vector Spaces, Extension Fields, Finite Fields, Sylow and beyond).
- **Burton, Elementary Number Theory 7e**: Preliminaries (incl. mathematical induction, pigeonhole); Divisibility Theory in the Integers; Primes and Their Distribution; Theory of Congruences; Fermat's Theorem; Number-Theoretic Functions; Euler's Generalization; Primitive Roots and Indices; Quadratic Reciprocity; Perfect Numbers; Fibonacci Numbers; continued fractions and applications/cryptography in the later chapters.
- **Churchill and Brown, Complex Variables and Applications**: Complex Numbers; Analytic Functions; Elementary Functions; Integrals; Series; Residues and Poles; Applications of Residues; Conformal Mapping (the 9th-edition chapter list verified).
- **Burden, Faires and Burden, Numerical Analysis 10e**: Mathematical Preliminaries and Error Analysis; Solutions of Equations in One Variable; Interpolation and Polynomial Approximation; Numerical Differentiation and Integration; Initial-Value Problems for ODEs; Direct Methods for Linear Systems; Iterative Techniques in Matrix Algebra; Approximation Theory; Approximating Eigenvalues; nonlinear systems, BVPs and PDEs.
- **Hillier and Lieberman, Introduction to Operations Research**: the standard arc: introduction and the OR modeling approach; linear programming and the simplex method with its theory; duality and sensitivity; transportation and assignment; network optimization; dynamic programming; integer and nonlinear programming; metaheuristics; the probabilistic models (queueing, inventory, Markov decision processes, simulation).
- **Halmos, Naive Set Theory**: the 25-section arc from the axioms of extension and specification through unions/intersections, complements and powers, ordered pairs, relations, functions, families, numbers, the axiom of choice, Zorn's lemma, well ordering, transfinite recursion, ordinal numbers, cardinal numbers, Schroeder-Bernstein.
- **OpenStax (open cross-checks)**: Precalculus 2e (ch. 5-8 trigonometry arc, ch. 10 analytic geometry), Introductory Statistics (ch. 1-13: sampling → descriptive → probability → distributions → CLT → confidence → hypothesis testing → chi-square → regression → ANOVA), Calculus volumes 1-3 (the open sequencing poles).
- **Verified history facts used in the plans**: Gödel completeness (1929/30) and incompleteness (1931); Turing machines (1936, Entscheidungsproblem); Gosset/Student t (1908); Abel and Galois (the quintic, dated); Zhang bounded gaps (2013); the Clay Millennium status (Riemann, P vs NP, Navier-Stokes all open); non-Euclidean geometry (Gauss, Lobachevsky, Bólyai); Hilbert's Grundlagen (1899); Loney's edition history (1893-1918, read off the scanned front matter this pass).


# Coverage census

- 53/53 sources extracted (53 transcriptions above).
- 23 shelf books planned from this evidence base
  (`src/data/library/books/mathematics/*/book.ts`, status 'planned').
- Every planned chapter carries its source mapping in its book.ts header
  (Drive module chapter → book chapter, or web-researched classic arc).
- Authoring cadence unchanged: one book at a time (Advanced Algebra opens
  first); per-unit reference downloads follow at authoring time from the
  Drive ids recorded here.

## Topic coverage audit — the guarantee pass (2026-11-10)

> The owner's follow-up directive, verbatim intent: "make sure that all the
> topics or TOC of research drive survey must be included in their
> respective books maths of library, make sure to arrange them accordingly
> and add extra researched topics also if you want or download popular
> books and use there detailed toc if needed and make sure these books are
> able to cover all the top exams of the world to maximum level so include
> everything possible from basic engineering, to competitive exams of the
> world."

**The gate:** `scripts/verify_topic_coverage.ts` parses THIS file's 53
transcribed TOCs, routes every topic line to the shelf book that owns it
(module sources via the survey's own Shelf-book mapping — which already
resolves the cross-references; the cross-shelf classics and the Khattar
census via explicit per-topic routing tables INSIDE the script — that
routing table is the "arrange them accordingly" artifact), then
token-matches each topic against its book's plan blob (titles +
summaries + plannedLessons; for the complete books, lesson/heading/
glossary strings too). **Result: 1,876 topic entries audited — 1,558
covered in the routed book, 318 covered in a neighbouring book (reviewed
cross-references, exactly what the no-duplication contract predicts),
0 topics missing from the entire shelf.** The same run re-checks the
EXAM_REGISTRY (section I): every researched exam maps to real books.

**What the first audit run found (128 hard gaps) and what was fixed:**

1. **A whole family had no home.** The Khattar census's commercial
   arithmetic (profit and loss, discounts, simple and compound interest,
   stocks/shares/debentures, partnership, alligation, problems on ages,
   time and work, pipes and cisterns, time-speed-distance with trains,
   boats and streams, races, clocks and calendars, number series, data
   sufficiency) — FM/ANS cover school arithmetic, the theory books own
   the concepts, but NO book owned the exam-craft family. **Book #28
   'Quantitative Aptitude' was created** (11 chapters / 39 planned
   lessons, `qa-` prefix reserved) with the no-duplication contract
   written into its header (cross-references FM/ANS/AA/Geometry/
   Statistics/Logic; DI stays with Statistics; mensuration theory stays
   with Geometry). This is also the world-exam move: the book is the
   quantitative register of CAT/SSC CGL/IBPS/SBI/RBI/CDS/CSAT/CA
   Foundation and the SAT/GRE/GMAT word-problem family — see
   docs/project/EXAM_REGISTRY.json.
2. **Genuine topic gaps in existing plans, named and placed** (summary
   enrichments + new planned lessons, plans only — zero lesson
   authoring): AA ch. 1 piecewise functions and the stretch/squeeze
   transformations; ch. 3 De Moivre and the nth roots of unity; ch. 5
   sigma notation; ch. 6 circular permutations, group distributions,
   nCr properties; ch. 7 the frequently used expansions; ch. 9 the
   log-tables family (characteristic, mantissa, antilogarithm — a 4th
   planned lesson; the book now 36 planned). Trigonometry ch. 5 the
   sec/cosec/cot principal values; ch. 6 the centres named with their
   radii (circumcentre R, incentre r, exradii, centroid and medians)
   and a 6th planned lesson 'Quadrilaterals and Regular Polygons'
   (Loney ch. XVI; 31 planned); ch. 7 the dip of the horizon. Coordinate
   Geometry ch. 1 internal/external division, ch. 4 the secant, ch. 10
   linearly dependent vectors, ch. 11 the scalar product's geometrical
   interpretation, ch. 12 the regular tetrahedron. Differential Calculus
   (continuity of the canonical functions, the differentiability
   definition, global/absolute extrema, linearization, the tangent-and-
   velocity problems, graphing with calculus and technology). Integral
   Calculus (tan/cot/sec/cosec antiderivatives, the transcendental
   census, strategy and tables, curves intersecting at two points,
   economics/biology applications). Differential Equations gained a
   genuine chapter — **ch. 6 'Systems, the Phase Plane and the Nonlinear
   World'** (Kreyszig's systems arc: X' = AX, critical points and
   stability, qualitative methods, predator-prey; the book now 7 ch /
   26 planned) plus isogonal trajectories, the nonhomogeneous spine,
   Dirac's delta. Linear Algebra absorbed the Axler arc in its
   summaries (fields, direct sums, injectivity/surjectivity, isomorphisms,
   diagonalizable operators, Gershgorin, the spectral theorem, positive
   operators, isometries/unitary, polar decomposition, generalized
   eigenvectors and the Jordan form, the trace, bilinear and alternating
   forms, the tensor product, norms, orthogonal complements, the
   pseudoinverse, SVD/PCA, PageRank and Markov-chain classification,
   hyperplanes and polytopes, image-processing/statistics/computer-
   graphics/engineering applications). Multivariable Calculus (motion in
   space, tangential/normal acceleration components, polar-coordinate
   kinematics, economics/biology). Real Analysis (summation by parts,
   rectifiable curves, measurable functions, partitions of unity, the
   contraction principle). Mathematical Methods (differential operators,
   critical-point stability, the Fourier cosine/sine transforms, Laplace
   in cylindrical and spherical coordinates, the Laplacian in polar
   coordinates with the circular membrane and Fourier-Bessel series).
   Combinatorics (binomial coefficients and identities), Discrete
   Mathematics (planar graphs, graph coloring, representing relations),
   Probability (the types of events), Mathematical Logic (nested
   quantifiers).
3. **The routing/noise/alias layer** (in the gate script, auditable):
   publisher furniture filtered (Illustration lines, exercise typology,
   Summary/Appendix/Bibliography, wrapped remainders); ligature decoding
   (Rosen's 'Coe\ufb03cients'); Loney's roman numerals and Axler's
   section labels stripped; genuine synonyms aliased (antilogarithm,
   arithmetical/geometrical/harmonical, nullspace, L'Hospital...); the
   Khattar and Hall-&-Knight-Elementary chapters carried as curated
   ledgers (the H&K contents page is OCR-noisy — 'The Teeobt of
   Indices' — so its ledger is hand-curated clean from the canonical
   TOC fragment the survey captured).

**The exam guarantee:** EXAM_REGISTRY.json researched and filled this
pass — 56 examinations (22 Indian + 34 international), 30 researched
with mathUnits + per-exam coverage maps (the source links recorded per
entry: jeeadv.ac.in, gate2026.iitg.ac.in, jam.iitkgp.ac.in,
cuet.nta.nic.in, ets.org, mba.com, satsuite.collegeboard.org, act.org,
ibo.org, Pearson/Cambridge specs, maths.ox.ac.uk, the TMUA spec PDF,
jasso.go.jp, ncees.org FE specs, icai.org, cemc.uwaterloo.ca, MAA
competition pages); non-mathematics exams honestly marked not-
applicable; adjacent scope marked with notes. The book-wise rollup
(coverageMaps in the registry) reads as "which exams each shelf book
serves". The registry is machine-checked by the same gate.

**The coverage numbers after the pass:** shelf 28 books — 3 complete,
AA authoring-ready (36 planned), 24 planned (the full-shelf pass's 23 +
Quantitative Aptitude; 206 chapters / 710 planned lessons across the 25
planned books). Zero lessons written; the authoring cadence and the
run-90 opening (AA 1.1 + 1.2) are unchanged.
