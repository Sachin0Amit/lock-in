'use client'

/**
 * Flashcard revision — auto-generated from every `terms` block in a book.
 * Flip cards, self-marking (know / still learning), shuffle, keyboard
 * controls (Space flip · 1 know · 2 again), persisted per term.
 *
 * The Deck is a keyed child so switching modes (all / not-yet-known) or
 * resetting progress remounts it with a fresh session — no state-sync effects.
 */
import { useCallback, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowLeft,
  Check,
  Layers,
  RotateCcw,
  Shuffle,
  Sparkles,
  X,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { bookGlossary, paths, type Book } from '@/data/library/index'
import { RichText } from './math'
import { useProgress } from './progress-store'

type Mode = 'all' | 'todo'

interface Card {
  key: string
  term: string
  def: string
  lessonId: string
  lessonNumber: string
  lessonTitle: string
}

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/* ---------------------------------------------------------------- */
/* Deck — one session of cards                                       */
/* ---------------------------------------------------------------- */

function Deck({
  book,
  cards,
  allCards,
}: {
  book: Book
  cards: Card[]
  allCards: Card[]
}) {
  const [order, setOrder] = useState<Card[]>(cards)
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [sessionMarked, setSessionMarked] = useState<Record<string, 'know' | 'again'>>({})
  const toggleTermKnown = useProgress((s) => s.toggleTermKnown)
  const knownTerms = useProgress((s) => s.knownTerms)
  const liveKnown = allCards.filter((c) => knownTerms[c.key]).length

  const card = order[index]
  const finished = order.length > 0 && index >= order.length

  const mark = useCallback(
    (known: boolean) => {
      if (!card) return
      if (known !== !!knownTerms[card.key]) toggleTermKnown(card.key)
      setSessionMarked((s) => ({ ...s, [card.key]: known ? 'know' : 'again' }))
      setFlipped(false)
      setIndex((i) => i + 1)
    },
    [card, knownTerms, toggleTermKnown],
  )

  /* Keyboard: Space flip · 1 know · 2 again. */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      const target = e.target as EventTarget | null
      if (
        target instanceof Element &&
        target.closest('input, textarea, select, [cmdk-root], [role="dialog"]')
      )
        return
      if (e.key === ' ') {
        e.preventDefault()
        setFlipped((f) => !f)
      } else if (e.key === '1') {
        e.preventDefault()
        mark(true)
      } else if (e.key === '2') {
        e.preventDefault()
        mark(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [mark])

  const restart = () => {
    setSessionMarked({})
    setIndex(0)
    setFlipped(false)
    setOrder(shuffleArray(cards))
  }

  return (
    <>
      {/* Deck stats + controls */}
      <div className="mb-5 flex flex-wrap items-center gap-2">
        <Badge variant="secondary" className="gap-1.5 font-normal">
          <Layers className="h-3.5 w-3.5" aria-hidden />
          {order.length} in deck
        </Badge>
        <Badge
          variant="outline"
          className="border-emerald-500/50 font-normal text-emerald-700 dark:text-emerald-300"
        >
          {liveKnown}/{allCards.length} known
        </Badge>
        <Button
          variant="outline"
          size="sm"
          className="ml-auto h-8 gap-1.5 text-xs"
          onClick={() => setOrder(shuffleArray(order))}
        >
          <Shuffle className="h-3.5 w-3.5" aria-hidden /> Shuffle
        </Button>
      </div>

      <Progress
        value={(Math.min(index, order.length) / order.length) * 100}
        className="mb-6 h-1.5"
        aria-label="Deck progress"
      />

      {/* Card area */}
      <div className="flashcard-scene mx-auto">
        <AnimatePresence mode="wait">
          {finished ? (
            <motion.div
              key="summary"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-2xl border bg-card p-8 text-center shadow-sm"
            >
              <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/15">
                <Sparkles className="h-6 w-6 text-primary" aria-hidden />
              </span>
              <h2 className="font-reading text-2xl font-bold">Deck complete</h2>
              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                You went through {order.length} card{order.length === 1 ? '' : 's'} and now know{' '}
                {liveKnown} of {allCards.length} terms in this book.
                {Object.values(sessionMarked).filter((v) => v === 'again').length > 0 &&
                  ' Cards marked “still learning” stay in your revision pile.'}
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Button onClick={restart} className="gap-2">
                  <RotateCcw className="h-4 w-4" aria-hidden /> Go again
                </Button>
                <Button asChild variant="outline" className="gap-2">
                  <Link href={paths.book(book.id)}>Back to the book</Link>
                </Button>
              </div>
            </motion.div>
          ) : card ? (
            <motion.button
              key={card.key + index}
              type="button"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.18 }}
              onClick={() => setFlipped((f) => !f)}
              aria-label={flipped ? 'Show term' : 'Show definition'}
              className="block w-full"
            >
              <motion.div
                className="flashcard relative"
                animate={{ rotateY: flipped ? 180 : 0 }}
                transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
              >
                {/* Front — the term */}
                <div className="flashcard-face flashcard-front">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Term · lesson {card.lessonNumber}
                  </p>
                  <p className="mt-3 text-center font-reading text-3xl font-bold leading-tight">
                    {card.term}
                  </p>
                  <p className="mt-4 text-xs text-muted-foreground">click or press Space to flip</p>
                </div>
                {/* Back — the definition */}
                <div className="flashcard-face flashcard-back">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Definition
                  </p>
                  <p className="mt-3 text-center text-base leading-7">
                    <RichText text={card.def} />
                  </p>
                </div>
              </motion.div>
            </motion.button>
          ) : null}
        </AnimatePresence>
      </div>

      {/* Marking controls */}
      {!finished && card && (
        <div className="mt-6">
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              size="lg"
              onClick={() => mark(false)}
              className="h-12 gap-2 border-rose-500/40 text-rose-700 hover:bg-rose-50 hover:text-rose-800 dark:text-rose-300 dark:hover:bg-rose-950/40"
            >
              <X className="h-5 w-5" aria-hidden /> Still learning
              <kbd className="ml-1 rounded border bg-muted px-1.5 py-0.5 text-[10px] font-semibold">2</kbd>
            </Button>
            <Button
              size="lg"
              onClick={() => mark(true)}
              className="h-12 gap-2 border-emerald-500/40 bg-emerald-600 hover:bg-emerald-700"
            >
              <Check className="h-5 w-5" aria-hidden /> I know this
              <kbd className="ml-1 rounded border bg-emerald-700/50 px-1.5 py-0.5 text-[10px] font-semibold">
                1
              </kbd>
            </Button>
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
            <span className="tabular-nums">
              Card {Math.min(index + 1, order.length)} of {order.length}
            </span>
            <Link
              href={paths.lesson(book.id, card.lessonId)}
              className="inline-flex items-center gap-1 hover:text-foreground hover:underline"
            >
              Open lesson {card.lessonNumber} — {card.lessonTitle}
            </Link>
          </div>
        </div>
      )}
    </>
  )
}

