#!/usr/bin/env python3
"""
gen_fold_ledger.py — builds docs/project/TOC_FOLD_LEDGER.json from the
curated fold table (2026-11-11, the TOC-as-lessons pass).

Every entry: (source, topic, book, host, mode). The topic strings are
validated EXACTLY against the survey extraction (/tmp/survey_topics.json,
dumped from scripts/lib/survey_topics.ts) — a typo fails loudly.

Fold modes + minimum treatments are defined by docs/project/TOC_LESSON_GUIDE.md.
Notes are generated per mode and name the host lesson + the exact bar.
"""
import json, sys
sys.stdout.reconfigure(encoding='utf-8', errors='replace')

TOPICS = json.load(open('/tmp/survey_topics.json'))
INDEX = {(t['source'], t['book'], t['topic']) for t in TOPICS}

AA = 'advanced-algebra'
TRIG = 'trigonometry'
ST = 'set-theory'
PR = 'probability-theory'
ML = 'mathematical-logic'
STAT = 'statistics'
LA = 'linear-algebra'
CG = 'coordinate-geometry'
DE = 'differential-equations'
DC = 'differential-calculus'
IC = 'integral-calculus'
NA = 'numerical-analysis'
MC = 'multivariable-calculus'
RA = 'real-analysis'
MME = 'mathematical-methods-for-engineering'
CA = 'complex-analysis'
DM = 'discrete-mathematics'
NT = 'number-theory'
CO = 'combinatorics'
OR = 'optimization-and-operations-research'
QA = 'quantitative-aptitude'
EL = 'elementary-algebra'
ANS = 'arithmetic-and-number-systems'

F = []  # (source, topic, book, host, mode)

# ===================== ADVANCED ALGEBRA (78) =====================
F += [
 ('m1-01', 'Logarithm and Its Properties', AA, 'The Laws of Logarithms and the Change of Base', 'section'),
 ('m1-01', 'Reciprocal of Logarithm', AA, 'The Laws of Logarithms and the Change of Base', 'example-family'),
 ('m1-01', 'To Find Antilog of a Number', AA, 'Logarithm Tables: Characteristic, Mantissa and Antilogarithm', 'example-family'),
 ('m2-02', 'Real Polynomial', AA, 'How Many Roots: Degree n, n Roots', 'glossary'),
 ('m2-02', 'Complex Polynomial', AA, 'How Many Roots: Degree n, n Roots', 'glossary'),
 ('m2-02', 'Graphical Interpretation of Zero of an Expression', AA, 'Quadratic Inequalities and the Sign Diagram', 'section'),
 ('m2-02', 'Domain of Equation', AA, 'Quadratic Inequalities and the Sign Diagram', 'section'),
 ('m2-02', 'Loss of Root', AA, 'Transformation of Equations', 'derivation-annex'),
 ('m2-02', 'Condition for Both Common Roots', AA, 'Symmetric Reads and Common Roots', 'example-family'),
 ('m2-02', 'Repeated Roots', AA, 'Symmetric Reads and Common Roots', 'section'),
 ('m2-03', 'Complex Numbers', AA, 'The Closure Failure That Forces i', 'chapter-umbrella'),
 ('m2-03', 'Imaginary Number', AA, 'The Closure Failure That Forces i', 'glossary'),
 ('m2-03', 'Complex Number', AA, 'The Closure Failure That Forces i', 'chapter-umbrella'),
 ('m2-03', 'Algebraic Operations on Complex Numbers', AA, 'The Closure Failure That Forces i', 'section'),
 ('m2-03', 'Section Formula in Complex Numbers', AA, 'The Argand Plane: Polar Form and the Argument', 'example-family'),
 ('m2-03', 'Equality of Complex Numbers', AA, 'The Closure Failure That Forces i', 'glossary'),
 ('m2-03', 'Square Root of Complex Number', AA, 'De Moivre, Roots of Unity and the Complex Loci', 'example-family'),
 ('m2-03', 'Properties of Cube Roots of Unity', AA, 'De Moivre, Roots of Unity and the Complex Loci', 'section'),
 ('m2-03', 'Angle between Two Rays', AA, 'The Argand Plane: Polar Form and the Argument', 'section'),
 ('m2-03', 'Equation of Ray', AA, 'The Argand Plane: Polar Form and the Argument', 'section'),
 ('m2-03', 'Condition for Three Points to Represent Equilateral Triangle', AA, 'De Moivre, Roots of Unity and the Complex Loci', 'example-family'),
 ('m2-03', 'Equation of Circle whose Diametric End Points are Given', AA, 'De Moivre, Roots of Unity and the Complex Loci', 'example-family'),
 ('m2-03', 'Properties of nth Roots of Unity', AA, 'De Moivre, Roots of Unity and the Complex Loci', 'section'),
 ('m2-05', 'Sum of Arithmetic Means Inserted between Two Numbers', AA, 'Arithmetic Progressions: the Constant Climb', 'example-family'),
 ('m2-05', 'Increasing and Decreasing G.P.', AA, 'Geometric Progressions and the Infinite Tail', 'example-family'),
 ('m2-05', 'Sum of Squares of First n Natural Numbers', AA, 'Sigma Notation and the Classical Power Sums', 'section'),
 ('m2-05', 'Sum of Cubes of First n Natural Numbers', AA, 'Sigma Notation and the Classical Power Sums', 'section'),
 ('m2-05', 'Sigma Notation for Independent Variables', AA, 'Sigma Notation and the Classical Power Sums', 'section'),
 ('m2-05', 'Sigma Notation for Dependent Variables', AA, 'Sigma Notation and the Classical Power Sums', 'section'),
 ('m2-06', 'Weighted Means', AA, 'The Arithmetic-Geometric Mean Inequality', 'example-family'),
 ('m2-07', 'Exponent of Prime in n!', AA, 'Factorials and the Counting Toolkit', 'section'),
 ('m2-07', 'Permutation when all Objects are Not Distinct', AA, 'Permutations: the Arrangement Count', 'section'),
 ('m2-07', 'Permutation Under Restriction', AA, 'Circular and Restricted Permutations', 'section'),
 ('m2-07', 'Properties of nCr', AA, 'Factorials and the Counting Toolkit', 'section'),
 ('m2-07', 'Clockwise and Anticlockwise Arrangements', AA, 'Circular and Restricted Permutations', 'section'),
 ('m2-07', 'Selection of Zero or More Objects from n Different Objects', AA, 'Combinations: the Selection Count', 'example-family'),
 ('m2-07', 'Selection of at Least One Object from n Different Objects', AA, 'Combinations: the Selection Count', 'example-family'),
 ('m2-07', 'Selection from Identical Objects', AA, 'Distributions and the Classic Counting Puzzles', 'section'),
 ('m2-07', 'Division and Distribution of Distinct Objects', AA, 'Distributions and the Classic Counting Puzzles', 'section'),
 ('m2-07', 'Division and Distribution of (m + n) Distinct Objects into Two Groups of Sizes m and n (m \u2260 n)', AA, 'Distributions and the Classic Counting Puzzles', 'example-family'),
 ('m2-07', 'Division and Distribution of (m + n + p) Distinct Objects into Three Groups of Sizes m, n and p (m \u2260 n \u2260 p)', AA, 'Distributions and the Classic Counting Puzzles', 'example-family'),
 ('m2-07', 'Division and Distribution of Distinct Objects into Groups of Equal Size', AA, 'Distributions and the Classic Counting Puzzles', 'example-family'),
 ('m2-07', 'Distribution of Distinct Objects when Group Sizes are not Fixed', AA, 'Distributions and the Classic Counting Puzzles', 'example-family'),
 ('m2-07', 'Distribution of Identical Objects', AA, 'Distributions and the Classic Counting Puzzles', 'section'),
 ('m2-07', 'Distribution of Identical Objects when Empty Groups are not Allowed', AA, 'Distributions and the Classic Counting Puzzles', 'example-family'),
 ('m2-07', 'Distribution of Identical Objects when Empty Groups are Allowed', AA, 'Distributions and the Classic Counting Puzzles', 'example-family'),
 ('m2-07', 'Number of Integral Solutions Using Series (Multinomial Theorem)', AA, 'Distributions and the Classic Counting Puzzles', 'section'),
 ('m2-07', 'Distribution of Distinct Objects if Empty Groups are not Allowed', AA, 'Distributions and the Classic Counting Puzzles', 'example-family'),
 ('m2-08', 'Binomial Expansion', AA, 'The Binomial Theorem, Proved', 'section'),
 ('m2-08', "Pascal's Triangle", AA, 'The Binomial Theorem, Proved', 'section'),
 ('m2-08', 'Some Standard Expansions', AA, 'Binomial Coefficients at Work', 'example-family'),
 ('m2-08', 'Conjugate Expansions', AA, 'Binomial Coefficients at Work', 'example-family'),
 ('m2-08', 'Binomial Expansions Using Complex Numbers', AA, 'Binomial Coefficients at Work', 'example-family'),
 ('m2-08', 'Middle Terms', AA, 'The Binomial Theorem, Proved', 'section'),
 ('m2-08', 'Multinomial Expansion', AA, 'Binomial Coefficients at Work', 'glossary'),
 ('m2-08', 'Coefficients of Terms in Binomial Expansion', AA, 'Binomial Coefficients at Work', 'section'),
 ('m2-08', 'Sum of Coefficients in any Expansion', AA, 'Binomial Coefficients at Work', 'example-family'),
 ('m2-08', 'Ratio of Consecutive Coefficients/Terms in Binomial Expansion', AA, 'Binomial Coefficients at Work', 'example-family'),
 ('m2-08', 'Greatest Coefficient/Term in Binomial Expansion', AA, 'Binomial Coefficients at Work', 'example-family'),
 ('m2-08', 'Series Resulting from Product of Two Expansions', AA, 'Binomial Coefficients at Work', 'example-family'),
 ('m2-08', 'Some Frequently Used Expansions', AA, 'Binomial Coefficients at Work', 'example-family'),
 ('m4-01', 'Real Number System and Inequalities', AA, 'The Arithmetic-Geometric Mean Inequality', 'review-page'),
 ('m4-01', 'Domain of Relation', AA, 'Relations: the Set-of-Pairs View', 'glossary'),
 ('m4-01', 'Domain, Codomain and Range of Function', AA, 'One-One and Onto: Classifying the Machines', 'glossary'),
 ('m4-01', 'Function as a Relation between Independent and Dependent Variables', AA, 'Relations: the Set-of-Pairs View', 'glossary'),
 ('m4-01', 'Identical Functions', AA, 'The Function Zoo: Modulus, Signum, GIF and the Elementary Catalog', 'glossary'),
 ('m4-01', 'Piecewise Functions', AA, 'The Function Zoo: Modulus, Signum, GIF and the Elementary Catalog', 'section'),
 ('m4-01', 'Some More Functions', AA, 'The Function Zoo: Modulus, Signum, GIF and the Elementary Catalog', 'example-family'),
 ('m4-01', 'Period of Functions Resulting from Algebraic Operations of Functions', AA, 'The Period Census: Periods of Transformed and Composite Functions', 'section'),
 ('m4-01', 'Injective and Surjective Nature of Composite Function', AA, 'One-One and Onto: Classifying the Machines', 'section'),
 ('m4-01', 'Vertical Shift', AA, 'Graph Transformations: Shifts, Stretches, Flips and the GIF Graph', 'section'),
 ('m4-01', 'Horizontal Shift', AA, 'Graph Transformations: Shifts, Stretches, Flips and the GIF Graph', 'section'),
 ('m4-01', 'Horizontal Stretch or Squeeze', AA, 'Graph Transformations: Shifts, Stretches, Flips and the GIF Graph', 'section'),
 ('m4-01', 'Vertical Stretch or Squeeze', AA, 'Graph Transformations: Shifts, Stretches, Flips and the GIF Graph', 'section'),
 ('m4-01', 'Vertical and Horizontal Flip', AA, 'Graph Transformations: Shifts, Stretches, Flips and the GIF Graph', 'section'),
 ('m4-01', 'The Graph of y = [f(x)] from the Known Graph of y = f(x), where [.] Represents the Greatest Integer Function', AA, 'Graph Transformations: Shifts, Stretches, Flips and the GIF Graph', 'section'),
 ('root-thomas-calculus-14e', 'Combining Functions; Shifting and Scaling Graphs', AA, 'Graph Transformations: Shifts, Stretches, Flips and the GIF Graph', 'section'),
 ('root-thomas-calculus-14e', 'Natural Logarithms', AA, 'Logarithms: the Inverse Machine', 'section'),
 ('root-stewart-et-metric', 'Four Ways to Represent a Function', AA, 'The Function Zoo: Modulus, Signum, GIF and the Elementary Catalog', 'section'),
]

