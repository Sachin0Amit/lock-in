import type { Book, Chapter } from '../../../types'

/**
 * Portuguese — the twelfth book of the Languages shelf.
 *
 * STATUS: PLANNED (Languages full-shelf planning pass, 2026-11-16) — 9 chapters /
 * 38 planned lessons, zero written. Lesson ids will use the `port-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Portuguese owns the Portuguese register (the European and the Brazilian lines priced honestly — one book, one engine, the varieties’ awareness named at the survey depth). The spanish book owns the sibling bridge’s other side (the two languages’ shared Romance craft and the false-friend traps’ census cross-referenced in both books); the french and italian books own the family’s other siblings; the english book owns the Norman-loan bridge’s other end; the Cultural Studies book’s media register cross-references the Brazilian music and cinema’s immersion craft.
 *
 * RESEARCH PHASE (2026-11-16):
 * - Whitlam, Modern Brazilian Portuguese Grammar: A Practical Guide (Routledge — the contents read this pass: Pronunciation and Spelling; Gender and Gender Agreement; Number and Number Agreement; Articles; Adjectives and Adverbs; Numbers — the full practical grammar's register) as the grammar pole.
 * - The two-world registers named honestly (the European-Brazilian differences' map: the pronunciation, the grammar and the vocabularies' local registers priced at the survey depth); the Ponto de Encontro's two-version university register named as the other pole.
 * - The exam registers named (the CAPLE's European and the CELPE-BRAS's Brazilian proficiency registers named honestly with the CEFR-style pricing — no single JLPT-style world exam claimed).
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'sounds-and-script',
    title: 'The Sounds and the Two Worlds',
    summary:
      'The mouth\u2019s Portuguese craft with the two worlds\u2019 map priced up front: the nasals\u2019 signature (the ã and õ\u2019s engine — the mãe\u2019s mother and the pão\u2019s bread as the first nasal friends with the tilde\u2019s craft); the European\u2019s vowel reduction (the unstressed e and o\u2019s swallowed precision against the Brazilian\u2019s open vowels — the \u2019computer\u2019 pronunciations\u2019 pair as the two worlds\u2019 first honest map); the s and z\u2019s two-world registers (the European\u2019s sh against the Brazilian\u2019s s at the word\u2019s end — the dois\u2019s two voices priced); the palatal lh and nh\u2019s craft (the trabalho\u2019s \u2019lw\u2019 and the vinho\u2019s \u2019ny\u2019 as the Romance\u2019s shared treasures); the r\u2019s registers (the Brazilian\u2019s throaty h in the Rio\u2019s carioca against the tap\u2019s default); and the spelling\u2019s reform (the Acordo Ortográfico\u2019s harmonisation named honestly with the before-and-after\u2019s signs).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Nasals\u2019 Signature',
      'The Two Worlds\u2019 Vowel Map',
      'The lh, nh and the R\u2019s Registers',
      'The Spelling\u2019s Reform Named',
    ],
  },
  {
    number: 2,
    slug: 'nominal-core',
    title: 'The Nominal Core',
    summary:
      'The noun\u2019s engine: the gender\u2019s patterns (the -o and -a families with the exceptions\u2019 honest register — the problema\u2019s masculine trap and the mão\u2019s feminine irregularity priced); the articles\u2019 contractions\u2019 engine (the de + a\u2019s da, the em + a\u2019s na, the a + a\u2019s à — the Portuguese\u2019s fused preposition-article register as the language\u2019s own signature economy priced with the Spanish\u2019s a la contrast); the ser and estar\u2019s sibling divide (the Romance\u2019s shared riddle with the Portuguese\u2019s own nuance — the estou farto\u2019s \u2019fed up\u2019 against the sou farto\u2019s register priced kindly; the ficar\u2019s third \u2019to be\u2019 as the Portuguese\u2019s own extra verb priced); the adjectives\u2019 agreement (the o-a ending\u2019s match with the bom-boa\u2019s craft); the possessives\u2019 craft (the meu, teu, seu with the tu-você\u2019s two-world social map); and the demonstratives\u2019 three-distance census (the este, esse, aquele\u2019s Spanish-sibling map).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Gender\u2019s Patterns',
      'The Contractions\u2019 Engine',
      'The Ser-Estar Sibling Divide and the Ficar\u2019s Third',
      'The Two-World Social Map',
    ],
  },
  {
    number: 3,
    slug: 'verb-engine',
    title: 'The Verb Engine',
    summary:
      'The verb\u2019s machine: the present\u2019s three families (the -ar\u2019s falar with the -er\u2019s comer and the -ir\u2019s partir\u2019s near-twin tables); the irregular canon (the ser\u2019s sou-és-é treasury, the ter\u2019s tenho\u2019s G-insertion, the ir\u2019s vou and the estar\u2019s estou\u2019s engine); the two pasts introduced (the perfeito\u2019s finished event against the imperfeito\u2019s rolling background — the Spanish sibling\u2019s preterite-imperfect division priced with the Portuguese\u2019s own eu falei\u2019s -ei signature); the perfeito\u2019s irregulars (the disse\u2019s said and the fez\u2019s did\u2019s irregular core priced as the spoken past\u2019s workhorse); the future\u2019s craft (the falar-ei\u2019s whole-word suffix engine with the Spanish sibling\u2019s shared craft); the reflexive\u2019s routine (the levantar-se\u2019s daily register with the Brazilian\u2019s eu me levanto\u2019s placement); the gerund\u2019s register (the estou falando\u2019s Brazilian present progressive against the European\u2019s estou a falar\u2019s a-insertion — the two worlds\u2019 grammar\u2019s honest map priced); and the impersonal\u2019s se (the fala-se português\u2019s craft).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Present\u2019s Three Families',
      'The Two Pasts Introduced',
      'The Two Worlds\u2019 Grammar Map',
      'The Reflexive and the Impersonal',
    ],
  },
  {
    number: 4,
    slug: 'everyday-situations',
    title: 'The Everyday Situations',
    summary:
      'The course\u2019s situations: the greetings and the introductions (the olá\u2019s register with the muito prazer\u2019s pleasure craft; the tu-você\u2019s social map revisited — the Portugal\u2019s tu and the Brazil\u2019s você\u2019s worlds priced kindly); the café and the market (the um café por favor\u2019s craft with the pastel de nata\u2019s culture note priced; the market\u2019s vocabulary with the kg\u2019s arithmetic); the directions and the city (the à direita and em frente\u2019s compass with the subway\u2019s register — the São Paulo\u2019s and the Lisbon\u2019s metros named); the family and the home (a família\u2019s census with the Brazilian\u2019s mãe and pai\u2019s register); the Lusophone world\u2019s map (the eight-country\u2019s reach — the Brazil\u2019s giant and the Portugal, Angola, Mozambique, Cape Verde, Guinea-Bissau, São Tomé and Timor\u2019s CPLP family priced as the language\u2019s own geography); and the food and the restaurant (a conta por favor\u2019s register with the feijoada\u2019s and bacalhau\u2019s two-world treasures named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Greetings and the Two-World Social Map',
      'The Caf\u00e9 and the Market',
      'The Directions and the Metros',
      'The Lusophone World\u2019s Map',
    ],
  },
  {
    number: 5,
    slug: 'vocabulary-craft',
    title: 'The Vocabulary\u2019s Craft',
    summary:
      'The word-hoard\u2019s Portuguese method: the Spanish sibling bridge\u2019s treasury (the 85-percent shared vocabulary priced honestly — the two languages\u2019 mutual intelligibility\u2019s promise and its trap: the speaker\u2019s comfortable listening and the speaker\u2019s careful speaking register); the false friends\u2019 notorious census (the exquisito\u2019s delicious-not-exquisite, the embarazada-not-embaraçada\u2019s pregnancy trap, the bicha\u2019s queue-in-Portugal\u2019s word-avoidance register priced with the two-world\u2019s politeness craft); the Brazilian and the European local vocabularies (the ônibus\u2019s bus against the autocarro, the trem against the comboio train — the two-world\u2019s everyday census with the guide\u2019s honest map); the word formation\u2019s families (the -ção, -dade and -mente\u2019s Romance siblings with the English\u2019s Norman bridge cross-referenced); the music\u2019s vocabulary (the saudade\u2019s celebrated untranslatable priced as the language\u2019s own soul — the Bossa nova\u2019s register named); and the dictionary\u2019s craft (the two-world dictionaries\u2019 honest register with the Porto\u2019s and the Houaiss\u2019s names).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Sibling Bridge\u2019s Treasury',
      'The False Friends\u2019 Notorious Census',
      'The Two-World Local Vocabularies',
      'The Saudade and the Dictionary\u2019s Craft',
    ],
  },
  {
    number: 6,
    slug: 'reading-writing',
    title: 'The Reading and Writing',
    summary:
      'The literacy\u2019s craft: the reading\u2019s ladder (the graded texts to the first real short texts; the Lusophone literature\u2019s door priced — the Saramago\u2019s and the Amado\u2019s registers named as the far doors, the children\u2019s tales as the near doors); the writing\u2019s forms (the message\u2019s SMS and email frames with the beijos\u2019s kisses-close and the abraços\u2019s hugs-close\u2019s Brazilian register priced kindly; the letter\u2019s formal frame with the cordialmente\u2019s close); the A1-A2 can-dos priced (the self-introduction\u2019s writing, the postcard\u2019s frame, the form\u2019s filling); the spelling\u2019s discipline (the Acordo\u2019s harmonised orthography applied with the trema\u2019s retirement named); and the first real texts (the crônica\u2019s Brazilian newspaper register priced as the motivated reading — the short everyday column\u2019s literature named kindly).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Reading Ladder and the Far Doors',
      'The Message\u2019s Frames',
      'The A1-A2 Can-Dos',
      'The Crônica\u2019s Motivated Reading',
    ],
  },
  {
    number: 7,
    slug: 'listening-speaking',
    title: 'The Listening and Speaking',
    summary:
      'The ear and the mouth\u2019s craft: the listening\u2019s drill (the dialogues at the A1\u2019s clear register; the two worlds\u2019 listening map — the Brazilian media\u2019s open vowels as the learner\u2019s own sea with the European\u2019s reduction named as the Portugal door\u2019s craft); the speaking\u2019s register (the pair-work\u2019s frames with the two-world\u2019s choice priced honestly — the learner\u2019s one-world commitment with the other\u2019s awareness named); the pronunciation\u2019s polish (the nasal\u2019s singing craft — the mãe\u2019s one syllable with the velar\u2019s hum; the lh and nh\u2019s Romance trophies); the fluency\u2019s craft (the fillers\u2019 honest use — the né\u2019s Brazilian tag and the pois não\u2019s European register); and the immersion\u2019s sea (the Bossa nova\u2019s and the MPB\u2019s register priced as the fluency\u2019s food — the Tom Jobim\u2019s slow diction as the learner\u2019s own gift; the fado\u2019s saudade named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Two Worlds\u2019 Listening Map',
      'The Pronunciation\u2019s Polish',
      'The Fluency\u2019s Craft',
      'The Bossa Nova\u2019s Sea',
    ],
  },
  {
    number: 8,
    slug: 'grammar-depth',
    title: 'The Grammar\u2019s Depth',
    summary:
      'The engine\u2019s celebrated floor: the personal infinitive\u2019s wonder (the para eu falar\u2019s conjugated infinitive as the Portuguese\u2019s own signature grammar — the chega de eu esperar\u2019s craft priced as the Romance\u2019s unique engine); the subjunctive\u2019s first steps (the que fale\u2019s present subjunctive with the talvez register — the Spanish sibling\u2019s shared mood with the quiser\u2019s future subjunctive\u2019s Portuguese extra priced); the clitic pronouns\u2019 placement (the European\u2019s postverbal — o vejo vs vê-o\u2019s mesoclisis and the Brazilian\u2019s proclitic\u2019s eu o vejo\u2019s preference priced as the two-world\u2019s grammar map); the indirect questions\u2019 craft (the se\u2019s \u2019whether\u2019 register); and the past participle\u2019s agreement (the Romance\u2019s shared craft with the tem falado\u2019s compound past\u2019s Portuguese register named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Personal Infinitive\u2019s Wonder',
      'The Subjunctive\u2019s First Steps',
      'The Clitic Placement\u2019s Two-World Map',
      'The Compound Past Named',
    ],
  },
  {
    number: 9,
    slug: 'caple-doorstep',
    title: 'The CAPLE Doorstep',
    summary:
      'The register\u2019s close: the proficiency\u2019s map priced honestly (the CAPLE\u2019s European register — the CIPLE\u2019s A2 and the DEPLE\u2019s B1 with the CEFR\u2019s pricing; the CELPE-BRAS\u2019s Brazilian register with the certificate\u2019s craft — the two-world\u2019s own two exams named with the honest note: no single JLPT-style world register claimed); the A2\u2019s target (the CIPLE\u2019s promise: the daily conversation\u2019s comfort and the first real reading); the B1\u2019s horizon named (the DEPLE\u2019s independence with the work-and-travel register); the exam\u2019s craft (the mock\u2019s cycle with the honest diagnosis; the two-world\u2019s choice priced — the exam follows the world\u2019s choice); and the doorstep — the immersion\u2019s sea (the Bossa nova\u2019s and the telenovela\u2019s register as the fluency\u2019s food), the spanish sibling\u2019s cross-reference (the two languages\u2019 bridge\u2019s treasure priced at both doorsteps), and the reader\u2019s first dream: the first real Lisbon or São Paulo conversation with the bem-vindo\u2019s welcome.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Two Exams\u2019 Two Worlds',
      'The A2\u2019s Target',
      'The B1\u2019s Horizon Named',
      'The Doorstep: The Bem-Vindo',
    ],
  },
]

export const portuguese: Book = {
  id: 'portuguese',
  title: 'Portuguese',
  subtitle: 'The Lusophone world\u2019s door — Brazil\u2019s music and Europe\u2019s precision in one course',
  discipline: 'languages',
  level: 'Absolute beginner → the elementary register (CEFR-style A1-A2, CAPLE/CELPE-BRAS named)',
  description: 'Portuguese as a complete course with the two worlds\u2019 honest map priced up front (the European and the Brazilian registers\u2019 differences named — the tu and você\u2019s social maps, the pronunciation\u2019s music, the vocabularies\u2019 local treasures — one book, one engine, the varieties\u2019 awareness). The sounds first (the nasals\u2019 craft — the ã and õ\u2019s Portuguese signature, the European\u2019s vowel reduction against the Brazilian\u2019s open vowels); the nominal core (the gender\u2019s patterns, the articles with the contractions\u2019 engine — the na, do, no families; the ser and estar\u2019s sibling divide with the Portuguese\u2019s own nuances, the adjectives\u2019 agreement); the verb engine (the present\u2019s three families with the irregulars\u2019 canon — the ser, ter, ir, estar; the two pasts introduced — the perfeito against the imperfeito\u2019s division; the reflexives\u2019s daily register); the everyday situations (the greetings, the introductions, the café, the directions with the Lusophone world\u2019s eight-country map priced — the Brazil\u2019s and the CPLP\u2019s reach); the vocabulary\u2019s craft (the Spanish sibling bridge\u2019s treasury and its traps — the false friends\u2019 notorious bilingual\u2019s embarrassment priced kindly, the Brazilian and the European\u2019s local vocabularies\u2019 census); the reading and writing (the graded texts, the messages\u2019 frames); the listening and speaking (the Brazilian media\u2019s register as the immersion\u2019s sea, the pronunciation\u2019s polish); the grammar\u2019s depth (the personal infinitive\u2019s celebrated engine, the subjunctive\u2019s first steps, the clitic pronouns\u2019 placement); and the doorstep (the CAPLE and the CELPE-BRAS registers named honestly with the CEFR pricing). Cross-references the spanish book (the sibling bridge priced honestly) and hands off to the reader\u2019s first Bossa-nova-understood ambition.',
  status: 'planned',
  accent: ['#065f46', '#022c22'],
  chapters,
}
