'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronRight, Clock, Calendar, ArrowDown } from 'lucide-react'
import { STORY_COLUMNS, formatStoryDate } from '@/lib/content/stories'

export default function StoryHero({ story }) {
  const col = STORY_COLUMNS.find((c) => c.id === story.column) ?? { label: story.column, color: '#155F58' }

  return (
    <section className="relative isolate min-h-[92vh] md:min-h-screen text-white overflow-hidden">
      <Image
        src={story.cover.image}
        alt={story.title}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center scale-105"
      />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-bekasi-emerald-900" />
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(212,169,76,0.15)_0%,_transparent_50%)]" />

      <div className="relative container flex flex-col justify-end min-h-[92vh] md:min-h-screen pt-28 pb-14 md:pb-20">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-white/70"
        >
          <Link href="/" className="hover:text-bekasi-gold-400 transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3 opacity-60" />
          <Link href="/stories" className="hover:text-bekasi-gold-400 transition-colors">City Stories</Link>
          <ChevronRight className="h-3 w-3 opacity-60" />
          <span className="text-bekasi-gold-400 truncate max-w-[50%]">{col.label}</span>
        </motion.nav>

        {/* Column + date */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-8 md:mt-10 flex flex-wrap items-center gap-2"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-white/95 backdrop-blur px-3 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: col.color }} />
            <span className="text-[10.5px] uppercase tracking-[0.22em] text-bekasi-emerald-900 font-medium">Column · {col.label}</span>
          </span>
          {story.featured && (
            <span className="rounded-full bg-bekasi-gold-500 text-bekasi-emerald-900 px-3 py-1.5 text-[10.5px] uppercase tracking-[0.22em] font-semibold">
              Cover story
            </span>
          )}
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 font-display italic text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.75rem] leading-[0.98] tracking-tight text-balance max-w-5xl"
        >
          {story.title}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-6 max-w-2xl text-base md:text-xl text-white/80 leading-relaxed"
        >
          {story.subtitle}
        </motion.p>

        {/* Byline strip */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-10 md:mt-14 flex flex-wrap items-center gap-x-8 gap-y-4 pt-6 border-t border-white/15"
        >
          <div>
            <div className="text-[10.5px] uppercase tracking-[0.22em] text-white/45">Written by</div>
            <div className="mt-1 text-sm text-white font-medium">{story.author.name}</div>
            <div className="text-xs text-white/50">{story.author.role}</div>
          </div>
          <div>
            <div className="text-[10.5px] uppercase tracking-[0.22em] text-white/45">Published</div>
            <div className="mt-1 text-sm text-white inline-flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" /> {formatStoryDate(story.publishedAt)}
            </div>
          </div>
          <div>
            <div className="text-[10.5px] uppercase tracking-[0.22em] text-white/45">Read time</div>
            <div className="mt-1 text-sm text-white inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" /> {story.readTime}
            </div>
          </div>

          <div className="ml-auto flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-white/50">
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