/* ---------------------------------------------------------------- */
/* View — mode switch + empty states                                 */
/* ---------------------------------------------------------------- */

export function FlashcardsView({ book }: { book: Book }) {
  const glossary = useMemo(() => bookGlossary(book), [book])
  const knownTerms = useProgress((s) => s.knownTerms)
  const resetKnownTerms = useProgress((s) => s.resetKnownTerms)
  const [mode, setMode] = useState<Mode>('all')

  const allCards: Card[] = useMemo(
    () =>
      glossary.map((g) => ({
        key: `${book.id}::${g.term}`,
        term: g.term,
        def: g.def,
        lessonId: g.lessonId,
        lessonNumber: g.lessonNumber,
        lessonTitle: g.lessonTitle,
      })),
    [book.id, glossary],
  )

  const deckCards = mode === 'todo' ? allCards.filter((c) => !knownTerms[c.key]) : allCards
  const knownCount = allCards.filter((c) => knownTerms[c.key]).length

  return (
    <div className="mx-auto w-full max-w-2xl px-4 pb-16 pt-8 sm:px-6">
      <Link
        href={paths.book(book.id)}
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden /> {book.title}
      </Link>

      <header className="mt-4 mb-6">
        <h1 className="font-reading text-3xl font-bold tracking-tight">Revise — {book.title}</h1>
        <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
          Flashcards generated from every definition in the book. Flip, self-mark, and the deck
          remembers what you know.
        </p>
        {allCards.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-8 gap-1.5 text-xs"
              onClick={() => setMode((m) => (m === 'all' ? 'todo' : 'all'))}
            >
              {mode === 'all' ? 'All terms' : 'Not yet known'}
            </Button>
            {knownCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className="h-8 gap-1.5 text-xs text-muted-foreground"
                onClick={() => resetKnownTerms(`${book.id}::`)}
              >
                <RotateCcw className="h-3.5 w-3.5" aria-hidden /> Reset {knownCount} known
              </Button>
            )}
          </div>
        )}
      </header>

      {allCards.length === 0 ? (
        <EmptyDeck
          book={book}
          title="No flashcards yet"
          text="Flashcards are generated automatically from the definition lists inside each lesson. As soon as a written lesson contains a terms block, its terms appear here."
        />
      ) : deckCards.length === 0 ? (
        <EmptyDeck
          book={book}
          title="Nothing left to learn — for now"
          text="You have marked every flashcard in this book as known. Reset above, or come back after new lessons are written — their terms join this deck automatically."
        />
      ) : (
        <Deck key={mode} book={book} cards={deckCards} allCards={allCards} />
      )}
    </div>
  )
}

function EmptyDeck({
  book,
  title,
  text,
}: {
  book: Book
  title: string
  text: string
}) {
  return (
    <div className="rounded-2xl border bg-card p-8 text-center shadow-sm">
      <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/15">
        <Layers className="h-6 w-6 text-primary" aria-hidden />
      </span>
      <h2 className="font-reading text-2xl font-bold">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">{text}</p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Button asChild variant="outline">
          <Link href={paths.book(book.id)}>Back to the book</Link>
        </Button>
      </div>
    </div>
  )
}