# ===================== TRIGONOMETRY (39) =====================
F += [
 ('m1-02', 'Trigonometric Identities', TRIG, 'Compound Angles: the Sum and Difference Formulas', 'section'),
 ('m1-02', 'Degree Measurement', TRIG, 'Radian Measure and the Arc', 'glossary'),
 ('m1-02', 'Conversion between Radians and Degrees', TRIG, 'Radian Measure and the Arc', 'section'),
 ('m1-02', 'Relation between Radians and Real Numbers', TRIG, 'Radian Measure and the Arc', 'section'),
 ('m1-02', 'n \u00d7 90\u00b0 \u00b1 \u03b8 when n is Even', TRIG, 'Allied Angles: the n \u00d7 90\u00b0 \u00b1 \u03b8 Machine', 'section'),
 ('m1-03', 'Some More Results', TRIG, 'Conditional Identities and Range Hunting', 'example-family'),
 ('m1-03', 'Some Important Results and Their Applications', TRIG, 'Conditional Identities and Range Hunting', 'example-family'),
 ('m1-03', 'Finding Range of Expression Using Trigonometric Substitution', TRIG, 'Conditional Identities and Range Hunting', 'section'),
 ('m1-04', 'Trigonometric Equation sin x = sin \u03b1 .', TRIG, 'General Solutions: the sin/cos/tan Families', 'example-family'),
 ('m1-04', 'Trigonometric Equation cos x = cos \u03b1', TRIG, 'General Solutions: the sin/cos/tan Families', 'example-family'),
 ('m1-04', 'Trigonometric Equation tan x = tan \u03b1', TRIG, 'General Solutions: the sin/cos/tan Families', 'example-family'),
 ('m1-04', 'Trigonometric Equation a cos x + b sin x = c', TRIG, 'a cos x + b sin x: the Shifted Wave', 'example-family'),
 ('m1-04', 'Using Maximum/Minimum Value of Function', TRIG, 'Max\u2013Min, Graphical and Inequality Methods', 'section'),
 ('m1-05', 'Two Sides and an Angle not Included between Them (SSA)', TRIG, 'Solutions of Triangles: the Six Cases', 'example-family'),
 ('m1-05', 'Three Angles (AAA)', TRIG, 'Solutions of Triangles: the Six Cases', 'example-family'),
 ('m1-05', 'Circumcircle and Circumcentre', TRIG, 'Centres and Circles of a Triangle', 'section'),
 ('m1-05', 'Properties of Circumcircle and Circumcentre', TRIG, 'Centres and Circles of a Triangle', 'section'),
 ('m1-05', 'Incircle and Incentre', TRIG, 'Centres and Circles of a Triangle', 'section'),
 ('m1-05', 'Length of Tangent from Vertices to the Incircle', TRIG, 'Centres and Circles of a Triangle', 'example-family'),
 ('m1-05', 'Distance of Incentre from the Vertices of Triangle', TRIG, 'Centres and Circles of a Triangle', 'section'),
 ('m1-05', 'Different Formulas for Inradius', TRIG, 'Half-Angle Formulas and the Area of a Triangle', 'example-family'),
 ('m1-05', 'Division of Opposite Side by the Internal Angle Bisector', TRIG, 'Half-Angle Formulas and the Area of a Triangle', 'derivation-annex'),
 ('m1-05', 'Distance of Orthocentre from Vertices and Sides', TRIG, 'The Orthocentre, Centroid and the Pedal Triangle', 'section'),
 ('m1-05', 'Distance between Incentre and Excentre', TRIG, 'The Excircles: Excentres, Exradii and Their Distances', 'section'),
 ('m1-05', 'Radii of the Inscribed and the Circumscribed', TRIG, 'Centres and Circles of a Triangle', 'derivation-annex'),
 ('m1-06', 'Height and Distance', TRIG, 'Elevation, Depression and the Right Setup', 'chapter-umbrella'),
 ('m1-07', 'Principal Value of cot^{-1}(cot x)', TRIG, 'The Principal-Value Discipline: f\u207b\u00b9(f(x)) and f(f\u207b\u00b9(x))', 'example-family'),
 ('m1-07', 'Principal Value of cosec^{-1}(cosec x)', TRIG, 'The Principal-Value Discipline: f\u207b\u00b9(f(x)) and f(f\u207b\u00b9(x))', 'example-family'),
 ('m1-07', 'Principal Value of sec^{-1}(sec x)', TRIG, 'The Principal-Value Discipline: f\u207b\u00b9(f(x)) and f(f\u207b\u00b9(x))', 'example-family'),
 ('m1-07', 'Simplifying Expression Using Trigonometric Substitution', TRIG, 'Relating the Inverses', 'example-family'),
 ('m1-07', 'Complementary Angles', TRIG, 'Relating the Inverses', 'section'),
 ('root-loney-trigonometry', 'Applications of algebraic signs to Trigonometry', TRIG, 'The Unit Circle: Functions of Any Angle', 'section'),
 ('root-loney-trigonometry', 'General expressions for all angles having a given trigonometrical ratio', TRIG, 'General Solutions: the sin/cos/tan Families', 'section'),
 ('root-loney-trigonometry', 'Principle of Proportional Parts', TRIG, 'Solutions of Triangles: the Six Cases', 'glossary'),
 ('root-loney-trigonometry', 'Given two sides and the included angle', TRIG, 'The Cosine and Projection Rules', 'example-family'),
 ('root-loney-trigonometry', 'Centroid and Medians', TRIG, 'The Orthocentre, Centroid and the Pedal Triangle', 'section'),
 ('root-loney-trigonometry', 'Dip of the horizon', TRIG, 'The Craft Problems', 'example-family'),
 ('root-khattar-qa', 'Trigonometric Ratios', TRIG, 'Ratios of Acute Angles and the Standard Table', 'glossary'),
 ('root-khattar-qa', 'Heights and Distance', TRIG, 'Elevation, Depression and the Right Setup', 'chapter-umbrella'),
]

