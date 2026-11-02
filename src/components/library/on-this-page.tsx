'use client'

/**
 * "On this page" — scrollspy table of contents for the lesson reader.
 * Tracks the heading ids rendered by BlockRenderer and highlights the
 * section currently in view.
 */
import { useEffect, useState } from 'react'
import { ListTree } from 'lucide-react'

export function OnThisPage({ headings }: { headings: { text: string; id: string }[] }) {
  const [active, setActive] = useState<string | null>(headings[0]?.id ?? null)

  useEffect(() => {
    if (headings.length === 0) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id)
        }
      },
      { rootMargin: '-15% 0px -70% 0px', threshold: 0 },
    )
    for (const h of headings) {
      const el = document.getElementById(h.id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [headings])

  if (headings.length < 2) return null

  return (
    <nav aria-label="On this page" className="sticky top-24 hidden max-h-[70vh] xl:block">
      <p className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        <ListTree className="h-3.5 w-3.5" aria-hidden /> On this page
      </p>
      <ul className="space-y-0.5 border-l">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              onClick={(e) => {
                e.preventDefault()
                document.getElementById(h.id)?.scrollIntoView({ behavior: 'smooth' })
                setActive(h.id)
              }}
              className={`-ml-px block border-l-2 py-1.5 pl-3.5 text-sm leading-snug transition-colors ${
                active === h.id
                  ? 'border-primary font-medium text-foreground'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
