'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  User, Lock, Eye, EyeOff, Loader2, CheckCircle2, AlertCircle,
  ArrowRight, LifeBuoy,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  mockSignInWithPassword,
  AuthError,
} from '@/lib/admin/mockAuth'

/**
 * LoginForm — CMS sign-in form.
 * Restricted to default admin/admin123 credentials.
 */
export default function LoginForm() {
  const router = useRouter()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(true)
  const [showPassword, setShowPassword] = useState(false)

  const [loading, setLoading]   = useState(false)
  const [errors, setErrors]     = useState({})
  const [success, setSuccess]   = useState(null)

  const clear = () => { setErrors({}); setSuccess(null) }

  async function handlePasswordSubmit(e) {
    e.preventDefault()
    clear()
    const nextErrors = {}
    const targetUser = String(username || '').trim().toLowerCase()
    
    if (!targetUser) {
      nextErrors.username = 'Username is required.'
    }
    if (!password) {
      nextErrors.password = 'Password is required.'
    }
    if (Object.keys(nextErrors).length) { setErrors(nextErrors); return }

    setLoading(true)
    try {
      await mockSignInWithPassword({ email: username, password, remember })
      
      // Set admin_token session cookie
      const maxAge = remember ? '; max-age=31536000; path=/' : '; path=/'
      document.cookie = `admin_token=mock-admin-token${maxAge}`

      setSuccess('signed-in')
      setTimeout(() => router.push('/admin'), 700)
    } catch (err) {
      const msg = err instanceof AuthError ? err.message : 'Something went wrong. Try again.'
      setErrors({ form: msg })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-5">
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
      </AnimatePresence>

      <form onSubmit={handlePasswordSubmit} className="space-y-4" noValidate>
        <Field label="Username" error={errors.username} htmlFor="username">
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-bekasi-ink/40" />
            <Input
              id="username"
              type="text"
              autoComplete="username"
              placeholder="admin"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
              aria-invalid={!!errors.username}
              className={cn(
                'h-11 pl-10 rounded-md bg-white border-bekasi-emerald-900/15 focus-visible:ring-bekasi-emerald-500/30 focus-visible:border-bekasi-emerald-500',
                errors.username && 'border-red-300 focus-visible:ring-red-200 focus-visible:border-red-400',
              )}
            />
          </div>
        </Field>

        <Field
          label="Password"
          error={errors.password}
          htmlFor="password"
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
              disabled={loading}
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

        {/* Remember me checkbox */}
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
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full h-11 rounded-md bg-bekasi-emerald-900 hover:bg-bekasi-emerald-800 text-white font-medium gap-2 disabled:opacity-70"
        >
          {loading ? (
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
