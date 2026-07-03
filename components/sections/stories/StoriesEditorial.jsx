'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'
import { STORIES, STORY_COLUMNS, formatStoryDate } from '@/lib/content/stories'

/**
 * StoriesEditorial — mixed-size editorial grid of stories that are not
 * the cover story. Uses a Big / Medium / Small size hint from the CMS.
 */
export default function StoriesEditorial() {
  const feed = STORIES.filter((s) => !s.featured || s.id !== STORIES.find((x) => x.featured).id)
  const items = STORIES.filter((s, i, a) => s.id !== a.find((x) => x.featured)?.id).slice(0, 6)

  return (
    <section className="relative bg-white text-bekasi-ink">
      <div className="container py-16 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10 md:mb-12">
          <div>
            <div className="text-[11px] uppercase tracking-[0.22em] text-bekasi-gold-600 inline-flex items-center gap-2">
              <span className="h-px w-8 bg-bekasi-gold-500" />
              This week
            </div>
            <h2 className="mt-4 font-display italic text-3xl md:text-5xl leading-tight tracking-tight text-bekasi-emerald-900 text-balance">
              Filed under the city.
            </h2>
          </div>
          <Link
            href="#column-heritage"
            className="inline-flex items-center gap-2 rounded-full border border-bekasi-emerald-900/15 hover:border-bekasi-emerald-900/30 hover:bg-bekasi-emerald-900 hover:text-white px-5 py-2.5 text-sm font-medium transition-all"
          >
            Browse by column
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Editorial grid: 2 rows: [big, med, med] then [med, big, med] */}
        <div className="grid gap-5 md:gap-6 grid-cols-1 md:grid-cols-6 auto-rows-[minmax(0,auto)]">
          {items.map((s, i) => {
            // Layout choreography: alternate large card position across rows.
            const span = i === 0 ? 'md:col-span-3 md:row-span-2' : i === 4 ? 'md:col-span-3' : 'md:col-span-3'
            const size = i === 0 ? 'lg' : i === 4 ? 'md' : 'md'
            return (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: (i % 6) * 0.05 }}
                className={cn(span)}
              >
                <StoryCardEditorial story={s} size={size} />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function StoryCardEditorial({ story, size = 'md' }) {
  const col = STORY_COLUMNS.find((c) => c.id === story.column) ?? { label: story.column, color: '#155F58' }
  const isLg = size === 'lg'
  return (
    <Link
      href={`/stories/${story.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-bekasi-emerald-900/10 bg-white hover:border-bekasi-emerald-900/25 hover:shadow-elevated transition-all"
    >
      <div className={cn('relative overflow-hidden', isLg ? 'aspect-[16/12]' : 'aspect-[16/10]')}>
        <Image
          src={story.cover.image}
          alt={story.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        <div className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/95 backdrop-blur px-3 py-1">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: col.color }} />
          <span className="text-[10.5px] uppercase tracking-[0.22em] text-bekasi-emerald-900 font-medium">{col.label}</span>
        </div>
      </div>

      <div className={cn('flex-1 flex flex-col', isLg ? 'p-6 md:p-8' : 'p-5 md:p-6')}>
        <h3 className={cn(
          'font-display italic leading-[1.05] tracking-tight text-bekasi-emerald-900 group-hover:text-bekasi-emerald-800 transition-colors text-balance',
          isLg ? 'text-2xl md:text-3xl lg:text-[2rem]' : 'text-xl md:text-2xl',
        )}>
          {story.title}
        </h3>
        <p className="mt-3 text-[14.5px] text-bekasi-ink/70 leading-relaxed line-clamp-3">
          {story.subtitle}
        </p>

        <div className="mt-auto pt-5 flex items-center justify-between gap-3 text-xs text-bekasi-ink/55">
          <span>By <span className="text-bekasi-emerald-900 font-medium">{story.author.name}</span></span>
          <span className="inline-flex items-center gap-3">
            <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {story.readTime}</span>
            <span>{formatStoryDate(story.publishedAt, { short: true })}</span>
          </span>
        </div>
      </div>
    </Link>
  )
}
