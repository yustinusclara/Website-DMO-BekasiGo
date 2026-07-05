'use client'

// /auth/callback — tiny landing page Supabase redirects to after Google OAuth.
// Supabase's client (detectSessionInUrl: true) automatically parses the hash
// fragment; we then route the user back to their originating page.

import { Suspense, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import { getSupabase } from '@/lib/supabase/client'
import { getDeferredAction } from '@/lib/supabase/AuthProvider'

// Inner component — uses useSearchParams() so must live inside <Suspense>
function AuthCallbackInner() {
  const router = useRouter()
  const search = useSearchParams()
  const [status, setStatus] = useState('processing') // processing | success | error
  const [errorMsg, setErrorMsg] = useState(null)

  useEffect(() => {
    const supabase = getSupabase()
    if (!supabase) {
      setStatus('error')
      setErrorMsg('Auth is not configured.')
      return
    }

    // Supabase throws a `?error=...&error_description=...` param on OAuth failure.
    const err = search.get('error_description') || search.get('error')
    if (err) {
      setStatus('error')
      setErrorMsg(err.replace(/\+/g, ' '))
      return
    }

    let cancelled = false

    // Give supabase-js a tick to swallow the URL hash and persist the session.
    const run = async () => {
      // Small delay lets the client's detectSessionInUrl finish.
      await new Promise((r) => setTimeout(r, 250))
      const { data: { session } } = await supabase.auth.getSession()
      if (cancelled) return
      if (!session) {
        setStatus('error')
        setErrorMsg('Login could not be completed. Please try again.')
        return
      }
      setStatus('success')
      const pending = getDeferredAction()
      const dest = pending?.returnUrl || '/planner'
      // Kick back to originating page — the AuthProvider on that page will
      // detect the pending action and fire the deferred callback.
      setTimeout(() => router.replace(dest), 600)
    }
    run()
    return () => { cancelled = true }
  }, [router, search])

  return (
    <div className="min-h-screen flex items-center justify-center bg-[color:var(--bg-page,#F7F1E5)] px-6">
      <div className="max-w-sm w-full rounded-2xl border border-[color:var(--ink-forest,#0B3D3A)]/10 bg-white p-8 text-center shadow-sm">
        {status === 'processing' && (
          <>
            <Loader2 className="mx-auto h-8 w-8 animate-spin text-[color:var(--ink-forest,#0B3D3A)]" />
            <h1 className="mt-4 font-serif text-xl text-[color:var(--ink-forest,#0B3D3A)]">Signing you in…</h1>
            <p className="mt-1 text-sm text-[color:var(--ink-forest,#0B3D3A)]/60">One moment while we verify your Google account.</p>
          </>
        )}
        {status === 'success' && (
          <>
            <CheckCircle2 className="mx-auto h-9 w-9 text-emerald-600" />
            <h1 className="mt-4 font-serif text-xl text-[color:var(--ink-forest,#0B3D3A)]">Welcome back!</h1>
            <p className="mt-1 text-sm text-[color:var(--ink-forest,#0B3D3A)]/60">Redirecting to your itinerary…</p>
          </>
        )}
        {status === 'error' && (
          <>
            <AlertCircle className="mx-auto h-9 w-9 text-red-500" />
            <h1 className="mt-4 font-serif text-xl text-[color:var(--ink-forest,#0B3D3A)]">Login failed</h1>
            <p className="mt-1 text-sm text-[color:var(--ink-forest,#0B3D3A)]/60">{errorMsg}</p>
            <button
              type="button"
              onClick={() => router.replace('/planner')}
              className="mt-4 inline-flex items-center rounded-full border border-[color:var(--ink-forest,#0B3D3A)]/20 px-4 py-1.5 text-xs uppercase tracking-[0.14em] text-[color:var(--ink-forest,#0B3D3A)] hover:border-[color:var(--gold-accent,#B48A2D)]"
            >
              Back to planner
            </button>
          </>
        )}
      </div>
    </div>
  )
}

// Fallback UI shown during SSR / Suspense boundary hydration
function AuthCallbackFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[color:var(--bg-page,#F7F1E5)] px-6">
      <div className="max-w-sm w-full rounded-2xl border border-[color:var(--ink-forest,#0B3D3A)]/10 bg-white p-8 text-center shadow-sm">
        <Loader2 className="mx-auto h-8 w-8 animate-spin text-[color:var(--ink-forest,#0B3D3A)]" />
        <h1 className="mt-4 font-serif text-xl text-[color:var(--ink-forest,#0B3D3A)]">Signing you in…</h1>
        <p className="mt-1 text-sm text-[color:var(--ink-forest,#0B3D3A)]/60">One moment while we verify your Google account.</p>
      </div>
    </div>
  )
}

// Outer export wraps inner in Suspense — required by Next.js 15 when using
// useSearchParams() inside a Client Component that Next.js tries to prerender.
export default function AuthCallbackPage() {
  return (
    <Suspense fallback={<AuthCallbackFallback />}>
      <AuthCallbackInner />
    </Suspense>
  )
}
