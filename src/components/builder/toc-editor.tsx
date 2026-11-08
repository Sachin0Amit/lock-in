'use client'

/**
 * TOC editor — reorder chapters, reorder topics, rename chapters, remove
 * content, add more library topics. Everything is a curation of canonical
 * library records; the Main Library hierarchy itself is never touched.
 */
import { useState } from 'react'
import {
  ArrowDown,
  ArrowUp,
  BookOpen,
  ListPlus,
  Plus,
  RefreshCw,
  Trash2,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import type { TocChapterDraft } from '@/lib/builder/types'
import { emptySelection, LibraryPicker, type SelectionState } from './library-picker'
import type { RecordInfo } from './record-info'

interface Props {
  toc: TocChapterDraft[]
  onChange: (toc: TocChapterDraft[]) => void
  recordInfo: Record<string, RecordInfo>
}

function move<T>(list: T[], from: number, to: number): T[] {
  if (to < 0 || to >= list.length) return list
  const next = [...list]
  const [item] = next.splice(from, 1)
  next.splice(to, 0, item)
  return next
}

export function TocEditor({ toc, onChange, recordInfo }: Props) {
  const [addToChapter, setAddToChapter] = useState<number | null>(null)
  const [pickerSelection, setPickerSelection] = useState<SelectionState>(emptySelection())

  const usedIds = new Set(toc.flatMap((c) => c.items.map((i) => i.recordId)))

  const setChapter = (index: number, chapter: TocChapterDraft) => {
    const next = [...toc]
    next[index] = chapter
    onChange(next)
  }

  const confirmAdd = () => {
    if (addToChapter === null) return
    const ids = pickerSelection.lessonIds.filter((id) => !usedIds.has(id))
    if (ids.length > 0) {
      const chapter = toc[addToChapter]
      setChapter(addToChapter, {
        ...chapter,
        items: [
          ...chapter.items,
          ...ids.map((recordId) => ({ recordId, via: 'added in the editor', confidence: 1 })),
        ],
      })
    }
    setAddToChapter(null)
    setPickerSelection(emptySelection())
  }

  return (
    <div className="space-y-4">
      {toc.map((chapter, ci) => (
        <section key={ci} className="rounded-lg border" aria-label={`Chapter ${ci + 1}: ${chapter.title}`}>
          <div className="flex flex-wrap items-center gap-2 border-b bg-muted/30 px-3 py-2.5">
            <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground tabular-nums">
              Ch {ci + 1}
            </span>
            <Input
              value={chapter.title}
              onChange={(e) => setChapter(ci, { ...chapter, title: e.target.value.slice(0, 200) })}
              aria-label={`Title of chapter ${ci + 1}`}
              className="h-8 flex-1 border-0 bg-transparent px-1 text-sm font-semibold shadow-none focus-visible:ring-1"
            />
            <div className="flex shrink-0 items-center gap-0.5">
              <Button variant="ghost" size="icon" className="h-7 w-7" disabled={ci === 0} onClick={() => onChange(move(toc, ci, ci - 1))} aria-label="Move chapter up">
                <ArrowUp className="h-3.5 w-3.5" />
              </Button>
              <Button variant="ghost" size="icon" className="h-7 w-7" disabled={ci === toc.length - 1} onClick={() => onChange(move(toc, ci, ci + 1))} aria-label="Move chapter down">
                <ArrowDown className="h-3.5 w-3.5" />
              </Button>
              <Button variant="ghost" size="icon" className="h-7 w-7 text-rose-600 hover:text-rose-700 dark:text-rose-400" onClick={() => onChange(toc.filter((_, i) => i !== ci))} aria-label="Remove chapter">
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>

          <ol className="divide-y">
            {chapter.items.map((item, ii) => {
              const info = recordInfo[item.recordId]
              return (
                <li key={item.recordId} className="flex items-center gap-2 px-3 py-2">
                  <span className="w-7 shrink-0 text-right text-xs tabular-nums text-muted-foreground">{ci + 1}.{ii + 1}</span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">
                      {info ? (
                        <>
                          <span className="text-muted-foreground">{info.lessonNumber}</span> {info.lessonTitle}
                        </>
                      ) : (
                        item.recordId
                      )}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {info ? info.location : 'record not found'}
                      {item.requestedTopic && item.requestedTopic !== (info?.lessonTitle ?? '') && (
                        <span className="ml-1.5 opacity-80">· requested as “{item.requestedTopic}”</span>
                      )}
                      {item.via && <span className="ml-1.5 opacity-70">· {item.via}</span>}
                    </p>
                  </div>
                  {typeof item.confidence === 'number' && item.confidence < 0.95 && (
                    <Badge variant="outline" className="hidden shrink-0 border-amber-500/40 text-[10px] font-normal text-amber-700 dark:text-amber-300 sm:inline-flex">
                      {item.confidence >= 0.75 ? 'equivalent' : 'partial'}
                    </Badge>
                  )}
                  <div className="flex shrink-0 items-center gap-0.5">
                    <Button variant="ghost" size="icon" className="h-7 w-7" disabled={ii === 0} onClick={() => setChapter(ci, { ...chapter, items: move(chapter.items, ii, ii - 1) })} aria-label="Move topic up">
                      <ArrowUp className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7" disabled={ii === chapter.items.length - 1} onClick={() => setChapter(ci, { ...chapter, items: move(chapter.items, ii, ii + 1) })} aria-label="Move topic down">
                      <ArrowDown className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-rose-600 hover:text-rose-700 dark:text-rose-400"
                      onClick={() => setChapter(ci, { ...chapter, items: chapter.items.filter((_, i) => i !== ii) })}
                      aria-label="Remove topic"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </li>
              )
            })}
            {chapter.items.length === 0 && (
              <li className="px-3 py-3 text-sm italic text-muted-foreground">Empty chapter — add topics or remove it.</li>
            )}
          </ol>

          <div className="border-t px-3 py-2">
            <Button variant="outline" size="sm" className="gap-1.5" onClick={() => { setAddToChapter(ci); setPickerSelection(emptySelection()) }}>
              <ListPlus className="h-4 w-4" aria-hidden /> Add library topics
            </Button>
          </div>
        </section>
      ))}

      {toc.length === 0 && (
        <div className="rounded-lg border border-dashed px-4 py-8 text-center text-sm text-muted-foreground">
          No chapters yet — add one and fill it with topics from the library.
        </div>
      )}

      <Button variant="outline" className="w-full gap-2 border-dashed" onClick={() => onChange([...toc, { title: `Chapter ${toc.length + 1}`, items: [] }])}>
        <Plus className="h-4 w-4" aria-hidden /> Add a chapter
      </Button>

      <Dialog open={addToChapter !== null} onOpenChange={(o) => !o && setAddToChapter(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" aria-hidden /> Add library topics
              {addToChapter !== null && toc[addToChapter] && (
                <span className="text-muted-foreground">to “{toc[addToChapter].title}”</span>
              )}
            </DialogTitle>
            <DialogDescription>
              Pick individual topics from the Main Academic Library. Chapters and whole books are
              expanded by the builder — here you add single lessons. Topics already in the book are
              disabled.
            </DialogDescription>
          </DialogHeader>
          <div className="max-h-[60vh] overflow-hidden">
            <LibraryPicker
              selected={pickerSelection}
              onChange={setPickerSelection}
              excludeLessonIds={usedIds}
              heightClass="h-[46vh]"
            />
          </div>
          <DialogFooter className="gap-2 sm:gap-0">
            <p className="mr-auto text-xs text-muted-foreground">
              {pickerSelection.lessonIds.filter((id) => !usedIds.has(id)).length} new topic(s)
            </p>
            <Button variant="ghost" onClick={() => setAddToChapter(null)}>Cancel</Button>
            <Button onClick={confirmAdd} disabled={pickerSelection.lessonIds.filter((id) => !usedIds.has(id)).length === 0}>
              <RefreshCw className="mr-1.5 h-4 w-4" aria-hidden /> Add topics
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