# ===================== SET THEORY (9) / PROBABILITY (10) / LOGIC (8) / STATS (3) =====================
F += [
 ('m2-01', 'Set Theory and Real Number System', ST, 'Membership: the Primitive', 'chapter-umbrella'),
 ('m2-01', 'Different Types of Sets', ST, 'Extension and Specification', 'section'),
 ('m2-01', 'Subset', ST, 'Extension and Specification', 'glossary'),
 ('m2-01', 'Proper Subset of a Set', ST, 'Extension and Specification', 'glossary'),
 ('m2-01', 'Universal Set', ST, 'Membership: the Primitive', 'glossary'),
 ('m2-01', 'Venn Diagram', ST, 'Unions, Intersections, Complements', 'section'),
 ('m2-01', 'Operation on Sets', ST, 'Unions, Intersections, Complements', 'section'),
 ('m2-01', 'Venn Diagrams of Operations of Sets', ST, 'Unions, Intersections, Complements', 'example-family'),
 ('root-khattar-qa', 'Set Theory', ST, 'Membership: the Primitive', 'chapter-umbrella'),
 ('m2-09', 'Random Experiment', PR, 'Experiments, Sample Spaces, Events', 'glossary'),
 ('m2-09', 'Different Types of Events', PR, 'Experiments, Sample Spaces, Events', 'section'),
 ('m2-09', 'Axiomatic Approach to Probability', PR, 'The Axioms and the Classical Ratio', 'section'),
 ('m2-09', 'Mathematical or Classical Definition of Probability', PR, 'The Axioms and the Classical Ratio', 'section'),
 ('m2-14', 'Multiplication Rule of Probability of More than Two Events', PR, 'The Multiplication Theorem', 'section'),
 ('m2-14', 'Independent Events', PR, 'Independence, Pairwise and Mutual', 'section'),
 ('m2-14', 'Probability Involving Bernoulli Trials', PR, 'Bernoulli and the Binomial', 'section'),
 ('root-rosen-discrete-8e', 'Discrete Probability', PR, 'Experiments, Sample Spaces, Events', 'chapter-umbrella'),
 ('root-rosen-discrete-8e', 'An Introduction to Discrete Probability', PR, 'Experiments, Sample Spaces, Events', 'section'),
 ('root-rosen-discrete-8e', 'Probability Theory', PR, 'Experiments, Sample Spaces, Events', 'chapter-umbrella'),
 ('m2-10', 'Mathematical Reasoning', ML, 'Statements: the Raw Material', 'chapter-umbrella'),
 ('m2-10', 'Compound Statement and Basic Logical Connectives', ML, 'The Connectives and Their Tables', 'section'),
 ('m2-10', 'Logical Equivalence', ML, 'The Equivalence Laws', 'section'),
 ('m2-10', 'Converse, Inverse and Contrapositive of Statement', ML, 'Conditional, Biconditional and the Contrapositive', 'section'),
 ('root-rosen-discrete-8e', 'The Foundations: Logic and Proofs', ML, 'Statements: the Raw Material', 'chapter-umbrella'),
 ('root-rosen-discrete-8e', 'Propositional Logic', ML, 'Statements: the Raw Material', 'section'),
 ('root-rosen-discrete-8e', 'Propositional Equivalences', ML, 'The Equivalence Laws', 'section'),
 ('root-rosen-discrete-8e', 'Nested Quanti\ufb01ers', ML, 'The Two Quantifiers and Their Order', 'section'),
 ('m2-11', 'Statistics', STAT, 'Populations, Samples and Data Types', 'chapter-umbrella'),
 ('m2-11', 'Measures of Central Tendency', STAT, 'The Mean, Ungrouped and Grouped', 'section'),
 ('m2-11', 'Measures of Dispersion', STAT, 'Range, Quartiles and Box Plots', 'section'),
]

