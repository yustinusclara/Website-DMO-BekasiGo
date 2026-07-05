'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ShieldCheck, Lock, Sparkles, ArrowLeft } from 'lucide-react'

/**
 * AuthLayout — reusable two-panel layout for all internal auth screens
 * (login / forgot-password / accept-invite / MFA). Keep it monotone and
 * distraction-free—this is an internal tool, not a marketing page.
 *
 * Usage:
 *   <AuthLayout title="Sign in" kicker="CMS" subtitle="...">
 *     <LoginForm />
 *   </AuthLayout>
 */
export default function AuthLayout({ title, kicker, subtitle, children, footer }) {
  return (
    <div className="min-h-screen grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
      {/* Left — brand panel (internal-tool feel, not public-site) */}
      <aside className="relative hidden lg:flex flex-col justify-between bg-bekasi-emerald-900 text-white p-10 xl:p-14 overflow-hidden">
        {/* Ambient */}
        <div aria-hidden className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-bekasi-gold-500/12 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -bottom-40 right-1/4 h-[420px] w-[420px] rounded-full bg-bekasi-emerald-500/25 blur-3xl" />
        {/* Grid pattern */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        {/* Top row — brand mark */}
        <div className="relative flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative h-9 w-9 transition-transform group-hover:scale-105">
              <Image
                src="https://res.cloudinary.com/oi9u7lsq/image/upload/v1783252951/3._Logo_SVG_BekasiGo_main_wqr72y.svg"
                alt="BekasiGo Logo"
                fill
                className="object-contain"
              />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display text-lg tracking-tight">BekasiGo</span>
              <span className="text-[9.5px] uppercase tracking-[0.28em] text-white/60 mt-0.5">Content Management</span>
            </div>
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.22em] text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-3 w-3" /> Back to site
          </Link>
        </div>

        {/* Middle — pitch */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-md"
        >
          <div className="inline-flex items-center gap-2 rounded-md border border-bekasi-gold-500/25 bg-bekasi-gold-500/10 px-3 py-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-bekasi-gold-400" />
            <span className="text-[10.5px] uppercase tracking-[0.22em] text-bekasi-gold-400 font-medium">
              Authorized staff only
            </span>
          </div>
          <h2 className="mt-6 font-sans font-semibold text-3xl xl:text-4xl leading-[1.1] tracking-tight text-balance">
            The BekasiGo content management console.
          </h2>
          <p className="mt-4 text-white/70 text-[15px] leading-relaxed">
            Sign in to manage destinations, events, stories, blog posts, and city data — all synced live to the public site.
          </p>

          {/* Feature bullets */}
          <ul className="mt-8 space-y-3.5">
            {[
              { icon: Sparkles, text: 'Publish destinations, events, and stories in one place' },
              { icon: Lock,     text: 'Role-based access with SSO and audit trail' },
              { icon: ShieldCheck, text: 'Direct sync to production · no manual deploys needed' },
            ].map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-start gap-3 text-sm text-white/80">
                <span className="mt-0.5 h-7 w-7 shrink-0 rounded-md bg-white/[0.06] border border-white/10 inline-flex items-center justify-center">
                  <Icon className="h-3.5 w-3.5 text-bekasi-gold-400" />
                </span>
                {text}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Bottom — legal + version */}
        <div className="relative flex items-center justify-between text-[10.5px] uppercase tracking-[0.22em] text-white/40">
          <span>© {new Date().getFullYear()} BekasiGo</span>
          <span>v1.0 · Internal build</span>
        </div>
      </aside>

      {/* Right — form panel */}
      <main className="flex flex-col items-center justify-center px-6 py-14 md:px-10 lg:px-14 xl:px-20">
        {/* Mobile brand strip */}
        <div className="lg:hidden w-full max-w-md flex items-center justify-between mb-10">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative h-9 w-9 transition-transform group-hover:scale-105">
              <Image
                src="https://res.cloudinary.com/oi9u7lsq/image/upload/v1783252951/3._Logo_SVG_BekasiGo_main_wqr72y.svg"
                alt="BekasiGo Logo"
                fill
                className="object-contain"
              />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display text-lg tracking-tight text-bekasi-emerald-900">BekasiGo</span>
              <span className="text-[9.5px] uppercase tracking-[0.28em] text-bekasi-ink/55 mt-0.5">Content Management</span>
            </div>
          </Link>
          <Link href="/" className="text-[11px] uppercase tracking-[0.22em] text-bekasi-ink/55 hover:text-bekasi-emerald-900 inline-flex items-center gap-1.5">
            <ArrowLeft className="h-3 w-3" /> Site
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="w-full max-w-md"
        >
          {kicker && (
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-bekasi-gold-600">
              <span className="h-px w-6 bg-bekasi-gold-500" />
              <span>{kicker}</span>
            </div>
          )}
          {title && (
            <h1 className="mt-3 font-sans font-semibold text-2xl md:text-3xl leading-tight tracking-tight text-bekasi-emerald-900 text-balance">
              {title}
            </h1>
          )}
          {subtitle && (
            <p className="mt-2 text-sm text-bekasi-ink/65 leading-relaxed">
              {subtitle}
            </p>
          )}

          <div className="mt-8">
            {children}
          </div>

          {footer && <div className="mt-8">{footer}</div>}
        </motion.div>

        {/* Mobile-only bottom legal */}
        <div className="lg:hidden w-full max-w-md mt-16 flex items-center justify-between text-[10.5px] uppercase tracking-[0.22em] text-bekasi-ink/45">
          <span>© {new Date().getFullYear()} BekasiGo</span>
          <span>v1.0 · Internal build</span>
        </div>
      </main>
    </div>
  )
}
