import type { Book, Chapter } from '../../../types'

/**
 * Mandarin — the eighth book of the Languages shelf.
 *
 * STATUS: PLANNED (Languages full-shelf planning pass, 2026-11-16) — 9 chapters /
 * 42 planned lessons, zero written. Lesson ids will use the `mand-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Mandarin owns the Mandarin register (the standard Putonghua line). The japanese book owns the kanji’s divergent cousin (the shared han world priced honestly at both doorsteps — the character’s same shapes and the readings’ different worlds named, no duplication of the teaching); the CS shelf’s natural-language-processing book owns the computational side of the language’s processing (cross-referenced); the HSK register is this book’s exam spine; the chinese classical register (the wenyanwen) is named honestly as the future classics’ door.
 *
 * RESEARCH PHASE (2026-11-16):
 * - Integrated Chinese 4e (Cheng & Tsui — the award-winning college series' official site read this pass: the level 1 part 1/2 lesson apparatus with the greetings, family, dates and time, hobbies, visiting friends, making appointments situations) as the course spine.
 * - Ross, Ma & Sheng, Modern Mandarin Chinese Grammar: A Practical Guide (Routledge — the two-part structure read this pass: Part A the traditional grammar points — the phrase order, the noun-phrase and verb-phrase structure; Part B the communicative tasks) as the grammar pole.
 * - The HSK register (chinesetest.cn — the official site read this pass: the test syllabus's five components — tasks, topics, vocabulary, grammar and Chinese characters; the Level 5 and 6 registration noted; the New HSK 3.0's nine-level register with the level-3 ~1,000-word count read via the 2026 analysis) as the exam spine.
 * - The pinyin and tone system's official registers named; the HSKK's oral register named as the companion.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'tones-pinyin',
    title: 'The Tones and the Pinyin',
    summary:
      'The ear\u2019s first mountain: the pinyin\u2019s romanisation craft (the letters\u2019 honest traps — the q\u2019s ch, the x\u2019s sh, the zh\u2019s j, the c\u2019s ts with the reading\u2019s drill method priced); the four tones\u2019 music (the first\u2019s high flat, the second\u2019s rising, the third\u2019s dipping and the fourth\u2019s falling — the ma\u2019s five meanings as the language\u2019s own first riddle: mother, hemp, horse, scold and the neutral\u2019s particle); the tone sandhi\u2019s craft (the third-third\u2019s second-tone change — the ni hao\u2019s actual ni hao; the bu and yi\u2019s conditioning named); the neutral tone\u2019s register (the ma\u2019s particle and the baba\u2019s second syllable); the initials and finals\u2019 census (the 21-and-36\u2019s arithmetic with the tongue\u2019s new positions — the zh-ch-sh\u2019s retroflex craft and the ü\u2019s fronted round priced with the lü\u2019s drill); and the first week\u2019s ear-training plan (the tone-pair drill\u2019s method — the ma-ma, ma-ma and ma-ma\u2019s minimal pairs as the daily gym).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Pinyin\u2019s Romanisation Craft',
      'The Four Tones\u2019 Music and the First Riddle',
      'The Tone Sandhi\u2019s Craft',
      'The First Week\u2019s Ear-Training Plan',
      'I heard you started a new job. (you / enjoy / it?)'
    ],
  },
  {
    number: 2,
    slug: 'characters-craft',
    title: 'The Characters\u2019 Craft',
    summary:
      'The eye\u2019s first mountain: the character\u2019s anatomy (the strokes\u2019 census — the eight basics with the order\u2019s discipline: the left-to-right and top-to-bottom laws, the horizontal-before-vertical and the outside-before-inside\u2019s craft); the radical\u2019s index (the bushu\u2019s 214 traditional families with the dictionary\u2019s own lookup craft — the water and the hand\u2019s families as the first friends); the formation\u2019s types (the pictograph\u2019s mountain and the sun; the ideograph\u2019s up and down; the compound\u2019s meaning-meaning — the bright sun-and-moon; the phonetic\u2019s sound-carrying — the ma mother\u2019s craft priced); the simplified against the traditional registers (the two scripts\u2019 honest map — the mainland\u2019s simplified against the Taiwan-Hong Kong traditional with the loves-love character\u2019s famous contrast priced without politics); the memory\u2019s method (the Heisig-style story craft priced against the rote\u2019s honest record — the spaced repetition\u2019s discipline with the muscle\u2019s writing); and the first hundred\u2019s plan (the frequency-ranked register with the writing\u2019s drill).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Stroke\u2019s Discipline',
      'The Radical\u2019s Index and the Formation\u2019s Types',
      'The Two Registers\u2019 Honest Map',
      'The Memory\u2019s Method and the First Hundred',
    ],
  },
  {
    number: 3,
    slug: 'grammar-core',
    title: 'The Grammar Core',
    summary:
      'The grammar\u2019s friendly surprise: the SVO\u2019s order (the subject-verb-object\u2019s familiarity priced as the learner\u2019s luck against the Japanese\u2019s verb-final); the verb\u2019s invariance (the no-conjugation liberation — the shi, qu and mai\u2019s same form in every tense and person; the time\u2019s marking by the adverbial — the zuotian and mingtian\u2019s words doing the tense\u2019s work); the measure words\u2019 census (the ge\u2019s generic default with the specialised families — the ben\u2019s books, the zhang\u2019s flat things, the tiao\u2019s long things, the bei\u2019s cups; the yi-X-YP pattern\u2019s arithmetic — the yi ge ren\u2019s craft); the particles\u2019 engine (the le\u2019s change marker priced honestly as the hardest little word — the new situation\u2019s marker; the ma\u2019s question particle — the yes-no\u2019s effortless asking; the de\u2019s genitive and adverbial craft — the possessive\u2019s wo de and the manner\u2019s pao de kuai); the negation\u2019s craft (the bu\u2019s general and the mei\u2019s completed-negative division); and the adjectives as stative verbs (the hen\u2019s mandatory link — the ta hen gao\u2019s surprising \u2019very\u2019 priced as the predicate\u2019s craft).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The SVO Luck and the Verb\u2019s Invariance',
      'The Measure Words\u2019 Census',
      'The Particles\u2019 Engine — the Le\u2019s Craft',
      'The Negation and the Stative Adjectives',
      'Dan has been in the same job for a long time. (He / start) to get bored'
    ],
  },
  {
    number: 4,
    slug: 'everyday-situations',
    title: 'The Everyday Situations',
    summary:
      'The Integrated Chinese arc\u2019s situations: the greetings and the introductions (the ni hao\u2019s register and the nin\u2019s polite honorific — the name\u2019s jiao de craft; the xing and ming\u2019s family-name-first social arithmetic); the family and the relations (the jia\u2019s census with the Chinese kinship\u2019s precision — the gege, didi, jiejie, meimei\u2019s sibling grid and the baba-mama\u2019s register); the dates and the time (the nian-yue-ri-ri\u2019s calendar arithmetic — the year-month-day\u2019s descending order as the dates\u2019 craft; the dian\u2019s clock register with the fen\u2019s minutes); the hobbies and the likes (the xihuan\u2019s craft with the hen\u2019s mandatory link revisited); the food and the restaurant (the fan and cai\u2019s meal register — the many words for rice\u2019s craft priced; the fuwuyuan\u2019s waiter\u2019s call — the ting de dong and the mai dan\u2019s bill register); the shopping and the bargaining (the duo shao qian\u2019s craft and the tai gui le\u2019s theatre — the bargaining\u2019s polite three rounds priced as the culture\u2019s grammar); and the appointments and the phone (the you kong ma\u2019s calendar craft with the dian hua\u2019s register).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Greetings and the Names\u2019 Arithmetic',
      'The Family\u2019s Kinship Grid',
      'The Dates and the Clock',
      'The Restaurant and the Bargaining\u2019s Theatre',
    ],
  },
  {
    number: 5,
    slug: 'vocabulary-craft',
    title: 'The Vocabulary\u2019s Craft',
    summary:
      'The word-hoard\u2019s transparent engine: the compounding logic (the Mandarin\u2019s word-building transparency — the dian nao\u2019s electric brain, the xiong mao\u2019s bear-cat, the dian hua\u2019s electric speech; the two-character word\u2019s arithmetic as the learner\u2019s own multiplier — the 2,000 characters to the 10,000 words\u2019 honest map); the synonym\u2019s precision craft (the kan-jian and du\u2019s look-see against read\u2019s division; the shuo, jiang and tan\u2019s speak register); the chengyu\u2019s first glance (the four-character idiom\u2019s treasury — the ma ma hu hu\u2019s horse-horse-tiger-tiger carelessness priced as the language\u2019s own joke; the chengyu\u2019s learning method named at the survey depth); the politeness\u2019s register (the qing, xie xie and bu hao yi si\u2019s craft — the bu hao yi si\u2019s embarrassed-politeness priced kindly); the numbers\u2019 arithmetic (the yi, shi, bai, qian\u2019s place-value craft with the liang\u2019s two\u2019s placement rule); and the dictionary\u2019s craft (the Pleco era\u2019s honest register — the flashcard\u2019s modern craft priced).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Compounding Logic\u2019s Multiplier',
      'The Synonym\u2019s Precision Craft',
      'The Chengyu\u2019s First Glance',
      'The Numbers and the Dictionary\u2019s Craft',
    ],
  },
  {
    number: 6,
    slug: 'reading-writing',
    title: 'The Reading and Writing',
    summary:
      'The literacy\u2019s craft: the reading\u2019s ladder (the graded texts from the lesson dialogues to the short passages; the menu and the street sign\u2019s real reading — the immersion\u2019s own first texts priced); the character\u2019s writing muscle (the drill\u2019s method — the grid paper\u2019s craft with the stroke\u2019s counting discipline; the fluency\u2019s measurement — the characters-per-minute\u2019s honest clock); the typing\u2019s IME craft (the pinyin-input\u2019s method — the modern learner\u2019s own writing register; the candidate\u2019s selection craft and the shu ru fa\u2019s register); the writing\u2019s forms (the short composition\u2019s craft — the zi wo jie shao\u2019s self-introduction with the ye, er, ran hou\u2019s connectives; the message and email\u2019s frames with the ni hao\u2019s open and the zhu hao\u2019s close); and the first real texts (the children\u2019s stories and the fables\u2019 register priced as the first literature — the little horse\u2019s river tale named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Reading Ladder',
      'The Writing Muscle and the IME Craft',
      'The Short Composition\u2019s Craft',
      'The First Real Texts',
      'Appendix 5 Short forms (I’m / you’ve / didn’t etc.)'
    ],
  },
  {
    number: 7,
    slug: 'listening-speaking',
    title: 'The Listening and Speaking',
    summary:
      'The ear and the mouth\u2019s craft: the listening\u2019s drill (the tone-pair ear\u2019s gym — the four tones\u2019 identification drills at the word and sentence\u2019s levels; the dictation\u2019s craft with the pinyin\u2019s bridge and the character\u2019s writing); the speaking\u2019s register (the tones\u2019 production at the sentence\u2019s speed — the third tone\u2019s sandhi in the real speech priced; the retroflex and the ü\u2019s trophy drills); the fluency\u2019s craft (the fillers\u2019 honest use — the zhe ge and na ge register; the paraphrase\u2019s escape — the shuo de ling yi zhong fangfa craft); the conversation\u2019s strategies (the ting bu dong\u2019s honest asking and the qing zai shuo yi bian\u2019s repair; the duibuqi and mei guan xi\u2019s courtesy register); and the immersion\u2019s sea (the CDrama and the songs\u2019 register priced as the fluency\u2019s food — the Cultural Studies book\u2019s media register cross-referenced).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Tone-Pair Ear\u2019s Gym',
      'The Production\u2019s Trophy Drills',
      'The Repair\u2019s Craft',
      'The Immersion\u2019s Sea',
    ],
  },
  {
    number: 8,
    slug: 'grammar-depth',
    title: 'The Grammar\u2019s Depth',
    summary:
      'The engine\u2019s second floor: the ba construction (the object\u2019s fronting — the ba na ben shu gei wo\u2019s craft priced as the disposal\u2019s frame with the honest register: when the ba and when the plain SVO); the bei passive (the agent\u2019s introduction — the bei ta da le\u2019s craft with the not-so-common passive\u2019s honest register: the Chinese prefers the topic\u2019s plain); the resultative complements (the dao, wan, hao\u2019s completion craft — the chi wan le\u2019s finished-eating and the xue hui le\u2019s learned-able priced as the verb\u2019s second half); the directional complements (the lai and qu\u2019s motion craft with the shang, xia, jin, chu\u2019s compound directions); the bi\u2019s comparison (the ta bi wo gao\u2019s craft with the comparison\u2019s negative\u2019s mei you register); the topic\u2019s prominence (the topic-comment\u2019s frame as the Chinese\u2019s own architecture — the zhe ge ren, wo jian guo\u2019s topic-fronted craft); and the yao and hui modal register (the yao\u2019s want-will and the hui\u2019s can-know craft with the neng and keyi\u2019s permission family).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Ba Construction',
      'The Bei Passive and Its Honest Register',
      'The Resultative and Directional Complements',
      'The Topic\u2019s Prominence and the Modals',
      'We’re not in a hurry. (why / you / walk / so fast?)',
      '(I / look) for Sophie. Do you know where she is?',
      '(They / build) a new hospital. It will be finished next year'
    ],
  },
  {
    number: 9,
    slug: 'hsk-doorstep',
    title: 'The HSK Doorstep',
    summary:
      'The register\u2019s close: the HSK\u2019s map (the levels 1-6 register with the syllabus\u2019s five components read from the official chinesetest.cn register — the tasks, topics, vocabulary, grammar and characters; the Level 5 and 6\u2019s separate registration noted); the HSK 1-3\u2019s target census (the HSK 1\u2019s ~150 words and the 150 characters; the HSK 2\u2019s ~300; the HSK 3\u2019s ~600 words with the ~600-700 characters\u2019 cumulative register priced honestly); the HSK 4\u2019s step (the ~1,200 words\u2019 register with the listening-reading-writing test\u2019s format); the New HSK 3.0\u2019s register priced honestly (the 2021/2026 nine-level standard with the level-3\u2019s ~1,000-word count and the advanced band\u2019s expansion — the evolving standard named without the anxiety); the exam\u2019s craft (the listening\u2019s picture-matching and the reading\u2019s grammar-fill formats with the mock\u2019s cycle); and the doorstep — the immersion\u2019s sea (the CDrama without the subtitles\u2019 ambition), the CS shelf\u2019s NLP cross-reference (the language\u2019s computational side), and the reader\u2019s first dream: the Beijing restaurant\u2019s menu read cold.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The HSK\u2019s Map and the Five Components',
      'The HSK 1-3 Censuses',
      'The HSK 4\u2019s Step and the New 3.0\u2019s Honest Register',
      'The Doorstep: The Menu Read Cold',
    ],
  },
]

export const mandarin: Book = {
  id: 'mandarin',
  title: 'Mandarin',
  subtitle: 'Tones, characters and the world\u2019s biggest speech community — the HSK ladder to real reading',
  discipline: 'languages',
  level: 'Absolute beginner → HSK 1-3 confident, HSK 4 in reach (the new HSK 3.0 register priced honestly)',
  description: 'Mandarin as a complete course with the tone-and-character engine priced honestly up front. The sounds first (the pinyin\u2019s romanisation craft, the four tones and the neutral\u2019s music — the ma\u2019s five meanings as the first riddle; the initials and finals\u2019 census, the third tone\u2019s sandhi craft); the characters\u2019 craft (the stroke\u2019s order discipline, the radicals as the dictionary\u2019s own index, the simplified against the traditional registers named honestly, the memory\u2019s method — the story craft priced against the rote\u2019s record); the grammar\u2019s core (the SVO\u2019s friendliness, the verb\u2019s invariance — no conjugation\u2019s liberation priced, the measure words\u2019 classifier census — the ge, ben, zhang families; the particles\u2019 engine — the le, ma, de craft; the adjectives as stative verbs); the everyday situations (the Integrated Chinese arc\u2019s first lessons — the greetings, the family, the dates and time, the hobbies, the visiting of friends, the appointments); the vocabulary\u2019s craft (the compounding logic\u2019s transparency — the computer\u2019s electric-brain, the panda\u2019s bear-cat; the chengyu\u2019s first glance); the reading and writing (the short texts, the character\u2019s writing muscle, the typing\u2019s IME craft); the listening and speaking (the tone-pair drills — the ma-ma\u2019s ear, the pronunciation\u2019s polish); the grammar\u2019s depth (the ba construction, the bei passive, the resultative and directional complements, the bi\u2019s comparison); the exam door (the HSK\u2019s levels 1-4 with the syllabus\u2019s five components read from the official register — tasks, topics, vocabulary, grammar, characters; the new HSK 3.0\u2019s nine-level register priced honestly as the evolving standard); and the doorstep. Cross-references the japanese book (the shared han world priced honestly) and hands off to the reader\u2019s first menu-read in a Beijing restaurant.',
  status: 'planned',
  accent: ['#b91c1c', '#7f1d1d'],
  chapters,
}
