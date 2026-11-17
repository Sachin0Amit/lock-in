import type { Book, Chapter } from '../../../types'

/**
 * Spanish — the seventh book of the Languages shelf.
 *
 * STATUS: PLANNED (Languages full-shelf planning pass, 2026-11-16) — 9 chapters /
 * 47 planned lessons, zero written. Lesson ids will use the `spa-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Spanish owns the Spanish register (the standard Castilian line with the Latin American family’s breadth priced honestly — the vosotros and the seseo registers named, not duplicated: one book, one engine, the varieties’ awareness). The portuguese book owns the sibling bridge (the two languages’ shared Romance craft cross-referenced — the false-friend traps’ census shared); the french and italian books own the family’s other siblings; the english book owns the Norman-loan bridge’s other side; the DELE and CLEP registers are this book’s exam spines.
 *
 * RESEARCH PHASE (2026-11-16):
 * - Margarita Madrigal, Madrigal's Magic Key to Spanish (the 45-lesson word-building method read this pass — the cognate census and the instant-vocabulary arithmetic) as the vocabulary spine.
 * - Practice Makes Perfect: Complete Spanish Grammar (the McGraw-Hill unit structure read this pass — the 26-unit register from the present indicative through the preterit/imperfect contrast, the future and conditional, the reflexive verbs, the subjunctive arcs) as the grammar pole.
 * - The DELE register (read this pass — cervantes.org: six exam levels A1-C2 per the CEFR; the B1's four-part format read in detail from the London centre's exam-format page — the 70-minute reading comprehension, 40-minute listening, 60-minute written expression, and the oral expression with its 30-minute pair format; dele.org's level pages also read) as the exam spine.
 * - The CLEP Spanish Language Levels 1 and 2 register (clep.collegeboard.org — read this pass: the two-to-four semesters' measure; the Spanish with Writing variant's 100 multiple-choice + two writing tasks named) as the North-American register.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'sounds-and-script',
    title: 'The Sounds and the Script',
    summary:
      'The mouth\u2019s Spanish craft: the five-vowel purity (the a-e-i-o-u\u2019s one-sound discipline against the English\u2019s diphthong glides — the reading\u2019s first luck priced); the consonants\u2019 census (the ñ\u2019s ny craft, the ll and y\u2019s ye registers with the rioplatense\u2019s zh variation named; the j\u2019s throaty h; the c and g\u2019s soft-hard split before the e-i; the b and v\u2019s same-sound surprise); the r\u2019s two engines (the tap\u2019s pero and the trill\u2019s perro\u2019s difference drilled as the first trophy); the stress\u2019s law (the two-syllable\u2019s default, the last-syllable\u2019s accent, the penultimate\u2019s rule with the orthographic accent\u2019s census — the sí vs si\u2019s meaning guard); and the alphabet\u2019s final letter (the zeta\u2019s Castilian th and the Latin American s — the dialect\u2019s first honest note).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Five-Vowel Purity',
      'The Consonant Census',
      'The R\u2019s Two Engines',
      'The Stress\u2019s Law and the Accent\u2019s Guard',
      'Kate phoned last night. She’s on holiday with friends. (She / have)',
      'If necessary, a stressed syllable in a word is indicated by the mark placed before the stressed syllable, and/or by the use of bold type, e.g. die Dok\'toren, unter\'schreiben. Where it is required, a stressed word in context is shown by underlining, e.g. Wie bist du denn gekommen?'
    ],
  },
  {
    number: 2,
    slug: 'nominal-core',
    title: 'The Nominal Core',
    summary:
      'The noun\u2019s engine: the gender\u2019s o-a patterns (the -o masculine and -a feminine families with the exceptions\u2019 honest census — the el día and la mano\u2019s traps; the -ción, -dad, -tad feminine certainties); the articles\u2019 system (the el-la-los-las definite and the un-una indefinite with the el-agua\u2019s contraction trap); the personal a\u2019s surprise (the Quiero a María\u2019s a — the English\u2019s invisible direct object marked in Spanish, priced as the language\u2019s own courtesy to persons); the adjectives\u2019 agreement (the o-a endings\u2019 match with the invariant -e and consonant-stems\u2019 craft; the buen-mal-gran\u2019s prenominal shorts); the possessives and demonstratives\u2019 census (the mi-tu-su with the su\u2019s ambiguity priced; the este-ese-aquel\u2019s three-distance craft); the numbers\u2019 arithmetic (the cien and mil\u2019s discipline with the uno-un\u2019s prenominal adjustment); and the ser and estar\u2019s divide introduced (the two \u2019to be\u2019 verbs\u2019 first map — the essence\u2019s ser against the state\u2019s estar, the soy feliz vs estoy feliz\u2019s happiness riddle priced as the learner\u2019s first real thought).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Gender\u2019s Patterns and Exceptions',
      'The Articles and the Personal A',
      'The Adjectives\u2019 Agreement',
      'The Ser-Estar Divide Introduced',
    ],
  },
  {
    number: 3,
    slug: 'verb-engine',
    title: 'The Verb Engine',
    summary:
      'The verb\u2019s machine: the present\u2019s three families (the -ar\u2019s hablar with the -o-as-a-amos-áis-an\u2019s six-sentence symmetry; the -er\u2019s comer and the -ir\u2019s vivir\u2019s nearly twin tables); the irregular canon (the ser\u2019s soy-eres-es treasury; the ir\u2019s voy-vas-va\u2019s suppletive wonder — three Latin verbs\u2019 ghost in one; the tener\u2019s tengo and the hacer\u2019s hago\u2019s G-insertions); the stem-changers\u2019 boot (the e-to-ie\u2019s pensar — the pienso family\u2019s boot-shaped paradigm drawn; the o-to-ue\u2019s poder and the e-to-i\u2019s pedir\u2019s craft); the present progressive\u2019s estar (the -ando and -iendo with the present\u2019s Spanish default priced — the two-register choice); the reflexive verbs\u2019s routine (the levantarse\u2019s daily register with the se\u2019s placement craft); the informal commands\u2019 craft (the afirmativo\u2019s third-person and the negative\u2019s subjunctive-shaped craft); and the gustar\u2019s back-to-front surprise (the me gusta\u2019s object-first engine as the language\u2019s own courtesy — the like\u2019s inversion priced as the first big smile).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Present\u2019s Three Families',
      'The Irregular Canon and the Stem-Changers\u2019 Boot',
      'The Progressive and the Reflexive Routine',
      'The Gustar\u2019s Inversion',
      'Lists of words are in general alphabetical, unless it appeared more helpful to the user to present them in a different order',
      'O: Ger Boot, Fr eau ə Ger bitte, Engl china'
    ],
  },
  {
    number: 4,
    slug: 'madrigal-method',
    title: 'The Madrigal Method',
    summary:
      'The vocabulary\u2019s magic key: the cognate\u2019s census (the -ción to -tion, -dad to -ty, -oso to -ous, -mente to -ly families with the thousands\u2019 arithmetic — the head start honestly counted and the method\u2019s drill); the suffix\u2019s engine (the -ito and -ón\u2019s size-and-feeling craft — the momentito\u2019s small kindness priced); the word\u2019s biography (the cambiar\u2019s change and the ambular\u2019s walk — the Latin roots\u2019 shared world with the English\u2019s Norman bridge cross-referenced); the false friends\u2019 census (the embarazada and the actual traps with the frequency-ranked register); the conversion\u2019s craft (the el and un\u2019s noun-forming gender marks); and the word-a-day\u2019s arithmetic (the Madrigal method\u2019s own promise — the thousand-word month priced honestly with the retention\u2019s craft).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Cognate Census',
      'The Suffix\u2019s Engine',
      'The False Friends\u2019 Census',
      'The Word-a-Day\u2019s Arithmetic',
      'Key to Additional exercises',
      '第12課 病気 Feeling Ill'
    ],
  },
  {
    number: 5,
    slug: 'everyday-situations',
    title: 'The Everyday Situations',
    summary:
      'The course\u2019s situations: the greetings and the introductions (the ¿cómo está usted? and the tú\u2019s informal contract — the usted-tú\u2019s social grammar priced; the mucho gusto\u2019s introduction craft); the family and the home (la familia\u2019s census with the possessive\u2019s craft); the shopping and the numbers (the ¿cuánto cuesta? register with the market\u2019s vocabulary; the numbers\u2019 listening arithmetic); the directions and the travel (the a la derecha and todo recto\u2019s compass; the transportation\u2019s vocabulary with the twenty-plus countries\u2019 reach priced — the hispanophone world\u2019s map as the language\u2019s own geography); the food and the restaurant (la cuenta por favor\u2019s register with the tapas\u2019 culture notes); the time and the weather (the ¿qué hora es? and the hace sol\u2019s hace-engine — the weather\u2019s impersonal craft); and the phone and the email\u2019s frames (the saludos cordiales register).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Greetings and the Usted-Tú Contract',
      'The Shopping and the Directions',
      'The Hispanophone World\u2019s Map',
      'The Food, Time and Weather Registers',
    ],
  },
  {
    number: 6,
    slug: 'reading-writing',
    title: 'The Reading and Writing',
    summary:
      'The literacy\u2019s craft: the reading\u2019s ladder (the graded readers to the first real short stories — the Cortázar\u2019s simple tales and the children\u2019s literature\u2019s register priced; the news\u2019s headline craft — the ABC and El País\u2019s register named); the writing\u2019s forms (the message\u2019s SMS and email frames with the informal\u2019s jaja register; the letter\u2019s formal frame — the estimado and cordialmente\u2019s close; the diary\u2019s diario register); the A1-A2\u2019s can-dos priced (the self-introduction\u2019s writing, the postcard\u2019s holiday frame, the form\u2019s filling); the orthography\u2019s discipline (the b-v\u2019s same-sound spelling trap with the memory\u2019s rules; the h\u2019s silent craft); and the first real texts (the Cervantes\u2019s Don Quixote\u2019s opening priced honestly as the far door — the Siete días and the graded readers as the near doors).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Reading Ladder',
      'The Message and the Letter',
      'The Orthography\u2019s Discipline',
      'The First Real Texts and the Far Door',
    ],
  },
  {
    number: 7,
    slug: 'listening-speaking',
    title: 'The Listening and Speaking',
    summary:
      'The ear and the mouth\u2019s craft: the listening\u2019s drill (the dialogues at the A1\u2019s clear register; the number\u2019s listening traps and the dictation\u2019s craft); the dialects\u2019 honest census (the Castilian\u2019s vosotros and the Latin American ustedes\u2019s choice — one book, one engine, the two registers\u2019 awareness priced without the duplication; the seseo and yeismo\u2019s names; the speed\u2019s Mexican and Caribbean registers against the Castilian\u2019s clarity named); the speaking\u2019s register (the pair-work\u2019s frames and the conversation\u2019s openers; the small talk\u2019s weather register); the pronunciation\u2019s polish (the r\u2019s trill at the sentence\u2019s speed — the trophy\u2019s honest drill; the vowel\u2019s purity against the English\u2019s glides; the b-v\u2019s same mouth, the two-spelling discipline); and the conversation\u2019s strategies (the ¿cómo se dice? repair\u2019s craft and the más despacio\u2019s honest asking).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Listening Drill',
      'The Dialects\u2019 Honest Census',
      'The Pronunciation\u2019s Polish',
      'The Repair\u2019s Craft',
    ],
  },
  {
    number: 8,
    slug: 'grammar-depth',
    title: 'The Grammar\u2019s Depth',
    summary:
      'The engine\u2019s second floor: the object pronouns\u2019 placement (the me-te-lo-la before the verb and after the infinitive\u2019s attachment — the te lo doy and the dámelo\u2019s craft); the two pasts\u2019 division at depth (the preterite\u2019s snap against the imperfect\u2019s film — the event\u2019s finished against the background\u2019s rolling; the two-past sentence\u2019s craft with the era y fue\u2019s both-in-one register; the irregular preterite\u2019s -uve family — the tuve and estuve\u2019s songs); the future and conditional\u2019s craft (the whole-word suffix engine — the hablaré and hablaría\u2019s endings as the vocabulary\u2019s suffix); the subjunctive\u2019s first steps (the third great divide — the quiero que vengas\u2019s wish-engine; the WEIRDO\u2019s frame priced at the first steps; the si-clauses\u2019 conditional pairs); and the past participles\u2019 adjectival register (the -ado and -ido\u2019s description craft with the estar\u2019s state).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Object Pronouns\u2019 Placement',
      'The Two Pasts\u2019 Division at Depth',
      'The Future and Conditional\u2019s Craft',
      'The Subjunctive\u2019s First Steps',
      '第11課 休みのあと After the Vacation'
    ],
  },
  {
    number: 9,
    slug: 'dele-doorstep',
    title: 'The DELE Doorstep',
    summary:
      'The register\u2019s close: the DELE\u2019s map (the six levels A1-C2 per the CEFR with the Instituto Cervantes\u2019 own diploma frame); the A1\u2019s and A2\u2019s formats (the four-skill parts with the pair-work\u2019s speaking); the B1\u2019s format read in detail (the reading comprehension\u2019s 70 minutes, the listening\u2019s 40, the written expression\u2019s 60, the oral\u2019s pair format — the official register\u2019s own numbers carried); the B1\u2019s threshold promise (the can-do\u2019s independence: the travel, the opinion, the first argument); the CLEP\u2019s North-American register named (the Levels 1-2\u2019s two-to-four semesters\u2019 measure with the Writing variant\u2019s two tasks); the exam\u2019s craft (the time\u2019s arithmetic and the mock\u2019s cycle; the past papers\u2019 register); and the doorstep — the immersion\u2019s sea (the songs and the series\u2019 register priced as the fluency\u2019s food; the twenty-plus countries\u2019 real doors), and the reader\u2019s first dream: the first real conversation in a Madrid mercado.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The DELE\u2019s Map and Formats',
      'The B1\u2019s Format Read',
      'The CLEP\u2019s Register Named',
      'The Doorstep: The Madrid Mercado',
      'Useful Expressions きょうしつ In the Classroom',
      'Useful Expressions 体の部分 Parts of the Body',
      'Useful Expressions 色 Colors',
      'Useful Expressions 健康と病気 Health and Illness'
    ],
  },
]

export const spanish: Book = {
  id: 'spanish',
  title: 'Spanish',
  subtitle: 'The world\u2019s second-biggest language — the magic key to a thousand words and the DELE ladder',
  discipline: 'languages',
  level: 'Absolute beginner → DELE A1-A2 confident, B1 in reach (CEFR priced); CLEP Spanish named',
  description: 'Spanish as a complete course with the Madrigal method\u2019s own magic priced up front (the cognate\u2019s census — the instant vocabulary of thousands that the Spanish-English pair shares; the -ción to -tion family\u2019s head start). The sounds first (the pure five-vowel discipline, the ñ and ll, the stress and the accents\u2019 orthography, the j and r\u2019s craft); the nominal core (the gender\u2019s o-a patterns with the exceptions, the articles with the personal a\u2019s surprise, the ser and estar\u2019s great divide — the two \u2019to be\u2019 verbs as the language\u2019s own first riddle, the adjectives\u2019 agreement and the comparative\u2019s craft); the verb engine (the -ar, -er, -ir present\u2019s conjugation, the irregulars\u2019 canon — the ser, ir, tener, hacer; the stem-changers\u2019 boot verbs; the two pasts\u2019 division — the preterite\u2019s event against the imperfect\u2019s background as the second great divide); the Madrigal word-building (the suffix\u2019s census — the -ción, -dad, -oso families with the word-a-day method\u2019s arithmetic); the everyday situations (the greetings, the family, the shopping, the directions, the travel with the hispanophone world\u2019s reach — the twenty-plus countries priced); the reading and writing (the graded readers, the message and letter\u2019s frames); the listening and speaking (the dialogues\u2019 drill, the pronunciation\u2019s polish, the dialects\u2019 honest census — the Castilian\u2019s vosotros and the Latin American register); the grammar depth (the object pronouns and their placement, the reflexive verbs\u2019s daily register, the future and conditional, the subjunctive\u2019s first steps as the third great divide); the exam door (the DELE A1-B1\u2019s four-skill formats — the B1\u2019s 70-minute reading and friends read from the official register; the CLEP Spanish Levels 1-2 named as the North-American register); and the doorstep. Cross-references the portuguese book (the sibling bridge priced honestly) and hands off to the reader\u2019s first Cervantes-with-a-dictionary ambition.',
  status: 'planned',
  accent: ['#ea580c', '#c2410c'],
  chapters,
}
