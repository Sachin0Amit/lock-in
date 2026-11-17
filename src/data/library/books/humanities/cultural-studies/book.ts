import type { Book, Chapter } from '../../../types'

/**
 * Cultural Studies — the third book of the Society branch.
 *
 * STATUS: PLANNED (Humanities & Social Sciences full-shelf planning pass, 2026-11-16) — 8 chapters /
 * 34 planned lessons, zero written. Lesson ids will use the `cult-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Cultural Studies owns the meaning-and-media register — culture as a contested field of power. Sociology owns the social-structure register (the two cross-reference: this book reads the media as meaning-making, the sociology book reads the media as an institution); Art History owns the art object’s history (this book reads the contemporary’s visual culture, that book the object’s arc); the Anthropology book owns culture’s comparative-whole-human register (this book’s ’culture’ is the modern-media field, not the ethnographic whole); the languages shelf owns the linguistic competence this book’s semiotics presupposes.
 *
 * RESEARCH PHASE (2026-11-16):
 * - Barker & Jane, Cultural Studies: Theory and Practice 5e (the Sage record opened this pass — sk.sagepub.com/book/mono/cultural-studies-5e; the part structure read via the google-books contents: An Introduction to Cultural Studies; the linguistic turn; culture and ideology; semiotics; Marxism; the subject of culture; the culturalist turn; the audience; identity; ethnicity; gender; globalisation; media).
 * - UGC NET Cultural Studies is not a separate code (the subject routes through Sociology and the Human Rights and Duties register code 92's cultural components) — the honest note recorded this pass.
 * - The Indian cross-register named: the subaltern studies' arc, the dalit studies' register, the Indian popular cinema's cultural analysis as the applied poles.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'the-project',
    title: 'The Project of Cultural Studies',
    summary:
      'The field\u2019s own story told honestly: the Birmingham CCCS\u2019s founding moment (Hoggart, Williams, Thompson — the adult-education roots priced as the field\u2019s conscience); the interdisciplinarity\u2019s claim (neither literary criticism nor sociology — a border town by design); culture\u2019s three registers (the ideal, the documentary, the social — Williams\u2019s own definitions as the field\u2019s founding act); the selectivity problem priced honestly (whose culture gets studied and who gets to study it); and the field\u2019s map for this book\u2019s eight chapters.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Birmingham Founding',
      'The Interdisciplinarity\u2019s Claim',
      'Culture\u2019s Three Registers',
      'Chapter XXIX. William James'
    ],
  },
  {
    number: 2,
    slug: 'the-linguistic-turn',
    title: 'The Linguistic Turn',
    summary:
      'The meaning\u2019s machinery: Saussure\u2019s sign (the signifier-signified split, the arbitrariness, the difference\u2019s system); the semiotics\u2019 development (Peirce\u2019s triad named, Barthes\u2019s denotation-connotation and the myth\u2019s naturalisation — the wrestling essay as the classic); the discourse register (Foucault\u2019s statements, the archaeology, the panopticon priced carefully); the narrative theory\u2019s craft (the story against the discourse, the narration\u2019s levels); and the textuality\u2019s arrival — culture read as text with the method\u2019s gains and losses priced.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Saussure and the Sign',
      'Barthes and the Myth',
      'Foucault and the Discourse',
      'Culture as Text',
    ],
  },
  {
    number: 3,
    slug: 'ideology-and-power',
    title: 'Ideology and Power',
    summary:
      'The power\u2019s cultural machinery: the Gramscian hegemony (the common sense\u2019s manufacture, the organic intellectual); the Althusserian apparatus (the ISA\u2019s interpellation — the hail priced); the Frankfurt school\u2019s culture industry (Adorno and Horkheimer\u2019s standardisation thesis, the Benjamin\u2019s aura\u2019s loss priced as the counter); the political economy of the media (the ownership\u2019s concentration, the commodification of the audience); and the two readings\u2019 tension — the domination\u2019s picture against the resistance\u2019s hope priced honestly as the field\u2019s own debate.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Gramsci\u2019s Hegemony',
      'The Apparatus and the Hail',
      'The Culture Industry and the Counter',
      'The Media\u2019s Political Economy',
    ],
  },
  {
    number: 4,
    slug: 'the-subject-of-culture',
    title: 'The Subject of Culture',
    summary:
      'The self\u2019s cultural manufacture: the psychoanalytic register priced at survey depth (the Lacanian mirror, the unconscious\u2019s linguistics); the identity\u2019s articulation (Hall\u2019s definition — the becoming against the being); the performativity\u2019s thesis (Butler\u2019s drag as the argument, the sex-gender\u2019s unfixing); the subculture\u2019s resistance (the CCCS\u2019s own classic — the mods and the punks, the style\u2019s bricolage, the incorporation\u2019s answer); and the audiences\u2019 turn (the encoding-decoding model — the three readings, the active audience\u2019s discovery).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Psychoanalytic Register',
      'Identity\u2019s Articulation',
      'The Performativity and the Subcultures',
      'The Active Audience',
    ],
  },
  {
    number: 5,
    slug: 'difference-and-representation',
    title: 'Difference and Representation',
    summary:
      'The difference\u2019s politics: the representation\u2019s concept (the speak-for problem priced); the ethnicity\u2019s register (the hybridity\u2019s third space — Bhabha\u2019s argument); the postcolonial theory\u2019s arc (Said\u2019s orientalism as the founding text, Spivak\u2019s subaltern\u2019s question, the postcolonial\u2019s Indian career); the race\u2019s culturalisation (the representation\u2019s census — the stereotype\u2019s work); the gendered cultural field (the gaze\u2019s register, the #MeToo\u2019s cultural moment priced); and the intersection\u2019s arrival (the Crenshaw argument crossing the fields).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Representation Problem',
      'Said and the Postcolonial Arc',
      'The Gaze and the Gendered Field',
      'The Intersection\u2019s Arrival',
      'Gs-iii: Science And Technology - Developments And Their Applications And',
    ],
  },
  {
    number: 6,
    slug: 'the-media-culture',
    title: 'The Media Culture',
    summary:
      'The contemporary\u2019s machinery read culturally: the television\u2019s age (the flow\u2019s concept, the liveness, the event\u2019s broadcasting); the celebrity\u2019s manufacture; the fandom\u2019s communities (the textual poaching, the participatory\u2019s discovery); the music\u2019s cultural industries (the genre\u2019s social work); the sport\u2019s cultural power (the Olympics and the cricket\u2019s Indian register priced); and the platform\u2019s digital culture — the algorithm\u2019s feed, the meme\u2019s vernacular, the influencer\u2019s economy, the attention\u2019s economy named honestly.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Television\u2019s Age',
      'The Celebrity and the Fandom',
      'The Music and the Sport',
      'The Platform\u2019s Culture',
    ],
  },
  {
    number: 7,
    slug: 'globalisation-and-culture',
    title: 'Globalisation and Culture',
    summary:
      'The global\u2019s cultural debate: the cultural imperialism thesis (the media\u2019s Americanisation claim and its empirical trouble); the contra — the glocalisation (the global\u2019s local read, Robertson\u2019s term), the hybridity\u2019s register (the indigenisation of the popular); Appadurai\u2019s five scapes (the ethnoscapes-mediascapes-technoscapes-financescapes-ideoscapes as the global cultural economy\u2019s map); the world\u2019s cultural flows (the Hallyu as the contemporary case, the Indian popular\u2019s own outward reach priced); and the national-popular\u2019s Indian question (the state\u2019s cultural policy, the classical-folk-popular triangle).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Imperialism Thesis',
      'The Glocal Contra',
      'The Five Scapes',
      'The National-Popular Question',
    ],
  },
  {
    number: 8,
    slug: 'the-indian-register-and-doorstep',
    title: 'The Indian Register and the Doorstep',
    summary:
      'The Indian cultural studies\u2019 own arc: the subaltern studies\u2019 project (the Guha founding, the colonialism\u2019s historiographic correction — priced as both achievement and debate); the dalit studies\u2019 register (Ambedkar\u2019s cultural argument, the literature and the public sphere of the dalit publics); the popular cinema\u2019s cultural work (the Bombay cinema\u2019s form — the melodrama\u2019s social work, the star\u2019s cultus, the regional cinemas\u2019 plurality); the digital publics\u2019 India (the meme\u2019s politics, the WhatsApp\u2019s vernacular, the platform\u2019s publics priced honestly); and the doorstep — to Sociology\u2019s social register, to the reader\u2019s own feed as the living text this whole book was built to read.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Subaltern and the Dalit Registers',
      'The Cinema\u2019s Cultural Work',
      'The Digital Publics',
      'The Doorstep: The Reader\u2019s Own Feed',
    ],
  },
]

export const culturalStudies: Book = {
  id: 'cultural-studies',
  title: 'Cultural Studies',
  subtitle: 'Culture as the contested field — semiotics, ideology, identity and the media of everyday life',
  discipline: 'humanities',
  level: 'University-bound senior secondary → undergraduate media/cultural studies + competitive-exam general register',
  description: 'The interdisciplinary study of culture as power\u2019s field. The project\u2019s own story (the Birmingham Centre\u2019s founding, the culturalist turn against the literary and the sociological inheritances, culture\u2019s three registers — the anthropological, the social, the textual); the linguistic turn (Saussure\u2019s sign, Barthes\u2019s myths, the discourse\u2019s archaeology); the ideology-and-power register (the Gramscian hegemony, the Althusserian apparatus, the Frankfurt culture industry, the political economy of the media); the subject of culture (the psychoanalytic register, the identity\u2019s articulations, the performativity, the subculture\u2019s resistance — the CCCS register with its class-reading priced); the difference register (the ethnicity, the race and the hybridity, the postcolonial orientalism, the representation\u2019s politics, the gendered cultural field); the media\u2019s cultural analysis (the encoding-decoding audience, the television, the fandom, the platform\u2019s digital culture); the globalisation\u2019s cultural debate (the imperialism\u2019s thesis against the glocalisation, the world\u2019s cultural flows); and the Indian register (the dalit and subaltern studies\u2019 arc, the popular cinema\u2019s cultural work, the digital publics). Cross-references Sociology (the social-structure register) and hands off to the reader\u2019s own feed as the living text.',
  status: 'planned',
  accent: ['#d946ef', '#86198f'],
  chapters,
}