# ===================== LINEAR ALGEBRA (59) =====================
LAM1 = 'The Symmetric Promise \u2014 Axler\u2019s proof-first arc: the self-adjoint (Hermitian) and normal operators, the spectral theorem, positive operators, isometries and unitary operators, the polar decomposition, and the properties of an operator determined by its eigenvalues'
LAM2 = 'R\u207f and Subspaces \u2014 the scalar field F and the digression on fields (Abstract Algebra\u2019s ground, cross-referenced), sums and direct sums of subspaces'
LAM3 = 'Diagonalization and Cayley\u2013Hamilton \u2014 diagonalizable operators, the conditions for diagonalizability, commuting operators, and the Gershgorin disk theorem'
LAM4 = 'Kernel, Range and Rank-Nullity \u2014 the null space and injectivity, the range and surjectivity \u2014 with invertibility and isomorphisms (Axler\u2019s isomorphic reading of a space)'
LAM5 = 'Quadratic Forms and the Conics Re-read \u2014 Axler\u2019s closing arc: bilinear forms and symmetric bilinear forms, alternating multilinear forms, defining the determinant as the signed volume of an operator \u2014 with operators applied to ellipsoids and parallelepipeds (the image-body reading), and the tensor product'
F += [
 ('m2-12', 'Condition for Three Lines to be Concurrent', LA, 'Determinants in Coordinate Geometry', 'example-family'),
 ('m2-12', 'in x and y to Represent Pair of Straight Lines', LA, 'Determinants in Coordinate Geometry', 'example-family'),
 ('m2-12', 'Integration of Determinant', LA, 'The Property Arc, Proved', 'derivation-annex'),
 ('m2-13', 'Matrix: Definition', LA, 'What a Matrix Is: the Classification Census', 'glossary'),
 ('m2-13', 'Negative of Matrix', LA, 'What a Matrix Is: the Classification Census', 'glossary'),
 ('m2-13', 'Elementary Algebraic Operations on Matrix', LA, 'The Product and Its Non-Commutativity', 'section'),
 ('root-kreyszig-eng-math', 'Complex Matrices and Forms. Optional', LA, LAM1, 'section'),
 ('root-strang-intro-la-5e', 'Elimination Using Matrices', LA, 'Row Reduction and Echelon Forms', 'section'),
 ('root-strang-intro-la-5e', 'Transposes and Permutations', LA, 'Transpose, Trace and the Special Family', 'section'),
 ('root-strang-intro-la-5e', 'The Complete Solution to Ax = b', LA, 'Homogeneous Systems and Rank', 'section'),
 ('root-strang-intro-la-5e', 'Permutations and Cofactors', LA, 'Expansion: Minors and Cofactors', 'section'),
 ('root-strang-intro-la-5e', 'Principal Component Analysis (PCA by the SVD)', LA, 'Powers, Markov Chains and the SVD Named', 'section'),
 ('root-strang-intro-la-5e', 'The Search for a Good Basis', LA, 'Basis and Dimension', 'section'),
 ('root-strang-intro-la-5e', 'Complex Numbers', LA, LAM1, 'glossary'),
 ('root-strang-intro-la-5e', 'Graphs and Networks', LA, 'The Four Fundamental Subspaces', 'section'),
 ('root-strang-intro-la-5e', 'Markov Matrices, Population, and Economics', LA, 'Powers, Markov Chains and the SVD Named', 'section'),
 ('root-strang-intro-la-5e', 'Computer Graphics', LA, 'The Matrix of a Transformation', 'example-family'),
 ('root-strang-intro-la-5e', 'Gaussian Elimination in Practice', LA, 'Row Reduction and Echelon Forms', 'section'),
 ('root-strang-intro-la-5e', 'Covariance Matrices and Joint Probabilities', LA, 'Powers, Markov Chains and the SVD Named', 'section'),
 ('root-axler-ladr-4e', 'Complex Numbers', LA, LAM2, 'glossary'),
 ('root-axler-ladr-4e', 'Lists', LA, LAM2, 'glossary'),
 ('root-axler-ladr-4e', 'Finite-Dimensional Vector Spaces', LA, 'Basis and Dimension', 'section'),
 ('root-axler-ladr-4e', '~Algebraic Operations on', LA, 'Machines that Respect the Structure', 'section'),
 ('root-axler-ladr-4e', 'Existence of Eigenvalues on Complex Vector Spaces', LA, 'Invariant Subspaces and the Minimal Polynomial', 'section'),
 ('root-axler-ladr-4e', 'Eigenvalues on Odd-Dimensional Real Vector Spaces', LA, 'Invariant Subspaces and the Minimal Polynomial', 'section'),
 ('root-axler-ladr-4e', 'Upper-Triangular Matrices', LA, 'Invariant Subspaces and the Minimal Polynomial', 'section'),
 ('root-axler-ladr-4e', 'Diagonal Matrices', LA, LAM3, 'glossary'),
 ('root-axler-ladr-4e', 'Orthonormal Bases', LA, 'Gram\u2013Schmidt and Orthogonal Bases', 'section'),
 ('root-axler-ladr-4e', 'Orthonormal Lists and the Gram\u2013Schmidt Procedure', LA, 'Gram\u2013Schmidt and Orthogonal Bases', 'section'),
 ('root-axler-ladr-4e', 'Orthogonal Complements and Minimization Problems', LA, 'Projections and Orthogonality', 'section'),
 ('root-axler-ladr-4e', 'Orthogonal Complements', LA, 'Projections and Orthogonality', 'section'),
 ('root-axler-ladr-4e', 'Pseudoinverse', LA, 'Powers, Markov Chains and the SVD Named', 'glossary'),
 ('root-axler-ladr-4e', 'Cholesky Factorization', LA, LAM1, 'glossary'),
 ('root-axler-ladr-4e', 'Singular Value Decomposition', LA, 'Powers, Markov Chains and the SVD Named', 'section'),
 ('root-axler-ladr-4e', 'Singular Values', LA, 'Powers, Markov Chains and the SVD Named', 'glossary'),
 ('root-axler-ladr-4e', '7F Consequences of Singular Value Decomposition', LA, 'Powers, Markov Chains and the SVD Named', 'section'),
 ('root-axler-ladr-4e', 'Approximation by Linear Maps with Lower-Dimensional Range', LA, 'Powers, Markov Chains and the SVD Named', 'section'),
 ('root-axler-ladr-4e', 'Volume via Singular Values', LA, LAM5, 'section'),
 ('root-axler-ladr-4e', 'Operators on Complex Vector Spaces', LA, 'Invariant Subspaces and the Minimal Polynomial', 'section'),
 ('root-axler-ladr-4e', 'Generalized Eigenspaces', LA, 'Generalized Eigenvectors, Nilpotent Operators and Jordan Form', 'section'),
 ('root-axler-ladr-4e', 'Multiplicity of an Eigenvalue', LA, 'The Characteristic Polynomial', 'glossary'),
 ('root-axler-ladr-4e', 'Block Diagonal Matrices', LA, 'Generalized Eigenvectors, Nilpotent Operators and Jordan Form', 'section'),
 ('root-axler-ladr-4e', 'Consequences of Generalized Eigenspace Decomposition', LA, 'Generalized Eigenvectors, Nilpotent Operators and Jordan Form', 'section'),
 ('root-axler-ladr-4e', 'Trace: A Connection Between Matrices and Operators', LA, 'The Characteristic Polynomial', 'glossary'),
 ('root-lay-laa-5e', 'Linear Models in Business, Science, and Engineering', LA, 'Powers, Markov Chains and the SVD Named', 'example-family'),
 ('root-lay-laa-5e', 'Matrix Operations', LA, 'The Product and Its Non-Commutativity', 'section'),
 ('root-lay-laa-5e', 'Characterizations of Invertible Matrices', LA, 'Adjoint, Inverse and Elementary Transformations', 'section'),
 ('root-lay-laa-5e', 'Partitioned Matrices', LA, 'The Product and Its Non-Commutativity', 'section'),
 ('root-lay-laa-5e', 'Matrix Factorizations', LA, 'Homogeneous Systems and Rank', 'section'),
 ('root-lay-laa-5e', 'The Leontief Input\u2013Output Model', LA, 'Powers, Markov Chains and the SVD Named', 'example-family'),
 ('root-lay-laa-5e', 'Applications to Computer Graphics', LA, 'The Matrix of a Transformation', 'example-family'),
 ('root-lay-laa-5e', 'Linearly Independent Sets; Bases', LA, 'Span and Linear Independence', 'section'),
 ('root-lay-laa-5e', 'Complex Eigenvalues', LA, 'The Characteristic Polynomial', 'section'),
 ('root-lay-laa-5e', 'Discrete Dynamical Systems', LA, 'Powers, Markov Chains and the SVD Named', 'section'),
 ('root-lay-laa-5e', 'Orthogonal Sets', LA, 'Gram\u2013Schmidt and Orthogonal Bases', 'section'),
 ('root-lay-laa-5e', 'The Singular Value Decomposition', LA, 'Powers, Markov Chains and the SVD Named', 'section'),
 ('root-lay-laa-5e', 'Applications to Image Processing and Statistics', LA, 'Powers, Markov Chains and the SVD Named', 'example-family'),
 ('root-lay-laa-5e', 'The Steady-State Vector and Google\u2019s PageRank', LA, 'Powers, Markov Chains and the SVD Named', 'section'),
 ('root-lay-laa-5e', 'Communication Classes', LA, 'Powers, Markov Chains and the SVD Named', 'glossary'),
 ('root-lay-laa-5e', 'Classi\ufb01cation of States and Periodicity', LA, 'Powers, Markov Chains and the SVD Named', 'glossary'),
 ('root-lay-laa-5e', 'Markov Chains and Baseball Statistics', LA, 'Powers, Markov Chains and the SVD Named', 'example-family'),
]

