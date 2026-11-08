'use client'

/**
 * Generated cover for a custom book — same visual language as the library's
 * own BookCover (gradient spine + serif title), using a deterministic warm
 * palette derived from the book id. No blue/indigo, matching the site.
 */
const PALETTES: [string, string][] = [
  ['#ea580c', '#c2410c'], // vivid amber (FM)
  ['#14b8a6', '#0f766e'], // teal (ANS)
  ['#65a30d', '#166534'], // lime-green (AL)
  ['#f97316', '#c2410c'], // rust
  ['#d97706', '#92400e'], // umber
  ['#22c55e', '#15803d'], // moss
  ['#eab308', '#a16207'], // bronze
]

function hashString(s: string): number {
  let h = 0
  for (let i = 0; i < s.length; i++) {
    h = (h * 31 + s.charCodeAt(i)) | 0
  }
  return Math.abs(h)
}

export function CustomCover({
  id,
  title,
  method,
  large = false,
  status,
}: {
  id: string
  title: string
  method?: string
  large?: boolean
  status?: string
}) {
  const accent = PALETTES[hashString(id) % PALETTES.length]
  const methodLabel =
    method === 'exam'
      ? 'From an examination'
      : method === 'subject'
        ? 'From library subjects'
        : method === 'topics'
          ? 'From a topic list'
          : method === 'pdf'
            ? 'From an uploaded syllabus'
            : method === 'combination'
              ? 'Combined sources'
              : 'Custom book'
  return (
    <div
      className={`relative flex flex-col justify-between overflow-hidden rounded-lg text-white shadow-md ${
        large ? 'aspect-[3/4] w-full max-w-[220px] p-5' : 'aspect-[3/4] w-full p-3.5'
      }`}
      style={{ background: `linear-gradient(150deg, ${accent[0]} 0%, ${accent[1]} 100%)` }}
      aria-hidden
    >
      <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/10" />
      <div className="pointer-events-none absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-black/10" />
      <span className={`font-semibold uppercase tracking-widest opacity-90 ${large ? 'text-[11px]' : 'text-[9px]'}`}>
        {methodLabel}
      </span>
      <div>
        <p className={`font-reading font-bold leading-tight ${large ? 'text-xl' : 'text-sm'}`}>{title}</p>
        {status === 'draft' && (
          <p className={`mt-1 leading-snug opacity-85 ${large ? 'text-xs' : 'text-[10px]'}`}>Draft — not published yet</p>
        )}
      </div>
      <span className={`opacity-80 ${large ? 'text-[10px]' : 'text-[8px]'}`}>Built from the Academic Library</span>
    </div>
  )
}
