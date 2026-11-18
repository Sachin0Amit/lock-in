'use client'

/**
 * Focus — the to-do list of the Focus Hub.
 *
 * Tasks carry pomodoro estimates, priorities, due dates and an optional
 * canonical library link (book · chapter · lesson) picked from the live
 * catalog tree — the link chip is the deep jump to the topic you want to
 * work on. Completing rows moves them to the honest Completed section;
 * the engine's ordering (overdue → due today → priority → freshness)
 * always governs what renders first.
 */
import { useEffect, useMemo, useState } from 'react'
import {
  BookOpen,
  CheckCircle2,
  ChevronDown,
  Circle,
  ListTodo,
  Minus,
  Play,
  Plus,
  RotateCcw,
  Trash2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Input } from '@/components/ui/input'
import { createFocusTask, deleteFocusTask, updateFocusTask } from '@/lib/focus/client-api'
import { dueBucket, orderTasks, taskProgressLabel } from '@/lib/focus/focus-engine'
import type { Priority, TaskLinkInput, TaskView } from '@/lib/focus/types'
import { cn } from '@/lib/utils'

/* the catalog tree shape (same contract as the builder picker) */
interface TreeLesson { recordId: string; number: string; title: string }
interface TreeChapter { number: number; title: string; lessons: TreeLesson[] }
interface TreeBook { bookId: string; title: string; disciplineId: string; chapters: TreeChapter[] }
interface TreeDiscipline { id: string; title: string; books: TreeBook[] }

const FILTERS = ['all', 'today', 'overdue', 'high'] as const
type Filter = (typeof FILTERS)[number]

export function TaskList({
  tasks,
  activeTaskId,
  onChanged,
  onFocusTask,
}: {
  tasks: TaskView[]
  activeTaskId: string | null
  onChanged: () => void
  onFocusTask: (taskId: string) => void
}) {
  const [filter, setFilter] = useState<Filter>('all')

  const open = useMemo(() => orderTasks(tasks, Date.now()), [tasks])
  const done = useMemo(
    () =>
      tasks
        .filter((t) => t.status === 'done')
        .sort((a, b) => (b.completedAt ?? b.createdAt).localeCompare(a.completedAt ?? a.createdAt)),
    [tasks],
  )

  const visible = open.filter((t) => {
    if (filter === 'today') {
      const b = dueBucket(t, Date.now())
      return b === 'today' || b === 'overdue'
    }
    if (filter === 'overdue') return dueBucket(t, Date.now()) === 'overdue'
    if (filter === 'high') return t.priority === 'high'
    return true
  })

  return (
    <div className="space-y-4">
      <AddTaskForm onChanged={onChanged} />

      {open.length > 1 ? (
        <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Task filters">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={cn(
                'rounded-full border px-3 py-1 text-xs font-medium capitalize transition-colors',
                filter === f ? 'border-primary/60 bg-primary/10 text-primary' : 'border-border text-muted-foreground hover:text-foreground',
              )}
            >
              {f === 'today' ? 'Today + overdue' : f}
            </button>
          ))}
        </div>
      ) : null}

      {open.length === 0 ? (
        <Card className="border-dashed bg-card/40">
          <CardContent className="flex flex-col items-center gap-2 py-10 text-center">
            <ListTodo className="h-8 w-8 text-muted-foreground/60" aria-hidden />
            <p className="font-reading text-lg font-bold">The list is clear</p>
            <p className="max-w-sm text-sm text-muted-foreground">
              Add what you are locking in on today — give it a pomodoro estimate and link it to a
              library topic so every bell also counts as study time.
            </p>
          </CardContent>
        </Card>
      ) : visible.length === 0 ? (
        <p className="rounded-xl border border-dashed bg-card/40 p-5 text-sm text-muted-foreground">
          No tasks match this filter — {open.length} open task{open.length === 1 ? '' : 's'} waiting.
        </p>
      ) : (
        <ul className="space-y-2.5" aria-label="Open tasks">
          {visible.map((t) => (
            <TaskRow
              key={t.id}
              task={t}
              active={t.id === activeTaskId}
              onChanged={onChanged}
              onFocusTask={onFocusTask}
            />
          ))}
        </ul>
      )}

      {done.length > 0 ? <DoneSection tasks={done} onChanged={onChanged} /> : null}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* One task row                                                        */
/* ------------------------------------------------------------------ */

const PRIORITY_DOT: Record<Priority, string> = {
  high: 'bg-rose-500',
  normal: 'bg-sky-500',
  low: 'bg-muted-foreground/40',
}

