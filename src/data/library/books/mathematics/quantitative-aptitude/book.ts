import type { Book, Chapter } from '../../../types'

/**
 * Quantitative Aptitude — the twenty-eighth book of the Mathematics shelf.
 *
 * STATUS: PLANNED (topic-inclusion guarantee pass, 2026-11-10) — 12
 * chapters / 44 planned lessons, zero written. Lesson ids will use the
 * `qa-` prefix (verified unused across all existing lesson ids; the
 * 'khattar-qa-4e' string in written books is a CITATION key, never a
 * lesson id).
 *
 * POSITIONING (no-duplication contract): Foundation Mathematics owns the
 * school CONCEPTS (percentage, ratio, the four operations); Arithmetic
 * and Number Systems owns the number systems themselves; Elementary
 * and Advanced Algebra own the equation and series theory; Statistics
 * owns data interpretation (cross-referenced, never duplicated);
 * Geometry owns the mensuration THEORY (Heron, the prism and cylinder
 * derivations — cross-referenced). THIS book owns the
 * commercial-aptitude FAMILY: the model-language of the world's
 * competitive-exam arithmetic — profit and loss, discounts, simple and
 * compound interest, stocks and shares, partnership, mixtures and
 * alligation, problems on ages, time and work, pipes and cisterns,
 * time–speed–distance with trains, boats and streams and races, clocks
 * and calendars, number series, weighted averages at exam speed, and
 * the data-sufficiency decision format. The Drive survey's Khattar
 * census showed this family has no other home on the shelf — the
 * aptitude chapters cross-reference out to the theory books exactly as
 * the OR book's note anticipated.
 *
 * RESEARCH PHASE (2026-11-10, the topic-inclusion guarantee pass):
 * - Drive (docs/research/DRIVE_TOC_SURVEY.md): Khattar 'Quantitative
 *   Aptitude for Competitive Examinations' 4e — the aptitude census,
 *   40 chapters TOC-extracted (the banked khattar-qa-4e key). The
 *   commercial family the shelf lacked: Partnership, Profit and Loss,
 *   Time and Work / Work and Wages, Pipes and Cisterns, Time and
 *   Distance, Boats and Streams, Races and Games of Skill, Alligation
 *   or Mixture, Problems on Ages, Simple Interest, Compound Interest,
 *   Stocks Shares and Debentures, Discount (True and Banker's), Series,
 *   Clocks and Calendar, Data Sufficiency — chapters 8–18, 20–21, 23–24,
 *   40 of the census, now owned here; the rest route to their theory
 *   books (Numbers/HCF-LCM/Binary → ANS; Simplification/Percentage/
 *   Average/Ratio → FM; Logarithms/Progression/P&C/Quadratic → AA;
 *   Polynomials/Linear Equations → AL; Set Theory → Set Theory;
 *   Probability → Probability; Mensuration → Geometry; Trigonometric
 *   Ratios/Heights → Trigonometry; Plane/Co-ordinate → Geometry and
 *   Coordinate Geometry; Data Interpretation → Statistics).
 * - Exam scope (the registry research pass, 2026-11-10): the family is
 *   exactly the quantitative syllabus of CAT/XAT/MAT/NMAT/CMAT, the
 *   government-recruitment arithmetic of SSC CGL/IBPS/SBI/RBI/Railways/
 *   LIC (Khattar's own stated audience), the arithmetic word-problem
 *   family of SAT and GRE quant and GMAT quant, the UPSC CSAT aptitude
 *   paper, NDA/CDS maths numericals and CUET's quantitative section —
 *   per-exam mapping in docs/project/EXAM_REGISTRY.json.
 * - The data-sufficiency note recorded honestly: the classic two-statement
 *   format survives in MAT/NMAT-style papers and in GMAT's Data Insights
 *   section (the Focus edition moved it out of plain quant) — the craft
 *   is taught as a decision discipline, cross-referencing Mathematical
 *   Logic's truth-conditions.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'the-aptitude-landscape',
    title: 'The Aptitude Landscape',
    summary:
      'The census chapter: what the world\u2019s aptitude exams actually test — one arithmetic family examined at speed under time pressure — and the craft that speed demands. Simplification with BODMAS/brackets discipline, approximation and estimation before any computation, digit sense (last-digit and digit-sum checks), and the honest place of shortcut methods: each shortcut derived once from the underlying algebra so the reader knows when it holds and when it betrays. Foundation Mathematics owns the operations as concepts; this chapter owns their exam-speed craft.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The World\u2019s Aptitude Exams: One Arithmetic Family',
      'Simplification and the Order of Operations Craft',
      'Approximation, Estimation and Digit Sense',
      'Shortcuts and Their Limits',
    ],
  },
  {
    number: 2,
    slug: 'percentage-profit-and-loss',
    title: 'Percentage, Profit and Loss, and Discount',
    summary:
      'The merchant family built on the percentage scale: cost, marked and selling price; profit and loss as fractions of the cost; successive transactions and the dishonest-dealer problems (false weights and scales); marked price with single and successive discounts; true discount versus banker\u2019s discount on bills of exchange — the classic pair exam books carry. Percentage as a concept belongs to Foundation Mathematics; here it is the working scale of the entire commercial family.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Percentage as the Universal Scale',
      'Price, Consumption, Population and the Inverse Percentage Family',
      'Profit and Loss: Cost, Marked and Selling Price',
      'Successive, True and Banker\u2019s Discounts',
      'Dishonest Dealers: False Weights and Scales',
    ],
  },
  {
    number: 3,
    slug: 'interest-and-the-money-family',
    title: 'Interest and the Money Family',
    summary:
      'Money growing in time: simple interest as linear (proportional) growth, compound interest as geometric growth — the two models derived and contrasted, the n-fold and fraction-of-year cases, the difference between them priced exactly; depreciation as decay at compound rates; effective and nominal rates; and the exam classics of stocks, shares and debentures — face value, market value, dividend, brokerage and yield — the vocabulary every banking and recruitment exam assumes — with annuities priced as the interest family’s steady payout member.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Simple Interest: Proportional Growth',
      'Compound Interest: Geometric Growth',
      'Depreciation, Effective and Nominal Rates',
      'Stocks, Shares, Debentures, Annuities and Dividends',
    ],
  },
  {
    number: 4,
    slug: 'ratio-partnership-ages-mixtures',
    title: 'Ratio, Partnership, Ages and Mixtures',
    summary:
      'The proportion family in its commercial dress: ratio and proportion revisited at exam speed (Foundation Mathematics owns the concept); partnership — capital invested for different times, the proceeds split in the ratio of capital-months, sleeping and working partners with salaries; problems on ages as linear equations in time with the invariants (birth-year constants) that make them solvable; and alligation — the cross-diagram for mixtures, replacement problems and the weighted-average bridge, derived once so the cross is never magic.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Ratio and Proportion at Exam Speed',
      'Partnership: Sharing the Proceeds',
      'Problems on Ages: Linear Equations in Time',
      'Alligation, Mixtures and Replacements',
    ],
  },
  {
    number: 5,
    slug: 'time-and-work',
    title: 'Time and Work',
    summary:
      'Work as a rate: the one-day unit (if A finishes in a days, each day buys 1/a of the work), combined rates added exactly as Differential Equations will formalize for flows; efficiency — the faster worker does more per day, the exchange between men and days; pipes and cisterns with filling and draining pipes (negative rates) and the emptying time; work and wages split by work done. Every problem reducible to: rate sums to one job — the chapter teaches the reduction, not the memorized cases.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Work Rates and the One-Day Unit',
      'Pipes and Cisterns: Fill and Drain',
      'Efficiency, Men and Days, Work and Wages',
    ],
  },
  {
    number: 6,
    slug: 'time-speed-distance',
    title: 'Time, Speed and Distance',
    summary:
      'The travel family: the d = st triangle and its proportionality (same distance — time inversely proportional to speed); average speed as the harmonic mean — derived, so the 2xy/(x+y) trap is understood; relative speed for approaching and receding bodies; trains crossing poles, platforms and each other (the length matters — the honest unit of distance is train-plus-obstacle); boats and streams with upstream and downstream effective speeds; races and games of skill — head starts, dead heats, linear and circular tracks, and the geometry of meeting again on a track (cross-referencing Coordinate Geometry and the circle).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Speed, Distance and Time: the Proportion Triangle',
      'Average and Relative Speed',
      'Trains: Poles, Bridges and Overtaking',
      'Boats and Streams',
      'Races and Games of Skill',
    ],
  },
  {
    number: 7,
    slug: 'averages-and-series',
    title: 'Averages and Series at Exam Speed',
    summary:
      'Two craft families on banked ground: weighted averages — the alligation bridge from chapter 4 now used in reverse, averages of combined groups, inclusion and exclusion changing an average (the sum-conservation discipline); and the number-series puzzles of aptitude papers — arithmetic and geometric patterns (Advanced Algebra owns the theory), differences and second differences, mixed and twin series, odd-one-out — solved as pattern-hunting with the derivations, not guesswork. Averages as a statistical concept belong to Statistics; this is the exam-craft register.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Weighted Averages and Sum Conservation',
      'Number Series: Missing Terms',
      'Odd Ones Out and Twin Series',
    ],
  },
  {
    number: 8,
    slug: 'clocks-and-calendars',
    title: 'Clocks and Calendars',
    summary:
      'The two time machines of aptitude arithmetic. The clock face as a rate problem: the minute hand gains 5.5° per minute over the hour hand — every angle, overlap, coincidence and opposite case priced from that one rate; the faulty clock (fast, slow, right twice a day) and the clocks-set-at-different-hours craft. Calendar arithmetic: the odd-day method (365 = 52 weeks + 1 odd day; the leap year adds one more), the day-of-the-week machine, the century-year rule (400 vs 100), and the date-comparison craft — leap years counted honestly between any two dates. Khattar’s dedicated chapter, every shortcut derived from the rate arithmetic beneath it.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Clock Face: Angles, Overlaps and Faulty Clocks',
      'Calendar Arithmetic: Odd Days and Leap Years',
      'Clock and Calendar Craft Problems',
    ],
  },
  {
    number: 9,
    slug: 'mensuration-at-exam-speed',
    title: 'Mensuration at Exam Speed',
    summary:
      'The formula census at exam speed: perimeter and area of the standard plane figures (triangle in its forms, quadrilaterals, circle, sector and segment — cross-referencing Geometry chapter 8, which owns Heron and the derivations); volume and surface area of the standard solids — cube, cuboid, cylinder, cone, sphere and hemisphere (Geometry chapter 9 owns the derivations); combined solids (cone on cylinder, hemisphere on cone) and inscribed/circumscribed figures; cutting and reshaping problems where volume is conserved. The theory is cross-referenced, never re-derived here — this chapter owns the speed census.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Perimeter and Area: the Exam Census',
      'Volume and Surface Area: the Standard Solids',
      'Combined, Inscribed and Reshaped Solids',
    ],
  },
  {
    number: 10,
    slug: 'data-sufficiency',
    title: 'Data Sufficiency: the Decision Craft',
    summary:
      'The decision format itself: a question and two statements, each labelled sufficient-or-not — the craft of never solving what you need only to DECIDE about. The statement-question contract (what is actually asked, exactly what would count as an answer), the two-statement discipline (each alone, then together — the three-verdict table), the trap census (the statement that is sufficient but not obviously so; the pair insufficient together; the value-versus-yes/no question). Sufficiency is truth-condition reasoning — cross-referencing Mathematical Logic — and the honest exam note: the format lives in MAT/NMAT-style papers and in the GMAT\u2019s Data Insights section after the Focus edition moved it out of plain quant.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Statement\u2013Question Contract',
      'The Two-Statement Discipline',
      'Sufficiency as Logic: Truth-Conditions',
    ],
  },
  {
    number: 11,
    slug: 'modern-maths-at-aptitude-speed',
    title: 'Modern Maths at Aptitude Speed',
    summary:
      'The CAT/SSC \u2018modern maths\u2019 block as its own exam-speed layer, cross-referencing the shelf\u2019s full treatments: set-theory word models and the two- and three-set Venn counting craft every aptitude paper leans on (the theory lives in Set Theory); functions, logarithms and inequalities at solving speed (Advanced Algebra\u2019s chapters own the depth); permutations, combinations and probability compressed into the exam\u2019s sixty-second patterns (Advanced Algebra\u2019s counting chapter and Probability Theory own the proofs); and heights and distances at the right-triangle gallop (Trigonometry\u2019s chapter owns the full discipline). Aggarwal\u2019s and Arun Sharma\u2019s unit censuses are the source of the block\u2019s existence; no duplication \u2014 the shelf books are cited at every turn.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Set Theory and Venn Diagrams: the Counting Craft',
      'Functions, Logarithms and Inequalities at Exam Speed',
      'Permutations and Combinations at Exam Speed',
      'Probability at Exam Speed',
      'Heights and Distances at Exam Speed',
    ],
  },
  {
    number: 12,
    slug: 'the-synthesis-and-the-doorstep',
    title: 'The Synthesis and the Doorstep',
    summary:
      'The closing synthesis: the craft map — which model answers which question (percentage or ratio? simple or compound? rate-addition or relative speed?) and the recognition drills that move it from conscious to automatic; the book in one page (the model table from simplification to data sufficiency); and the doorstep: aptitude arithmetic is the applied face of the whole mathematics shelf — the models are linear and geometric growth (Algebra and Advanced Algebra), rates (Differential Equations), means (Statistics), and the reader who wants the depth already owns the doors to every one of them.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Craft Map: Which Model When',
      'The Book in One Page: the Model Table',
      'The Doorstep: Aptitude Meets the Full Shelf',
    ],
  },
]

export const quantitativeAptitude: Book = {
  id: 'quantitative-aptitude',
  title: 'Quantitative Aptitude',
  subtitle: 'The competitive-exam arithmetic family — models at speed',
  discipline: 'mathematics',
  level: 'Aptitude arithmetic — the exam family from school maths to the world\u2019s competitive tests',
  description:
    'The book of the commercial-aptitude family: the model arithmetic the world\u2019s competitive exams actually test. Percentage as the working scale; profit and loss with marked price, successive, true and banker\u2019s discounts; simple and compound interest as the two growth models, depreciation, stocks, shares and debentures; partnership, problems on ages, alligation and mixtures; time and work with pipes and cisterns as rate problems; time, speed and distance with trains, boats and streams and races; weighted averages and the number-series craft; the mensuration census at exam speed (cross-referenced — Geometry owns the derivations, Statistics owns data interpretation); and data sufficiency as a decision discipline cross-referencing Mathematical Logic. Foundation Mathematics and the theory shelf own the concepts; this book owns their exam-craft register, the Khattar census\u2019s missing home. Cross-references the whole shelf; hands off to every book it borrows from.',
  status: 'planned',
  accent: ['#92400e', '#451a03'],
  chapters,
}
