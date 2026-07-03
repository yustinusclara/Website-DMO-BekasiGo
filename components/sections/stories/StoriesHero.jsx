'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronRight, BookOpen } from 'lucide-react'
import { STORIES, STORY_META, STORY_COLUMNS } from '@/lib/content/stories'

export default function StoriesHero() {
  const { hero, issue } = STORY_META
  return (
    <section className="relative isolate bg-bekasi-emerald-900 text-white overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-bekasi-gold-500/12 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-40 right-1/4 h-[420px] w-[420px] rounded-full bg-bekasi-emerald-500/20 blur-3xl" />

      {/* Oversized masthead backdrop */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 pointer-events-none flex items-end justify-center overflow-hidden">
        <span className="font-display text-[22vw] leading-[0.8] tracking-tight text-white/[0.03] select-none whitespace-nowrap translate-y-[15%]">
          Journal
        </span>
      </div>

      <div className="relative container pt-32 md:pt-40 pb-14 md:pb-24">
        {/* Breadcrumbs */}
        <motion.nav
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
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

        {/* Masthead */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-8 md:mt-10 flex flex-wrap items-end justify-between gap-6"
        >
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-bekasi-gold-400" />
              <span className="text-[11px] uppercase tracking-[0.28em] text-bekasi-gold-400">{hero.kicker}</span>
            </div>
            <div className="mt-2 flex items-center gap-3">
              <BookOpen className="h-6 w-6 text-bekasi-gold-400" />
              <span className="font-display italic text-2xl md:text-3xl text-white/90">{hero.masthead}</span>
            </div>
          </div>
          <div className="text-[10.5px] uppercase tracking-[0.28em] text-white/50">{issue}</div>
        </motion.div>

        {/* Big headline */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 md:mt-12 font-display italic text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] leading-[0.98] tracking-tight text-balance max-w-5xl"
        >
          {hero.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-6 max-w-2xl text-base md:text-lg text-white/70 leading-relaxed"
        >
          {hero.subtitle}
        </motion.p>

        {/* Columns strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-10 md:mt-14 flex flex-wrap items-center gap-2 md:gap-3"
        >
          <span className="text-[10.5px] uppercase tracking-[0.28em] text-white/50 mr-1">The columns</span>
          {STORY_COLUMNS.filter((c) => c.id !== 'all').map((c) => (
            <a
              key={c.id}
              href={`#column-${c.id}`}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] hover:bg-white/10 hover:border-white/30 px-3.5 py-1.5 text-[12px] transition-colors"
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: c.color }} />
              <span className="text-white/85">{c.label}</span>
              <span className="text-[10.5px] text-white/45">{STORIES.filter((s) => s.column === c.id).length}</span>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
