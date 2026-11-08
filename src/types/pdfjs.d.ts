/**
 * Minimal typed surface for the pdfjs-dist legacy build used by the Custom
 * Book Builder's PDF extractor (server-side only).
 */
declare module 'pdfjs-dist/legacy/build/pdf.mjs' {
  export interface PdfTextItem {
    str: string
    transform?: number[]
    width?: number
    height?: number
    fontName?: string
  }

  export interface PdfPageProxy {
    getTextContent: () => Promise<{ items: PdfTextItem[] }>
  }

  export interface PdfDocumentProxy {
    numPages: number
    getPage: (pageNumber: number) => Promise<PdfPageProxy>
  }

  export function getDocument(src: Record<string, unknown>): { promise: Promise<PdfDocumentProxy> }
}
