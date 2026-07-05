'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight, Clock, Quote, ArrowRight, FileText } from 'lucide-react'
import ChapterMarker from '@/components/shared/ChapterMarker'
import { STORIES } from '@/lib/content/homepage'

export default function StoriesFromBekasi({ data }) {
  const content = data || STORIES;
  const F = content.featured
  return (
    <section id="stories" className="relative overflow-hidden bg-white">
      <div className="container py-24 md:py-32 lg:py-36">
        <ChapterMarker text={content.chapter} variant="light" />

        {/* Editorial header + Issue meta */}
        <div className="mt-14 md:mt-20 grid lg:grid-cols-12 gap-8 lg:gap-16 items-end">
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.8 }}
            className="lg:col-span-7"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="eyebrow eyebrow-dot text-bekasi-emerald-700">{content.eyebrow}</span>
              <span aria-hidden className="h-px w-8 bg-bekasi-emerald-900/20" />
              <span className="mono text-bekasi-ink/50">{content.issue}</span>
            </div>
            <h2 className="heading-display text-display-xl leading-[1.02] text-bekasi-emerald-900 text-balance">
              {content.title}
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.8, delay: 0.1 }}
            className="lg:col-span-5"
          >
            <p className="body-lg text-bekasi-ink/70 max-w-lg">{content.kicker}</p>
            <div className="mt-5 flex items-center gap-2 text-xs text-bekasi-ink/50">
              <FileText className="h-3.5 w-3.5" />
              <span className="font-mono">{content.totalStories}</span> stories in the archive
            </div>
          </motion.div>
        </div>

        {/* FEATURED STORY — cover magazine */}
        <motion.article
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 md:mt-20 grid lg:grid-cols-12 gap-8 lg:gap-14 items-center"
        >
          {/* Cover image */}
          <Link
            href={F.href}
            className="group lg:col-span-7 relative block rounded-3xl overflow-hidden aspect-[4/5] lg:aspect-[5/6] bg-bekasi-emerald-900"
          >
            <img src={F.image} alt={F.title} className="img-cover img-zoom-slow" loading="lazy" />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-bekasi-emerald-900/70 via-transparent to-bekasi-emerald-900/20" />
            {/* Top strip */}
            <div className="absolute top-5 left-5 right-5 flex items-center justify-between">
              <span className="chip-dark inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-bekasi-gold-400" /> Cover Story
              </span>
              <span className="mono text-white/70">01</span>
            </div>
            {/* Bottom strip */}
            <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-white/85">
              <div className="inline-flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-bekasi-gold-500 text-bekasi-emerald-900 flex items-center justify-center text-sm font-medium">
                  {F.author.split(' ').map((w) => w[0]).join('').slice(0, 2)}
                </div>
                <div>
                  <div className="text-sm font-medium">{F.author}</div>
                  <div className="text-[10px] uppercase tracking-[0.22em] text-white/60">{F.authorRole}</div>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 text-xs text-white/70">
                <Clock className="h-3.5 w-3.5" /> {F.readTime}
              </span>
            </div>
          </Link>

          {/* Narrative side */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <span className="chip-gold">{F.tag}</span>
              <span aria-hidden className="h-px w-8 bg-bekasi-emerald-900/20" />
              <span className="mono text-bekasi-ink/50">{F.date}</span>
            </div>
            <Link href={F.href} className="group block">
              <h3 className="heading-display text-4xl md:text-5xl leading-[1.05] text-bekasi-emerald-900 text-balance group-hover:text-bekasi-emerald-700 transition-colors">
                {F.title}
              </h3>
            </Link>
            <p className="mt-5 body-lg text-bekasi-ink/70 max-w-lg">
              {F.excerpt}
            </p>

            {/* Pull quote */}
            <div className="mt-8 relative pl-6 border-l-2 border-bekasi-gold-500">
              <Quote className="absolute -left-3 top-0 h-5 w-5 text-bekasi-gold-500 bg-white -scale-x-100" />
              <p className="font-display italic text-xl md:text-2xl leading-snug text-bekasi-emerald-900 text-balance">
                {F.pull}
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href={F.href}>
                <button className="btn-primary btn-md group">
                  Read the story
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              </Link>
              <Link href={content.action.href} className="link-underline text-sm text-bekasi-emerald-900">
                Browse the archive <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </motion.article>

        {/* SECONDARY STORIES GRID */}
        <div className="mt-20 md:mt-28">
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="mono text-bekasi-ink/50 mb-2">Also in this issue</div>
              <h3 className="heading-3 text-bekasi-emerald-900">More voices from the city.</h3>
            </div>
            <Link href={content.action.href} className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium text-bekasi-emerald-900 hover:text-bekasi-emerald-700">
              {content.action.label} <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}
            variants={{ show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
          >
            {content.items.map((s, i) => (
              <motion.article
                key={s.slug}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  show:   { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
                }}
              >
                <Link href={s.href} className="group block">
                  {/* Editorial number + tag */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="mono text-bekasi-ink/40">0{i + 2}</span>
                    <span aria-hidden className="h-px flex-1 bg-black/[0.08]" />
                    <span className="chip-gold">{s.tag}</span>
                  </div>
                  {/* Image */}
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-bekasi-emerald-900">
                    <img src={s.image} alt={s.title} loading="lazy" className="img-cover img-zoom-slow" />
                    <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-bekasi-emerald-900/70 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />
                  </div>
                  {/* Text */}
                  <h4 className="mt-5 heading-display text-2xl md:text-[1.7rem] leading-tight text-bekasi-emerald-900 text-balance group-hover:text-bekasi-emerald-700 transition-colors">
                    {s.title}
                  </h4>
                  <p className="mt-3 body-sm text-bekasi-ink/65 line-clamp-3">
                    {s.excerpt}
                  </p>
                  {/* Byline */}
                  <div className="mt-5 pt-4 border-t border-black/[0.06] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-bekasi-emerald-900 text-bekasi-gold-400 flex items-center justify-center text-xs font-medium">
                        {s.author.split(' ').map((w) => w[0]).join('').slice(0, 2)}
                      </div>
                      <div>
                        <div className="text-sm text-bekasi-emerald-900 font-medium leading-none">{s.author}</div>
                        <div className="mt-1 text-[10px] uppercase tracking-[0.22em] text-bekasi-ink/50">{s.authorRole}</div>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs text-bekasi-ink/50">
                      <Clock className="h-3 w-3" /> {s.readTime}
                    </span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </motion.div>
        </div>

        {/* Footer strip — submit + archive */}
        <div className="mt-16 md:mt-20 pt-8 border-t border-black/[0.06] flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="mono text-bekasi-ink/50">The BekasiGo Editorial</div>
            <p className="mt-2 heading-4 text-bekasi-emerald-900">Have a story to tell?</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link href={content.secondaryAction.href} className="btn-ghost btn-md text-bekasi-emerald-900">
              {content.secondaryAction.label}
            </Link>
            <Link href={content.action.href}>
              <button className="btn-primary btn-md">
                <FileText className="h-4 w-4" /> {content.action.label}
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
