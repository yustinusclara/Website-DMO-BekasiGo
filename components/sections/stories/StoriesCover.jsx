'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight, Clock } from 'lucide-react'
import { STORIES, STORY_COLUMNS, formatStoryDate } from '@/lib/content/stories'

export default function StoriesCover() {
  const cover = STORIES.find((s) => s.featured) ?? STORIES[0]
  if (!cover) return null
  const col = STORY_COLUMNS.find((c) => c.id === cover.column) ?? { label: cover.column, color: '#155F58' }

  return (
    <section className="relative bg-bekasi-cream text-bekasi-ink">
      <div className="container py-16 md:py-24">
        {/* Section header */}
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10 md:mb-14">
          <div>
            <div className="text-[11px] uppercase tracking-[0.22em] text-bekasi-gold-600 inline-flex items-center gap-2">
              <span className="h-px w-8 bg-bekasi-gold-500" />
              Cover story
            </div>
            <h2 className="mt-4 font-display italic text-3xl md:text-5xl leading-tight tracking-tight text-balance max-w-3xl text-bekasi-emerald-900">
              This week’s read.
            </h2>
          </div>
          <div className="text-[10.5px] uppercase tracking-[0.22em] text-bekasi-ink/50">
            {formatStoryDate(cover.publishedAt)}
          </div>
        </div>

        <motion.article
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="group relative overflow-hidden rounded-3xl border border-bekasi-emerald-900/10 bg-bekasi-emerald-900 text-white shadow-elevated"
        >
          <Link href={`/stories/${cover.slug}`} className="block">
            <div className="grid lg:grid-cols-2 min-h-[420px] md:min-h-[520px]">
              {/* Image */}
              <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-full overflow-hidden">
                <Image
                  src={cover.cover.image}
                  alt={cover.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-105"
                />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                <div className="absolute top-4 left-4 md:top-6 md:left-6 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/95 backdrop-blur px-3 py-1.5">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: col.color }} />
                    <span className="text-[10.5px] uppercase tracking-[0.22em] text-bekasi-emerald-900 font-medium">{col.label}</span>
                  </span>
                  <span className="rounded-full bg-bekasi-gold-500 text-bekasi-emerald-900 px-3 py-1.5 text-[10.5px] uppercase tracking-[0.22em] font-semibold">
                    Cover story
                  </span>
                </div>
              </div>

              {/* Text */}
              <div className="relative p-6 md:p-10 lg:p-14 flex flex-col justify-between">
                <div aria-hidden className="pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full bg-bekasi-gold-500/10 blur-3xl" />

                <div className="relative">
                  <div className="text-[10.5px] uppercase tracking-[0.28em] text-bekasi-gold-400">
                    Cover · Issue N° 24
                  </div>
                  <h3 className="mt-4 font-display italic text-3xl md:text-4xl lg:text-5xl leading-[1.02] tracking-tight text-balance">
                    {cover.title}
                  </h3>
                  <p className="mt-4 md:mt-5 text-white/75 text-base md:text-lg leading-relaxed max-w-lg">
                    {cover.subtitle}
                  </p>
                </div>

                <div className="relative mt-8 md:mt-12 flex items-end justify-between gap-4 pt-6 border-t border-white/10">
                  <div>
                    <div className="text-[10.5px] uppercase tracking-[0.22em] text-white/45">By</div>
                    <div className="mt-1 text-sm text-white font-medium">{cover.author.name}</div>
                    <div className="text-xs text-white/50">{cover.author.role}</div>
                  </div>
                  <div className="text-right">
                    <div className="inline-flex items-center gap-1.5 text-xs text-white/70">
                      <Clock className="h-3.5 w-3.5" /> {cover.readTime}
                    </div>
                    <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-bekasi-gold-500 text-bekasi-emerald-900 px-4 py-2 text-sm font-medium group-hover:bg-bekasi-gold-400 transition-colors">
                      Read the story <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </motion.article>
      </div>
    </section>
  )
}
