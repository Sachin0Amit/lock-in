'use client'

/**
 * KaTeX math rendering for the LockIn reader.
 *
 * - <Math tex="..." display />  → a centred, numbered display equation
 * - <RichText text="..." />     → prose with inline $math$, **bold** and *italic*
 */
import katex from 'katex'
import { useMemo } from 'react'

export function Math({ tex, display = false }: { tex: string; display?: boolean }) {
  const html = useMemo(
    () =>
      katex.renderToString(tex, {
        displayMode: display,
        throwOnError: false,
        strict: false,
        trust: false,
        output: 'html',
      }),
    [tex, display],
  )
  return display ? (
    <div className="math-display" dangerouslySetInnerHTML={{ __html: html }} />
  ) : (
    <span className="math-inline" dangerouslySetInnerHTML={{ __html: html }} />
  )
}

const INLINE_TOKEN = /(\$[^$]+\$)|(\*\*[^*]+\*\*)|(\*[^*]+\*)/g

/** Renders mixed prose / inline-math / bold / italic strings from book data. */
export function RichText({ text, className }: { text: string; className?: string }) {
  const parts = text.split(INLINE_TOKEN)
  return (
    <span className={className}>
      {parts.map((part, i) => {
        if (!part) return null
        if (part.length > 2 && part.startsWith('$') && part.endsWith('$')) {
          return <Math key={i} tex={part.slice(1, -1)} />
        }
        if (part.length > 4 && part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={i} className="font-semibold text-foreground">
              <RichText text={part.slice(2, -2)} />
            </strong>
          )
        }
        if (part.length > 2 && part.startsWith('*') && part.endsWith('*')) {
          return (
            <em key={i}>
              <RichText text={part.slice(1, -1)} />
            </em>
          )
        }
        return <span key={i}>{part}</span>
      })}
    </span>
  )
}
