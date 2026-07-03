'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Loader2, Shield, Sparkles, Download, Bookmark, Share2 } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '@/lib/supabase/AuthProvider'

const REASON_COPY = {
  save: {
    icon: Bookmark,
    title: 'Save your itinerary',
    body:  'Sign in with Google to save this plan to your BekasiGo account. Access it anytime, on any device.',
  },
  download: {
    icon: Download,
    title: 'Download your itinerary',
    body:  'Sign in with Google so we can prepare a personalised PDF, tag it to your account, and pick up exactly where you left off next time.',
  },
  share: {
    icon: Share2,
    title: 'Share your itinerary',
    body:  'Sign in with Google to generate a permanent share link that stays tied to your BekasiGo account.',
  },
  default: {
    icon: Sparkles,
    title: 'Sign in to continue',
    body:  'A quick Google sign-in unlocks saving, downloading, and syncing your plans across devices.',
  },
}

// Inline Google "G" mark — keeps the button on-brand without an extra asset.
function GoogleGlyph({ className = 'h-4 w-4' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.24 1.4-1.7 4.1-5.5 4.1a6.2 6.2 0 1 1 0-12.4c2 0 3.3.8 4 1.5l2.7-2.6C17 3.1 14.7 2 12 2a10 10 0 1 0 0 20c5.8 0 9.6-4.1 9.6-9.9 0-.7-.1-1.3-.2-1.9H12z"/>
    </svg>
  )
}

export default function LoginGateModal() {
  const { modal, closeModal, signInWithGoogle } = useAuth()
  const [busy, setBusy] = useState(false)
  const reason = REASON_COPY[modal.reason] || REASON_COPY.default
  const Icon = reason.icon

  const handleGoogle = async () => {
    setBusy(true)
    try {
      await signInWithGoogle()
      // Browser will now navigate to Google — no need to close modal explicitly.
    } catch (e) {
      setBusy(false)
    }
  }

  return (
    <Dialog open={!!modal.open} onOpenChange={(v) => (!v ? closeModal() : null)}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden bg-white">
        {/* Header art */}
        <div className="relative h-32 bg-[color:var(--ink-forest,#0B3D3A)] text-white overflow-hidden">
          <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_20%_30%,#E1B547_0%,transparent_50%),radial-gradient(circle_at_80%_60%,#B48A2D_0%,transparent_45%)]" />
          <div className="relative flex h-full items-center justify-center">
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[color:var(--gold-accent,#B48A2D)]/25 backdrop-blur ring-2 ring-white/20">
              <Icon className="h-6 w-6 text-[color:var(--gold-accent,#E1B547)]" />
            </span>
          </div>
        </div>

        {/* Copy */}
        <div className="p-6">
          <DialogHeader className="gap-1">
            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[color:var(--gold-accent,#B48A2D)]">
              BekasiGo Account
            </div>
            <DialogTitle className="font-serif text-2xl leading-tight text-[color:var(--ink-forest,#0B3D3A)]">
              {reason.title}
            </DialogTitle>
            <DialogDescription className="pt-1 text-[color:var(--ink-forest,#0B3D3A)]/70 leading-relaxed">
              {reason.body}
            </DialogDescription>
          </DialogHeader>

          {/* Reassurance strip */}
          <div className="mt-4 flex items-center gap-2 rounded-lg bg-[color:var(--bg-page,#F7F1E5)] px-3 py-2 text-[11.5px] text-[color:var(--ink-forest,#0B3D3A)]/70">
            <Shield className="h-3.5 w-3.5 shrink-0 text-[color:var(--ink-forest,#0B3D3A)]/60" />
            <span>We only read your name, email, and profile picture. No spam, ever.</span>
          </div>

          <DialogFooter className="mt-5 flex-col gap-2 sm:flex-col">
            <Button
              type="button"
              onClick={handleGoogle}
              disabled={busy}
              className="w-full gap-2 rounded-full bg-white text-[color:var(--ink-forest,#0B3D3A)] border border-[color:var(--ink-forest,#0B3D3A)]/15 hover:bg-[color:var(--bg-page,#F7F1E5)] hover:border-[color:var(--ink-forest,#0B3D3A)]/25 text-sm font-medium shadow-sm"
            >
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <GoogleGlyph />}
              {busy ? 'Redirecting to Google…' : 'Continue with Google'}
            </Button>
            <button
              type="button"
              onClick={closeModal}
              className="w-full py-1.5 text-xs text-[color:var(--ink-forest,#0B3D3A)]/60 hover:text-[color:var(--ink-forest,#0B3D3A)]"
            >
              Maybe later
            </button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}
