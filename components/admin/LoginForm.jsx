'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Mail, Lock, Eye, EyeOff, Loader2, CheckCircle2, AlertCircle,
  ArrowRight, Wand2, LifeBuoy,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  mockSignInWithPassword, mockSignInWithGoogle, mockSendMagicLink,
  isValidEmail, AuthError,
} from '@/lib/admin/mockAuth'

/**
 * LoginForm — CMS sign-in form.
 * Handlers are mocked (see /app/lib/admin/mockAuth.js) so this file will
 * stay stable when the real Supabase / NextAuth client is wired in later.
 */
export default function LoginForm() {
  const router = useRouter()

  const [mode, setMode]         = useState('password') // 'password' | 'magic'
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(true)
  const [showPassword, setShowPassword] = useState(false)

  const [loading, setLoading]   = useState(null)       // 'password' | 'google' | 'magic' | null
  const [errors, setErrors]     = useState({})         // { email?, password?, form? }
  const [success, setSuccess]   = useState(null)       // 'signed-in' | 'magic-sent'

  const clear = () => { setErrors({}); setSuccess(null) }

  async function handlePasswordSubmit(e) {
    e.preventDefault()
    clear()
    const nextErrors = {}
    if (!isValidEmail(email)) nextErrors.email = 'Please enter a valid work email.'
    if (!password || password.length < 4) nextErrors.password = 'Password must be at least 4 characters.'
    if (Object.keys(nextErrors).length) { setErrors(nextErrors); return }

    setLoading('password')
    try {
      await mockSignInWithPassword({ email, password, remember })
      setSuccess('signed-in')
      setTimeout(() => router.push('/admin'), 700)
    } catch (err) {
      const msg = err instanceof AuthError ? err.message : 'Something went wrong. Try again.'
      setErrors({ form: msg })
    } finally {
      setLoading(null)
    }
  }

  async function handleGoogle() {
    clear()
    setLoading('google')
    try {
      await mockSignInWithGoogle()
      setSuccess('signed-in')
      setTimeout(() => router.push('/admin'), 700)
    } catch (err) {
      setErrors({ form: err?.message ?? 'Google sign-in failed. Try again.' })
    } finally {
      setLoading(null)
    }
  }

  async function handleMagic(e) {
    e.preventDefault()
    clear()
    if (!isValidEmail(email)) { setErrors({ email: 'Enter a valid work email to receive a magic link.' }); return }
    setLoading('magic')
    try {
      await mockSendMagicLink({ email })
      setSuccess('magic-sent')
    } catch (err) {
      setErrors({ form: err?.message ?? 'Could not send magic link.' })
    } finally {
      setLoading(null)
    }
  }

  const busy = !!loading

  return (
    <div className="space-y-5">
      {/* Google */}
      <Button
        type="button"
        onClick={handleGoogle}
        disabled={busy}
        variant="outline"
        className="w-full h-11 rounded-md border-bekasi-emerald-900/15 bg-white hover:bg-bekasi-emerald-900/[0.03] text-bekasi-ink font-medium gap-2.5 disabled:opacity-60"
      >
        {loading === 'google' ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <GoogleGlyph className="h-4 w-4" />
        )}
        Continue with Google
      </Button>

      {/* Divider */}
      <div className="relative py-1">
        <span className="absolute inset-0 flex items-center" aria-hidden>
          <span className="h-px w-full bg-bekasi-emerald-900/10" />
        </span>
        <span className="relative flex justify-center">
          <span className="bg-white px-3 text-[10.5px] uppercase tracking-[0.22em] text-bekasi-ink/45">or with email</span>
        </span>
      </div>

      {/* Form-level messages */}
      <AnimatePresence mode="wait">
        {errors.form && (
          <motion.div
            key="err"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            role="alert"
            className="flex items-start gap-2.5 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-800"
          >
            <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
            <span>{errors.form}</span>
          </motion.div>
        )}
        {success === 'signed-in' && (
          <motion.div
            key="ok-in"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="flex items-start gap-2.5 rounded-md border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800"
          >
            <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0" />
            <span>Signed in successfully. Redirecting…</span>
          </motion.div>
        )}
        {success === 'magic-sent' && (
          <motion.div
            key="ok-magic"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="flex items-start gap-2.5 rounded-md border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800"
          >
            <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0" />
            <span>Magic link sent to <strong>{email}</strong>. Check your inbox.</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Password form */}
      {mode === 'password' && (
        <form onSubmit={handlePasswordSubmit} className="space-y-4" noValidate>
          <Field label="Work email" error={errors.email} htmlFor="email">
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-bekasi-ink/40" />
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@bekasigo.id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={busy}
                aria-invalid={!!errors.email}
                className={cn(
                  'h-11 pl-10 rounded-md bg-white border-bekasi-emerald-900/15 focus-visible:ring-bekasi-emerald-500/30 focus-visible:border-bekasi-emerald-500',
                  errors.email && 'border-red-300 focus-visible:ring-red-200 focus-visible:border-red-400',
                )}
              />
            </div>
          </Field>

          <Field
            label="Password"
            error={errors.password}
            htmlFor="password"
            action={
              <Link href="/admin/forgot-password" className="text-[11.5px] font-medium text-bekasi-emerald-900 hover:text-bekasi-gold-600 transition-colors">
                Forgot password?
              </Link>
            }
          >
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-bekasi-ink/40" />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={busy}
                aria-invalid={!!errors.password}
                className={cn(
                  'h-11 pl-10 pr-10 rounded-md bg-white border-bekasi-emerald-900/15 focus-visible:ring-bekasi-emerald-500/30 focus-visible:border-bekasi-emerald-500',
                  errors.password && 'border-red-300 focus-visible:ring-red-200 focus-visible:border-red-400',
                )}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="absolute right-3 top-1/2 -translate-y-1/2 h-7 w-7 rounded-md inline-flex items-center justify-center text-bekasi-ink/50 hover:text-bekasi-emerald-900 hover:bg-bekasi-emerald-900/[0.04]"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </Field>

          {/* Remember + magic-link toggle */}
          <div className="flex items-center justify-between">
            <label className="inline-flex items-center gap-2 select-none cursor-pointer">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="h-4 w-4 rounded-sm border border-bekasi-emerald-900/25 text-bekasi-emerald-900 focus:ring-bekasi-emerald-500/30 accent-bekasi-emerald-900"
              />
              <span className="text-[13px] text-bekasi-ink/75">Remember me on this device</span>
            </label>
            <button
              type="button"
              onClick={() => { setMode('magic'); clear() }}
              className="text-[12px] font-medium text-bekasi-emerald-900 hover:text-bekasi-gold-600 inline-flex items-center gap-1.5"
            >
              <Wand2 className="h-3.5 w-3.5" /> Use magic link
            </button>
          </div>

          <Button
            type="submit"
            disabled={busy}
            className="w-full h-11 rounded-md bg-bekasi-emerald-900 hover:bg-bekasi-emerald-800 text-white font-medium gap-2 disabled:opacity-70"
          >
            {loading === 'password' ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Signing in…
              </>
            ) : (
              <>
                Sign in <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </form>
      )}

      {/* Magic link form */}
      {mode === 'magic' && (
        <form onSubmit={handleMagic} className="space-y-4" noValidate>
          <div className="rounded-md border border-bekasi-gold-500/25 bg-bekasi-gold-500/[0.08] p-4 text-[13px] text-bekasi-ink/80 leading-relaxed">
            We’ll email you a one-time link. Click it on this device to sign in — no password needed.
          </div>

          <Field label="Work email" error={errors.email} htmlFor="email-magic">
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-bekasi-ink/40" />
              <Input
                id="email-magic"
                type="email"
                autoComplete="email"
                placeholder="you@bekasigo.id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={busy}
                aria-invalid={!!errors.email}
                className={cn(
                  'h-11 pl-10 rounded-md bg-white border-bekasi-emerald-900/15 focus-visible:ring-bekasi-emerald-500/30 focus-visible:border-bekasi-emerald-500',
                  errors.email && 'border-red-300 focus-visible:ring-red-200 focus-visible:border-red-400',
                )}
              />
            </div>
          </Field>

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => { setMode('password'); clear() }}
              className="text-[12px] font-medium text-bekasi-emerald-900 hover:text-bekasi-gold-600 inline-flex items-center gap-1.5"
            >
              <Lock className="h-3.5 w-3.5" /> Use password instead
            </button>
          </div>

          <Button
            type="submit"
            disabled={busy}
            className="w-full h-11 rounded-md bg-bekasi-emerald-900 hover:bg-bekasi-emerald-800 text-white font-medium gap-2 disabled:opacity-70"
          >
            {loading === 'magic' ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Sending link…
              </>
            ) : (
              <>
                <Wand2 className="h-4 w-4" /> Send magic link
              </>
            )}
          </Button>
        </form>
      )}

      {/* Sub-footer */}
      <div className="pt-6 mt-2 border-t border-bekasi-emerald-900/8">
        <div className="flex flex-wrap items-center justify-between gap-3 text-[12px] text-bekasi-ink/60">
          <span className="inline-flex items-center gap-1.5">
            <LifeBuoy className="h-3.5 w-3.5" />
            Need access? <Link href="mailto:admin@bekasigo.id" className="text-bekasi-emerald-900 hover:text-bekasi-gold-600 font-medium">Contact admin</Link>
          </span>
          <span className="text-[10.5px] uppercase tracking-[0.22em] text-bekasi-ink/40">
            Authorized personnel only
          </span>
        </div>
      </div>
    </div>
  )
}

