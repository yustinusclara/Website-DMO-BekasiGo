'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronRight, ArrowDown } from 'lucide-react'
import { DISCOVER } from '@/lib/content/discover'

/**
 * DiscoverHero — overview hero for /discover.
 * Full-viewport cinematic image with editorial breadcrumb, oversized
 * display title, city stats strip, and a subtle scroll cue.
 */
export default function DiscoverHero() {
  const { hero } = DISCOVER
  return (
    <section className="relative isolate min-h-[92vh] md:min-h-screen w-full overflow-hidden text-white">
      {/* Background image */}
      <Image
        src={hero.image}
        alt={hero.imageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center scale-105"
      />
      {/* Layered gradients for legibility */}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-bekasi-emerald-900" />
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(212,169,76,0.18)_0%,_transparent_50%)]" />

      {/* Content */}
      <div className="relative container flex flex-col justify-end min-h-[92vh] md:min-h-screen pt-32 pb-14 md:pb-20">
        {/* Breadcrumbs */}
        <motion.nav
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
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

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-8 md:mt-10 flex items-center gap-3"
        >
          <span className="h-px w-10 bg-bekasi-gold-400" />
          <span className="text-[11px] uppercase tracking-[0.28em] text-bekasi-gold-400">
            {hero.kicker}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.75rem] leading-[0.98] tracking-tight text-balance max-w-5xl"
        >
          {hero.title}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-6 max-w-2xl text-base md:text-lg text-white/75 leading-relaxed"
        >
          {hero.subtitle}
        </motion.p>

        {/* Bottom strip — coords + stats + scroll cue */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-12 md:mt-16 grid gap-8 md:grid-cols-[1fr_auto] items-end"
        >
          <div>
            <div className="text-[10.5px] uppercase tracking-[0.28em] text-white/50 mb-3">
              {hero.coords}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-4 max-w-3xl">
              {hero.stats.map((s) => (
                <div key={s.v} className="border-l border-white/15 pl-4">
                  <div className="font-display text-2xl md:text-3xl text-white leading-none">{s.k}</div>
                  <div className="mt-1.5 text-[11px] uppercase tracking-[0.2em] text-white/60">{s.v}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-white/60">
            <span>Scroll to read</span>
            <motion.span
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20"
            >
              <ArrowDown className="h-3.5 w-3.5" />
            </motion.span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
