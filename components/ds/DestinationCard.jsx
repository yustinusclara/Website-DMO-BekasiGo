'use client'

import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Star, Clock, Ticket, ArrowUpRight } from 'lucide-react'
import { categories as CAT } from '@/lib/design/tokens'
import { DEST_DISTRICTS } from '@/lib/content/destinations'
import { cn } from '@/lib/utils'

/**
 * DestinationCard — grid & list-view aware card for the destinations page.
 * Supports:
 *  - image, title, short excerpt, category tag, district, rating, duration, fee
 *  - featured / popular badges
 *  - CTA to detail page (/destinations/[slug])
 */
export default function DestinationCard({ item, view = 'grid' }) {
  const cat = CAT[item.category] ?? { label: item.category, color: '#155F58' }
  const district = DEST_DISTRICTS.find((d) => d.id === item.district)?.label ?? item.district
  const href = `/destinations/${item.slug}`

  if (view === 'list') {
    return (
      <Link
        href={href}
        className="group flex flex-col sm:flex-row gap-4 sm:gap-5 rounded-2xl border border-bekasi-emerald-900/10 bg-white p-3 sm:p-4 hover:border-bekasi-emerald-900/25 hover:shadow-elevated transition-all"
      >
        {/* Image */}
        <div className="relative w-full sm:w-64 md:w-72 shrink-0 aspect-[16/10] sm:aspect-[4/3] rounded-xl overflow-hidden">
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(max-width: 640px) 100vw, 288px"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur px-2.5 py-1">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: cat.color }} />
            <span className="text-[10.5px] uppercase tracking-[0.2em] text-bekasi-emerald-900 font-medium">{cat.label}</span>
          </div>
          {item.featured && (
            <div className="absolute top-3 right-3 rounded-full bg-bekasi-gold-500 text-bekasi-emerald-900 px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] font-semibold">
              Featured
            </div>
          )}
        </div>

        {/* Body */}
        <div className="flex-1 min-w-0 flex flex-col">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 text-xs text-bekasi-ink/55">
                <MapPin className="h-3.5 w-3.5" />
                <span className="truncate">{district}</span>
              </div>
              <h3 className="mt-1.5 font-display text-xl md:text-2xl leading-snug text-bekasi-emerald-900 group-hover:text-bekasi-emerald-800">
                {item.title}
              </h3>
            </div>
            {item.rating && (
              <div className="shrink-0 inline-flex items-center gap-1 text-xs text-bekasi-ink/70">
                <Star className="h-3.5 w-3.5 fill-bekasi-gold-500 text-bekasi-gold-500" />
                <span className="font-medium text-bekasi-emerald-900">{item.rating.toFixed(1)}</span>
                <span className="text-bekasi-ink/45">({item.reviews?.toLocaleString() ?? 0})</span>
              </div>
            )}
          </div>

          <p className="mt-2 text-sm text-bekasi-ink/70 leading-relaxed line-clamp-2 max-w-2xl">
            {item.excerpt}
          </p>

          <div className="mt-auto pt-4 flex flex-wrap items-center gap-x-4 gap-y-2 justify-between">
            <div className="flex flex-wrap items-center gap-4 text-xs text-bekasi-ink/60">
              {item.duration && (
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" /> {item.duration}
                </span>
              )}
              {item.fee && (
                <span className="inline-flex items-center gap-1.5">
                  <Ticket className="h-3.5 w-3.5" /> {item.fee}
                </span>
              )}
            </div>
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-bekasi-emerald-900">
              View destination
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-px group-hover:translate-x-px" />
            </span>
          </div>
        </div>
      </Link>
    )
  }

  // GRID VIEW (default)
  return (
    <Link
      href={href}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-bekasi-emerald-900/10 bg-white hover:border-bekasi-emerald-900/25 hover:shadow-elevated transition-all"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 33vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* subtle bottom gradient for badge legibility */}
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent" />

        {/* Category chip */}
        <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur px-2.5 py-1">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: cat.color }} />
          <span className="text-[10.5px] uppercase tracking-[0.2em] text-bekasi-emerald-900 font-medium">{cat.label}</span>
        </div>

        {/* Featured / Popular */}
        <div className="absolute top-3 right-3 flex flex-col items-end gap-1.5">
          {item.featured && (
            <span className="rounded-full bg-bekasi-gold-500 text-bekasi-emerald-900 px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] font-semibold shadow-sm">
              Featured
            </span>
          )}
          {item.popular && !item.featured && (
            <span className="rounded-full bg-white/95 text-bekasi-emerald-900 px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] font-semibold">
              Popular
            </span>
          )}
        </div>

        {/* Rating pill */}
        {item.rating && (
          <div className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full bg-bekasi-emerald-900/85 text-white backdrop-blur px-2.5 py-1 text-[11px] font-medium">
            <Star className="h-3 w-3 fill-bekasi-gold-400 text-bekasi-gold-400" />
            <span>{item.rating.toFixed(1)}</span>
            <span className="text-white/60">({item.reviews?.toLocaleString() ?? 0})</span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex-1 flex flex-col p-4 md:p-5">
        <div className="flex items-center gap-1.5 text-xs text-bekasi-ink/55">
          <MapPin className="h-3.5 w-3.5" />
          <span className="truncate">{district}</span>
        </div>
        <h3 className="mt-1.5 font-display text-lg md:text-xl leading-snug text-bekasi-emerald-900 line-clamp-2 group-hover:text-bekasi-emerald-800 transition-colors">
          {item.title}
        </h3>
        <p className="mt-2 text-[13.5px] text-bekasi-ink/65 leading-relaxed line-clamp-2">
          {item.excerpt}
        </p>

        <div className="mt-auto pt-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 text-[11px] text-bekasi-ink/55">
            {item.duration && (
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3 w-3" /> {item.duration}
              </span>
            )}
            {item.fee && (
              <span className="inline-flex items-center gap-1">
                <Ticket className="h-3 w-3" /> {item.fee}
              </span>
            )}
          </div>
          <span
            className={cn(
              'inline-flex items-center gap-1 rounded-full h-8 w-8 justify-center',
              'bg-bekasi-emerald-900/[0.04] text-bekasi-emerald-900',
              'group-hover:bg-bekasi-emerald-900 group-hover:text-white transition-colors',
            )}
            aria-hidden
          >
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  )
}
