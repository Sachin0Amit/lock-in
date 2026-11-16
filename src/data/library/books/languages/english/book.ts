import type { Book, Chapter } from '../../../types'

/**
 * English — the first book of the Languages shelf.
 *
 * STATUS: PLANNED (Languages full-shelf planning pass, 2026-11-16) — 10 chapters /
 * 40 planned lessons, zero written. Lesson ids will use the `eng-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): English owns the English register — the world’s lingua franca and the library’s own reading key. The Humanities shelf’s law-and-legal-studies book’s CLAT-English comprehension lines cross-reference here; the future Arts shelf’s literature books (the reading of poetry, prose, drama at depth) take over where this book’s literature-reading chapter is the doorstep; the CS shelf’s books are read in this language (the tech vocabulary’s register named); every other language book’s contrastive notes point here where the reader’s English helps (the cognate bridges to French, Spanish, Portuguese, Italian and German’s shared vocabulary).
 *
 * RESEARCH PHASE (2026-11-16):
 * - The CEFR level description (coe.int — the official page read this pass: six levels A1-C2, three broad bands — Basic User, Independent User, Proficient User, with the can-do descriptors) as the book's spine.
 * - Raymond Murphy, English Grammar in Use (the unit structure read this pass — 145 units across 15 grammatical theme areas in the current edition; the 5e's 136-unit register also read) — the Cambridge red book as the grammar pole.
 * - Norman Lewis, Word Power Made Easy (the chapter structure read this pass via the toprankers PDF record — the vocabulary-building sessions and the teaser apparatus) as the vocabulary pole.
 * - Michael Swan, Practical English Usage named as the usage pole (the reference register).
 * - The IELTS official register (ielts.org — the band scale 0-9 with 9 Expert through 4 Limited read this pass; the four skills' structure from takeielts.britishcouncil.org) + the TOEFL iBT content page (ets.org — the four sections read this pass) as the exam spines.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'the-ladder-and-the-basics',
    title: 'The Ladder and the Basics',
    summary:
      'The course\u2019s own map: the CEFR\u2019s six levels as the book\u2019s staircase (what a reader can actually DO at A1, A2, B1, B2, C1 — the can-do sentences read and priced); the placement question (where the reader starts — the honest self-test); the sentence\u2019s first anatomy (the subject-verb-object core, the capital letter and the full stop\u2019s covenant); and the learning method\u2019s register (the comprehensible input\u2019s craft, the spaced repetition\u2019s honesty, the four-skill habit from day one).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The CEFR\u2019s Six Rungs',
      'Where the Reader Starts',
      'The Sentence\u2019s First Anatomy',
      'The Learning Method\u2019s Register',
    ],
  },
  {
    number: 2,
    slug: 'grammar-core-i',
    title: 'The Grammar Core I',
    summary:
      'The engine room\u2019s first shift: the parts of speech\u2019s census (the noun and its kinds, the pronoun\u2019s cases, the adjective-adverb axis, the preposition\u2019s map, the conjunction\u2019s joins); the verb\u2019s full tense engine (the simple and continuous of the past, present and future, the perfect\u2019s logic as the two-time trick, the twelve-cell grid built and drilled); the voice\u2019s turn (the active and passive\u2019s swap craft); and the subject-verb agreement\u2019s traps (the either-or, the collective noun, the Indian English\u2019s own slips named with affection).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Parts of Speech Census',
      'The Twelve Tenses Built',
      'The Voice and the Agreement Traps',
      'The First Drills\u2019 Craft',
    ],
  },
  {
    number: 3,
    slug: 'grammar-core-ii',
    title: 'The Grammar Core II',
    summary:
      'The engine\u2019s second shift: the modal\u2019s register (the can-could-may-might-must-shall-should-will-would census with the politeness and the probability scales); the conditional\u2019s ladder (the zero, first, second and third — the unreal\u2019s grammar priced honestly); the reported speech\u2019s shift (the backshift\u2019s rule and its honest exceptions); the question tag\u2019s craft and the inversion\u2019s moments; the article\u2019s deep craft (the a-an-the and the zero article\u2019s Indian difficulty priced with the method); the preposition\u2019s collocation register (the verb + preposition, the adjective + preposition families); and the relative clause\u2019s joinery.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Modals\u2019 Register',
      'The Conditional Ladder',
      'The Reported Speech and the Tags',
      'The Articles, Prepositions and Relatives',
    ],
  },
  {
    number: 4,
    slug: 'vocabulary-craft',
    title: 'The Vocabulary Craft',
    summary:
      'The word-hoard\u2019s building method: the word formation\u2019s engine (the roots — the Latin and Greek census, the prefixes and suffixes\u2019 arithmetic — the Word Power method\u2019s sessions); the phrasal verb\u2019s register (the particle\u2019s meaning engine — the up, out, off and on\u2019s grammar); the collocation\u2019s craft (the make-do, the strong tea not powerful — the naturalness\u2019s key); the register\u2019s axis (the formal against the informal, the slang\u2019s place, the academic word list\u2019s core); the idioms\u2019 honest census (the frequency-ranked set, not the museum); and the learner\u2019s own dictionary craft (the monolingual turn as the milestone).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Roots and Affixes Engine',
      'The Phrasal Verbs and the Collocations',
      'The Register Axis',
      'The Idioms and the Dictionary Craft',
    ],
  },
  {
    number: 5,
    slug: 'reading-craft',
    title: 'The Reading Craft',
    summary:
      'The eye\u2019s skill: the comprehension\u2019s three levels (the literal, the inferential, the evaluative — the reader\u2019s own ladder); the reading\u2019s speeds (the skimming for the gist, the scanning for the fact, the study reading for the depth); the passage\u2019s anatomy (the topic sentence\u2019s hunt, the discourse markers\u2019 signposts — however, moreover, in contrast); the vocabulary-from-context craft (the guess-before-the-dictionary discipline); and the literature\u2019s doorstep (the short story\u2019s first reads, the poem\u2019s first patience, the newspaper\u2019s everyday craft — the future Arts shelf\u2019s literature books named as the continuation).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Three Levels',
      'The Speeds and the Signposts',
      'The Context Craft',
      'The Literature Doorstep',
    ],
  },
  {
    number: 6,
    slug: 'writing-craft',
    title: 'The Writing Craft',
    summary:
      'The hand\u2019s skill: the sentence\u2019s expansion (the simple, compound and complex — the variety\u2019s rhythm); the paragraph\u2019s anatomy (the topic sentence, the support, the wrap — the hamburger priced honestly); the essay\u2019s forms (the for-and-against, the problem-solution, the descriptive and narrative modes); the letters and emails\u2019 registers (the formal against the informal — the complaint and the application\u2019s frames); the precis and summary\u2019s compression craft; the report and the review\u2019s frames; and the punctuation\u2019s full census (the comma\u2019s nine jobs, the semicolon\u2019s join, the apostrophe\u2019s two powers — the Indian writer\u2019s own trouble spots drilled).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'From Sentence to Paragraph',
      'The Essay\u2019s Forms',
      'The Letters, Emails and Reports',
      'The Punctuation Census',
    ],
  },
  {
    number: 7,
    slug: 'listening-speaking',
    title: 'The Listening and Speaking Craft',
    summary:
      'The ear and the mouth: the listening\u2019s levels (the gist, the detail, the attitude\u2019s tone); the accents\u2019 honest census (the British, the American, the Indian and the world Englishes\u2019 family — the Mutual intelligibility frame); the note-taking craft (the abbreviations\u2019 shorthand, the table and map-filling tasks); the pronunciation\u2019s engine (the phoneme\u2019s minimal pairs — the ship-sheep and the vet-wet drills, the word\u2019s stress, the sentence\u2019s rhythm and intonation, the Indian mother-tongue\u2019s own interferences priced kindly); the speaking\u2019s fluency craft (the fillers\u2019 honest use, the paraphrase\u2019s escape when the word is missing, the turn-taking\u2019s etiquette); and the conversation\u2019s situations (the interview, the presentation, the group discussion — the Indian competitive registers named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Listening Levels and the Accents',
      'The Pronunciation Engine',
      'The Fluency Craft',
      'The Situations\u2019 Register',
    ],
  },
  {
    number: 8,
    slug: 'usage-traps',
    title: 'The Usage Traps',
    summary:
      'The error\u2019s own museum: the commonly confused pairs\u2019 census (the affect-effect, the principal-principle, the its-it\u2019s, the there-their-they\u2019re, the lose-loose families — the frequency-ranked drill); the errors\u2019 Indian census (the preposition\u2019s omission, the article\u2019s absence, the tense\u2019s mixing — the MT-influence\u2019s pattern named without shame and drilled with method); the punctuation\u2019s trouble spots revisited (the run-on and the fragment\u2019s repair); the spelling\u2019s demons (the receive, the definitely, the separate families); the redundancy\u2019s register (the \u2019return back\u2019 family retired); and the register\u2019s lapses (the slang in the exam hall priced).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Confused Pairs Census',
      'The Indian English Census',
      'The Run-On and Fragment Repair',
      'The Spelling Demons and the Redundancies',
    ],
  },
  {
    number: 9,
    slug: 'academic-professional',
    title: 'The Academic and Professional Register',
    summary:
      'The C1\u2019s world: the academic writing\u2019s craft (the essay\u2019s thesis-driven structure, the citation\u2019s frame, the paraphrase-and-synthesis craft, the abstract\u2019s compression); the presentation\u2019s craft (the slide\u2019s discipline, the delivery\u2019s arc, the Q&A\u2019s poise); the business communication\u2019s census (the email\u2019s etiquette, the CV and cover letter\u2019s frames, the LinkedIn register, the meeting\u2019s minutes); the interview\u2019s English (the job and the visa interview\u2019s registers); and the digital register (the chat against the email, the emoji\u2019s grammar priced honestly).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Academic Writing Craft',
      'The Presentation and the Meeting',
      'The CV, Letter and Interview Registers',
      'The Digital Register',
    ],
  },
  {
    number: 10,
    slug: 'exam-doorstep',
    title: 'The Exam Doorstep',
    summary:
      'The registers\u2019 ladder and the close: the IELTS in full (the four skills\u2019 format — the listening\u2019s 40 questions, the reading\u2019s three passages, the writing\u2019s two tasks with the chart-and-graph craft for Task 1, the speaking\u2019s three parts; the band 0-9\u2019s scale with the 7.0 strategy and the per-skill\u2019s honest work; the academic against the general training\u2019s choice); the TOEFL iBT\u2019s own map (the four sections\u2019 formats, the two-stage adaptive reading-listening noted, the speaking\u2019s six tasks and the writing\u2019s two — the 100+ strategy); the Cambridge family named (the FCE-CAE-CPE ladder); the C1-C2\u2019s can-do\u2019s as the reader\u2019s own next promise; and the doorstep — to the whole library\u2019s English books (every shelf now readable), and to the other languages on this shelf as the reader\u2019s next love.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The IELTS in Full',
      'The TOEFL\u2019s Map',
      'The Cambridge Ladder Named',
      'The Doorstep: The Library\u2019s Key',
    ],
  },
]

export const english: Book = {
  id: 'english',
  title: 'English',
  subtitle: 'The world\u2019s lingua franca earned — grammar, vocabulary, the four skills and the exam ladder',
  discipline: 'languages',
  level: 'Absolute beginner (A1) → advanced exam readiness (IELTS 7+/TOEFL 100+, CEFR B2-C1)',
  description: 'English as a first foreign or second language, taught as a complete course from the alphabet\u2019s phonics to the exam registers. The CEFR ladder priced up front as the book\u2019s own spine (A1 the beginner\u2019s can-dos, B1 the independent user, C1 the proficient); the grammar core in two waves — the sentence\u2019s anatomy and the tenses\u2019 full engine, then the modals, conditionals, reported speech and the article-preposition craft; the vocabulary building\u2019s method (the word formation\u2019s roots and affixes, the phrasal verbs, the collocations, the register\u2019s formal-informal axis — the Word Power method honoured); the four skills each with its craft — reading\u2019s comprehension levels, writing\u2019s paragraph-to-essay arc, listening\u2019s accents census, speaking\u2019s pronunciation-stress-fluency register; the usage traps\u2019 honest census (the commonly confused pairs, the error-spotting grammar, the punctuation, the Indian English features priced without shame); the academic and professional registers; and the exam door — the IELTS four-skill band 0-9 ladder with per-skill strategy, the TOEFL iBT\u2019s sections, the C1-C2 can-dos. Cross-references the Humanities shelf\u2019s law-and-legal-studies (the CLAT English register) and hands off to the whole library — English as the library\u2019s own reading key.',
  status: 'planned',
  accent: ['#1d4ed8', '#1e3a8a'],
  chapters,
}
