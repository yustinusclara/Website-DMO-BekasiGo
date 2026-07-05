'use client'

import Link from 'next/link'
import { Calendar, Clock, ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * BlogCard — reusable, distinct from StoryCard.
 * Blog is date-first, category-prominent, guide-format. Landscape imagery.
 *
 * variant:
 *   'featured' — big landscape hero card
 *   'compact'  — horizontal row (image left, meta right)
 *   'grid'     — standard vertical card in a grid
 */
export default function BlogCard({ item, variant = 'grid', className }) {
  if (variant === 'featured') {
    return (
      <Link href={item.href} className={cn('group relative block rounded-3xl overflow-hidden bg-bekasi-emerald-900 aspect-[16/10] md:aspect-[16/9]', className)}>
        <img src={item.image} alt={item.title} loading="lazy" className="img-cover img-zoom-slow" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-bekasi-emerald-900 via-bekasi-emerald-900/40 to-transparent" />
        <div className="absolute top-5 left-5 flex items-center gap-2">
          <span className="chip-gold">Latest post</span>
          <span className="chip-dark">{item.category}</span>
        </div>
        <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 lg:p-10 text-white">
          <div className="flex flex-wrap items-center gap-4 mb-4 text-xs text-white/70">
            <span className="inline-flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> {item.date}</span>
            <span aria-hidden className="h-1 w-1 rounded-full bg-white/40" />
            <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {item.readTime}</span>
            {item.tags?.map((t) => (
              <span key={t} className="pill-dark text-[10px]">#{t}</span>
            ))}
          </div>
          <h3 className="heading-display text-3xl md:text-4xl lg:text-5xl leading-tight text-balance max-w-3xl">
            {item.title}
          </h3>
          <p className="mt-4 body text-white/75 max-w-2xl line-clamp-2">{item.excerpt}</p>
          <div className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-bekasi-gold-400">
            Read the article <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>
      </Link>
    )
  }

  if (variant === 'compact') {
    return (
      <Link href={item.href} className={cn('group grid grid-cols-[7rem_1fr] md:grid-cols-[10rem_1fr] gap-4 md:gap-5 items-center rounded-xl -mx-2 px-2 py-3 hover:bg-bekasi-cream/70 transition-colors', className)}>
        <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-bekasi-emerald-900 flex-shrink-0">
          <img src={item.image} alt={item.title} loading="lazy" className="img-cover img-zoom-slow" />
          <span className="absolute top-1.5 left-1.5 chip-light text-[9px] px-2 py-0.5">{item.category}</span>
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-3 text-xs text-bekasi-ink/50 mb-1.5">
            <span className="font-mono">{item.date}</span>
            <span aria-hidden className="h-1 w-1 rounded-full bg-bekasi-ink/30" />
            <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {item.readTime}</span>
          </div>
          <h4 className="font-display text-lg md:text-xl leading-snug text-bekasi-emerald-900 group-hover:text-bekasi-emerald-700 transition-colors">
            {item.title}
          </h4>
        </div>
      </Link>
    )
  }

  // grid variant (default)
  return (
    <Link href={item.href} className={cn('group rounded-2xl overflow-hidden bg-white border border-black/[0.05] hover:shadow-elevated hover:-translate-y-1 transition-all flex flex-col', className)}>
      <div className="relative aspect-[16/10] overflow-hidden bg-bekasi-emerald-900">
        <img src={item.image} alt={item.title} loading="lazy" className="img-cover img-zoom-slow" />
        <span className="absolute top-4 left-4 chip-light">{item.category}</span>
      </div>
      <div className="p-5 md:p-6 flex-1 flex flex-col">
        <div className="flex items-center gap-3 text-xs text-bekasi-ink/50">
          <span className="font-mono">{item.date}</span>
          <span aria-hidden className="h-1 w-1 rounded-full bg-bekasi-ink/30" />
          <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {item.readTime}</span>
        </div>
        <h4 className="mt-3 font-display text-xl md:text-[1.4rem] leading-snug text-bekasi-emerald-900 flex-1 group-hover:text-bekasi-emerald-700 transition-colors">
          {item.title}
        </h4>
        <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-bekasi-emerald-900">
          Read article <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </Link>
  )
}
