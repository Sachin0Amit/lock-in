/**
 * Custom Book Builder — PDF syllabus extraction.
 *
 * Pipeline (server-side, Node runtime):
 *   1. Text layer via pdfjs-dist (in-process, portable): text items are
 *      grouped into lines with font heights; big/odd font sizes, Unit/
 *      Chapter/Module patterns and ALL-CAPS lines become headings.
 *   2. If the PDF has no text layer (a scan), rasterise with pdftoppm and
 *      OCR each page with tesseract (eng), then rebuild structure from
 *      numbering patterns.
 *   3. Extracted structure is ALWAYS shown to the user for review before
 *      the library is searched — extraction is best-effort and honest
 *      about its warnings.
 *
 * No content is generated: the output is a list of topic NAMES found in
 * the uploaded document, which the discovery engine then matches against
 * the Main Academic Library.
 */
import { spawn } from 'node:child_process'
import { mkdtemp, readdir, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { basename } from 'node:path'
import { buildTree, cleanTopicLine, type TreeLine } from './topic-parser'
import type { ParsedInput } from './types'

export interface PdfExtractionResult {
  pages: number
  textChars: number
  usedOcr: boolean
  warnings: string[]
  parsed: ParsedInput
}

const MAX_BYTES = 15 * 1024 * 1024
const MAX_PAGES = 80
const OCR_PAGE_LIMIT = 20

/* ------------------------------------------------------------------ */
/* Minimal typed surface of pdfjs-dist (ambient module declared in     */
/* src/types/pdfjs.d.ts)                                               */
/* ------------------------------------------------------------------ */

interface PdfTextItem {
  str: string
  transform?: number[]
  width?: number
  height?: number
  fontName?: string
}

interface PdfPage {
  getTextContent: () => Promise<{ items: PdfTextItem[] }>
}

interface PdfDoc {
  numPages: number
  getPage: (n: number) => Promise<PdfPage>
}

interface PdfjsModule {
  getDocument: (src: Record<string, unknown>) => { promise: Promise<PdfDoc> }
}

interface ExtractedLine {
  text: string
  height: number
  x: number
}

/* ------------------------------------------------------------------ */
/* Process helpers                                                     */
/* ------------------------------------------------------------------ */

function run(cmd: string, args: string[], timeoutMs = 90_000): Promise<{ code: number; stdout: string; stderr: string }> {
  return new Promise((resolve) => {
    const child = spawn(cmd, args, { stdio: ['ignore', 'pipe', 'pipe'] })
    let stdout = ''
    let stderr = ''
    const timer = setTimeout(() => child.kill('SIGKILL'), timeoutMs)
    child.stdout.on('data', (d) => (stdout += d.toString()))
    child.stderr.on('data', (d) => (stderr += d.toString()))
    child.on('error', (err) => {
      clearTimeout(timer)
      resolve({ code: -1, stdout, stderr: String(err) })
    })
    child.on('close', (code) => {
      clearTimeout(timer)
      resolve({ code: code ?? -1, stdout, stderr })
    })
  })
}

async function which(bin: string): Promise<boolean> {
  const res = await run('which', [bin], 5_000)
  return res.code === 0 && res.stdout.trim().length > 0
}

/* ------------------------------------------------------------------ */
/* Text-layer extraction (pdfjs-dist)                                  */
/* ------------------------------------------------------------------ */

async function extractLinesWithPdfjs(bytes: Uint8Array, pageLimit: number): Promise<ExtractedLine[]> {
  const pdfjs = (await import('pdfjs-dist/legacy/build/pdf.mjs')) as unknown as PdfjsModule
  const doc = await pdfjs.getDocument({
    data: bytes,
    isEvalSupported: false,
    disableFontFace: true,
    useSystemFonts: false,
    useWorkerFetch: false,
  }).promise

  const allLines: ExtractedLine[] = []
  for (let p = 1; p <= Math.min(doc.numPages, pageLimit); p++) {
    const page = await doc.getPage(p)
    const content = await page.getTextContent()
    /* group items into lines by y coordinate */
    const rows = new Map<number, { x: number; endX: number; height: number; parts: string[] }>()
    for (const item of content.items) {
      if (!item.str || !item.str.trim()) continue
      const x = item.transform?.[4] ?? 0
      const y = item.transform?.[5] ?? 0
      const width = item.width ?? 0
      const height = item.height ?? 0
      const key = Math.round(y / 2) /* 2pt tolerance rows */
      const row = rows.get(key)
      if (row) {
        row.parts.push(item.str)
        row.endX = Math.max(row.endX, x + width)
        row.height = Math.max(row.height, height)
      } else {
        rows.set(key, { x, endX: x + width, height, parts: [item.str] })
      }
    }
    const pageLines = Array.from(rows.entries())
      .sort((a, b) => b[0] - a[0]) /* PDF y grows upward → top first */
      .map(([, row]) => ({ text: row.parts.join(' ').replace(/\s{2,}/g, ' ').trim(), height: Math.round(row.height * 10) / 10, x: Math.round(row.x) }))
      .filter((l) => l.text.length > 0)
    allLines.push(...pageLines)
  }
  return allLines
}

/* ------------------------------------------------------------------ */
/* OCR fallback (pdftoppm + tesseract)                                 */
/* ------------------------------------------------------------------ */

async function ocrLines(bytes: Uint8Array, pageLimit: number): Promise<{ lines: ExtractedLine[]; warnings: string[] }> {
  const warnings: string[] = []
  const hasPdftoppm = await which('pdftoppm')
  const hasTesseract = await which('tesseract')
  if (!hasPdftoppm || !hasTesseract) {
    warnings.push(
      'This PDF has no extractable text layer, and OCR tools are not available in this environment. Please paste the topic list manually (Method 3).',
    )
    return { lines: [], warnings }
  }

  const dir = await mkdtemp(`${tmpdir()}/cbb-ocr-`)
  try {
    const pdfPath = `${dir}/doc.pdf`
    await writeFile(pdfPath, bytes)
    const ppm = await run('pdftoppm', ['-r', '150', '-png', '-l', String(pageLimit), pdfPath, `${dir}/p`])
    if (ppm.code !== 0) {
      warnings.push('Rasterising the PDF failed — cannot OCR this file.')
      return { lines: [], warnings }
    }
    const images = (await readdir(dir)).filter((f) => f.startsWith('p') && f.endsWith('.png')).sort((a, b) => {
      const na = Number(a.replace(/\D+/g, ''))
      const nb = Number(b.replace(/\D+/g, ''))
      return na - nb
    })
    const lines: ExtractedLine[] = []
    for (const img of images) {
      const res = await run('tesseract', [`${dir}/${img}`, 'stdout', '-l', 'eng', '--psm', '4'])
      if (res.code !== 0) continue
      for (const raw of res.stdout.split(/\r?\n/)) {
        const text = raw.replace(/\s{2,}/g, ' ').trim()
        if (text) lines.push({ text, height: 0, x: 0 })
      }
    }
    if (lines.length === 0) {
      warnings.push('OCR produced no readable text — the scan quality may be too low. Please paste the topic list manually (Method 3).')
    } else {
      warnings.push(
        `No text layer was found — OCR was applied to ${images.length} page${images.length === 1 ? '' : 's'}. Please review the extracted structure carefully before matching.`,
      )
    }
    return { lines, warnings }
  } finally {
    await rm(dir, { recursive: true, force: true }).catch(() => undefined)
  }
}

/* ------------------------------------------------------------------ */
/* Line → structure                                                    */
/* ------------------------------------------------------------------ */

function mostCommonHeight(lines: ExtractedLine[]): number {
  const counts = new Map<number, number>()
  for (const l of lines) {
    if (l.height <= 0) continue
    counts.set(l.height, (counts.get(l.height) ?? 0) + 1)
  }
  let best = 0
  let bestCount = 0
  for (const [h, c] of counts) {
    if (c > bestCount || (c === bestCount && h < best)) {
      best = h
      bestCount = c
    }
  }
  return best
}

function isAllCapsShort(text: string): boolean {
  return text.length >= 3 && text.length <= 60 && text === text.toUpperCase() && /[A-Z]/.test(text)
}

function linesToParsed(lines: ExtractedLine[], fallbackName: string): ParsedInput {
  const bodyHeight = mostCommonHeight(lines)
  const bodyX = Math.min(...lines.filter((l) => l.height <= 0 || l.height <= bodyHeight * 1.15).map((l) => l.x), Infinity)

  const treeLines: TreeLine[] = []
  for (const line of lines) {
    const clean = cleanTopicLine(line.text)
    if (!clean || !clean.text) continue
    const fontHeading = bodyHeight > 0 && line.height >= bodyHeight * 1.25 && clean.kind !== 'numbered' && clean.kind !== 'bullet'
    const isHeading = clean.kind === 'header' || fontHeading || isAllCapsShort(clean.text)
    const indent = Number.isFinite(bodyX) && line.x - bodyX > 24 ? 1 : 0
    treeLines.push({ clean, indent, isHeading })
  }

  const parsed = buildTree(treeLines)

  /* the largest-font first line is the document title → root name */
  let title = ''
  let titleH = 0
  for (const l of lines.slice(0, 12)) {
    if (l.height > titleH && l.text.length >= 4) {
      titleH = l.height
      title = l.text
    }
  }
  if (!parsed.rootName) {
    const cleanedTitle = title ? cleanTopicLine(title)?.text ?? '' : ''
    parsed.rootName = cleanedTitle || fallbackName
  }
  return parsed
}

/* ------------------------------------------------------------------ */
/* Entry point                                                         */
/* ------------------------------------------------------------------ */

export async function extractPdfTopics(
  bytes: Uint8Array,
  filename: string,
): Promise<PdfExtractionResult> {
  if (bytes.byteLength > MAX_BYTES) {
    throw new Error('PDF is larger than 15 MB — please upload a smaller syllabus file.')
  }
  if (bytes.byteLength < 5 || bytes[0] !== 0x25 || bytes[1] !== 0x50) {
    throw new Error('This file does not look like a PDF.')
  }

  const warnings: string[] = []
  let pages = 0
  let usedOcr = false
  let lines: ExtractedLine[] = []

  try {
    lines = await extractLinesWithPdfjs(bytes, MAX_PAGES)
  } catch (err) {
    warnings.push(`The PDF text layer could not be read (${(err as Error)?.message ?? 'unknown error'}).`)
    lines = []
  }

  if (lines.length === 0) {
    /* try OCR */
    const ocr = await ocrLines(bytes, OCR_PAGE_LIMIT)
    warnings.push(...ocr.warnings)
    lines = ocr.lines
    usedOcr = true
  }

  const textChars = lines.reduce((n, l) => n + l.text.length, 0)
  const parsed = linesToParsed(lines, basename(filename).replace(/\.pdf$/i, '').replace(/[-_]+/g, ' ').trim())

  try {
    const pdfjs = (await import('pdfjs-dist/legacy/build/pdf.mjs')) as unknown as PdfjsModule
    const doc = await pdfjs.getDocument({ data: bytes.slice(), isEvalSupported: false, disableFontFace: true }).promise
    pages = doc.numPages
    if (doc.numPages > MAX_PAGES) {
      warnings.push(`Only the first ${MAX_PAGES} pages were processed (document has ${doc.numPages}).`)
    }
  } catch {
    pages = lines.length > 0 ? Math.max(1, Math.ceil(textChars / 1800)) : 0
  }

  if (textChars > 0 && parsed.nodes.length === 0) {
    warnings.push('Text was extracted, but no recognizable topic structure was found — try Method 3 and paste the topics manually.')
  }

  return { pages, textChars, usedOcr, warnings, parsed }
}
