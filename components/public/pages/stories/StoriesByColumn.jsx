'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowUpRight, Clock } from 'lucide-react'
import {
  STORY_COLUMNS, groupByColumn, formatStoryDate,
} from '@/lib/content/stories'

export default function StoriesByColumn() {
  const groups = groupByColumn()

  return (
    <section className="relative bg-bekasi-cream text-bekasi-ink">
      <div className="container py-16 md:py-24 space-y-16 md:space-y-24">
        {STORY_COLUMNS.filter((c) => c.id !== 'all').map((col) => {
          const items = groups[col.id] ?? []
          if (!items.length) return null
          return <ColumnBlock key={col.id} column={col} items={items} />
        })}
      </div>
    </section>
  )
}

function ColumnBlock({ column, items }) {
  return (
    <div id={`column-${column.id}`} className="scroll-mt-32">
      {/* Column masthead */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
        className="flex flex-wrap items-end justify-between gap-6 mb-8 md:mb-10"
      >
        <div>
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em]" style={{ color: column.color }}>
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: column.color }} />
            <span>Column · {column.label}</span>
          </div>
          <h3 className="mt-3 font-display italic text-3xl md:text-4xl leading-tight tracking-tight text-bekasi-emerald-900">
            {column.kicker}.
          </h3>
        </div>
        <div className="text-[10.5px] uppercase tracking-[0.22em] text-bekasi-ink/50">
          {items.length} {items.length === 1 ? 'story' : 'stories'}
        </div>
      </motion.div>

      {/* First story = hero, remaining = list */}
      <div className="grid gap-8 md:gap-10 lg:grid-cols-12 items-start">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-7"
        >
          <ColumnHero story={items[0]} column={column} />
        </motion.div>

        <div className="lg:col-span-5 flex flex-col divide-y divide-bekasi-emerald-900/10">
          {items.slice(1).map((s, i) => (
            <ColumnListItem key={s.id} story={s} index={i} column={column} />
          ))}
          {items.length === 1 && (
            <div className="text-sm text-bekasi-ink/55 italic">More {column.label.toLowerCase()} stories coming soon.</div>
          )}
        </div>
      </div>
    </div>
  )
}

function ColumnHero({ story, column }) {
  return (
    <Link
      href={`/stories/${story.slug}`}
      className="group block overflow-hidden rounded-2xl border border-bekasi-emerald-900/10 bg-white hover:border-bekasi-emerald-900/25 hover:shadow-elevated transition-all"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={story.cover.image}
          alt={story.title}
          fill
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <div className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/95 backdrop-blur px-3 py-1">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: column.color }} />
          <span className="text-[10.5px] uppercase tracking-[0.22em] text-bekasi-emerald-900 font-medium">{column.label}</span>
        </div>
      </div>
      <div className="p-6 md:p-8">
        <h4 className="font-display italic text-2xl md:text-3xl leading-[1.05] tracking-tight text-bekasi-emerald-900 group-hover:text-bekasi-emerald-800 transition-colors text-balance">
          {story.title}
        </h4>
        <p className="mt-3 text-[14.5px] text-bekasi-ink/70 leading-relaxed line-clamp-3">{story.subtitle}</p>
        <div className="mt-5 flex items-center justify-between text-xs text-bekasi-ink/55">
          <span>By <span className="text-bekasi-emerald-900 font-medium">{story.author.name}</span></span>
          <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {story.readTime}</span>
        </div>
      </div>
    </Link>
  )
}

function ColumnListItem({ story, index, column }) {
  return (
    <Link
      href={`/stories/${story.slug}`}
      className="group grid grid-cols-[80px_1fr] md:grid-cols-[100px_1fr] gap-4 md:gap-5 py-5 first:pt-0 hover:bg-white/50 -mx-3 md:-mx-4 px-3 md:px-4 rounded-xl transition-colors"
    >
      <div className="relative aspect-square rounded-xl overflow-hidden">
        <Image
          src={story.cover.image}
          alt={story.title}
          fill
          sizes="100px"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="min-w-0 flex flex-col justify-center">
        <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.22em] text-bekasi-ink/50">
          <span className="h-1 w-1 rounded-full" style={{ background: column.color }} />
          <span>{formatStoryDate(story.publishedAt, { short: true })}</span>
          <span className="text-bekasi-ink/30">·</span>
          <span>{story.readTime}</span>
        </div>
        <h5 className="mt-1.5 font-display italic text-lg md:text-xl leading-snug text-bekasi-emerald-900 group-hover:text-bekasi-emerald-800 transition-colors line-clamp-2">
          {story.title}
        </h5>
        <div className="mt-1.5 text-[12px] text-bekasi-ink/55">
          By <span className="text-bekasi-emerald-900 font-medium">{story.author.name}</span>
        </div>
      </div>
    </Link>
  )
}
