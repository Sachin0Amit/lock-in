'use client'

/**
 * Review step — matched vs missing topics, alternatives swapping and
 * prerequisite suggestions, before curating the table of contents.
 */
import Link from 'next/link'
import { ArrowLeftRight, CheckCircle2, CircleSlash, Plus, Sparkles } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import {
  formatWords,
  STATUS_META,
  type MatchResponse,
  type MatchCandidate,
} from '@/lib/builder/client-api'
import type { TopicMatch } from '@/lib/builder/types'

interface Props {
  result: MatchResponse
  onSwap: (requested: string, alternative: MatchCandidate) => void
  onAddPrerequisite: (recordId: string, neededBy: string[]) => void
  addedRecordIds: Set<string>
}

export function ReviewMatches({ result, onSwap, onAddPrerequisite, addedRecordIds }: Props) {
  return (
    <div className="space-y-6">
      <div className="grid gap-3 sm:grid-cols-4">
        {[
          { label: 'requested', value: result.coverage.requested, tone: 'text-foreground' },
          { label: 'fully matched', value: result.coverage.exact + result.coverage.equivalent, tone: 'text-emerald-700 dark:text-emerald-300' },
          { label: 'partial', value: result.coverage.partial, tone: 'text-amber-700 dark:text-amber-300' },
          { label: 'not available', value: result.coverage.notAvailable, tone: 'text-rose-700 dark:text-rose-300' },
        ].map((s) => (
          <div key={s.label} className="rounded-lg border px-4 py-3">
            <p className={`font-reading text-2xl font-bold tabular-nums ${s.tone}`}>{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      <p className="text-sm leading-6 text-muted-foreground">
        The builder searched the Main Academic Library for every requested topic.{' '}
        {result.coverage.notAvailable > 0 && (
          <>
            <strong className="text-foreground">{result.coverage.notAvailable}</strong> topic
            {result.coverage.notAvailable === 1 ? '' : 's'} could not be found —{' '}
            <strong>no content will be invented for them</strong>, and they will be listed in the
            book&apos;s coverage report.
          </>
        )}
        {result.coverage.requested > 0 && result.coverage.notAvailable === 0 && result.coverage.partial > 0 && (
          <>
            <strong className="text-foreground">{result.coverage.partial}</strong> topic
            {result.coverage.partial === 1 ? '' : 's'} matched only partially.
          </>
        )}
      </p>

      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/40 text-left text-xs uppercase tracking-wide text-muted-foreground">
              <th scope="col" className="px-3 py-2.5 font-medium">Requested topic</th>
              <th scope="col" className="px-3 py-2.5 font-medium">Library match</th>
              <th scope="col" className="px-3 py-2.5 font-medium">Status</th>
              <th scope="col" className="px-3 py-2.5 font-medium">Alternatives</th>
            </tr>
          </thead>
          <tbody>
            {result.matches.map((m: TopicMatch, i) => {
              const meta = STATUS_META[m.status] ?? { label: m.status, className: 'border-border bg-muted' }
              const hasPrereqInfo = m.prerequisitesAvailable !== null
              return (
                <tr key={`${m.requested}-${i}`} className="border-b align-top last:border-0">
                  <td className="px-3 py-3">
                    <span className="font-medium">{m.requested}</span>
                    {m.parent && <span className="block text-xs text-muted-foreground">under {m.parent}</span>}
                  </td>
                  <td className="px-3 py-3">
                    {m.best ? (
                      <div>
                        <Link href={m.best.url} className="font-medium hover:underline">
                          <span className="text-muted-foreground">{m.best.lessonNumber}</span> {m.best.lessonTitle}
                        </Link>
                        <p className="text-xs text-muted-foreground">{m.best.location}</p>
                        <p className="mt-1 text-[11px] text-muted-foreground">
                          {m.expanded
                            ? `${m.expanded.recordIds.length} lessons · ${m.expanded.kind} match`
                            : `${formatWords(m.best.words)} words · via ${m.best.via}`}
                        </p>
                        {hasPrereqInfo && (
                          <p className="mt-1 inline-flex items-center gap-1 text-[11px]">
                            {m.prerequisitesAvailable ? (
                              <span className="text-emerald-700 dark:text-emerald-300">
                                <CheckCircle2 className="mr-0.5 inline h-3 w-3" aria-hidden />prerequisites available in the library
                              </span>
                            ) : (
                              <span className="text-amber-700 dark:text-amber-300">
                                <CircleSlash className="mr-0.5 inline h-3 w-3" aria-hidden />some prerequisites not written yet
                              </span>
                            )}
                          </p>
                        )}
                      </div>
                    ) : (
                      <span className="text-xs text-muted-foreground">
                        Not available in the Main Academic Library
                      </span>
                    )}
                  </td>
                  <td className="px-3 py-3">
                    <Badge variant="outline" className={`whitespace-nowrap font-normal ${meta.className}`}>
                      {meta.label}
                    </Badge>
                    {m.confidence > 0 && (
                      <span className="mt-1 block text-[11px] tabular-nums text-muted-foreground">
                        confidence {Math.round(m.confidence * 100)}%
                      </span>
                    )}
                  </td>
                  <td className="px-3 py-3">
                    {m.alternatives.length > 0 ? (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" size="sm" className="h-7 gap-1.5 text-xs">
                            <ArrowLeftRight className="h-3.5 w-3.5" aria-hidden />
                            {m.alternatives.length} alternative{m.alternatives.length === 1 ? '' : 's'}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent align="start" className="w-80">
                          <p className="mb-2 text-xs font-semibold text-muted-foreground">
                            Other plausible matches for “{m.requested}”
                          </p>
                          <div className="space-y-1">
                            {m.alternatives.map((alt) => (
                              <button
                                key={alt.recordId}
                                type="button"
                                onClick={() => onSwap(m.requested, alt)}
                                className="w-full rounded-md border px-2.5 py-2 text-left text-xs transition-colors hover:border-primary/50 hover:bg-accent/50"
                              >
                                <span className="block font-medium">
                                  <span className="text-muted-foreground">{alt.lessonNumber}</span> {alt.lessonTitle}
                                </span>
                                <span className="block text-muted-foreground">{alt.location}</span>
                                <span className="block text-[10px] text-muted-foreground">via {alt.via}</span>
                              </button>
                            ))}
                          </div>
                        </PopoverContent>
                      </Popover>
                    ) : (
                      <span className="text-xs text-muted-foreground">—</span>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {result.prerequisites.length > 0 && (
        <>
          <Separator />
          <section aria-labelledby="prereq-heading">
            <h3 id="prereq-heading" className="mb-1 flex items-center gap-1.5 text-sm font-semibold">
              <Sparkles className="h-4 w-4 text-primary" aria-hidden /> Prerequisites available in the library
            </h3>
            <p className="mb-3 text-xs leading-5 text-muted-foreground">
              These lessons come <em>before</em> your selected topics and are already written in the
              library. Add them so your book starts on solid ground.
            </p>
            <div className="flex flex-wrap gap-2">
              {result.prerequisites.map((p) => {
                const added = addedRecordIds.has(p.recordId)
                return (
                  <Button
                    key={p.recordId}
                    variant={added ? 'secondary' : 'outline'}
                    size="sm"
                    className="h-auto justify-start gap-1.5 py-1.5 text-left font-normal"
                    disabled={added}
                    onClick={() => onAddPrerequisite(p.recordId, p.neededBy)}
                    title={p.neededBy.length > 0 ? `Needed by: ${p.neededBy.join(', ')}` : undefined}
                  >
                    {added ? (
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden />
                    ) : (
                      <Plus className="h-3.5 w-3.5 shrink-0" aria-hidden />
                    )}
                    <span className="min-w-0">
                      <span className="block truncate text-xs font-medium">
                        <span className="text-muted-foreground">{p.lessonNumber}</span> {p.lessonTitle}
                      </span>
                      <span className="block truncate text-[10px] text-muted-foreground">{p.location}</span>
                    </span>
                  </Button>
                )
              })}
            </div>
          </section>
        </>
      )}
    </div>
  )
}

/** Convenience: map a match response into coverage rows for saving. */
export function matchesToCoverage(result: MatchResponse) {
  return result.matches.map((m) => ({
    requestedTopic: m.requested,
    requestedParent: m.parent,
    matchedLibraryRecordId: m.best?.recordId ?? (m.expanded ? m.expanded.recordIds[0] ?? null : null),
    matchStatus: m.status,
    matchConfidence: m.confidence,
  }))
}
