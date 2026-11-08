'use client'

/**
 * Client-side auth state for the Custom Book Builder (zustand, no persist —
 * the httpOnly session cookie is the source of truth).
 */
import { create } from 'zustand'

export interface AuthUser {
  id: string
  name: string
  email: string
}

interface AuthState {
  user: AuthUser | null
  loaded: boolean
  loading: boolean
  load: () => Promise<void>
  setUser: (user: AuthUser | null) => void
  signOut: () => Promise<void>
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  loaded: false,
  loading: false,
  load: async () => {
    set({ loading: true })
    try {
      const res = await fetch('/api/auth/me', { cache: 'no-store' })
      const data = (await res.json().catch(() => null)) as { user?: AuthUser } | null
      set({ user: res.ok && data?.user ? data.user : null, loading: false, loaded: true })
    } catch {
      set({ user: null, loading: false, loaded: true })
    }
  },
  setUser: (user) => set({ user, loaded: true }),
  signOut: async () => {
    await fetch('/api/auth/logout', { method: 'POST' }).catch(() => undefined)
    set({ user: null })
  },
}))
