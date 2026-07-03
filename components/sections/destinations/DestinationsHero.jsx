'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronRight, MapPin } from 'lucide-react'
import { DEST_META, DESTINATIONS } from '@/lib/content/destinations'

/**
 * DestinationsHero — compact editorial header for the listing page.
 * Not a full-viewport hero. Keeps focus on the filter/grid below.
 */
export default function DestinationsHero() {
  const { hero } = DEST_META
  const total = DESTINATIONS.length

  return (
    <section className="relative isolate bg-bekasi-emerald-900 text-white overflow-hidden">
      {/* Ambient blobs */}
      <div aria-hidden className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-bekasi-gold-500/12 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-40 right-1/4 h-[420px] w-[420px] rounded-full bg-bekasi-emerald-500/20 blur-3xl" />

      {/* Oversized wordmark backdrop */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 pointer-events-none flex items-end justify-center overflow-hidden">
        <span className="font-display text-[22vw] leading-[0.8] tracking-tight text-white/[0.03] select-none whitespace-nowrap translate-y-[15%]">
          Destinations
        </span>
      </div>

      <div className="relative container pt-32 md:pt-40 pb-14 md:pb-20">
        {/* Breadcrumbs */}
        <motion.nav
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-white/70"
        >
          {hero.breadcrumbs.map((b, i) => (
            <span key={b.label} className="inline-flex items-center gap-2">
              {b.href ? (
                <Link href={b.href} className="hover:text-bekasi-gold-400 transition-colors">{b.label}</Link>
              ) : (
                <span className="text-bekasi-gold-400">{b.label}</span>
              )}
              {i < hero.breadcrumbs.length - 1 && <ChevronRight className="h-3 w-3 opacity-60" />}
            </span>
          ))}
        </motion.nav>

        <div className="mt-8 md:mt-10 grid gap-8 md:grid-cols-[1fr_auto] items-end">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-bekasi-gold-400" />
              <span className="text-[11px] uppercase tracking-[0.28em] text-bekasi-gold-400">
                {hero.kicker}
              </span>
            </div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 font-display text-4xl sm:text-5xl md:text-6xl leading-[1.02] tracking-tight text-balance max-w-3xl"
            >
              {hero.title}
            </motion.h1>
            <p className="mt-5 max-w-xl text-white/70 leading-relaxed">
              {hero.subtitle}
            </p>
          </div>

          {/* Count badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="inline-flex flex-col items-start rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur"
          >
            <span className="text-[10.5px] uppercase tracking-[0.22em] text-bekasi-gold-400 inline-flex items-center gap-1.5">
              <MapPin className="h-3 w-3" /> In the index
            </span>
            <span className="mt-2 font-display text-4xl md:text-5xl leading-none">
              {total}
            </span>
            <span className="mt-2 text-xs text-white/60">Destinations · updated weekly</span>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
