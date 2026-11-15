import type { Book, Chapter } from '../../../types'

/**
 * Mobile App Development — the forty-first book of the CS shelf.
 *
 * STATUS: PLANNED (CS full-shelf planning pass, 2026-11-15) — 7 chapters /
 * 22 planned lessons, zero written. Lesson ids will use the `mob-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Frontend Engineering owns the
 * web-client craft (the cross-platform webview echo named); Human-Computer
 * Interaction owns the design theory; Java/Kotlin and Swift\u2019s language
 * homes own their syntaxes — this book owns the mobile platform\u2019s own
 * engineering: the activity lifecycle, the device census, the store
 * discipline.
 *
 * RESEARCH PHASE (2026-11-15):
 * - Drive (docs/research/CS_TOC_SURVEY.md): no Android text on the Drive
 *   (honest note).
 * - Web-checked 2026-11-15: Google\u2019s Android Developer Fundamentals
 *   course concepts (the 1.0-5.x arc — introduction to Android, the
 *   first app, layouts/views/resources, activities and lifecycle,
 *   RecyclerView, intents, user interaction, testing, data) + the
 *   cross-platform arcs named (Flutter\u2019s bet).
 * - Exam types: architecture and lifecycle questions + build/portfolios.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'the-mobile-platform',
    title: 'The Mobile Platform',
    summary:
      'The pocket computer priced honestly: the device census (the sensors\u2019 wealth, the battery\u2019s tyranny — the single constraint that shapes every later discipline), the platform anatomy (the app model, the manifest\u2019s contract), the toolchain census, and the first app written and run.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Battery\u2019s Tyranny',
      'The Platform Anatomy',
      'The First App',
    ],
  },
  {
    number: 2,
    slug: 'ui-and-layout-discipline',
    title: 'UI and the Layout Discipline',
    summary:
      'The small screen\u2019s craft: the layout census (the view hierarchy priced, the modern declarative era named), resources and the configuration discipline (the rotation lesson — why state dies and how design saves it), the RecyclerView\u2019s recycling contract traced, and the platform\u2019s own design language\u2019s honesty (Material named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Rotation Lesson',
      'The Recycling Contract Traced',
      'The Design Language\u2019s Honesty',
    ],
  },
  {
    number: 3,
    slug: 'the-activity-lifecycle',
    title: 'The Activity Lifecycle',
    summary:
      'The platform\u2019s governing law: the lifecycle traced through every state transition (the callbacks\u2019 contracts — what may be done where), the death-and-rebirth honesty (the process model\u2019s kill discipline — Operating Systems cross-referenced), the state-saving discipline priced on a real loss, and the fragment echo named.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Lifecycle Traced',
      'The Death-and-Rebirth Honesty',
      'The State-Saving Discipline',
    ],
  },
  {
    number: 4,
    slug: 'intents-and-the-app-conversation',
    title: 'Intents and the App Conversation',
    summary:
      'The platform\u2019s social contract: the intent discipline (the implicit/explicit census priced on a real share), the app\u2019s exported surface question (the permission model\u2019s honesty — the user\u2019s grant), the navigation\u2019s craft (the back-stack discipline traced), and the deep-link echo named.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Intent Discipline',
      'The Permission Model\u2019s Honesty',
      'The Back-Stack Traced',
    ],
  },
  {
    number: 5,
    slug: 'data-and-persistence',
    title: 'Data and Persistence',
    summary:
      'The app\u2019s memory: the storage census (the preferences, the file discipline, the room discipline — the ORM\u2019s echo cross-referenced to DBMS), the background question (the work manager\u2019s discipline — the battery\u2019s law again), the notification\u2019s contract (the channel discipline), and the connectivity honesty (the offline-first craft).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Storage Census',
      'The Battery\u2019s Law for Background Work',
      'The Offline-First Craft',
    ],
  },
  {
    number: 6,
    slug: 'the-cross-platform-question',
    title: 'The Cross-Platform Question',
    summary:
      'The strategic census: the native discipline\u2019s claims priced (the performance and platform-access honesty), the cross-platform families priced (the webview echo versus the compile-to-native bet — Flutter/React Native named with their trade tables), the platform-access question (the bridge\u2019s tax), and the decision discipline honestly stated.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Native Claims Priced',
      'The Cross-Platform Trade Tables',
      'The Decision Discipline',
    ],
  },
  {
    number: 7,
    slug: 'shipping-and-the-synthesis',
    title: 'Shipping and the Synthesis',
    summary:
      'The store discipline and the map: the release craft (the signing census, the store\u2019s contract, the staged rollout), the testing census on devices (the fragmentation honesty), the performance\u2019s mobile metrics (the jank question — frame discipline), and the app on one page with its doorsteps — HCI\u2019s design theory, the platform vendors\u2019 next eras named.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Store\u2019s Contract',
      'The Fragmentation Honesty',
      'The App on One Page',
    ],
  },
]

export const mobileAppDevelopment: Book = {
  id: 'mobile-app-development',
  title: 'Mobile App Development',
  subtitle: 'The pocket computer — lifecycles, the battery\u2019s law, and the store\u2019s contract',
  discipline: 'computer-science',
  level: 'First mobile-development course → shipped-app readiness',
  description:
    'The mobile-platform home on Google\u2019s Android Developer Fundamentals arc. The pocket computer priced — the battery\u2019s tyranny and the platform anatomy; the layout discipline — the rotation lesson, the RecyclerView\u2019s recycling contract traced; the activity lifecycle — the callbacks\u2019 contracts, the death-and-rebirth honesty, the state-saving discipline; intents and the app conversation — the permission model\u2019s honesty, the back-stack traced; data and persistence — the storage census with the battery\u2019s law for background work and the offline-first craft; the cross-platform question priced with its trade tables; and shipping — the store\u2019s contract, the fragmentation honesty. Cross-references Frontend Engineering, Operating Systems, Human-Computer Interaction and DBMS; hands off to the platform\u2019s next eras.',
  status: 'planned',
  accent: ['#65a30d', '#3f6212'],
  chapters,
}
