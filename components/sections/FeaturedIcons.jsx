'use client'

import Link from 'next/link'
import Section from '@/components/layout/Section'
import { FEATURED_ICONS } from '@/lib/content/homepage'
import { ArrowUpRight } from 'lucide-react'

export default function FeaturedIcons() {
  return (
    <Section
      id="featured-icons"
      variant="cream"
      eyebrow={FEATURED_ICONS.eyebrow}
      title={FEATURED_ICONS.title}
      kicker={FEATURED_ICONS.kicker}
      action={FEATURED_ICONS.action}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        {FEATURED_ICONS.items.map((item, i) => (
          <Link
            key={item.title}
            href={item.href}
            className={`group relative overflow-hidden rounded-2xl bg-black aspect-[4/5] ${
              i === 0 || i === 4 ? 'lg:aspect-[4/6]' : ''
            }`}
          >
            <img
              src={item.image}
              alt={item.title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bekasi-emerald-900 via-bekasi-emerald-900/20 to-transparent" />
            <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
              <span className="text-[10px] uppercase tracking-[0.25em] text-white/80 bg-white/10 backdrop-blur px-3 py-1 rounded-full border border-white/20">
                {item.category}
              </span>
              <span className="h-8 w-8 rounded-full bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center text-white opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </div>
            <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
              <div className="text-xs uppercase tracking-[0.2em] text-bekasi-gold-400 mb-1">
                0{i + 1}
              </div>
              <h3 className="font-display text-2xl md:text-3xl text-white leading-tight">
                {item.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  )
}
