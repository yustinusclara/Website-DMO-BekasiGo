'use client'

// Compact auth indicator for the SiteHeader.
// - Guest  → "Sign in" ghost link (opens login modal).
// - Signed → avatar bubble + hover menu with email + Sign out.

import { useState, useRef, useEffect } from 'react'
import { useAuth } from '@/lib/supabase/AuthProvider'
import { LogIn, LogOut, User as UserIcon } from 'lucide-react'

export default function AuthAvatar() {
  const { user, isReady, openModal, signOut } = useAuth()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return
    const onClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [open])

  if (!isReady) return null

  if (!user) {
    return (
      <button
        type="button"
        onClick={() => openModal('default')}
        className="hidden md:inline-flex h-10 items-center gap-1.5 rounded-full px-3 text-[12.5px] font-medium text-white/85 hover:bg-white/10 hover:text-white transition-colors"
      >
        <LogIn className="h-3.5 w-3.5" /> Sign in
      </button>
    )
  }

  const avatarUrl = user.user_metadata?.avatar_url || user.user_metadata?.picture
  const name  = user.user_metadata?.full_name || user.user_metadata?.name || user.email
  const email = user.email
  const initials = String(name || '?').split(/\s+/).slice(0, 2).map((s) => s[0]).join('').toUpperCase()

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="h-10 w-10 overflow-hidden rounded-full border border-white/20 bg-white/10 hover:bg-white/20 transition-colors inline-flex items-center justify-center"
        aria-label="Account menu"
      >
        {avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={avatarUrl} alt={name} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
        ) : (
          <span className="text-[12px] font-semibold text-white">{initials}</span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-64 rounded-xl border border-black/5 bg-white shadow-xl z-50 overflow-hidden">
          <div className="px-4 py-3 border-b border-black/5">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 shrink-0 rounded-full bg-bekasi-emerald-900/8 flex items-center justify-center overflow-hidden">
                {avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={avatarUrl} alt="" className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                ) : (
                  <UserIcon className="h-4 w-4 text-bekasi-emerald-900" />
                )}
              </div>
              <div className="min-w-0">
                <div className="text-[13px] font-semibold text-bekasi-emerald-900 truncate">{name}</div>
                <div className="text-[11.5px] text-bekasi-ink/60 truncate">{email}</div>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={async () => { setOpen(false); await signOut() }}
            className="w-full flex items-center gap-2 px-4 py-2.5 text-[12.5px] text-bekasi-emerald-900 hover:bg-bekasi-cream/60 transition-colors"
          >
            <LogOut className="h-3.5 w-3.5" /> Sign out
          </button>
        </div>
      )}
    </div>
  )
}
