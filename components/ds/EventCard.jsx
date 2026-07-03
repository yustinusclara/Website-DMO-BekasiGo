'use client'

import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Clock, CalendarDays, Ticket, ArrowUpRight } from 'lucide-react'
import { EVENT_CATEGORIES, formatEventDate, eventDayParts, daysUntil } from '@/lib/content/events'
import { cn } from '@/lib/utils'

/**
 * EventCard — reusable across the site.
 *  - view='grid' (default) — vertical card
 *  - view='list'          — horizontal card for list view
 */
export default function EventCard({ evt, view = 'grid' }) {
  const cat = EVENT_CATEGORIES.find((c) => c.id === evt.category) ?? { label: evt.category, color: '#155F58' }
  const dp  = eventDayParts(evt)
  const dU  = daysUntil(evt)
  const href = `/events/${evt.slug}`

  if (view === 'list') {
    return (
      <Link
        href={href}
        className="group flex flex-col sm:flex-row gap-4 sm:gap-5 rounded-2xl border border-bekasi-emerald-900/10 bg-white p-3 sm:p-4 hover:border-bekasi-emerald-900/25 hover:shadow-elevated transition-all"
      >
        <div className="relative w-full sm:w-56 md:w-64 shrink-0 aspect-[16/10] sm:aspect-[4/3] rounded-xl overflow-hidden">
          <Image
            src={evt.image}
            alt={evt.title}
            fill
            sizes="(max-width: 640px) 100vw, 256px"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3 flex flex-col items-center rounded-lg bg-white/95 backdrop-blur border border-white/60 shadow-sm px-2.5 py-1">
            <span className="text-[9.5px] uppercase tracking-[0.22em] text-bekasi-gold-600">{dp.month}</span>
            <span className="font-display text-xl leading-none text-bekasi-emerald-900">{dp.day}</span>
          </div>
          {evt.featured && (
            <div className="absolute top-3 right-3 rounded-full bg-bekasi-gold-500 text-bekasi-emerald-900 px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] font-semibold">
              Featured
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0 flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: cat.color }} />
            <span className="text-[10.5px] uppercase tracking-[0.22em] text-bekasi-ink/60 font-medium">{cat.label}</span>
          </div>
          <h3 className="mt-2 font-display text-xl md:text-2xl leading-snug text-bekasi-emerald-900 group-hover:text-bekasi-emerald-800">
            {evt.title}
          </h3>
          <p className="mt-2 text-sm text-bekasi-ink/70 line-clamp-2 max-w-2xl">{evt.excerpt}</p>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-bekasi-ink/60">
            <span className="inline-flex items-center gap-1.5"><CalendarDays className="h-3.5 w-3.5" /> {formatEventDate(evt, { short: true })}</span>
            <span className="inline-flex items-center gap-1.5 truncate"><MapPin className="h-3.5 w-3.5" /> <span className="truncate">{evt.venue.name}</span></span>
            <span className="inline-flex items-center gap-1.5"><Ticket className="h-3.5 w-3.5" /> {evt.price}</span>
          </div>

          <div className="mt-auto pt-4 flex items-center justify-between">
            {dU >= 0 && (
              <span className="text-xs text-bekasi-ink/60">in {dU === 0 ? 'today' : `${dU} day${dU === 1 ? '' : 's'}`}</span>
            )}
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-bekasi-emerald-900">
              View event
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-px group-hover:translate-x-px" />
            </span>
          </div>
        </div>
      </Link>
    )
  }

  // GRID VIEW
  return (
    <Link
      href={href}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-bekasi-emerald-900/10 bg-white hover:border-bekasi-emerald-900/25 hover:shadow-elevated transition-all"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={evt.image}
          alt={evt.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent" />

        {/* Date tile */}
        <div className="absolute top-3 left-3 flex flex-col items-center rounded-xl bg-white/95 backdrop-blur border border-white/60 shadow-sm px-3 py-1.5">
          <span className="text-[10px] uppercase tracking-[0.22em] text-bekasi-gold-600">{dp.month}</span>
          <span className="font-display text-2xl leading-none text-bekasi-emerald-900">{dp.day}</span>
          <span className="text-[9.5px] uppercase tracking-[0.18em] text-bekasi-ink/50">{dp.weekday}</span>
        </div>

        {/* Category */}
        <div className="absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur px-2.5 py-1">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: cat.color }} />
          <span className="text-[10.5px] uppercase tracking-[0.2em] text-bekasi-emerald-900 font-medium">{cat.label}</span>
        </div>

        {evt.featured && (
          <span className="absolute bottom-3 left-3 rounded-full bg-bekasi-gold-500 text-bekasi-emerald-900 px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] font-semibold">
            Featured
          </span>
        )}
        {dU >= 0 && dU <= 60 && (
          <span className="absolute bottom-3 right-3 rounded-full bg-bekasi-emerald-900/85 text-white backdrop-blur px-2.5 py-1 text-[10.5px] font-medium">
            in {dU === 0 ? 'today' : `${dU} day${dU === 1 ? '' : 's'}`}
          </span>
        )}
      </div>

      <div className="flex-1 flex flex-col p-4 md:p-5">
        <h3 className="font-display text-lg md:text-xl leading-snug text-bekasi-emerald-900 line-clamp-2 group-hover:text-bekasi-emerald-800 transition-colors">
          {evt.title}
        </h3>
        <p className="mt-2 text-[13.5px] text-bekasi-ink/65 leading-relaxed line-clamp-2">
          {evt.excerpt}
        </p>

        <div className="mt-3 flex items-center gap-1.5 text-xs text-bekasi-ink/60 truncate">
          <MapPin className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">{evt.venue.name}</span>
        </div>

        <div className="mt-auto pt-4 flex items-center justify-between border-t border-bekasi-emerald-900/[0.06] pt-3">
          <div className="flex items-center gap-3 text-[11px] text-bekasi-ink/55">
            <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {evt.time?.split(' – ')[0] ?? evt.time}</span>
            <span className="text-bekasi-gold-600 font-medium">{evt.price}</span>
          </div>
          <span
            className={cn(
              'inline-flex items-center justify-center h-8 w-8 rounded-full',
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