# ===================== COORDINATE GEOMETRY (28) =====================
F += [
 ('m3-01', 'Rectangular (or Cartesian) Coordinate System', CG, 'Axes, Quadrants and the Address of a Point', 'section'),
 ('m3-01', 'Internal Division', CG, 'Distance, Section and the Area of a Polygon', 'section'),
 ('m3-01', 'External Division', CG, 'Distance, Section and the Area of a Polygon', 'section'),
 ('m3-01', 'Circumcentre', CG, 'The Centres of a Triangle in Coordinates', 'example-family'),
 ('m3-01', 'Incentre', CG, 'The Centres of a Triangle in Coordinates', 'example-family'),
 ('m3-01', 'Coordinate Conversion', CG, 'Polar Coordinates', 'glossary'),
 ('m3-02', 'Straight Lines', CG, 'Slope and the Forms of a Line\u2019s Equation', 'chapter-umbrella'),
 ('m3-04', 'Equation of Circle Having Given End Points of Chord which Subtends Given Angle at the Circumference', CG, 'The Equation of a Circle in All Its Forms', 'example-family'),
 ('m3-04', 'Equation of Circle Having Given End Points of Diameter', CG, 'The Equation of a Circle in All Its Forms', 'example-family'),
 ('m3-04', 'Secant of Circle', CG, 'Position, Intersection and the Length of a Tangent', 'glossary'),
 ('m3-04', 'Two Circles Touching Externally', CG, 'Two Circles: the Radical Axis and Contact Cases', 'section'),
 ('m3-04', 'Two Circles Touching Internally', CG, 'Two Circles: the Radical Axis and Contact Cases', 'section'),
 ('m3-04', 'One Circle Contained in the Other Circle without Touching', CG, 'Two Circles: the Radical Axis and Contact Cases', 'section'),
 ('m3-05', 'Other Forms of Parabola', CG, 'Focus, Directrix and the Standard Parabola', 'section'),
 ('m3-06', 'Conormal Points', CG, 'Tangents and Normals to the Parabola', 'glossary'),
 ('m3-07', 'Important Property of Auxiliary Circle', CG, 'The Standard Ellipse and Its Anatomy', 'section'),
 ('m5-01', 'Understanding Coordinates of Point in 3D System', CG, 'Points and Planes in Space', 'section'),
 ('m5-01', 'Distance between Two Points Lying on the Same Axis', CG, 'Distance, Section and the Sphere', 'example-family'),
 ('m5-03', 'Physical Interpretation of Scalar Product', CG, 'The Dot Product: Angles and Projections', 'section'),
 ('m5-03', 'Geometrical Interpretation of Scalar Product', CG, 'The Dot Product: Angles and Projections', 'section'),
 ('m5-03', 'Physical Interpretation of Cross Product as a Moment of Force', CG, 'The Cross Product: Areas and Moments', 'section'),
 ('m5-03', 'Geometric Interpretation of Cross Product', CG, 'The Cross Product: Areas and Moments', 'section'),
 ('m5-03', 'Volume of Tetrahedron', CG, 'Triple Products and Lagrange\u2019s Identity', 'example-family'),
 ('m5-04', 'Intercept Form of a Plane', CG, 'The Plane in All Its Forms', 'section'),
 ('m5-04', 'Regular Tetrahedron', CG, 'Distance, Section and the Sphere', 'example-family'),
 ('m5-04', 'Angle between any Edge and Face not Containing that Edge of Regular Tetrahedron', CG, 'Distance, Section and the Sphere', 'example-family'),
 ('m5-04', 'Angle between the Two Faces of Regular Tetrahedron', CG, 'Distance, Section and the Sphere', 'example-family'),
 ('m5-04', 'Height of Regular Tetrahedron', CG, 'Distance, Section and the Sphere', 'example-family'),
]

# ===================== DIFFERENTIAL EQUATIONS (16) =====================
F += [
 ('m4-10', 'Isogonal Trajectory', DE, 'Orthogonal Trajectories', 'glossary'),
 ('root-thomas-calculus-14e', 'Graphical Solutions of Autonomous Equations', DE, 'Qualitative Methods for Nonlinear Systems', 'section'),
 ('root-kreyszig-eng-math', 'Separable ODEs. Modeling', DE, 'Variable Separable', 'section'),
 ('root-kreyszig-eng-math', 'Modeling of Free Oscillations of a Mass\u2013Spring System', DE, 'Free and Damped Oscillation', 'section'),
 ('root-kreyszig-eng-math', 'Nonhomogeneous ODEs', DE, 'Undetermined Coefficients', 'section'),
 ('root-kreyszig-eng-math', 'Modeling: Forced Oscillations. Resonance', DE, 'Forcing and Resonance', 'section'),
 ('root-kreyszig-eng-math', 'Modeling: Electric Circuits', DE, 'The RLC Twin', 'section'),
 ('root-kreyszig-eng-math', 'Nonhomogeneous Linear ODEs', DE, 'Variation of Parameters', 'section'),
 ('root-kreyszig-eng-math', 'For Reference: Basics of Matrices and Vectors', DE, 'Systems of First-Order Equations: the Vector X\u2032 = AX', 'review-page'),
 ('root-kreyszig-eng-math', 'Systems of ODEs as Models in Engineering Applications', DE, 'Systems of First-Order Equations: the Vector X\u2032 = AX', 'section'),
 ('root-kreyszig-eng-math', 'Basic Theory of Systems of ODEs. Wronskian', DE, 'Systems of First-Order Equations: the Vector X\u2032 = AX', 'section'),
 ('root-kreyszig-eng-math', 'Nonhomogeneous Linear Systems of ODEs', DE, 'Systems of First-Order Equations: the Vector X\u2032 = AX', 'section'),
 ('root-kreyszig-eng-math', 'Systems of ODEs', DE, 'Systems of First-Order Equations: the Vector X\u2032 = AX', 'chapter-umbrella'),
 ('root-kreyszig-eng-math', 'For Reference: Second- and Third-Order Determinants', DE, 'Systems of First-Order Equations: the Vector X\u2032 = AX', 'review-page'),
 ('root-kreyszig-eng-math', 'Some Applications of Eigenvalue Problems', DE, 'Predator\u2013Prey and Linked Populations', 'example-family'),
 ('root-kreyszig-eng-math', 'Forced Oscillations', DE, 'Forcing and Resonance', 'section'),
]