/* ----------------------------------------------------------------- */
/* Reusable form primitives                                            */
/* ----------------------------------------------------------------- */

function Field({ label, error, htmlFor, action, children }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <label htmlFor={htmlFor} className="text-[12.5px] font-medium text-bekasi-emerald-900">
          {label}
        </label>
        {action}
      </div>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -3 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -3 }}
            className="mt-1.5 flex items-center gap-1.5 text-xs text-red-600"
            role="alert"
          >
            <AlertCircle className="h-3.5 w-3.5" /> {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

/**
 * Google “G” glyph — inline so we don’t pull an extra icon lib.
 */
function GoogleGlyph({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.44c-.28 1.4-1.11 2.6-2.36 3.42v2.84h3.82c2.24-2.06 3.53-5.1 3.53-8.5z"/>
      <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.94-2.91l-3.82-2.84c-1.06.71-2.42 1.14-4.12 1.14-3.17 0-5.86-2.14-6.82-5.02H1.24v2.94C3.22 21.29 7.31 24 12 24z"/>
      <path fill="#FBBC05" d="M5.18 14.37c-.25-.71-.4-1.47-.4-2.37s.15-1.66.4-2.37V6.69H1.24C.45 8.27 0 10.08 0 12c0 1.92.45 3.73 1.24 5.31l3.94-2.94z"/>
      <path fill="#EA4335" d="M12 4.75c1.77 0 3.36.61 4.61 1.81l3.4-3.4C17.94 1.19 15.24 0 12 0 7.31 0 3.22 2.71 1.24 6.69l3.94 2.94C6.14 6.89 8.83 4.75 12 4.75z"/>
    </svg>
  )
}
