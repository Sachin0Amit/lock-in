import type { Book, Chapter } from '../../../types'

/**
 * Korean — the ninth book of the Languages shelf.
 *
 * STATUS: PLANNED (Languages full-shelf planning pass, 2026-11-16) — 9 chapters /
 * 40 planned lessons, zero written. Lesson ids will use the `kor-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Korean owns the Korean register (the standard Seoul line). The japanese and mandarin books own the neighbouring registers (the shared East Asian craft — the honorific registers’ comparison and the Sino-vocabulary’s shared world named honestly, no duplication of the teaching); the Cultural Studies book’s media register cross-references for the K-pop and K-drama immersion craft (the Hallyu named); the TOPIK register is this book’s exam spine; the hangul’s 1446 science is this book’s own celebrated door.
 *
 * RESEARCH PHASE (2026-11-16):
 * - Integrated Korean: Beginning 1 3e (the KLEAR textbook programme — the KLEAR site read this pass: the situation/topic-based lessons with the model dialogues, narration, new words and expressions, vocabulary notes, culture notes; the Beginning 1-2, Intermediate 1-2, Advanced ladders named) — kleartextbook.com as the course spine.
 * - The TOPIK register (topik.go.kr — the official NIIED site read this pass: TOPIK I and TOPIK II with TOPIK II covering sublevels 3-6; the topikguide register read: TOPIK II's 104 questions across Reading and Listening with the writing section's register) as the exam spine.
 * - The hangul's 1446 science (the Hunminjeongeum's celebrated story named — the alphabet's fifteen-minutes promise priced honestly); the Sogang and Yonsei registers named as the other university poles.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'hangul',
    title: 'Hangul\u2019s Miracle',
    summary:
      'The alphabet\u2019s celebrated science: the block\u2019s anatomy (the jamos\u2019 assembly into the syllable\u2019s square — the consonant-vowel-consonant stacking craft with the first reading blocks\u2019 drill); the consonants\u2019 census (the fourteen basics with the shape-as-articulation\u2019s genius — the mieum\u2019s mouth and the ieung\u2019s throat priced as the 1446 science; the tensed jj-pairs\u2019 double letters); the vowels\u2019 strokes (the ten basics with the heaven-earth-human\u2019s philosophy named; the y-vowels and the w-vowels\u2019 composition); the fifteen minutes\u2019 honest promise (the alphabet\u2019s learnability priced honestly — the weekend\u2019s craft against the year of the kanji); the reading\u2019s first week (the syllable-blocks\u2019 fluency drill with the real words\u2019 reading); and the romanisation\u2019s crutch priced (the Revised Romanisation as the map, retired at the first fluency).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Block\u2019s Anatomy',
      'The Consonants\u2019 Shape-as-Articulation',
      'The Vowels\u2019 Strokes and Philosophy',
      'The Fifteen Minutes\u2019 Honest Promise',
      '第4課 メアリーさんのしゅうまつ Mary\'s Weekend'
    ],
  },
  {
    number: 2,
    slug: 'nominal-core',
    title: 'The Nominal Core',
    summary:
      'The noun\u2019s particle engine: the case\u2019s attachment craft (the particles as the noun\u2019s tail — the topic\u2019s i/ga with the wa/iwa\u2019s also; the object\u2019s eul/reul; the possessive\u2019s ui with its spoken recession named); the topic\u2019s i/ga contrast (the topic\u2019s frame against the subject\u2019s focus — the Korean\u2019s own wa/ga riddle priced with the new-information\u2019s examples); the counters\u2019 register (the gae\u2019s generic and the myeong\u2019s people, the geon\u2019s objects and the beon\u2019s times — the number-plus-counter\u2019s arithmetic); the politeness\u2019s levels introduced (the three-tier\u2019s architecture — the hae, hae-yo and ha-se-yo registers as the language\u2019s own social grammar priced up front with the endearing plain\u2019s domain); the numbers\u2019 two systems (the Sino-Korean il-i-sam against the native hana-dul-set — the two-systems\u2019 duality as the first surprise with the counter\u2019s choice rule: the native for the hours, the Sino for the minutes of the same day); and the demonstratives\u2019 craft (the i-geu-jeo\u2019s three-distance map with the yigi\u2019s contraction register).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Particles as the Noun\u2019s Tail',
      'The Topic\u2019s I/Ga Contrast',
      'The Two Number Systems\u2019 Duality',
      'The Three-Tier Politeness Introduced',
    ],
  },
  {
    number: 3,
    slug: 'verb-core',
    title: 'The Verb Core',
    summary:
      'The verb\u2019s engine: the hada class\u2019s craft (the \u2019to do\u2019 as the Sino-vocabulary\u2019s engine — the gongbu-hada\u2019s study-doing as the thousands\u2019 verb-maker; the stem\u2019s anatomy with the dictionary\u2019s -da form); the conjugation\u2019s politeness ladder (the -ayo register as the workhorse with the -seumnida\u2019s formal and the plain\u2019s casual — the same verb\u2019s three suits); the tense\u2019s endings (the past\u2019s -ass/eoss with the future\u2019s gess and the present\u2019s plain — the endings\u2019 attachment craft as the agglutinative engine); the honorific\u2019s si-infix (the gasi vs ga\u2019s respect grammar — the subject\u2019s honorific as the sentence\u2019s social register); the irregulars\u2019 families (the bieup\u2019s and digeut\u2019s palatalisation with the eu\u2019s deletion families priced at the survey depth); the copula\u2019s ida (the \u2019to be\u2019 with its own politeness suits); and the verb\u2019s negation\u2019s two ways (the an-hada\u2019s short and the haji-anhada\u2019s long division with the mot\u2019s can-not register).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Hada Class and the Agglutinative Engine',
      'The Politeness\u2019s Three Suits',
      'The Tense\u2019s Endings and the Honorific\u2019s Infix',
      'The Irregulars and the Negation\u2019s Two Ways',
    ],
  },
  {
    number: 4,
    slug: 'sentence-craft',
    title: 'The Sentence\u2019s Craft',
    summary:
      'The clause\u2019s architecture: the verb-final\u2019s discipline (the SOV\u2019s order with the free-ish middle\u2019s register — the time and place\u2019s adverbs\u2019 slots); the questions\u2019 craft (the yo\u2019s rising as the polite question\u2019s effortless engine with the wh-family\u2019s placement); the conjunctions\u2019 first set (the go\u2019s and, the ji-man\u2019s but, the geuraeseo\u2019s so with the -gi ttaemune\u2019s because-craft); the sentence\u2019s enders\u2019 census (the yo\u2019s boundary, the neyo\u2019s discovery, the gayo\u2019s astonishment priced as the pragmatic\u2019s craft); the reported speech\u2019s Korean way introduced (the indirect\u2019s quote-craft with the -(go) haesseumnida frame named at the survey depth); and the sentence\u2019s honouring architecture (the object\u2019s honorific and the subject\u2019s honorific as the two greased axles priced at the survey depth).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Verb-Final\u2019s Discipline',
      'The Questions and the Enders\u2019 Census',
      'The Conjunctions\u2019 First Set',
      'The Reported Speech\u2019s Korean Way',
      'Adverbs of direction: hin and her'
    ],
  },
  {
    number: 5,
    slug: 'everyday-situations',
    title: 'The Everyday Situations',
    summary:
      'The Integrated Korean arc\u2019s situations: the greetings and introductions (the annyeonghaseyo\u2019s register with the first meeting\u2019s cheoeum boepgetseumnida\u2019s formal courtesy priced as the culture\u2019s own depth); the family and the home (gajok\u2019s census with the family terms\u2019 honorific layer — the abeonim and eomeoni\u2019s parents\u2019 honorifics); the campus and the study (the school\u2019s vocabulary with the gongbu-hada\u2019s study-craft; the office register named); the shopping and the money (the eolmayeyo\u2019s price craft with the juseyo\u2019s polite engine — the \u2019give me\u2019 as the shopping\u2019s universal courtesy priced); the directions and the travel (the oerutjjok-wenjjok\u2019s compass with the pyeon-uijeom\u2019s register); and the food and the restaurant (the masisseoyo\u2019s delicious craft with the jal meogeotseumnida\u2019s gratitude — the meal\u2019s etiquette as the culture\u2019s grammar).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Greetings and the Formal Courtesy',
      'The Family\u2019s Honorific Layer',
      'The Shopping\u2019s Give-Me Courtesy',
      'The Directions and the Restaurant\u2019s Etiquette',
    ],
  },
  {
    number: 6,
    slug: 'vocabulary-craft',
    title: 'The Vocabulary\u2019s Craft',
    summary:
      'The word-hoard\u2019s two worlds: the Sino-Korean register (the hanja-eok\u2019s treasury — the sound\u2019s engine that builds the thousands: the hak-gyo\u2019s school-learning and the dae-hak\u2019s big-learning\u2019s transparency priced as the reader\u2019s multiplier; the hanja\u2019s optional literacy named honestly — the TOPIK\u2019s no-hanja register); the native register (the puri\u2019s natural words with the onomatopoeia\u2019s Korean generosity — the tot-geuk and ppallyi\u2019s sound-word engine priced as the language\u2019s music); the loanwords\u2019 map (the konglish census — the coffee and the size\u2019s naturalisation with the honey\u2019s-eye-apple\u2019s false friend traps priced kindly); the word formation\u2019s craft (the -hada\u2019s verb-maker and the -jeok\u2019s adjectival turn); the politeness vocabulary (the honorific\u2019s separate lexicon — the meokda vs jinja\u2019s eating register with the gye-sida\u2019s money-craft); and the dictionary\u2019s craft (the naver\u2019s and daum\u2019s modern registers named as the learner\u2019s own).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Sino-Korean Multiplier',
      'The Native Register\u2019s Music',
      'The Konglish Census',
      'The Politeness Vocabulary',
    ],
  },
  {
    number: 7,
    slug: 'reading-writing',
    title: 'The Reading and Writing',
    summary:
      'The literacy\u2019s craft: the reading\u2019s ladder (the lesson dialogues and the narration\u2019s short passages; the webtoon\u2019s register priced as the motivated reading — the scroll\u2019s craft with the speech bubbles\u2019 colloquial register); the writing\u2019s forms (the journal\u2019s ilgi with the diary\u2019s past-tense practice; the message\u2019s texts with the messaging\u2019s abbreviated register named; the email\u2019s formality\u2019s suits); the typing\u2019s IME craft (the 2-set keyboard\u2019s map — the dubeolsik\u2019s layout as the Korean\u2019s own typing discipline); the spelling\u2019s discipline (the sai-siot\u2019s elusive between-s and the homophone\u2019s etymology-priced traps named); and the first real texts (the children\u2019s tales and the webnovel\u2019s first chapters priced as the immersion\u2019s doors).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Reading Ladder and the Webtoon Register',
      'The Journal, Message and Email Suits',
      'The 2-Set Keyboard\u2019s Map',
      'The First Real Texts',
      'Abbrev. abbreviated',
      'Coll. colloquial'
    ],
  },
  {
    number: 8,
    slug: 'listening-speaking',
    title: 'The Listening and Speaking',
    summary:
      'The ear and the mouth\u2019s craft: the listening\u2019s drill (the dialogues at the TOPIK I\u2019s clear register; the sound changes\u2019 ear — the tensification\u2019s eunhaseyo vs eunhayeo\u2019s real speech and the nasalisation\u2019s cam-ni-da\u2019s craft priced as the listening\u2019s traps); the speaking\u2019s register (the politeness\u2019s practice in the real situations — the switching\u2019s social map with the first meeting\u2019s formal and the friend\u2019s plain); the pronunciation\u2019s polish (the tensed vs lax vs aspirated three-way — the pp, p and ph\u2019s difference drilled as the Korean\u2019s trophy; the vowel\u2019s harmony\u2019s eu/i axis named); the fluency\u2019s craft (the fillers\u2019 honest use — the geurae and jeo-mal register; the paraphrase\u2019s escape with the mworago\u2019s honest asking); and the immersion\u2019s sea (the K-pop and K-drama\u2019s register priced as the fluency\u2019s food — the Cultural Studies book\u2019s Hallyu register cross-referenced).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Sound Changes\u2019 Ear',
      'The Politeness\u2019s Practice',
      'The Three-Way Consonant Trophy',
      'The Immersion\u2019s Sea',
    ],
  },
  {
    number: 9,
    slug: 'topik-doorstep',
    title: 'The TOPIK Doorstep',
    summary:
      'The register\u2019s close: the TOPIK\u2019s map (the two tests — the TOPIK I for the levels 1-2 with the listening and reading\u2019s structure; the TOPIK II for the levels 3-6 with the ~104 questions\u2019 Reading and Listening plus the Writing\u2019s register read from the official topik.go.kr and the topikguide records); the TOPIK I\u2019s target (the level 2\u2019s B1-style promise: the daily conversation\u2019s comfort, the restaurant and the travel\u2019s registers mastered; the vocabulary\u2019s ~1,500-2,000 and the grammar\u2019s first hundred patterns priced honestly); the TOPIK II\u2019s horizon named (the level 3-4\u2019s B1-B2 promise with the essay\u2019s craft); the exam\u2019s craft (the multiple-choice\u2019s discipline with the time\u2019s arithmetic; the mock\u2019s cycle with the honest diagnosis); and the doorstep — the immersion\u2019s sea (the drama without the subtitles\u2019 ambition), and the reader\u2019s first dream: the first real Seoul conversation with the halmoni\u2019s kindness.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The TOPIK I and II Map',
      'The TOPIK I\u2019s Target',
      'The TOPIK II\u2019s Horizon Named',
      'The Doorstep: The Seoul Conversation',
    ],
  },
]

export const korean: Book = {
  id: 'korean',
  title: 'Korean',
  subtitle: 'Hangul\u2019s fifteen minutes and the honorific engine — the KLEAR arc to TOPIK I',
  discipline: 'languages',
  level: 'Absolute beginner → TOPIK I (levels 1-2) confident, TOPIK II named (CEFR-style A2-B1 in reach)',
  description: 'Korean as a complete course with hangul\u2019s own miracle priced up front (the alphabet\u2019s 1446 science — the fifteen minutes\u2019 honest promise; the block\u2019s anatomy as the syllable\u2019s craft). The sounds first (the jamos\u2019 census — the consonants\u2019 shapes-as-articulation and the vowels\u2019 strokes; the sound changes\u2019 engine — the tensification, nasalisation and liaison as the real speech\u2019s discipline); the nominal core (the particles\u2019 engine — the topic\u2019s i/ga, the object\u2019s eul/reul, the possessive\u2019s ui with the case\u2019s particle-attachment craft; the counters\u2019 register; the politeness levels\u2019 introduction as the language\u2019s own social architecture); the verb\u2019s core (the hada class and the irregulars\u2019 families, the tense\u2019s past and future with the ass/eoss and gess endings, the honorific\u2019s engine — the si infix as the respect\u2019s grammar); the sentence\u2019s craft (the verb-final discipline, the copula\u2019s ida, the negation\u2019s two ways — the an vs mot division, the questions\u2019 craft and the conjunctions\u2019 first set); the everyday situations (the Integrated Korean arc\u2019s situations — the greetings, the family, the campus, the shopping, the directions); the vocabulary\u2019s craft (the Sino-Korean and the native registers\u2019 two worlds — the number systems\u2019 duality as the first surprise; the borrowing\u2019s honest map); the reading and writing (the dialogues and narration, the journal\u2019s entries, the typing\u2019s IME); the listening and speaking (the politeness in practice, the pronunciation\u2019s polish — the tensification\u2019s craft); the exam door (the TOPIK I\u2019s levels 1-2 with the reading and listening; the TOPIK II\u2019s four sublevels named; the strategies); and the doorstep. Cross-references the japanese and mandarin books (the shared East Asian craft named honestly) and hands off to the reader\u2019s first K-drama-without-subtitles ambition.',
  status: 'planned',
  accent: ['#4338ca', '#3730a3'],
  chapters,
}