# ===================== DIFFERENTIAL CALCULUS (29) =====================
F += [
 ('m4-02', 'Neighbourhood (NBD) of Real Number', DC, 'Neighbourhoods and the Limiting Value', 'glossary'),
 ('m4-03', 'Differentiation: Definition', DC, 'Slopes of Tangents: the First Principles', 'section'),
 ('m4-03', 'Differentiation Using Logarithm', DC, 'Logarithmic Differentiation and the Determinant Rule', 'example-family'),
 ('m4-04', 'Continuity of Function Involving Greatest Integer Function', DC, 'Special Functions and the Intermediate Value Theorem', 'example-family'),
 ('m4-04', 'Differentiability: Definition', DC, 'Differentiability versus Continuity', 'section'),
 ('m4-04', 'Reasons for Non-Differentiability', DC, 'Differentiability versus Continuity', 'section'),
 ('m4-05', 'Application of Derivatives', DC, 'Tangents and Normals in All Their Forms', 'chapter-umbrella'),
 ('m4-05', 'Graphical Interpretation of Rolle\'s Theorem', DC, 'Rolle\u2019s Theorem', 'section'),
 ('m4-06', 'Increasing Function', DC, 'Monotonic Functions: the First Derivative Test', 'section'),
 ('m4-06', 'Strictly Increasing Function', DC, 'Monotonic Functions: the First Derivative Test', 'section'),
 ('m4-06', 'Decreasing Function', DC, 'Monotonic Functions: the First Derivative Test', 'section'),
 ('m4-06', 'Strictly Decreasing Function', DC, 'Monotonic Functions: the First Derivative Test', 'section'),
 ('m4-06', 'Applications of Monotonicity', DC, 'Monotonic Functions: the First Derivative Test', 'example-family'),
 ('m4-06', 'Identifying Maxima and Minima by Checking', DC, 'Maxima and Minima: the Complete Tests', 'section'),
 ('m4-06', 'Differentiable Function', DC, 'Differentiability versus Continuity', 'glossary'),
 ('m4-06', 'Non-Differentiable Functions', DC, 'Differentiability versus Continuity', 'glossary'),
 ('m4-06', 'Global (Absolute) Maximum and Minimum', DC, 'Maxima and Minima: the Complete Tests', 'section'),
 ('m4-06', 'Applications of Extrema in Curve Tracing and', DC, 'The Complete Checklist', 'section'),
 ('m4-06', 'Applications of Extrema in Optimization,', DC, 'Applied Optimization', 'example-family'),
 ('m4-06', 'Applications of Extrema in Solid Geometry', DC, 'Applied Optimization', 'example-family'),
 ('root-thomas-calculus-14e', 'Related Rates', DC, 'The Derivative as a Rate', 'section'),
 ('root-thomas-calculus-14e', 'Linearization and Differentials', DC, 'Approximation by Differentials', 'section'),
 ('root-thomas-calculus-14e', 'Applications of Derivatives', DC, 'Tangents and Normals in All Their Forms', 'chapter-umbrella'),
 ('root-stewart-et-metric', 'Rates of Change in the Natural and Social Sciences', DC, 'The Derivative as a Rate', 'example-family'),
 ('root-stewart-et-metric', 'Related Rates', DC, 'The Derivative as a Rate', 'section'),
 ('root-stewart-et-metric', 'Maximum and Minimum Values', DC, 'Maxima and Minima: the Complete Tests', 'section'),
 ('root-stewart-et-metric', 'What Derivatives Tell Us about the Shape of a Graph', DC, 'The Complete Checklist', 'section'),
 ('root-stewart-et-metric', 'Graphing with Calculus and Technology', DC, 'Sketching the Families: Polynomial to Trigonometric', 'example-family'),
 ('root-stewart-et-metric', 'Applications of Differentiation', MC, 'Critical Points and the Second-Derivative Test', 'chapter-umbrella'),
]

# ===================== INTEGRAL CALCULUS (26) =====================
F += [
 ('m4-07', 'Indefinite Integration', IC, 'The Antiderivative and the Constant', 'chapter-umbrella'),
 ('m4-07', 'Integration as Reverse Process of Differentiation', IC, 'The Antiderivative and the Constant', 'section'),
 ('m4-07', 'Integration of Commonly Used Functions', IC, 'The Antiderivative and the Constant', 'example-family'),
 ('m4-07', 'Integration of Function f(ax + b)', IC, 'Substitution: the Chain Rule Undone', 'section'),
 ('m4-07', 'Integration of tan, cot, sec and cosec Functions', IC, 'Trigonometric Integrals and Standard Substitutions', 'section'),
 ('m4-07', 'Integration of Function f(g(x))g\u2032(x)', IC, 'Substitution: the Chain Rule Undone', 'section'),
 ('m4-07', 'Integration of Function which is Reciprocal of Quadratic', IC, 'Quadratic and Biquadratic Forms', 'example-family'),
 ('m4-07', 'Integration of Function in which Linear Function is Divided by Quadratic', IC, 'Quadratic and Biquadratic Forms', 'example-family'),
 ('m4-07', 'Integration of Expressions Involving Biquadratic Function', IC, 'Quadratic and Biquadratic Forms', 'example-family'),
 ('m4-07', 'Integration of Function which is Reciprocal of Square Root of Quadratic', IC, 'Quadratic and Biquadratic Forms', 'example-family'),
 ('m4-07', 'Integration by Cancellation', IC, 'The Antiderivative and the Constant', 'example-family'),
 ('m4-08', 'Halving The Upper Limit', IC, 'The Elementary Properties and the Dummy Variable', 'example-family'),
 ('m4-09', 'Graph of Function Intersects x-axis', IC, 'Areas under and between Curves', 'section'),
 ('m4-09', 'Area Using Integration along y-Axis', IC, 'Areas under and between Curves', 'section'),
 ('m4-09', 'Area Bounded by Curves in Given Interval', IC, 'Areas under and between Curves', 'section'),
 ('root-thomas-calculus-14e', 'Indefinite Integrals and the Substitution Method', IC, 'Substitution: the Chain Rule Undone', 'section'),
 ('root-thomas-calculus-14e', 'Transcendental Functions', IC, 'Trigonometric Integrals and Standard Substitutions', 'chapter-umbrella'),
 ('root-thomas-calculus-14e', 'Techniques of Integration', IC, 'Integration by Parts: the Choice Discipline', 'chapter-umbrella'),
 ('root-stewart-et-metric', 'Indefinite Integrals and the Net Change Theorem', IC, 'The Antiderivative and the Constant', 'section'),
 ('root-stewart-et-metric', 'Applications of Integration', IC, 'Areas under and between Curves', 'chapter-umbrella'),
 ('root-stewart-et-metric', 'Average Value of a Function', IC, 'The Fundamental Theorems of Calculus', 'example-family'),
 ('root-stewart-et-metric', 'Techniques of Integration', IC, 'Integration by Parts: the Choice Discipline', 'chapter-umbrella'),
 ('root-stewart-et-metric', 'Strategy for Integration', IC, 'Integration by Parts: the Choice Discipline', 'section'),
 ('root-stewart-et-metric', 'Integration Using Tables and Technology', IC, 'Reduction Formulas and Typical Substitutions', 'example-family'),
 ('root-stewart-et-metric', 'Further Applications of Integration', IC, 'Work, Fluid Forces and Centroids', 'chapter-umbrella'),
]

