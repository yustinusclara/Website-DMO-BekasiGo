'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { DISCOVER } from '@/lib/content/discover'
import { categories as CAT } from '@/lib/design/tokens'
import Eyebrow from '@/components/ds/Eyebrow'
import { cn } from '@/lib/utils'

/**
 * CategoryGrid — asymmetric bento grid of 8 category cards.
 * Two 'lg' cards span 2 columns; the rest are single-column.
 */
export default function CategoryGrid() {
  const { categories } = DISCOVER
  return (
    <section className="relative bg-white text-bekasi-ink">
      <div className="container py-20 md:py-28">
        {/* Header */}
        <div className="grid gap-8 md:grid-cols-[1fr_auto] items-end mb-10 md:mb-14">
          <div>
            <Eyebrow>{categories.eyebrow}</Eyebrow>
            <h2 className="mt-4 font-display text-3xl md:text-5xl leading-tight tracking-tight text-balance max-w-3xl">
              {categories.heading}
            </h2>
            <p className="mt-4 max-w-xl text-bekasi-ink/70 leading-relaxed">{categories.kicker}</p>
          </div>
          <Link
            href={categories.action.href}
            className="inline-flex items-center gap-2 rounded-full border border-bekasi-emerald-900/15 hover:border-bekasi-emerald-900/30 hover:bg-bekasi-emerald-900 hover:text-white px-5 py-2.5 text-sm font-medium transition-all"
          >
            {categories.action.label}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[220px] md:auto-rows-[260px] lg:auto-rows-[280px] gap-3 md:gap-4">
          {categories.items.map((item, i) => (
            <CategoryCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function CategoryCard({ item, index }) {
  const c = CAT[item.id] ?? { color: '#155F58', dark: '#0B3D3A' }
  const isLg = item.size === 'lg'
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.06 }}
      className={cn(
        'relative',
        isLg && 'md:col-span-2 md:row-span-1',
      )}
    >
      <Link
        href={item.href}
        className="group relative flex h-full flex-col justify-end overflow-hidden rounded-2xl border border-bekasi-emerald-900/8"
      >
        <Image
          src={item.image}
          alt={item.label}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
        />
        {/* Base gradient */}
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
        {/* Hover accent wash */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-multiply"
          style={{ background: `linear-gradient(180deg, transparent 40%, ${c.dark} 100%)` }}
        />

        {/* Count badge (top-right) */}
        <div className="absolute top-3 right-3 md:top-4 md:right-4 rounded-full bg-white/90 backdrop-blur px-2.5 py-1 text-[10.5px] uppercase tracking-[0.18em] font-medium text-bekasi-emerald-900">
          {item.count} places
        </div>

        {/* Category dot (top-left) */}
        <div
          className="absolute top-4 left-4 h-2 w-2 rounded-full ring-2 ring-white/30"
          style={{ background: c.color }}
        />

        {/* Content */}
        <div className="relative p-4 md:p-5 lg:p-6 text-white">
          <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.22em] text-white/70 mb-1">
            <span style={{ color: '#F0D69B' }}>{CAT[item.id]?.label ?? 'Category'}</span>
          </div>
          <h3 className={cn(
            'font-display leading-tight text-white',
            isLg ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl',
          )}>
            {item.label}
          </h3>
          <p className="mt-1 text-[12.5px] md:text-sm text-white/70 line-clamp-2 max-w-md">
            {item.kicker}
          </p>

          <span className="mt-3 inline-flex items-center gap-1.5 text-[12px] md:text-[13px] font-medium text-bekasi-gold-400">
            Explore
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-px group-hover:translate-x-px" />
          </span>
        </div>
      </Link>
    </motion.div>
  )
}
