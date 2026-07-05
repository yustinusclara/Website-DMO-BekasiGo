'use client'

import { motion } from 'framer-motion'
import { Share2, Copy, Link as LinkIcon } from 'lucide-react'
import { STORY_COLUMNS, formatStoryDate } from '@/lib/content/stories'

export default function StoryClose({ story }) {
  const col = STORY_COLUMNS.find((c) => c.id === story.column) ?? { color: '#155F58', label: story.column }

  return (
    <section className="relative bg-white text-bekasi-ink border-t border-bekasi-emerald-900/8">
      <div className="container py-12 md:py-16">
        <div className="mx-auto max-w-[68ch]">
          {/* End mark */}
          <div className="flex items-center justify-center gap-3 mb-10 text-bekasi-emerald-900/40" aria-hidden>
            <span className="h-px w-24 bg-bekasi-emerald-900/15" />
            <span className="font-display italic text-xl">▪</span>
            <span className="h-px w-24 bg-bekasi-emerald-900/15" />
          </div>

          {/* Author bio */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl border border-bekasi-emerald-900/10 bg-bekasi-cream p-6 md:p-8 flex flex-col sm:flex-row gap-5 items-start"
          >
            <div
              className="h-14 w-14 rounded-full flex items-center justify-center shrink-0 font-display text-xl text-white"
              style={{ background: col.color }}
            >
              {story.author.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[10.5px] uppercase tracking-[0.22em] text-bekasi-gold-600">Written by</div>
              <div className="mt-1 font-display text-xl text-bekasi-emerald-900">{story.author.name}</div>
              <div className="text-sm text-bekasi-ink/60">{story.author.role} · BekasiGo</div>
              <p className="mt-3 text-sm text-bekasi-ink/70 leading-relaxed">
                Filed on {formatStoryDate(story.publishedAt)}. The BekasiGo editorial team writes long-form journalism about the city’s neighborhoods, kitchens, rituals, and people.
              </p>
            </div>
          </motion.div>

          {/* Tags + share */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="text-[10.5px] uppercase tracking-[0.22em] text-bekasi-ink/50">Filed under</span>
            {story.tags?.map((t) => (
              <span key={t} className="rounded-full border border-bekasi-emerald-900/12 bg-white px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-bekasi-ink/65">
                #{t}
              </span>
            ))}
            <div className="ml-auto flex items-center gap-2">
              <button className="h-9 rounded-full border border-bekasi-emerald-900/15 hover:border-bekasi-emerald-900/30 hover:bg-bekasi-emerald-900 hover:text-white px-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] transition-colors">
                <Share2 className="h-3.5 w-3.5" /> Share
              </button>
              <button className="h-9 rounded-full border border-bekasi-emerald-900/15 hover:border-bekasi-emerald-900/30 hover:bg-bekasi-emerald-900 hover:text-white px-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] transition-colors">
                <LinkIcon className="h-3.5 w-3.5" /> Copy link
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