function TaskRow({
  task,
  active,
  onChanged,
  onFocusTask,
}: {
  task: TaskView
  active: boolean
  onChanged: () => void
  onFocusTask: (taskId: string) => void
}) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(task.title)
  const bucket = dueBucket(task, Date.now())

  const save = () => {
    const title = draft.trim()
    if (title && title !== task.title) {
      void updateFocusTask({ id: task.id, title }).then(() => onChanged())
    } else {
      setDraft(task.title)
    }
    setEditing(false)
  }

  const toggleDone = () => {
    void updateFocusTask({ id: task.id, status: task.status === 'done' ? 'open' : 'done' }).then(() => onChanged())
  }

  const remove = () => {
    void deleteFocusTask(task.id).then(() => onChanged())
  }

  return (
    <li className={cn(
      'rounded-xl border bg-card px-3 py-3 transition-colors',
      active ? 'border-primary/50 ring-1 ring-primary/30' : 'hover:border-border/80',
    )}>
      <div className="flex items-start gap-3">
        <button
          type="button"
          onClick={toggleDone}
          aria-label={task.status === 'done' ? 'Reopen task' : 'Mark task done'}
          className="mt-0.5 shrink-0 text-muted-foreground transition-colors hover:text-emerald-600 dark:hover:text-emerald-400"
        >
          <Circle className="h-5 w-5" aria-hidden />
        </button>

        <div className="min-w-0 flex-1">
          {editing ? (
            <Input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') save()
                if (e.key === 'Escape') {
                  setDraft(task.title)
                  setEditing(false)
                }
              }}
              onBlur={save}
              autoFocus
              aria-label="Edit task title"
              className="h-8 text-sm"
            />
          ) : (
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="block max-w-full truncate text-left text-sm font-medium hover:underline-offset-2 hover:underline"
            title="Edit title"
          >
            <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full align-middle" aria-hidden>
              <span className={cn('block h-1.5 w-1.5 rounded-full', PRIORITY_DOT[task.priority])} />
            </span>
            {task.title}
          </button>
          )}

          {task.link ? (
            <a
              href={task.link.url}
              className="mt-1 inline-flex max-w-full items-center gap-1.5 truncate rounded-full border border-primary/30 bg-primary/5 px-2.5 py-0.5 text-xs font-medium text-primary hover:bg-primary/10"
              title={task.link.label}
            >
              <BookOpen className="h-3 w-3 shrink-0" aria-hidden />
              <span className="truncate">{task.link.shortLabel}</span>
              <span className="hidden shrink-0 text-muted-foreground sm:inline">· {task.link.bookTitle}</span>
            </a>
          ) : null}

          {task.notes ? <p className="mt-1 text-xs leading-5 text-muted-foreground">{task.notes}</p> : null}

          <p className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              {Array.from({ length: Math.min(task.estimate, 8) }, (_, i) => (
                <span key={i} className={cn('h-1.5 w-1.5 rounded-full', i < task.pomos ? 'bg-primary' : 'bg-muted-foreground/25')} aria-hidden />
              ))}
              {task.pomos > task.estimate ? <span className="font-semibold text-amber-600 dark:text-amber-400">+{task.pomos - task.estimate}</span> : null}
              <span className="sr-only">{taskProgressLabel(task)}</span>
            </span>
            <span aria-hidden>·</span>
            <span>{taskProgressLabel(task)}</span>
            {task.dueDate ? (
              <>
                <span aria-hidden>·</span>
                <span
                  className={cn(
                    'rounded-full px-1.5 py-0.5 font-semibold',
                    bucket === 'overdue' && 'bg-rose-500/15 text-rose-600 dark:text-rose-400',
                    bucket === 'today' && 'bg-amber-500/15 text-amber-700 dark:text-amber-400',
                    (bucket === 'tomorrow' || bucket === 'later') && 'bg-muted text-muted-foreground',
                  )}
                >
                  {bucket === 'overdue' ? 'Overdue ' : bucket === 'today' ? 'Today · ' : ''}
                  {task.dueDate}
                </span>
              </>
            ) : null}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-1">
          {active ? (
            <span className="inline-flex items-center gap-1 rounded-full border border-primary/40 bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" aria-hidden /> On the clock
            </span>
          ) : (
            <Button
              variant="outline"
              size="sm"
              className="h-8 gap-1.5 px-2.5"
              aria-label={`Focus on task: ${task.title}`}
              onClick={() => onFocusTask(task.id)}
            >
              <Play className="h-3.5 w-3.5" aria-hidden /> Focus
            </Button>
          )}
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" aria-label={`Delete task: ${task.title}`} onClick={remove}>
            <Trash2 className="h-3.5 w-3.5" aria-hidden />
          </Button>
        </div>
      </div>
    </li>
  )
}

