'use client'

/**
 * Sign in / create account for the Custom Book Builder.
 * The Main Academic Library stays public — accounts exist so custom books,
 * bookmarks, notes and reading progress belong to a user.
 */
import { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { BookMarked, Library, Loader2, LockKeyhole, Mail, UserRound } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { api } from '@/lib/builder/client-api'
import { useAuth, type AuthUser } from './auth-store'

export function SigninView() {
  const router = useRouter()
  const params = useSearchParams()
  const setUser = useAuth((s) => s.setUser)
  const next = params.get('next') ?? '/my-books'

  const [mode, setMode] = useState<'signin' | 'register'>('signin')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setBusy(true)
    try {
      const path = mode === 'signin' ? '/api/auth/login' : '/api/auth/register'
      const body = mode === 'signin' ? { email, password } : { name, email, password }
      const data = await api<{ user: AuthUser }>(path, { method: 'POST', ...{ body: JSON.stringify(body) } })
      setUser(data.user)
      router.push(next)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-md flex-col justify-center px-4 py-16 sm:px-6">
      <div className="mb-8 text-center">
        <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-sm">
          <BookMarked className="h-6 w-6" aria-hidden />
        </span>
        <h1 className="font-reading text-3xl font-bold tracking-tight">
          {mode === 'signin' ? 'Welcome back' : 'Create your account'}
        </h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Sign in to build custom books and keep your bookmarks, notes and reading
          progress. The Academic Library itself stays open to everyone.
        </p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <Tabs value={mode} onValueChange={(v) => { setMode(v as 'signin' | 'register'); setError(null) }}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign in</TabsTrigger>
              <TabsTrigger value="register">Create account</TabsTrigger>
            </TabsList>

            <form onSubmit={submit} className="mt-5 space-y-4">
              <TabsContent value="signin" className="m-0 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
                    <Input
                      id="email"
                      type="email"
                      className="pl-9"
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
                    <Input
                      id="password"
                      type="password"
                      className="pl-9"
                      autoComplete="current-password"
                      placeholder="Your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={1}
                      maxLength={72}
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="register" className="m-0 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <div className="relative">
                    <UserRound className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
                    <Input
                      id="name"
                      className="pl-9"
                      autoComplete="name"
                      placeholder="Ada Lovelace"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      minLength={2}
                      maxLength={80}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
                    <Input
                      id="email"
                      type="email"
                      className="pl-9"
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
                    <Input
                      id="password"
                      type="password"
                      className="pl-9"
                      autoComplete="new-password"
                      placeholder="At least 8 characters"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={8}
                      maxLength={72}
                    />
                  </div>
                </div>
              </TabsContent>

              {error && (
                <p role="alert" className="rounded-md border border-rose-500/40 bg-rose-50 px-3 py-2 text-sm text-rose-800 dark:bg-rose-950/40 dark:text-rose-300">
                  {error}
                </p>
              )}

              <Button type="submit" className="w-full gap-2" disabled={busy}>
                {busy && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
                {mode === 'signin' ? 'Sign in' : 'Create account'}
              </Button>
            </form>
          </Tabs>
        </CardContent>
      </Card>

      <div className="mt-6 flex items-center justify-between text-sm">
        <Link href="/" className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground hover:underline">
          <Library className="h-4 w-4" aria-hidden /> Back to the Academic Library
        </Link>
        <Link href="/builder" className="text-muted-foreground hover:text-foreground hover:underline">
          Try the builder →
        </Link>
      </div>
    </div>
  )
}
