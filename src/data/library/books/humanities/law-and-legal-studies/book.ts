import type { Book, Chapter } from '../../../types'

/**
 * Law and Legal Studies — the fourth book of the Polity & Governance branch.
 *
 * STATUS: PLANNED (Humanities & Social Sciences full-shelf planning pass, 2026-11-16) — 10 chapters /
 * 48 planned lessons, zero written. Lesson ids will use the `law-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Law and Legal Studies owns the legal register. Political Science owns the Constitution’s political reading (the two books share the constitutional text — the political chapters there, the jurisprudential and remedial chapters here — cross-referenced both ways); Public Administration owns the administrative machinery (this book’s administrative law is the leash’s legal theory, that book the leash’s practice); International Relations owns the inter-state order with this book’s international law chapter cross-referenced there; the CLAT English comprehension is cross-referenced to the Languages shelf’s english book.
 *
 * RESEARCH PHASE (2026-11-16):
 * - The UGC NET Law syllabus units (read this pass — byjus.com/govt-exams/ugc-net-exam-law-syllabus + ipleaders.in: Unit 1 Jurisprudence — nature and sources of law, the schools of jurisprudence; Unit 2 Constitutional and Administrative Law; the contract/tort/crime/international units) as the university register.
 * - D.D. Basu, Introduction to the Constitution of India 28e (the LexisNexis page read this pass — the constitution under logical chapters) — store.lexisnexis.com.
 * - The UPSC Law optional register (read this pass — drishtiias.com/upsc-optional-subjects/law: Paper I Constitutional and Administrative Law + International Law; Paper II the Law of Crimes with mens rea and actus reus, the IPC's general principles, torts, contract, commercial law).
 * - The CLAT UG register (read this pass — toprankers.com/clat-syllabus + law.careers360.com: the five sections with the legal reasoning's fact-situations applying constitutional law and jurisprudence principles) as the entrance spine.
 * - Salmond's Jurisprudence and V.D. Mahajan's The Legal Theory named as the classic Indian-course poles (the standard university registers).
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'the-legal-map',
    title: 'The Legal Map',
    summary:
      'Law\u2019s own introduction: what law is (the definitions from Austin\u2019s command to the sociological register), the sources\u2019 census (legislation, precedent, custom — the binding and the persuasive); the legal families (the common law\u2019s case method against the civil law\u2019s code, the religious and the customary systems); the Indian legal system\u2019s mixed parentage (the Anglo-Saxon frame over the customary strata priced honestly); the courts\u2019 hierarchy and the jurisdiction\u2019s map; and the legal profession\u2019s own sociology — who makes law and for whom.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Definitions and the Sources',
      'The Legal Families',
      'The Indian System\u2019s Mixed Parentage',
      'The Courts\u2019 Hierarchy and the Profession',
    
      'Paper-II 4. Emergence, Growth and Development of Anthropology in India (contributions of 18th-20th century scholar-administrators and of Indian anthropologists to tribal and caste studies)',
      'Year-Wise Break-up of the UPSC Questions on Indian Polity (General Studies—Prelims) — table of 20 years (2000–2019), with Note I and Note II',
      'Year-Wise Break-up of the UPSC Questions on Indian Polity (General Studies—Prelims) — duplicate',
      'Year-Wise Break-up of the UPSC Marks on Indian Polity (General Studies—Mains) — table of 20 years (2000–2019), with Note I and Note II',
      'Year-Wise Break-up of the UPSC Marks on Indian Polity (General Studies—Mains) — duplicate',
      'The scanned pages do not match the described book. They are not a JEE mathematics reference (Cengage-style) and contain no table of contents to transcribe. What was actually provided'
    ],
  },
  {
    number: 2,
    slug: 'jurisprudence-theories',
    title: 'Jurisprudence',
    summary:
      'The theory of law\u2019s schools: the natural law\u2019s long arc (Aquinas to Finnis\u2019s modern restatement); the positivist age — Austin\u2019s command theory, Kelsen\u2019s pure norm, Hart\u2019s primary and secondary rules with the open texture; the historical school (Savigny\u2019s Volksgeist); the sociological (Ehrlich\u2019s living law, Pound\u2019s engineering); the realists (the American and the Scandinavian); the Hart-Fuller debate and Hart-Devlin\u2019s — law\u2019s morality questioned; and the critical family — CLS, the feminist jurisprudence, the post-colonial legal critique (the Indian registers named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Natural Law Arc',
      'The Positivists: Austin to Hart',
      'The Historical and the Sociological',
      'The Critical Family and the Hart-Fuller Debate',
    ],
  },
  {
    number: 3,
    slug: 'constitutional-law',
    title: 'Constitutional Law',
    summary:
      'The Constitution\u2019s legal reading: the constitution as higher law and the amendment\u2019s engine; the fundamental rights\u2019 text and the courts\u2019 growth of them (the due-process arrival, the expansion from Maneka onward — the leading cases priced as craft); the remedies (the habeas corpus family — Article 32 as the fundamental of fundamentals); the directive principles\u2019 justiciability debate; the federal structure\u2019s legal form (the seventh schedule\u2019s division, the articles 3 question, the fiscal federalism\u2019s legal frame); and the emergency provisions\u2019 legal history — the ADM Jabalpur lesson and the 44th amendment\u2019s answer.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Rights and the Courts\u2019 Growth',
      'The Remedies',
      'The Federal Division\u2019s Legal Form',
      'The Emergency\u2019s Legal History',
    
      'Paper-I 10. Concept of Human Growth and Development (stages of growth; factors affecting growth; ageing and senescence; somatotypes; methodologies for growth studies)'
    ],
  },
  {
    number: 4,
    slug: 'administrative-law',
    title: 'Administrative Law',
    summary:
      'The modern state\u2019s leash law: the delegated legislation\u2019s rise and its control (the pre-publication, the committee scrutiny, the judicial limits); the natural justice\u2019s twin rules (the audi alteram partem and the nemo judex — the exceptions priced); the judicial review\u2019s grounds census (the illegality, irrationality, procedural impropriety — the Wednesbury to the proportionality move); the tribunals\u2019 rise (the article 323A-B frame and the L. Chandra Kumar correction); the statutory and regulatory bodies\u2019 legal register (the TRAI-to-SEBI pattern); and the writs\u2019 census as the citizen\u2019s arsenal.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Delegated Legislation and Its Control',
      'The Natural Justice\u2019s Twin Rules',
      'The Review\u2019s Grounds and the Tribunals',
      'The Writs\u2019 Census',
    ],
  },
  {
    number: 5,
    slug: 'the-private-law-census',
    title: 'The Private-Law Census',
    summary:
      'The citizen\u2019s everyday law: contract\u2019s anatomy (the offer and acceptance, the consideration, the capacity, the free consent\u2019s vitiating factors, the discharge and the remedies — the Indian Contract Act\u2019s register); tort\u2019s census (the negligence, the nuisance, the strict liability with Rylands, the Indian tort compensation\u2019s present); the commercial law\u2019s core (the companies\u2019 forms, the competition act\u2019s logic, the consumer protection\u2019s three-tier machine); and the family and succession law\u2019s plurality priced honestly as the personal-law system\u2019s question.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Contract\u2019s Anatomy',
      'The Tort\u2019s Census',
      'The Commercial Core',
      'The Personal-Law Question',
    ],
  },
  {
    number: 6,
    slug: 'criminal-law',
    title: 'Criminal Law',
    summary:
      'The state\u2019s penal machinery: the crime\u2019s definition (the mens rea and the actus reus as the two elements — the strict liability\u2019s exception priced); the IPC\u2019s general principles (the four kinds of knowledge, the stages of crime — the attempt\u2019s line, the joint liability, the defences\u2019 census from private defence to insanity); the offences\u2019 register at survey depth (against the body, the property, the state — with the special and local laws named); the procedure\u2019s frame (the CrPC\u2019s arrest-to-appeal arc, the Evidence Act\u2019s burden and the estoppel); and the juvenile and the cyber laws\u2019 named registers.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Mens Rea and Actus Reus',
      'The IPC\u2019s General Principles',
      'The Procedure\u2019s Frame',
      'The Juvenile and the Cyber Registers',
    ],
  },
  {
    number: 7,
    slug: 'international-law',
    title: 'International Law',
    summary:
      'The law without a sheriff: the sources (the treaty, the custom, the general principles — the article 38 census) and the consent problem; the subjects (the state, the international organisations, the individual\u2019s contested personality); the treaty\u2019s life cycle (the Vienna register); the state\u2019s responsibility and the immunity; the UN\u2019s legal frame and the ICJ\u2019s docket; the human rights law\u2019s register (the UDHR, the two covenants, the Indian fundamental rights\u2019 handshake priced); and the international environmental law\u2019s regime — with the depth of the order\u2019s politics cross-referenced to International Relations.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Sources and the Consent Problem',
      'The Subjects and the Treaty\u2019s Life',
      'The UN\u2019s Legal Frame',
      'The Human Rights Register',
    ],
  },
  {
    number: 8,
    slug: 'legal-reasoning',
    title: 'Legal Reasoning',
    summary:
      'The lawyer\u2019s thinking taught as a craft: the IRAC method (the issue, rule, application, conclusion — the case study\u2019s backbone); the case\u2019s reading (the ratio and the obiter, the precedent\u2019s binding anatomy); the statutory interpretation\u2019s rules (the literal, the golden, the mischief — the purposive\u2019s rise); the fact-situation method for the CLAT register (the principle applied to new facts — the logical reasoning census: the syllogism, the analogy, the assumption identification); and the legal writing\u2019s craft (the brief, the memorandum, the opinion).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The IRAC Craft',
      'The Case\u2019s Reading and the Precedent',
      'The Interpretation\u2019s Rules',
      'The Fact-Situation and the Logical Census',
    
      'Logical Reasoning (analytical and logical ability; analogy; blood relations; calendars; clocks; coding and decoding; seating and linear/matrix arrangements; logical sequence; premises, assumptions and conclusions; puzzles; binary logic; diagrams; data interpretation - pie charts)'
    ],
  },
  {
    number: 9,
    slug: 'the-profession-and-the-adr',
    title: 'The Profession and the ADR',
    summary:
      'The lawyer\u2019s world: the advocate\u2019s profession (the Bar Council\u2019s frame, the ethics\u2019 register — the duty to the court against the duty to the client priced); the legal aid\u2019s constitutional promise (the article 39A and the NALSA\u2019s machine); the alternative dispute resolution\u2019s rise (the arbitration\u2019s act and its fast-track present, the conciliation and the mediation, the Lok Adalat\u2019s Indian invention); the legal education\u2019s arc (the BCI\u2019s frame, the clinical legal education); and the profession\u2019s future — the technology\u2019s arrival (the document automation, the ODR) cross-referenced to the CS shelf.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Advocate\u2019s Ethics',
      'The Legal Aid\u2019s Promise',
      'The ADR\u2019s Rise',
      'The Legal Education and the Future',
    ],
  },
  {
    number: 10,
    slug: 'contemporary-and-doorstep',
    title: 'The Contemporary and the Doorstep',
    summary:
      'The living register\u2019s close: the constitutional cases that shaped the republic (the kesavananda-to-present line priced as a story — the basic structure, the collegium, the privacy\u2019s Puttaswamy arrival, the electoral bonds\u2019 arc); the technology law\u2019s rise (the data protection act\u2019s architecture, the platform regulation\u2019s debates — the CS shelf\u2019s cybersecurity and generative-AI books cross-referenced for the tech); the environmental jurisisprudence\u2019s Indian invention (the MC Mehta line, the article 21\u2019s environment); the synthesis map; and the doorstep — to the reader\u2019s own rights as the living text, the constitution as the argument that never ends.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Cases That Shaped the Republic',
      'The Technology Law\u2019s Rise',
      'The Environmental Jurisprudence',
      'The Doorstep: The Living Text',
    ],
  },
]

export const lawAndLegalStudies: Book = {
  id: 'law-and-legal-studies',
  title: 'Law and Legal Studies',
  subtitle: 'The rule book and its reasoning — jurisprudence to the working law of the Indian republic',
  discipline: 'humanities',
  level: 'Secondary school civics → university law + CLAT/UPSC (Law optional)/UGC-NET readiness',
  description: 'Law as a discipline and a craft. The legal map first (law\u2019s definitions, the sources, the families — common law against civil law, the customary and the religious, the Indian system\u2019s mixed parentage); the jurisprudence register (the natural law, positivist, historical, sociological and realist schools with the Hart-Fuller debate and the critical theories); the constitutional law depth (the Constitution\u2019s structure, the rights and remedies, the amendment\u2019s engine — the political reading cross-referenced to Political Science, the legal reading owned here); the administrative law (the delegated legislation, the natural justice, the judicial review); the private-law census (contract, tort and the commercial law\u2019s core); the criminal law (mens rea and actus reus, the IPC\u2019s general principles, the procedure\u2019s frame); the international law register; the legal reasoning craft (the IRAC method, the case reading, the statutory interpretation, the fact-situation logic for the CLAT register); the profession\u2019s own world (the courts\u2019 hierarchy, the advocate\u2019s ethics, the ADR); and the contemporary developments. Cross-references Political Science and hands off to the reader\u2019s own rights as the living text.',
  status: 'planned',
  accent: ['#7f1d1d', '#450a0a'],
  chapters,
}
