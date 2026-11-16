import type { Book, Chapter } from '../../../types'

/**
 * International Economics — the fourth book of the Economics, Commerce & Finance shelf.
 *
 * STATUS: PLANNED (Economics, Commerce & Finance full-shelf planning pass, 2026-11-16) — 9 chapters /
 * 36 planned lessons, zero written. Lesson ids will use the `ieco-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): International Economics owns the trade-and-payments theory register (the UGC NET Economics international unit read this pass). International-business owns the firm-side global register — entry modes, multinational strategy; macroeconomics owns the domestic machinery; the economics of globalisation’s school-side register belongs to foundation-economics.
 *
 * RESEARCH PHASE (2026-11-16):
 * - The UGC NET Economics syllabus (read this pass — the International Economics unit: trade theory, trade policy, balance of payments, exchange rates) as the spine.
 * - Krugman, Obstfeld & Melitz, International Economics: Theory and Policy (the canonical arc named — the two-volume trade-and-money structure this plan follows) and Salvatore named as the pole.
 * - The NCERT globalisation register priced as the school ladder beneath.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'comparative-advantage',
    title: 'The Ricardian Logic',
    summary:
      'Absolute against comparative advantage told by the labour-cost arithmetic; the gains-from-trade ledger worked on the two-country-two-good model; the wages-and-productivity honesty; and the model\u2019s limits named gently — many goods, many countries, transport costs.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Labour-Cost Arithmetic',
      'The Gains Ledger',
      'The Wage Honesty',
      'The Model\u2019s Limits',
    ],
  },
  {
    number: 2,
    slug: 'heckscher-ohlin',
    title: 'The Heckscher-Ohlin Frame',
    summary:
      'Factor endowments as the trade cause; the theorem itself read with the four derived theorems — Stolper-Samuelson, Rybczynski, factor-price-equalisation and the Leontief paradox named; and the empirical honesty of the tests told.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Endowments as Cause',
      'The Four Theorems Read',
      'The Leontief Paradox',
      'The Empirical Honesty',
    ],
  },
  {
    number: 3,
    slug: 'new-trade-theory',
    title: 'The New Trade Theory',
    summary:
      'Economies of scale as the new cause: internal against external; intra-industry trade read as the evidence the classic theory cannot price; the Krugman monopolistic-competition model told honestly; dumping\u2019s arithmetic with the anti-dumping register named.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Scale as Cause',
      'Intra-Industry Evidence',
      'The Krugman Model',
      'Dumping\u2019s Arithmetic',
    ],
  },
  {
    number: 4,
    slug: 'trade-policy',
    title: 'Trade Policy Arithmetic',
    summary:
      'The tariff\u2019s welfare geometry — consumers, producers, government and the deadweight pair; quotas against tariffs priced; the effective-protection register; export subsidies and the VER honesty; and the political economy of protection told without romance.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Tariff Geometry',
      'Quota Arithmetic',
      'Effective Protection',
      'Protection\u2019s Politics',
    ],
  },
  {
    number: 5,
    slug: 'wto-and-regionalism',
    title: 'The WTO and Regionalism',
    summary:
      'The trade-institutions register: the WTO\u2019s principles and the rounds told honestly; the dispute craft named; regional trade agreements classified — free-trade area against customs union with the trade-diversion honesty; and the Indian trade-policy register priced.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The WTO Principles',
      'The Rounds Told',
      'Regionalism Classified',
      'The Indian Trade Register',
    ],
  },
  {
    number: 6,
    slug: 'balance-of-payments',
    title: 'The Balance of Payments',
    summary:
      'The BOP as the double-entry ledger — current and capital accounts with the reserve honesty; the identity arithmetic — the twin deficits told; the Indian BOP register priced with its history; and the adjustment question stated for the exchange-rate machinery.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Double-Entry Ledger',
      'The Twin Deficits',
      'The Indian Register',
      'The Adjustment Question',
    ],
  },
  {
    number: 7,
    slug: 'exchange-rates',
    title: 'Exchange-Rate Machinery',
    summary:
      'The foreign-exchange market\u2019s arithmetic; the PPP law and its honest limits; the interest-parity condition derived; fixed against floating regimes priced with the impossible-trinity register; and the currency-crisis cases named honestly.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Market Arithmetic',
      'The PPP Law and Limits',
      'The Interest Parity',
      'The Impossible Trinity',
    ],
  },
  {
    number: 8,
    slug: 'open-macro-deep',
    title: 'The Open Macro Register',
    summary:
      'The Mundell-Fleming machinery solved properly under fixed and floating regimes; the DD-AA frame read; the J-curve honesty for devaluation; and the capital-account crisis register — the Asian-crisis case told with its lessons priced.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Mundell-Fleming Solved',
      'The DD-AA Frame',
      'The J-Curve Honesty',
      'The Asian-Crisis Lessons',
    ],
  },
  {
    number: 9,
    slug: 'globalisation-and-the-doorway',
    title: 'Globalisation and the Doorway',
    summary:
      'The globalisation debate priced from both benches — the gains-distribution honesty; the labour-standards and environment registers told fairly; the global value chains register previewed for the international-business book; and the research doorway honestly marked.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Debate Priced',
      'The Fair Registers',
      'The GVC Preview',
      'The Research Doorway',
    ],
  },
]

export const internationalEconomics: Book = {
  id: 'international-economics',
  title: 'International Economics',
  subtitle: 'Trade and payments in theory and policy: from Ricardo\u2019s comparative logic to the crisis register',
  discipline: 'economics-commerce',
  level: 'University + UGC NET unit + competitive',
  description: 'The international register: the trade theory ladder from Ricardian comparative advantage through Heckscher-Ohlin to the new trade theory of scale and imperfect competition; trade policy\u2019s welfare arithmetic with the WTO and regionalism registers; the balance of payments and exchange-rate machinery; and the open-macro and crisis register that ends the standard course.',
  status: 'planned',
  accent: ['#14b8a6', '#134e4a'],
  chapters,
}