/* ------------------------------------------------------------------ */
/* Completed section                                                  */
/* ------------------------------------------------------------------ */

function DoneSection({ tasks, onChanged }: { tasks: TaskView[]; onChanged: () => void }) {
  const [open, setOpen] = useState(false)
  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <Card className="bg-card/40">
        <CardHeader className="py-3">
          <CollapsibleTrigger asChild>
            <button type="button" className="flex w-full items-center gap-2 text-left" aria-expanded={open}>
              <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" aria-hidden />
              <span className="text-sm font-semibold">Completed ({tasks.length})</span>
              <ChevronDown className={cn('ml-auto h-4 w-4 text-muted-foreground transition-transform', open && 'rotate-180')} aria-hidden />
            </button>
          </CollapsibleTrigger>
        </CardHeader>
        <CollapsibleContent>
          <CardContent className="pt-0">
            <ul className="space-y-2" aria-label="Completed tasks">
              {tasks.slice(0, 50).map((t) => (
                <li key={t.id} className="flex items-center gap-3 rounded-lg border border-dashed px-3 py-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-muted-foreground line-through decoration-muted-foreground/50">{t.title}</p>
                    <p className="text-[11px] text-muted-foreground">
                      {t.completedAt ? new Date(t.completedAt).toLocaleDateString() : ''} · {taskProgressLabel(t)}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 gap-1 px-2 text-xs"
                    aria-label={`Reopen task: ${t.title}`}
                    onClick={() => void updateFocusTask({ id: t.id, status: 'open' }).then(() => onChanged())}
                  >
                    <RotateCcw className="h-3 w-3" aria-hidden /> Reopen
                  </Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-destructive" aria-label={`Delete task: ${t.title}`} onClick={() => void deleteFocusTask(t.id).then(() => onChanged())}>
                    <Trash2 className="h-3 w-3" aria-hidden />
                  </Button>
                </li>
              ))}
            </ul>
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  )
}

/* ------------------------------------------------------------------ */
/* The add form (with the catalog link picker)                         */
/* ------------------------------------------------------------------ */

