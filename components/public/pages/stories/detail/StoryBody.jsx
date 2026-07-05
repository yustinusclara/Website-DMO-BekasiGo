'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import { STORY_COLUMNS } from '@/lib/content/stories'
import { cn } from '@/lib/utils'

/**
 * StoryBody — immersive block renderer for magazine-style articles.
 *
 * Supported block types:
 *  - lede        (opening large paragraph with drop cap)
 *  - paragraph   (default body text)
 *  - heading     (h2)
 *  - subheading  (h3)
 *  - quote       (large italic pull-quote with attribution)
 *  - image       (single image with caption + credit)
 *  - gallery     (2-3 image grid)
 *  - callout     (soft-tinted info box)
 *  - divider     (chapter separator)
 */
export default function StoryBody({ story }) {
  const col = STORY_COLUMNS.find((c) => c.id === story.column) ?? { color: '#155F58' }
  return (
    <section className="relative bg-bekasi-cream text-bekasi-ink">
      <article className="container py-16 md:py-24 lg:py-28">
        <div className="mx-auto max-w-[68ch] space-y-8 md:space-y-10">
          {story.body.map((block, i) => (
            <Block key={i} block={block} accent={col.color} />
          ))}
        </div>
      </article>
    </section>
  )
}

function Block({ block, accent }) {
  const commonReveal = {
    initial:      { opacity: 0, y: 16 },
    whileInView:  { opacity: 1, y: 0 },
    viewport:     { once: true, margin: '-60px' },
    transition:   { duration: 0.6 },
  }

  switch (block.type) {
    case 'lede':
      return (
        <motion.p
          {...commonReveal}
          className="first-letter:font-display first-letter:italic first-letter:text-6xl md:first-letter:text-7xl first-letter:leading-[0.9] first-letter:mr-3 first-letter:float-left first-letter:mt-1 first-letter:text-bekasi-gold-600 text-[19px] md:text-[21px] leading-[1.65] text-bekasi-ink/85 font-display"
        >
          {block.text}
        </motion.p>
      )

    case 'paragraph':
      return (
        <motion.p
          {...commonReveal}
          className="text-[17px] md:text-[18px] leading-[1.75] text-bekasi-ink/80"
        >
          {block.text}
        </motion.p>
      )

    case 'heading':
      return (
        <motion.h2 {...commonReveal} className="pt-4 font-display italic text-3xl md:text-4xl leading-tight tracking-tight text-bekasi-emerald-900 text-balance">
          {block.text}
        </motion.h2>
      )

    case 'subheading':
      return (
        <motion.h3 {...commonReveal} className="pt-2 font-display text-xl md:text-2xl leading-snug tracking-tight text-bekasi-emerald-900">
          {block.text}
        </motion.h3>
      )

    case 'quote':
      return (
        <motion.figure
          {...commonReveal}
          className="relative my-4 md:my-6 md:-mx-8 rounded-2xl border border-bekasi-emerald-900/8 bg-white p-8 md:p-10"
        >
          <Quote
            className="absolute -top-4 left-6 h-10 w-10 fill-current text-bekasi-gold-500"
            strokeWidth={1.2}
          />
          <blockquote className="font-display italic text-2xl md:text-3xl lg:text-[2rem] leading-snug text-bekasi-emerald-900 text-balance">
            “{block.text}”
          </blockquote>
          {block.attribution && (
            <figcaption className="mt-5 flex items-center gap-3 text-[11px] uppercase tracking-[0.24em] text-bekasi-ink/55">
              <span className="h-px w-8" style={{ background: accent }} />
              {block.attribution}
            </figcaption>
          )}
        </motion.figure>
      )

    case 'image':
      return (
        <motion.figure {...commonReveal} className="md:-mx-16 lg:-mx-24">
          <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-elevated">
            <Image src={block.src} alt={block.caption ?? ''} fill sizes="(max-width: 1024px) 100vw, 900px" className="object-cover" />
          </div>
          {(block.caption || block.credit) && (
            <figcaption className="mt-3 flex items-center justify-between gap-4 text-[12.5px] text-bekasi-ink/55">
              <span className="italic">{block.caption}</span>
              {block.credit && <span className="text-[10.5px] uppercase tracking-[0.22em] text-bekasi-ink/40">{block.credit}</span>}
            </figcaption>
          )}
        </motion.figure>
      )

    case 'gallery': {
      const imgs = block.images ?? []
      const cols = imgs.length === 2 ? 'grid-cols-2' : 'grid-cols-2 md:grid-cols-3'
      return (
        <motion.div {...commonReveal} className="md:-mx-16 lg:-mx-24">
          <div className={cn('grid gap-3', cols)}>
            {imgs.map((im, i) => (
              <div key={i} className="relative aspect-[4/5] rounded-xl overflow-hidden">
                <Image src={im.src} alt={im.caption ?? ''} fill sizes="(max-width: 768px) 50vw, 300px" className="object-cover" />
              </div>
            ))}
          </div>
        </motion.div>
      )
    }

    case 'callout':
      return (
        <motion.aside
          {...commonReveal}
          className="relative rounded-2xl border border-bekasi-gold-500/25 bg-bekasi-gold-500/[0.08] p-6 md:p-7"
        >
          {block.title && (
            <div className="text-[10.5px] uppercase tracking-[0.24em] text-bekasi-gold-600 font-medium">{block.title}</div>
          )}
          <p className="mt-2 text-[15.5px] leading-relaxed text-bekasi-ink/80">{block.text}</p>
        </motion.aside>
      )

    case 'divider':
      return (
        <motion.div
          {...commonReveal}
          className="flex items-center justify-center gap-3 py-2"
          aria-hidden
        >
          <span className="h-px w-16 bg-bekasi-emerald-900/15" />
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
          <span className="h-px w-16 bg-bekasi-emerald-900/15" />
        </motion.div>
      )

    default:
      return null
  }
}
