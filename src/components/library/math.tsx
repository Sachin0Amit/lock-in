'use client'

/**
 * KaTeX math rendering for the LockIn reader.
 *
 * - <Math tex="..." display />  → a centred, numbered display equation
 * - <RichText text="..." />     → prose with inline $math$, **bold** and *italic*
 */
import katex from 'katex'
import { useMemo } from 'react'
import { GraphIt } from './graph-it'

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
    <div className="math-display-wrap">
      <div className="math-display" dangerouslySetInnerHTML={{ __html: html }} />
      {/* FX-02 "Graph it": mounts only when the equation honestly plots */}
      <GraphIt tex={tex} />
    </div>
  ) : (
    <span className="math-inline" dangerouslySetInnerHTML={{ __html: html }} />
  )
}

const INLINE_TOKEN = /(\$[^$]+\$)|(\*\*[^*]+\*\*)|(\*[^*]+\*)/g

/** Renders mixed prose / inline-math / bold / italic strings from book data.
 *  `host` (optional) marks this string as a highlight anchor: the reader's
 *  multi-colour highlighter records and paints character ranges against the
 *  rendered text of exactly this element (stable because lesson text is
 *  authored once). Omit it for furniture that never gets highlighted. */
export function RichText({
  text,
  className,
  host,
}: {
  text: string
  className?: string
  host?: string
}) {
  const parts = text.split(INLINE_TOKEN)
  const body = (
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
  if (host === undefined) return body
  return <span data-hl={host}>{body}</span>
}
