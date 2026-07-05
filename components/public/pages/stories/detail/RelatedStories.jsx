'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { StoryCardEditorial } from '@/components/public/pages/stories/StoriesEditorial'

export default function RelatedStories({ items, currentTitle }) {
  if (!items?.length) return null
  return (
    <section className="relative bg-bekasi-cream text-bekasi-ink">
      <div className="container py-16 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-8 md:mb-12">
          <div>
            <div className="text-[11px] uppercase tracking-[0.22em] text-bekasi-gold-600 inline-flex items-center gap-2">
              <span className="h-px w-8 bg-bekasi-gold-500" />
              Keep reading
            </div>
            <h2 className="mt-4 font-display italic text-3xl md:text-4xl leading-tight tracking-tight text-bekasi-emerald-900">
              More stories worth pairing with {currentTitle}
            </h2>
          </div>
          <Link
            href="/stories"
            className="inline-flex items-center gap-2 rounded-full border border-bekasi-emerald-900/15 hover:border-bekasi-emerald-900/30 hover:bg-bekasi-emerald-900 hover:text-white px-5 py-2.5 text-sm font-medium transition-all"
          >
            Back to the journal
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-5 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: i * 0.06 }}
            >
              <StoryCardEditorial story={s} size="md" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