# ===================== NUMERICAL ANALYSIS (4) / MULTIVARIABLE (18) =====================
F += [
 ('root-thomas-calculus-14e', 'Numerical Integration', NA, 'Trapezoid, Simpson and Their Errors', 'section'),
 ('root-strang-intro-la-5e', 'Iterative Methods and Preconditioners', NA, 'Jacobi, Gauss\u2013Seidel and Diagonal Dominance', 'section'),
 ('root-lay-laa-5e', 'Iterative Estimates for Eigenvalues', NA, 'The Power Method', 'section'),
 ('root-stewart-et-metric', 'Approximate Integration', NA, 'Trapezoid, Simpson and Their Errors', 'section'),
 ('root-thomas-calculus-14e', 'Tangential and Normal Components of Acceleration', MC, 'Motion in Space: Velocity, Acceleration and Curvature', 'section'),
 ('root-thomas-calculus-14e', 'Multiple Integrals', MC, 'The Double Integral and Iteration', 'chapter-umbrella'),
 ('root-thomas-calculus-14e', 'Double and Iterated Integrals over Rectangles', MC, 'The Double Integral and Iteration', 'section'),
 ('root-thomas-calculus-14e', 'Line Integrals of Scalar Functions', MC, 'Vector Fields and Line Integrals', 'section'),
 ('root-thomas-calculus-14e', 'Vector Fields and Line Integrals: Work, Circulation, and Flux', MC, 'Vector Fields and Line Integrals', 'section'),
 ('root-thomas-calculus-14e', 'The Divergence Theorem and a Unified Theory', MC, 'Green\u2019s, Stokes\u2019s and Gauss\u2019s Theorems', 'section'),
 ('root-stewart-et-metric', 'Applications to Physics and Engineering', MC, 'Mass, Centres and Moments', 'example-family'),
 ('root-stewart-et-metric', 'Applications to Economics and Biology', MC, 'Mass, Centres and Moments', 'example-family'),
 ('root-stewart-et-metric', 'Double Integrals over Rectangles', MC, 'The Double Integral and Iteration', 'section'),
 ('root-stewart-et-metric', 'Triple Integrals', MC, 'Polar, Cylindrical and Spherical', 'section'),
 ('root-stewart-et-metric', 'Triple Integrals in Cylindrical Coordinates', MC, 'Polar, Cylindrical and Spherical', 'section'),
 ('root-stewart-et-metric', 'Triple Integrals in Spherical Coordinates', MC, 'Polar, Cylindrical and Spherical', 'section'),
 ('root-stewart-et-metric', 'Change of Variables in Multiple Integrals', MC, 'Polar, Cylindrical and Spherical', 'section'),
 ('root-stewart-et-metric', 'Curl and Divergence', MC, 'Green\u2019s, Stokes\u2019s and Gauss\u2019s Theorems', 'section'),
 ('root-stewart-et-metric', 'The Divergence Theorem', MC, 'Green\u2019s, Stokes\u2019s and Gauss\u2019s Theorems', 'section'),
 ('root-kreyszig-eng-math', 'Vector and Scalar Functions and Their Fields. Vector Calculus: Derivatives', MC, 'Vector Fields and Line Integrals', 'section'),
 ('root-kreyszig-eng-math', 'Further Applications of the Divergence Theorem', MC, 'Green\u2019s, Stokes\u2019s and Gauss\u2019s Theorems', 'example-family'),
]

# ===================== REAL ANALYSIS (32) =====================
F += [
 ('root-stewart-et-metric', 'Strategy for Testing Series', RA, 'Ratio, Root and the Alternating Discipline', 'section'),
 ('root-kreyszig-eng-math', 'Uniform Convergence. Optional', RA, 'Pointwise versus Uniform: the Failures', 'section'),
 ('root-rudin-pma-3e', 'The Real and Complex Number Systems', RA, 'Ordered Fields and the Rational Gap', 'chapter-umbrella'),
 ('root-rudin-pma-3e', 'The Real Field', RA, 'The Completeness Axiom and Its Equivalent Forms', 'section'),
 ('root-rudin-pma-3e', 'The Extended Real Number System', RA, 'The Completeness Axiom and Its Equivalent Forms', 'glossary'),
 ('root-rudin-pma-3e', 'The Complex Field', RA, 'Ordered Fields and the Rational Gap', 'glossary'),
 ('root-rudin-pma-3e', 'Euclidean Spaces', RA, 'Ordered Fields and the Rational Gap', 'glossary'),
 ('root-rudin-pma-3e', 'Finite, Countable, and Uncountable Sets', RA, 'Open and Closed Sets', 'section'),
 ('root-rudin-pma-3e', 'Compact Sets', RA, 'Compactness and Heine\u2013Borel', 'section'),
 ('root-rudin-pma-3e', 'Perfect Sets', RA, 'Open and Closed Sets', 'section'),
 ('root-rudin-pma-3e', 'Connected Sets', RA, 'Connectedness: the Interval Theorem', 'section'),
 ('root-rudin-pma-3e', 'Convergent Sequences', RA, 'The \u03b5-Definition and Template Proofs', 'section'),
 ('root-rudin-pma-3e', 'Upper and Lower Limits', RA, 'Limsup and Liminf', 'section'),
 ('root-rudin-pma-3e', 'Some Special Sequences', RA, 'Monotone Sequences and Subsequences', 'example-family'),
 ('root-rudin-pma-3e', 'Summation by Parts', RA, 'Partial Sums and the First Tests', 'derivation-annex'),
 ('root-rudin-pma-3e', 'Absolute Convergence', RA, 'Absolute versus Conditional: Riemann\u2019s Rearrangement', 'section'),
 ('root-rudin-pma-3e', 'Integration and Differentiation', RA, 'The Uniform Theorems, Proved', 'section'),
 ('root-rudin-pma-3e', 'Rectifiable Curves', RA, 'The Fundamental Theorem, Proved', 'glossary'),
 ('root-rudin-pma-3e', 'Uniform Convergence', RA, 'Pointwise versus Uniform: the Failures', 'section'),
 ('root-rudin-pma-3e', 'Uniform Convergence and Integration', RA, 'The Uniform Theorems, Proved', 'section'),
 ('root-rudin-pma-3e', 'Uniform Convergence and Differentiation', RA, 'The Uniform Theorems, Proved', 'section'),
 ('root-rudin-pma-3e', 'The Algebraic Completeness of the Complex Field', RA, 'The Proof-Craft Census', 'glossary'),
 ('root-rudin-pma-3e', 'The Contraction Principle', RA, 'Uniform Continuity and Monotone Inverses', 'derivation-annex'),
 ('root-rudin-pma-3e', 'Differentiation of Integrals', RA, 'The Fundamental Theorem, Proved', 'glossary'),
 ('root-rudin-pma-3e', 'Integration of Differential Forms', RA, 'The Doorsteps: Forms, Measure and Topology', 'section'),
 ('root-rudin-pma-3e', 'Primitive Mappings', RA, 'The Doorsteps: Forms, Measure and Topology', 'section'),
 ('root-rudin-pma-3e', 'Partitions of Unity', RA, 'The Doorsteps: Forms, Measure and Topology', 'section'),
 ('root-rudin-pma-3e', 'Change of Variables', RA, 'The Doorsteps: Forms, Measure and Topology', 'section'),
 ('root-rudin-pma-3e', 'Closed Forms and Exact Forms', RA, 'The Doorsteps: Forms, Measure and Topology', 'section'),
 ('root-rudin-pma-3e', 'Vector Analysis', RA, 'The Doorsteps: Forms, Measure and Topology', 'section'),
 ('root-rudin-pma-3e', 'The Lebesgue Theory', RA, 'The Lebesgue Doorstep: Measure, Measurable Functions and Simple Functions', 'chapter-umbrella'),
 ('root-rudin-pma-3e', 'Measure Spaces', RA, 'The Lebesgue Doorstep: Measure, Measurable Functions and Simple Functions', 'section'),
]

