'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronRight, Newspaper } from 'lucide-react'
import { BLOG_META, BLOG_POSTS, BLOG_CATEGORIES } from '@/lib/content/blog'

export default function BlogHero() {
  const { hero } = BLOG_META
  return (
    <section className="relative isolate bg-bekasi-emerald-900 text-white overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-bekasi-gold-500/12 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-40 right-1/4 h-[420px] w-[420px] rounded-full bg-bekasi-emerald-500/20 blur-3xl" />

      <div className="relative container pt-32 md:pt-40 pb-14 md:pb-20">
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

        <div className="mt-8 md:mt-10 grid gap-8 md:grid-cols-[1fr_auto] items-end">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-bekasi-gold-400" />
              <span className="text-[11px] uppercase tracking-[0.28em] text-bekasi-gold-400">{hero.kicker}</span>
            </div>
            <div className="mt-3 inline-flex items-center gap-2 text-bekasi-gold-400">
              <Newspaper className="h-5 w-5" />
              <span className="text-sm uppercase tracking-[0.22em] text-white/80">{hero.eyebrow}</span>
            </div>
            {/* Sans-serif title (distinct from Stories italic display) */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="mt-5 font-sans font-semibold text-3xl sm:text-4xl md:text-5xl leading-[1.05] tracking-tight text-balance max-w-3xl"
            >
              {hero.title}
            </motion.h1>
            <p className="mt-5 max-w-xl text-white/70 leading-relaxed">{hero.subtitle}</p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="inline-flex flex-col items-start rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur"
          >
            <span className="text-[10.5px] uppercase tracking-[0.22em] text-bekasi-gold-400 inline-flex items-center gap-1.5">
              <Newspaper className="h-3 w-3" /> Fresh from the desk
            </span>
            <span className="mt-2 font-sans font-bold text-4xl md:text-5xl leading-none">{BLOG_POSTS.length}</span>
            <span className="mt-2 text-xs text-white/60">Posts · updated this week</span>
          </motion.div>
        </div>

        {/* Category anchors */}
        <div className="mt-10 md:mt-14 flex flex-wrap items-center gap-2">
          <span className="text-[10.5px] uppercase tracking-[0.28em] text-white/50 mr-1">Sections</span>
          {BLOG_CATEGORIES.filter((c) => c.id !== 'all').map((c) => (
            <a
              key={c.id}
              href="#blog-grid"
              className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/[0.03] hover:bg-white/10 hover:border-white/30 px-3 py-1.5 text-[12px] transition-colors"
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: c.color }} />
              <span className="text-white/85">{c.label}</span>
              <span className="text-[10.5px] text-white/45">{BLOG_POSTS.filter((p) => p.category === c.id).length}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
