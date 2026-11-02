import Link from 'next/link'
import { BookX, Library } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col items-center px-4 py-24 text-center sm:px-6">
      <span className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/15">
        <BookX className="h-7 w-7 text-primary" aria-hidden />
      </span>
      <h1 className="font-reading text-3xl font-bold tracking-tight">This shelf is empty</h1>
      <p className="mt-3 max-w-md leading-7 text-muted-foreground">
        The page you asked for does not exist — it may be a book or lesson that has not been
        written yet, or an address that changed. The library itself is one click away.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button asChild className="gap-2">
          <Link href="/">
            <Library className="h-4 w-4" aria-hidden /> Back to the library
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/book/foundation-mathematics">Open Foundation Mathematics</Link>
        </Button>
      </div>
    </div>
  )
}