# ===================== MME (15) / CA (2) / DM (8) / NT (3) / CO (1) / OR (10) / QA (1) / EL (1) / ANS (1) =====================
F += [
 ('root-kreyszig-eng-math', 'Differential Operators. Optional', MME, 'The Toolkit Map', 'glossary'),
 ('root-kreyszig-eng-math', 'Laplace Transform. Linearity. First Shifting Theorem (s-Shifting)', MME, 'The Transform and Its Rules', 'section'),
 ('root-kreyszig-eng-math', 'Transforms of Derivatives and Integrals. ODEs', MME, 'The Transform and Its Rules', 'section'),
 ('root-kreyszig-eng-math', 'Short Impulses. Dirac\u2019s Delta Function. Partial Fractions', MME, 'Steps, Impulses and Initial-Value Problems', 'section'),
 ('root-kreyszig-eng-math', 'Differentiation and Integration of Transforms', MME, 'The Transform and Its Rules', 'section'),
 ('root-kreyszig-eng-math', 'Calculus Review: Functions of Several Variables. Optional', MME, 'The Problem Families', 'review-page'),
 ('root-kreyszig-eng-math', 'Calculus Review: Double Integrals. Optional', MME, 'The Problem Families', 'review-page'),
 ('root-kreyszig-eng-math', 'Arbitrary Period. Even and Odd Functions. Half-Range Expansions', MME, 'Half-Range and Parseval', 'section'),
 ('root-kreyszig-eng-math', 'Fourier Integral', MME, 'The Fourier Transform and the FFT, Named', 'section'),
 ('root-kreyszig-eng-math', 'Fourier Cosine and Sine Transforms', MME, 'The Fourier Transform and the FFT, Named', 'section'),
 ('root-kreyszig-eng-math', 'Modeling: Heat Flow from a Body in Space. Heat Equation', MME, 'The Modeling Census: wave, heat, Laplace', 'section'),
 ('root-kreyszig-eng-math', 'Modeling: Membrane, Two-Dimensional Wave Equation', MME, 'The Modeling Census: wave, heat, Laplace', 'section'),
 ('root-kreyszig-eng-math', 'Rectangular Membrane. Double Fourier Series', MME, 'Separation on the String and the Bar', 'section'),
 ('root-kreyszig-eng-math', 'Laplacian in Polar Coordinates. Circular Membrane. Fourier\u2013Bessel Series', MME, 'Series Solutions: Bessel and Legendre', 'section'),
 ('root-kreyszig-eng-math', 'Laplace\u2019s Equation in Cylindrical and Spherical Coordinates. Potential', MME, 'Laplace in the Rectangle and the Disc', 'section'),
 ('root-kreyszig-eng-math', 'Complex Numbers and Their Geometric Representation', CA, 'The Bank Recalled, the Geometry Deepened', 'section'),
 ('root-kreyszig-eng-math', 'Singularities and Zeros. Infinity', CA, 'Laurent Series and the Singularity Census', 'section'),
 ('root-rosen-discrete-8e', 'Proof Methods and Strategy', DM, 'The Logic Toolkit, Assembled', 'section'),
 ('root-rosen-discrete-8e', 'Set Operations', DM, 'Sets, Functions and Sequences at Work', 'section'),
 ('root-rosen-discrete-8e', 'Sequences and Summations', DM, 'Sets, Functions and Sequences at Work', 'section'),
 ('root-rosen-discrete-8e', 'Cardinality of Sets', DM, 'Sets, Functions and Sequences at Work', 'section'),
 ('root-rosen-discrete-8e', 'Program Correctness', DM, 'Recursive Algorithms and Their Correctness', 'section'),
 ('root-rosen-discrete-8e', 'Representing Relations', DM, 'Properties and Closures', 'section'),
 ('root-rosen-discrete-8e', 'Planar Graphs', DM, 'Planarity and Coloring: Euler\u2019s Formula at Work', 'section'),
 ('root-rosen-discrete-8e', 'Modeling Computation', DM, 'Languages and Grammars', 'chapter-umbrella'),
 ('root-rosen-discrete-8e', 'Primes and Greatest Common Divisors', NT, 'Divisibility Recalled, Deepened', 'section'),
 ('root-rosen-discrete-8e', 'Applications of Congruences', NT, 'Linear Congruences', 'example-family'),
 ('root-rosen-discrete-8e', 'Cryptography', NT, 'Classical Ciphers and Their Cracks', 'section'),
 ('root-rosen-discrete-8e', 'The Basics of Counting', CO, 'The Bank Recalled: Principles and Formulas', 'chapter-umbrella'),
 ('root-strang-intro-la-5e', 'Linear Programming', OR, 'Standard Form and Corner Geometry', 'section'),
 ('root-lay-laa-5e', 'Constrained Optimization', OR, 'KKT, Stated with Meaning', 'section'),
 ('root-lay-laa-5e', 'Af\ufb01ne Combinations', OR, 'Convexity: the Tractable Virtue', 'glossary'),
 ('root-lay-laa-5e', 'Af\ufb01ne Independence', OR, 'Convexity: the Tractable Virtue', 'section'),
 ('root-lay-laa-5e', 'Convex Combinations', OR, 'Convexity: the Tractable Virtue', 'section'),
 ('root-lay-laa-5e', 'Hyperplanes', OR, 'The Graphical Doorstep', 'glossary'),
 ('root-lay-laa-5e', 'Polytopes', OR, 'Convexity: the Tractable Virtue', 'section'),
 ('root-lay-laa-5e', 'Matrix Games', OR, 'Duality and Shadow Prices', 'section'),
 ('root-lay-laa-5e', 'Linear Programming\u2014Geometric Method', OR, 'The Graphical Doorstep', 'section'),
 ('root-lay-laa-5e', 'Linear Programming\u2014Simplex Method', OR, 'The Simplex Method, Built Honestly', 'section'),
 ('root-khattar-qa', 'Data Sufficiency', QA, 'The Statement\u2013Question Contract', 'chapter-umbrella'),
 ('root-elementary-algebra-text', 'Elementary Surds', EL, 'Powers and the Laws of Exponents', 'section'),
 ('root-elementary-algebra-text', 'Scales of Notation', ANS, 'Converting Between Bases', 'section'),
]

# ===================== validate + emit =====================
resolved = []
for src, topic, book, host, mode in F:
    if topic.startswith('~'):
        cands = [t for (s2, b2, t) in INDEX if s2 == src and b2 == book and t.startswith(topic[1:])]
        if not cands:
            print(f'PREFIX NOT FOUND: {src} | {topic} | {book}')
            sys.exit(1)
        topic = sorted(cands)[0]
    resolved.append((src, topic, book, host, mode))
F = resolved

errs = []
seen = set()
for src, topic, book, host, mode in F:
    if (src, book, topic) not in INDEX:
        errs.append(f'NOT IN SURVEY: {src} | {topic} | {book}')
    k = (src, book, topic)
    if k in seen:
        errs.append(f'DUPLICATE: {k}')
    seen.add(k)
if errs:
    print('\n'.join(errs))
    sys.exit(1)

NOTE = {
 'section': 'Named subsection inside {host}: formal definition + at least one worked example treating the surveyed topic.',
 'example-family': 'At least two worked examples inside {host} of exactly this topic type (per TOC_LESSON_GUIDE.md).',
 'exercise-thread': 'At least three graded exercise items with full solutions on this topic in {host}\u2019s exercise sets.',
 'glossary': 'A terms-block entry for this topic inside {host}, used at least once in the lesson prose.',
 'derivation-annex': 'A boxed derivation or callout proving/naming this topic inside {host}.',
 'review-page': 'Carried by the host chapter\u2019s completion review \u2014 the host lesson {host} must name it in its prose.',
 'chapter-umbrella': 'The chapter\u2019s own arc guarantees this topic; the host lesson {host} opens that arc and the chapter summary names it.',
}
ledger = [
  {'source': src, 'topic': topic, 'book': book, 'host': host, 'mode': mode, 'note': NOTE[mode].format(host=host)}
  for (src, topic, book, host, mode) in F
]
with open('docs/project/TOC_FOLD_LEDGER.json', 'w') as f:
    json.dump(ledger, f, indent=1, ensure_ascii=False)
print(f'OK: {len(ledger)} folds written to docs/project/TOC_FOLD_LEDGER.json')
