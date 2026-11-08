'use client'

/**
 * Coverage report — the honest gap report every custom book carries.
 * Shows the summary counts, the "not fully covered" warning, and the
 * per-topic table (requested topic, matched library record, location,
 * status, confidence, prerequisites).
 */
import Link from 'next/link'
import { AlertTriangle, CheckCircle2, MinusCircle, ShieldQuestion } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { STATUS_META } from '@/lib/builder/client-api'

export interface CoverageRow {
  requestedTopic: string
  requestedParent: string
  matchedLibraryRecordId: string | null
  matchStatus: string
  matchConfidence: number
}

export interface CoverageSummaryData {
  requested: number
  exact: number
  equivalent: number
  partial: number
  notAvailable: number
  percent: number
}

/** Resolve a record id to its live title (lessons are passed in because the
 * client already holds the book detail; fallback = plain link). */
export interface RecordInfo {
  lessonNumber: string
  lessonTitle: string
  location: string
  url: string
}

interface Props {
  summary: CoverageSummaryData
  rows: CoverageRow[]
  recordInfo?: Record<string, RecordInfo>
}

export function CoverageReport({ summary, rows, recordInfo }: Props) {
  const complete = summary.notAvailable === 0 && summary.partial === 0

  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-center sm:gap-6">
        <div className="flex items-baseline gap-2">
          <span className="font-reading text-4xl font-bold tabular-nums">{summary.percent.toFixed(1).replace(/\.0$/, '')}%</span>
          <span className="text-sm text-muted-foreground">coverage</span>
        </div>
        <div className="space-y-2">
          <Progress
            value={summary.percent}
            aria-label={`Coverage ${summary.percent}%`}
            className={complete ? '[&>div]:bg-emerald-600' : '[&>div]:bg-amber-500'}
          />
          <p className="text-xs leading-5 text-muted-foreground">
            Requested topics: <strong className="text-foreground">{summary.requested}</strong>
            {' · '}
            <span className="text-emerald-700 dark:text-emerald-300">{summary.exact} fully matched</span>
            {' · '}
            <span className="text-teal-700 dark:text-teal-300">{summary.equivalent} equivalent</span>
            {' · '}
            <span className="text-amber-700 dark:text-amber-300">{summary.partial} partial</span>
            {' · '}
            <span className="text-rose-700 dark:text-rose-300">{summary.notAvailable} not available</span>
          </p>
        </div>
      </div>

      {!complete && (
        <div
          role="note"
          className="flex gap-3 rounded-lg border border-amber-500/40 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-900 dark:bg-amber-950/30 dark:text-amber-200"
        >
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          <p>
            This custom book <strong>does not fully cover</strong> the requested scope —{' '}
            {summary.notAvailable > 0 && (
              <>
                {summary.notAvailable} topic{summary.notAvailable === 1 ? '' : 's'} cannot be found in the Main
                Academic Library
              </>
            )}
            {summary.notAvailable > 0 && summary.partial > 0 && ' and '}
            {summary.partial > 0 && <>{summary.partial} topic{summary.partial === 1 ? '' : 's'} only partially matched</>}
            . Missing content is never generated or invented — it stays listed below so you know exactly
            what the library does not cover yet.
          </p>
        </div>
      )}

      <Separator />

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left text-xs uppercase tracking-wide text-muted-foreground">
              <th scope="col" className="py-2 pr-4 font-medium">Requested topic</th>
              <th scope="col" className="py-2 pr-4 font-medium">Matched library record</th>
              <th scope="col" className="py-2 pr-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => {
              const meta = STATUS_META[row.matchStatus] ?? {
                label: row.matchStatus,
                className: 'border-border bg-muted text-muted-foreground',
              }
              const info = row.matchedLibraryRecordId ? recordInfo?.[row.matchedLibraryRecordId] : undefined
              return (
                <tr key={`${row.requestedTopic}-${i}`} className="border-b last:border-0 align-top">
                  <td className="py-2.5 pr-4">
                    <span className="font-medium">{row.requestedTopic}</span>
                    {row.requestedParent && (
                      <span className="block text-xs text-muted-foreground">under {row.requestedParent}</span>
                    )}
                  </td>
                  <td className="py-2.5 pr-4">
                    {info ? (
                      <Link href={info.url} className="group block">
                        <span className="block font-medium group-hover:underline">
                          <span className="text-muted-foreground">{info.lessonNumber}</span> {info.lessonTitle}
                        </span>
                        <span className="block text-xs text-muted-foreground group-hover:underline">{info.location}</span>
                      </Link>
                    ) : row.matchedLibraryRecordId ? (
                      <span className="text-xs text-muted-foreground">{row.matchedLibraryRecordId}</span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                        <MinusCircle className="h-3.5 w-3.5" aria-hidden /> Not available in Main Library
                      </span>
                    )}
                  </td>
                  <td className="py-2.5 pr-4">
                    <Badge variant="outline" className={`whitespace-nowrap font-normal ${meta.className}`}>
                      {meta.label}
                    </Badge>
                    {row.matchStatus === 'exact' && row.matchConfidence === 1 && (
                      <span className="mt-1 block text-[11px] text-muted-foreground">
                        <CheckCircle2 className="mr-1 inline h-3 w-3" aria-hidden />prerequisites in library
                      </span>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {rows.length === 0 && (
        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          <ShieldQuestion className="h-4 w-4" aria-hidden />
          No requested-topic report was recorded for this book (it was likely assembled by direct
          selection, which is always fully covered).
        </p>
      )}
    </div>
  )
}
