'use client'

// AuthProvider
// -----------------------------------------------------------------------------
// Lightweight React Context wrapper around Supabase Auth. Also owns the global
// LoginGateModal + deferredAction pattern used by the Smart Planner:
//
//   1. Guest clicks Save/Download → requireAuth(actionName) is called.
//   2. If already signed in, actionName is executed immediately (via the
//      caller's own useEffect / callback registration).
//   3. If not signed in, we stash { actionName, returnUrl } in localStorage and
//      open the LoginGateModal. When the user finishes the OAuth roundtrip and
//      lands on /auth/callback → back on the planner, the pending action fires.

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { getSupabase } from './client'

const AuthCtx = createContext(null)
const DEFERRED_KEY = 'bekasigo:deferredAction'

// ---- Deferred action helpers ------------------------------------------------
export function setDeferredAction(actionName, extra = {}) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(
      DEFERRED_KEY,
      JSON.stringify({ actionName, returnUrl: window.location.pathname + window.location.search, ...extra, ts: Date.now() }),
    )
  } catch {
    /* storage disabled — ignore */
  }
}
export function getDeferredAction() {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(DEFERRED_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    // Expire after 10 minutes so stale intents don't misfire.
    if (Date.now() - (parsed.ts || 0) > 10 * 60 * 1000) {
      localStorage.removeItem(DEFERRED_KEY)
      return null
    }
    return parsed
  } catch {
    return null
  }
}
export function clearDeferredAction() {
  if (typeof window === 'undefined') return
  localStorage.removeItem(DEFERRED_KEY)
}

// ---- Provider ---------------------------------------------------------------
export function AuthProvider({ children }) {
  const supabase = getSupabase()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState({ open: false, reason: 'save' })

  useEffect(() => {
    if (!supabase) { setLoading(false); return }
    let mounted = true

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!mounted) return
      setUser(session?.user ?? null)
      setLoading(false)
    })

    const { data: sub } = supabase.auth.onAuthStateChange((_evt, session) => {
      setUser(session?.user ?? null)
    })
    return () => { mounted = false; sub?.subscription?.unsubscribe?.() }
  }, [supabase])

  const requireAuth = useCallback((actionName, { reason = 'save', extra = {} } = {}) => {
    if (user) return true // already authed — caller runs the action itself
    setDeferredAction(actionName, extra)
    setModal({ open: true, reason })
    return false
  }, [user])

  const signInWithGoogle = useCallback(async () => {
    if (!supabase) return { error: new Error('Auth is not configured.') }
    const redirectTo = `${window.location.origin}/auth/callback`
    return supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo, queryParams: { prompt: 'select_account' } },
    })
  }, [supabase])

  const signOut = useCallback(async () => {
    if (!supabase) return
    clearDeferredAction()
    await supabase.auth.signOut()
  }, [supabase])

  const closeModal = useCallback(() => setModal((m) => ({ ...m, open: false })), [])
  const openModal  = useCallback((reason = 'save') => setModal({ open: true, reason }), [])

  const value = useMemo(() => ({
    user, loading,
    modal, openModal, closeModal,
    requireAuth,
    signInWithGoogle, signOut,
    isReady: !!supabase,
  }), [user, loading, modal, openModal, closeModal, requireAuth, signInWithGoogle, signOut, supabase])

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthCtx)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}