function AddTaskForm({ onChanged }: { onChanged: () => void }) {
  const [title, setTitle] = useState('')
  const [details, setDetails] = useState(false)
  const [tree, setTree] = useState<TreeDiscipline[] | null>(null)
  const [treeError, setTreeError] = useState(false)
  const [bookId, setBookId] = useState('')
  const [chapterNumber, setChapterNumber] = useState('')
  const [lessonId, setLessonId] = useState('')
  const [estimate, setEstimate] = useState(1)
  const [priority, setPriority] = useState<Priority>('normal')
  const [dueDate, setDueDate] = useState('')
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    if (!details || tree || treeError) return
    let cancelled = false
    void (async () => {
      try {
        const res = await fetch('/api/library/tree', { cache: 'default' })
        if (!res.ok) throw new Error('tree fetch failed')
        const data = (await res.json()) as TreeDiscipline[]
        if (!cancelled) setTree(data)
      } catch {
        if (!cancelled) setTreeError(true)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [details, tree, treeError])

  const book = useMemo(() => {
    if (!tree || !bookId) return null
    for (const d of tree) {
      const b = d.books.find((x) => x.bookId === bookId)
      if (b) return b
    }
    return null
  }, [tree, bookId])

  const chapters = book?.chapters ?? []
  const chapter = chapters.find((c) => String(c.number) === chapterNumber) ?? null
  const lessons = chapter?.lessons ?? []

  const resolvedLink: TaskLinkInput | null = useMemo(() => {
    if (!bookId) return null
    if (lessonId) return { kind: 'lesson', refId: lessonId }
    if (chapterNumber) return { kind: 'chapter', refId: `${bookId}:${chapterNumber}` }
    return { kind: 'book', refId: bookId }
  }, [bookId, chapterNumber, lessonId])

  const submit = () => {
    const t = title.trim()
    if (!t || busy) return
    setBusy(true)
    void createFocusTask({
      title: t,
      link: resolvedLink,
      priority,
      estimate,
      dueDate: dueDate || null,
    })
      .then((created) => {
        if (created) {
          setTitle('')
          setEstimate(1)
          setPriority('normal')
          setDueDate('')
          setLessonId('')
          setChapterNumber('')
          onChanged()
        }
      })
      .finally(() => setBusy(false))
  }

  return (
    <Card>
      <CardContent className="pt-5">
        <div className="flex gap-2">
          <Input
            id="focus-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') submit()
            }}
            placeholder="What are you locking in on?"
            aria-label="New task title"
            maxLength={200}
          />
          <Button id="focus-add" onClick={submit} disabled={!title.trim() || busy} className="gap-1.5">
            <Plus className="h-4 w-4" aria-hidden /> Add
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setDetails((d) => !d)}
          className="mt-2 text-xs font-medium text-muted-foreground hover:text-foreground"
          aria-expanded={details}
        >
          {details ? 'Hide details' : 'Estimate, priority, due date, library link'}
        </button>

        {details ? (
          <div className="mt-3 grid gap-3 border-t pt-3 sm:grid-cols-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-muted-foreground">Pomodoros planned</span>
              <div className="flex items-center gap-1">
                <Button variant="outline" size="icon" className="h-7 w-7" aria-label="Fewer pomodoros" onClick={() => setEstimate((n) => Math.max(1, n - 1))}>
                  <Minus className="h-3 w-3" aria-hidden />
                </Button>
                <span id="focus-estimate" className="w-7 text-center text-sm font-semibold tabular-nums">{estimate}</span>
                <Button variant="outline" size="icon" className="h-7 w-7" aria-label="More pomodoros" onClick={() => setEstimate((n) => Math.min(16, n + 1))}>
                  <Plus className="h-3 w-3" aria-hidden />
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <label htmlFor="focus-priority" className="text-xs font-medium text-muted-foreground">Priority</label>
              <select
                id="focus-priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value as Priority)}
                className="h-8 rounded-md border bg-transparent px-2 text-sm"
              >
                <option value="low">Low</option>
                <option value="normal">Normal</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label htmlFor="focus-due" className="text-xs font-medium text-muted-foreground">Due</label>
              <input
                id="focus-due"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="h-8 rounded-md border bg-transparent px-2 text-sm"
              />
            </div>

            <div className="sm:col-span-2">
              <p className="mb-1.5 text-xs font-medium text-muted-foreground">Link to a library topic (optional)</p>
              {treeError ? (
                <p className="text-xs text-muted-foreground">The catalog tree could not load — the task can still be added unlinked.</p>
              ) : !tree ? (
                <p className="text-xs text-muted-foreground">Loading the library…</p>
              ) : (
                <div className="grid gap-2 sm:grid-cols-3">
                  <select
                    id="focus-link-book"
                    value={bookId}
                    onChange={(e) => {
                      setBookId(e.target.value)
                      setChapterNumber('')
                      setLessonId('')
                    }}
                    className="h-8 rounded-md border bg-transparent px-2 text-sm"
                    aria-label="Link: book"
                  >
                    <option value="">No link</option>
                    {tree.map((d) => (
                      <optgroup key={d.id} label={d.title}>
                        {d.books.map((b) => (
                          <option key={b.bookId} value={b.bookId}>{b.title}</option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                  <select
                    id="focus-link-chapter"
                    value={chapterNumber}
                    onChange={(e) => {
                      setChapterNumber(e.target.value)
                      setLessonId('')
                    }}
                    disabled={!bookId}
                    className="h-8 rounded-md border bg-transparent px-2 text-sm disabled:opacity-50"
                    aria-label="Link: chapter"
                  >
                    <option value="">Whole book</option>
                    {chapters.map((c) => (
                      <option key={c.number} value={String(c.number)}>Ch {c.number} · {c.title}</option>
                    ))}
                  </select>
                  <select
                    id="focus-link-lesson"
                    value={lessonId}
                    onChange={(e) => setLessonId(e.target.value)}
                    disabled={!chapterNumber}
                    className="h-8 rounded-md border bg-transparent px-2 text-sm disabled:opacity-50"
                    aria-label="Link: lesson"
                  >
                    <option value="">Whole chapter</option>
                    {lessons.map((l) => (
                      <option key={l.recordId} value={l.recordId}>{l.number} · {l.title}</option>
                    ))}
                  </select>
                </div>
              )}
              {resolvedLink ? (
                <p className="mt-1.5 text-xs text-emerald-700 dark:text-emerald-400">
                  Linked: {resolvedLink.kind} → {resolvedLink.refId}. Completed focus bells on a linked chapter/lesson also count as a study pass in the Revision Hub.
                </p>
              ) : null}
            </div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  )
}
