import type { Book, Chapter } from '../../../types'

/**
 * Sociology — the first book of the Society branch.
 *
 * STATUS: PLANNED (Humanities & Social Sciences full-shelf planning pass, 2026-11-16) — 10 chapters /
 * 51 planned lessons, zero written. Lesson ids will use the `soc-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Sociology owns the social register — the theory and the Indian social structure. Anthropology owns the comparative-human and the small-scale register (the kinship and marriage depth lives in both — cross-referenced, the sociological reading here, the ethnographic there); Cultural Studies owns the meaning-and-media register (this book’s media chapter is the social reading, that book’s the cultural-theory reading); the Psychology book owns the individual mind (this book’s socialisation chapter is the group side); the GS1 society lines are this book’s applied register.
 *
 * RESEARCH PHASE (2026-11-16):
 * - Giddens & Sutton, Sociology 10e (the contents read this pass from politybooks.com — Introduction; What is Sociology?; Studying Social Life; Theories and Perspectives; Global Connections; The Environment; Cities and Urban Life; the stratification/gender/race/education/religion/media/politics/work/crime register; the 9e gs9 page also opened) — politybooks.com.
 * - NCERT Introducing Sociology class 11 (kesy1ps.pdf opened at ncert.nic.in this pass — Sociology and Society; the terms-and-concepts and the methods register) + the class 12 pair Indian Society (lesy1ps.pdf) and Social Change and Development in India (lesy2ps.pdf — Structural Change; Cultural Change; The Constitution and Social Change read this pass).
 * - The UPSC Sociology optional register (read this pass — upscprep.com: Paper I Fundamentals — the discipline, the science debate, the methods, the thinkers — Marx, Durkheim, Weber, Parsons, Mead; stratification; works and change; Paper II the Indian society's structure and change).
 * - UGC NET Sociology (code 05 — the updated-syllabus list read this pass; the testbook unit register checked: sociological theories, research methods, Indian society, stratification, globalisation).
 * - Haralambos & Holborn's Sociology: Themes and Perspectives named as the second global pole (the standard university register).
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'the-sociological-eye',
    title: 'The Sociological Eye',
    summary:
      'The discipline\u2019s birth and its imagination: sociology arriving from modernity\u2019s triple disruption (the industrial city, the democratic revolution, the discovery of society itself); the sociological imagination (Mills — the biography and the history\u2019s intersection, the personal trouble against the public issue); the sociology-as-science debate (the positivist claim, the interpretive answer, the critical third); and the uses of sociology — the policy and the self-understanding registers with the NCERT\u2019s own framing as the entry.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Birth From Modernity',
      'The Sociological Imagination',
      'The Science Debate and the Uses',
    ],
  },
  {
    number: 2,
    slug: 'the-methods',
    title: 'The Methods',
    summary:
      'The research craft: the survey (the sampling\u2019s logic, the questionnaire\u2019s construction, the interview\u2019s types — the structured against the unstructured); the observation (the participant and the non-participant, the ethnography\u2019s field notes); the experiment\u2019s sociology (the Hawthorne as the classic); the case study and the comparative method; the secondary data\u2019s register (the census, the archives, the content analysis); the ethics of research (the consent, the anonymity); and the measurement\u2019s statistical craft cross-referenced honestly to the Mathematics shelf\u2019s statistics book (the sampling theory and the hypothesis testing live there — this chapter teaches the sociological use).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Survey and Its Sampling',
      'The Observation and the Ethnography',
      'The Ethics of Research',
      'The Statistics Handshake',
    
      'Psychological Testing',
      'Note: These 32 pages are the front matter of M. Laxmikanth\'s "Indian Polity" (Sixth Edition), not a JEE mathematics book, and no table of contents (chapter list with page numbers) appears within these pages. No contents entries exist to transcribe beyond the front-matter items listed above',
      'There are no numbered topic entries (2.1, 2.2, 1.01), no exercises (JEE Main/JEE Advanced), no Concept Application Exercises, no Answers/Hints/Chapter Summary sections, and no printed page-numbered contents list anywhere in these 32 pages. A contents page appears not to have been included in the',
      'Chapter VIII. John the Scot',
      'Chapter VIII. Hobbes\'s Leviathan'
    ],
  },
  {
    number: 3,
    slug: 'the-theorists',
    title: 'The Theorists',
    summary:
      'The classical trio and their heirs: Marx (the historical materialism, the class conflict, the alienation — the commodity\u2019s fetishism priced at survey depth); Durkheim (the social facts, the division of labour, the suicide as sociology\u2019s first science, the religion\u2019s elementary forms); Weber (the verstehen, the ideal types, the protestant-ethic thesis, the three types of legitimate domination); the symbolic interactionists (Mead\u2019s self, Cooley\u2019s looking-glass, Goffman\u2019s presentation); Parsons and the functionalists (the AGIL scheme, the Merton\u2019s manifest-latent); and the contemporary syntheses (Bourdieu\u2019s capital, Habermas\u2019s public sphere, Giddens\u2019s structuration — the theorist\u2019s tool kit assembled).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Marx and the Conflict Register',
      'Durkheim and Weber',
      'The Interactionists and the Functionalists',
      'The Contemporary Syntheses',
    
      'Quantitative Techniques (Class 10 elementary mathematics, tested through sets of facts, graphs or other diagrammatic representations of numerical information)'
    ],
  },
  {
    number: 4,
    slug: 'culture-and-socialisation',
    title: 'Culture and Socialisation',
    summary:
      'The social self\u2019s manufacture: culture\u2019s components (the material and non-material, the ideal and the real); the socialisation\u2019s stages (the primary and the secondary, the Cooley and Mead engines); the self\u2019s presentation (Goffman\u2019s dramaturgy); the language\u2019s Sapir-Whorf debate priced honestly; the social interaction\u2019s microsociology (the ethnomethodology\u2019s breaching experiments named); and the body and the emotions\u2019 sociology — the civilising process priced.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Culture\u2019s Components',
      'The Socialisation Engines',
      'The Dramaturgy of the Self',
      'The Microsociology Register',
    ],
  },
  {
    number: 5,
    slug: 'groups-networks-organisations',
    title: 'Groups, Networks and Organisations',
    summary:
      'The social\u2019s architecture: the group\u2019s types (the primary and secondary, the in and out, the reference); the social networks and the weak ties\u2019 strength; the organisations\u2019 sociology (the bureaucracy\u2019s dialectic — the Weber and the Michels iron law); the formal and the informal organisation\u2019s real life; and the deviance-and-control arc (the theories\u2019 census from the biological to the labelling, the Durkheim\u2019s normality priced, the Indian crime and the stigmatisation\u2019s register).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Group\u2019s Types',
      'The Networks and the Weak Ties',
      'The Organisations\u2019 Dialectic',
      'The Deviance and Control Arc',
    ],
  },
  {
    number: 6,
    slug: 'stratification',
    title: 'Stratification',
    summary:
      'The inequality\u2019s architecture: the stratification\u2019s theories (the functionalist\u2019s answer and its Tumin critique, the conflict\u2019s, the Weberian class-status-party); the class\u2019s register (the Marxian and the occupational prestige); the status and the lifestyle\u2019s Bourdieu reading (the taste\u2019s distinction); the caste\u2019s South Asian specificity (the purity-pollution axis — cross-referenced to the Indian chapters); the race and ethnicity (the construct\u2019s science priced honestly — cross-referenced to Anthropology); and the global inequality (the world-systems register).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Theories of Stratification',
      'Class and Status',
      'Caste\u2019s Specificity',
      'The Global Inequality',
    ],
  },
  {
    number: 7,
    slug: 'the-institutional-census',
    title: 'The Institutional Census',
    summary:
      'The society\u2019s main institutions one by one: the family and marriage (the forms\u2019 census, the industrial family\u2019s change, the Indian household\u2019s own structure); education (the functional and conflict readings, the credential inflation); religion (the Durkheimian and Weberian readings, the secularisation debate\u2019s European and Indian difference); work and the economy (the labour\u2019s transformation, the informal sector\u2019s Indian weight); the media (the public sphere — the social reading here, the cultural-theory reading handed to Cultural Studies); and health (the illness\u2019s sociology, the medicalisation).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Family and Marriage',
      'Education and Religion',
      'Work and the Informal Sector',
      'Media and Health',
    
      'Indian Foreign Policy - determinants and institutions of policy-making; continuity and change',
      'Unit VIII: Colonial Economy and Indian Society in Transition (changing composition and direction of trade; commercialisation of agriculture; decline of industries; economic drain; famines and epidemics; the new education; Indian Renaissance; women\'s question; printing press and public opinion)'
    ],
  },
  {
    number: 8,
    slug: 'change-movements-globalisation',
    title: 'Change, Movements and Globalisation',
    summary:
      'The dynamics: the social change\u2019s theories (the evolutionary, the cyclical, the conflict, the technological); the collective behaviour\u2019s register (the crowd, the rumour, the panic, the fashion and fad); the social movements\u2019 sociology (the resource mobilisation, the framing, the new movements — the Indian movements\u2019 register: the peasant, the Dalit, the women\u2019s, the environmental); the population\u2019s sociology (the demographic transition, the ageing); and the globalisation\u2019s dimensions (the economic, cultural, political — the glocalisation debate) with the world register\u2019s politics cross-referenced to International Relations.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Change Theories',
      'The Movements\u2019 Sociology',
      'The Population and the Urbanisation',
      'Globalisation\u2019s Dimensions',
    ],
  },
  {
    number: 9,
    slug: 'the-indian-social-structure',
    title: 'The Indian Social Structure',
    summary:
      'The Indian register: the caste system\u2019s anatomy (the varna-jati distinction, the purity-pollution logic, the untouchability\u2019s history and its legal abolition); the caste\u2019s change (the sanskritisation and westernisation debates — Srinivas\u2019s craft; the dominant caste, the Mandal\u2019s political economy); the village studies\u2019 arc (the Srinivas-Mandelbaum-Beteille tradition, the jajmani\u2019s debate); the tribes (the Scheduled register, the acculturation and the displacement questions); the linguistic and religious plurality\u2019s structure; and the family-kinship\u2019s Indian forms (the patriarchy\u2019s regional patterns, the marriage\u2019s census).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Caste\u2019s Anatomy and Change',
      'The Village Studies Arc',
      'The Tribes and the Plurality',
      'The Indian Family and Kinship',
    
      'Paper-II 3. Traditional Indian Social System and Caste (Varnashram, Purushartha, Karma, Rina and Rebirth; theories of the origin of the caste system; dominant caste and caste mobility; jajmani system; tribe-caste continuum; sacred complex; impact of Buddhism, Jainism, Islam and Christianity)',
      'Paper-II 5. Indian Village, Minorities and Socio-Cultural Change (Indian village as a social system; agrarian relations; impact of globalisation on villages; linguistic and religious minorities; Sanskritization, Westernization, Modernization; inter-play of little and great traditions; Panchayati',
      'Paper-II 7. Exploitation and Deprivation of Scheduled Castes, Scheduled Tribes and Other Backward Classes; constitutional safeguards; ethnicity and ethnic conflicts; regionalism and demand for autonomy; social change among tribes during colonial and post-independent India',
      'Preface to the Sixth Edition (with "Changes in this Edition" and "New Chapters": 1. Goods and Services Tax Council, 2. National Commission for Backward Classes, 3. National Investigation Agency, 4. National Disaster Management Authority, 5. Role of Regional Parties, 6. Coalition Government)'
    ],
  },
  {
    number: 10,
    slug: 'change-and-doorstep',
    title: 'Social Change in India and the Doorstep',
    summary:
      'The GS1 applied register and the close: the role of women and women\u2019s organisations (the movement\u2019s phases, the SHGs\u2019 economy, the representation\u2019s record); the population\u2019s associated issues (the dividend\u2019s window priced); the poverty and development (the measurement\u2019s contested lines, the alleviation\u2019s programmes and their sociology); the urbanisation\u2019s problems and remedies (the slum\u2019s sociology, the planning\u2019s failure and hope); the social empowerment (the disadvantaged groups, the state\u2019s instruments); the communalism-regionalism-secularism register (the sociology of each — priced as the GS1\u2019s lines); and the doorstep — to the reader\u2019s own society as the laboratory and to the shelf\u2019s anthropological and cultural companions.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Women and Organisations',
      'Poverty, Population, Urbanisation',
      'The Empowerment and the Communal Register',
      'The Doorstep: Society as Laboratory',
    ],
  },
]

export const sociology: Book = {
  id: 'sociology',
  title: 'Sociology',
  subtitle: 'Society as the subject matter — the classic theorists to the Indian social structure and its change',
  discipline: 'humanities',
  level: 'Secondary school social science → university sociology + UPSC (Sociology optional, GS-I society lines) readiness',
  description: 'The study of society as a rigorous discipline. Sociology\u2019s birth from modernity\u2019s disruptions (the industrial city, the democratic revolution) and the sociological imagination as C. Wright Mills framed it; the methods\u2019 register (the survey, the interview, the observation, the experiment — with the statistical craft cross-referenced to the Mathematics shelf\u2019s statistics book); the theorists\u2019 census — Marx, Durkheim, Weber, the symbolic interactionists, Parsons and the functionalists, the contemporary syntheses; culture and socialisation; groups, networks, organisations and the deviance-and-control arc; stratification\u2019s full register (class, status, power — caste, race and the global inequality); the institutional census (family, education, religion, work, media, health); social change, the movements and globalisation\u2019s dimensions; then the Indian spine — the social structure (caste and its change, the village studies, the tribes, the language and region), the Sanskritisation-westernisation-secularisation debate, and the GS1 society register applied (women and organisations, population and its issues, poverty and development, urbanisation\u2019s problems, social empowerment, communalism-regionalism-secularism, globalisation\u2019s effects). Cross-references Anthropology (the comparative human register) and hands off to Cultural Studies (the meaning register) and to the reader\u2019s own society as the laboratory.',
  status: 'planned',
  accent: ['#ca8a04', '#854d0e'],
  chapters,
}
