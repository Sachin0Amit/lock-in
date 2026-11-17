import type { Book, Chapter } from '../../../types'

/**
 * Anthropology — the second book of the Society branch.
 *
 * STATUS: PLANNED (Humanities & Social Sciences full-shelf planning pass, 2026-11-16) — 10 chapters /
 * 48 planned lessons, zero written. Lesson ids will use the `anth-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Anthropology owns the comparative-human register — all times, all scales. Sociology owns the complex-industrial society (the two cross-reference: the kinship-marriage and stratification chapters exist in both, the anthropological reading comparative-ethnographic here, the sociological statistical-structural there); Archaeology and Heritage Studies owns the material past (this book’s evolution chapter teaches the biological frame, that book the excavation’s craft); Geography owns the human-environment register’s spatial reading; the UPSC Anthropology optional register is this book’s applied spine.
 *
 * RESEARCH PHASE (2026-11-16):
 * - Ember & Ember, Anthropology 16e (the FULL 26-chapter TOC read this pass from the Pearson page — What Is Anthropology?; Research Methods; Genetics and Evolution; Human Variation and Adaptation; Primates; The First Hominins; the Emergence of Homo and Homo sapiens; The Upper Paleolithic World; Origins of Food Production and Settled Life; Origins of Cities and States; Culture and Culture Change; Culture and the Individual; Communication and Language; Getting Food; Economic Systems; Social Stratification; Sex and Gender; Marriage and the Family; Marital Residence and Kinship; Associations and Interest Groups; Political Life; Religion and Magic; The Arts; Health and Illness; Practicing and Applying Anthropology) — pearson.com.
 * - The UPSC Anthropology optional register (read this pass — drishtiias.com/upsc-optional-subjects/anthropology: 1.1 meaning scope and development; the branches; the fossil record; race; marriage; kinship; economic and political anthropology; religion; culture and personality; the Indian-anthropology paper's register).
 * - UGC NET Anthropology (code 07 — the updated-syllabus list read this pass at ugcnetonline.in).
 * - Haviland's Cultural Anthropology named as the second pole (the standard university register).
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'the-four-fields',
    title: 'The Four Fields',
    summary:
      'The discipline\u2019s own map: anthropology as the whole-human science — the biological (the human as primate and fossil), the archaeological (the human as material trace — cross-referenced to the Archaeology book\u2019s craft), the cultural (the human as meaning-maker), the linguistic (the human as speaker); the holism\u2019s method as the discipline\u2019s signature (the four-field conversation priced with a real case); the meaning-scope-and-development register (the UPSC 1.1 line); and the discipline\u2019s history — the colonial birth and its honest reckoning, the Indian anthropology\u2019s own trajectory.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Map of the Four Fields',
      'The Holism\u2019s Method',
      'The Discipline\u2019s History and Its Reckoning',
      'I 12. Applications Of Anthropology (anthropology Of Sports, Nutritional',
    ],
  },
  {
    number: 2,
    slug: 'the-fieldwork-craft',
    title: 'The Fieldwork Craft',
    summary:
      'Ethnography as method and genre: participant observation\u2019s craft (the field notes, the rapport, the language learning, the leaving); the interview census (the structured, semi-structured, the life history); the survey and the network methods inside the field; the ethics of fieldwork (the consent\u2019s problem in a village, the Yanomami controversy priced); the writing culture debate (the 1980s critique — the ethnography as literature\u2019s question); and the other registers — the comparative method, the cross-cultural database, the multi-sited ethnography of the global present.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Participant Observation',
      'The Interview Census and the Ethics',
      'The Writing Culture Debate',
      'The Multi-Sited Present',
    ],
  },
  {
    number: 3,
    slug: 'the-biological-frame',
    title: 'The Biological Frame',
    summary:
      'The human as animal: the genetics base (the selection, the drift, the population thinking); the primates\u2019 register (the prosimians to the hominoids — the chimpanzee-bonobo comparison); the fossil record\u2019s honest walk (the Sahelanthropus to the Australopithecines, the Homo\u2019s early species, the erectus\u2019s world, the sapiens\u2019s emergence and the Neanderthal question — the replacement against the continuity debate); the human variation and adaptation (the race\u2019s biology debunked carefully against the clines\u2019 census); and the upper paleolithic world\u2019s behavioural revolution (the art, the burial, the symbolic explosion — cross-referenced to Art History\u2019s stone-age chapter and Archaeology\u2019s record).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Genetics Base and the Primates',
      'The Fossil Record\u2019s Walk',
      'The Variation and the Race Question',
      'The Upper Paleolithic Revolution',
      'I 9. Human Genetics (methods And Applications; Mendelian Genetics In Man;',
    ],
  },
  {
    number: 4,
    slug: 'culture-and-the-individual',
    title: 'Culture and the Individual',
    summary:
      'The culture concept\u2019s working core: culture\u2019s definitions and attributes (the learned, shared, symbolic, integrated, adaptive — the concept\u2019s critiques priced); the enculturation\u2019s process; the ethnocentrism against the cultural relativism\u2019s debate (the Boasian settlement and its limits — the human-rights tension priced); the culture-and-the-individual interface (the configuration-of-culture school, the national-character question retired carefully); the culture change\u2019s engines (the innovation, diffusion, acculturation — the syncretism\u2019s Indian register); and the communication and language\u2019s linguistic-anthropology arc (the structure, the acquisition, the sociolinguistics — the code-switching, the language\u2019s death).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Culture\u2019s Attributes and Its Critics',
      'The Relativism Debate and Its Limits',
      'The Culture Change Engines',
      'The Language Arc',
    ],
  },
  {
    number: 5,
    slug: 'subsistence-and-exchange',
    title: 'Subsistence and Exchange',
    summary:
      'The economic register from the foragers to the markets: getting food\u2019s census (the foraging, the pastoral nomadism, the horticulture, the intensive agriculture — the transitions priced); the economic systems\u2019 anthropology (the reciprocity — Malinowski\u2019s kula as the classic case, the redistribution, the market exchange); the money\u2019s strange cases; the economy\u2019s embeddedness (the Polanyi register); and the anthropology of the contemporary economy (the informal sector, the gift\u2019s return in the platform age).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Food Census',
      'Reciprocity, Redistribution, Market',
      'The Embedded Economy',
      'The Contemporary Register',
    ],
  },
  {
    number: 6,
    slug: 'kinship-and-marriage',
    title: 'Kinship and Marriage',
    summary:
      'The social-biological knot: marriage\u2019s cross-cultural census (the endogamy-exogamy rules, the polygyny\u2019s real frequency priced honestly, the same-sex registers named); the marital residence\u2019s rules (the patrilocal, matrilocal, neolocal — the residence\u2019s demographic consequences); the descent systems (the unilineal matrilineal-patrilineal, the bilateral, the double — the Nayar and the Nayars\u2019 famous controversy priced); the kinship terminology\u2019s census (the Eskimo-Hawaiian-Iroquois classes); the alliance theories (the Levi-Strauss exchange argument); and the family\u2019s forms (the extended, the joint, the chosen families of the present).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Marriage\u2019s Cross-Cultural Census',
      'Residence and Descent',
      'The Terminology Census and the Alliance Theories',
      'The Family\u2019s Forms',
    ],
  },
  {
    number: 7,
    slug: 'politics-religion-arts',
    title: 'Politics, Religion and the Arts',
    summary:
      'The order-without-state and the meaning\u2019s registers: political life\u2019s anthropology (the leaderless societies — the !Kung and the Nuer priced, the headman and the big-man, the age-sets, the feud\u2019s management); the religion and magic\u2019s register (the animism-totemism census, the shaman\u2019s craft, the witchcraft\u2019s rationalities — Evans-Pritchard\u2019s classic; the syncretism\u2019s Indian register); the mythology and ritual\u2019s craft (the rites of passage, the sacrifice, the festival); and the arts\u2019 anthropology (the ethnomusicology, the body\u2019s art, the aesthetic\u2019s relativity).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Leaderless Societies',
      'The Religion and Magic Register',
      'The Ritual Craft',
      'The Arts\u2019 Anthropology',
      'Paper-II 8. Impact of Hinduism, Buddhism, Christianity, Islam and Other Religions on Tribal Societies; Tribe and Nation State (comparative study of tribal communities in India and other countries)',
      'State In Comparative Perspective - Changing Nature Of The State In',
      'I 5. Religion (anthropological Approaches; Monotheism And Polytheism;',
    ],
  },
  {
    number: 8,
    slug: 'stratification-identity-applied',
    title: 'Stratification, Identity and the Applied Register',
    summary:
      'The difference\u2019s registers: the social stratification\u2019s cross-cultural census (the class, the caste as India\u2019s specific, the estates, the slavery\u2019s histories); the ethnicity and the racism\u2019s anthropology (the ethnicity as constructed, the racism\u2019s refutation); the minorities and the migration\u2019s diaspora; the health and illness\u2019s anthropology (the medical systems\u2019 pluralism, the AIDS\u2019s lessons); and the applied register — the practicing anthropology\u2019s arc (the development anthropology\u2019s promise and its critiques, the pharmaceutical trials\u2019 ethics, the cultural brokerage).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Stratification\u2019s Cross-Cultural Census',
      'Ethnicity, Racism and the Diaspora',
      'The Medical Anthropology Register',
      'The Applied Anthropology\u2019s Arc',
    ],
  },
  {
    number: 9,
    slug: 'the-indian-anthropology',
    title: 'The Indian Anthropology',
    summary:
      'The Indian register\u2019s spine: the Indian culture\u2019s evolution (the prehistoric base — cross-referenced to Indian History and Archaeology; the ethnic and linguistic stock\u2019s census — the language families\u2019 map); the caste\u2019s anthropological reading (the ethnographic classics — the village studies\u2019 register, the caste\u2019s material life, the change\u2019s trajectory); the Indian tribes (the Scheduled register, the forest peoples\u2019 world, the displacement and the autonomy\u2019s questions, the birsa to the FRA arc); the village India\u2019s tradition (the Srinivas-led studies, the jajmani\u2019s debate — cross-referenced to Sociology\u2019s Indian chapter); and the Indian anthropology\u2019s own sociology (the Verrier Elwin arc, the state\u2019s anthropology).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Linguistic-Ethnic Stock',
      'The Caste\u2019s Ethnographic Reading',
      'The Village India\u2019s Tradition',
    ],
  },
  {
    number: 10,
    slug: 'the-theory-census-and-doorstep',
    title: 'The Theory Census and the Doorstep',
    summary:
      'The theory\u2019s own story: the evolutionism\u2019s first age (Tylor\u2019s culture, Morgan\u2019s stages — the unilinear\u2019s error priced honestly); the historical particularism (Boas and the four-field scepticism); the functionalism\u2019s pair (Malinowski\u2019s needs and Radcliffe-Brown\u2019s structures — the Andaman classic); the structuralism (Levi-Strauss\u2019s kinship algebra); the interpretive turn (Geertz\u2019s thick description, the Bali cockfight priced); the practice and agency\u2019s synthesis (Bourdieu again — cross-referenced to Sociology); and the doorstep — to Sociology\u2019s complex register, to the Archaeology\u2019s material past, to the reader\u2019s own species-pride and humility.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Evolutionism and Its Error',
      'Particularism and Functionalism',
      'The Structural and the Interpretive',
      'The Doorstep: One Species',
      'Paper-I 6. Anthropological Theories (classical evolutionism, diffusionism, functionalism, structural-functionalism, structuralism, culture and personality, neo-evolutionism, cultural materialism, symbolic and interpretive, cognitive theories, post-modernism)',
    ],
  },
]

export const anthropology: Book = {
  id: 'anthropology',
  title: 'Anthropology',
  subtitle: 'The whole human — biology, language, kinship and culture in one comparative science',
  discipline: 'humanities',
  level: 'Secondary school biology/social science → university anthropology + UPSC (Anthropology optional) readiness',
  description: 'The most holistic of the sciences of the human. The discipline\u2019s four fields (biological, archaeological, cultural and linguistic anthropology) and its meaning-scope-development; the fieldwork method (participant observation, the ethnography\u2019s craft, the ethics of research); the human-evolution register (the genetics base, the primates, the fossil record to Homo sapiens, the upper paleolithic world); culture and its change (enculturation, ethnocentrism against cultural relativism, the culture-and-individual interface, communication and language); the economic and political registers (getting food, the exchange\u2019s anthropology — reciprocity-redistribution-market, the order-without-state societies); kinship, marriage and the family (the residence and descent systems, the terminology\u2019s census, the alliance theories); religion, magic and the arts; stratification\u2019s cross-cultural register (class, ethnicity, racism); then the Indian spine — the subcontinent\u2019s culture-evolution and linguistic-ethnic stock, the caste\u2019s anthropological reading, the Indian tribes, the village-studies tradition; and the theory census (evolutionism to interpretive anthropology) with the applied register. Cross-references Sociology (the complex societies\u2019 register), Archaeology (the material past), Psychology (the individual) and hands off to the shelf\u2019s remaining books.',
  status: 'planned',
  accent: ['#9d174d', '#831843'],
  chapters,
}
