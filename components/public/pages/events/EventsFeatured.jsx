'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowUpRight, MapPin, CalendarDays, Clock } from 'lucide-react'
import {
  EVENTS, EVENT_CATEGORIES, formatEventDate, eventDayParts, daysUntil,
} from '@/lib/content/events'

export default function EventsFeatured() {
  const featured = EVENTS.filter((e) => e.featured).slice(0, 3)

  if (!featured.length) return null

  return (
    <section className="relative bg-bekasi-cream text-bekasi-ink">
      <div className="container py-16 md:py-24">
        <div className="grid gap-6 md:gap-8 md:grid-cols-[1fr_auto] items-end mb-8 md:mb-12">
          <div>
            <div className="text-[11px] uppercase tracking-[0.22em] text-bekasi-gold-600 inline-flex items-center gap-2">
              <span className="h-px w-8 bg-bekasi-gold-500" />
              Featured events
            </div>
            <h2 className="mt-4 font-display text-3xl md:text-5xl leading-tight tracking-tight text-balance max-w-3xl">
              What to catch this season.
            </h2>
            <p className="mt-4 max-w-xl text-bekasi-ink/70 leading-relaxed">
              Three anchor events shaping the mood of Bekasi right now—curated by the BekasiGo editorial team.
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {featured.map((e, i) => (
            <FeaturedCard key={e.id} evt={e} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function FeaturedCard({ evt, index }) {
  const cat = EVENT_CATEGORIES.find((c) => c.id === evt.category) ?? { label: evt.category, color: '#155F58' }
  const dp  = eventDayParts(evt)
  const dU  = daysUntil(evt)
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-3xl border border-bekasi-emerald-900/10 bg-white shadow-elevated"
    >
      <Link href={`/events/${evt.slug}`} className="block">
        {/* Image */}
        <div className="relative aspect-[16/11] overflow-hidden">
          <Image
            src={evt.image}
            alt={evt.title}
            fill
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

          {/* Big date tile (top-left) */}
          <div className="absolute top-4 left-4 flex flex-col items-center rounded-2xl bg-white/95 backdrop-blur border border-white/60 shadow-sm px-4 py-2">
            <span className="text-[10.5px] uppercase tracking-[0.22em] text-bekasi-gold-600">{dp.month}</span>
            <span className="font-display text-3xl leading-none text-bekasi-emerald-900">{dp.day}</span>
            <span className="text-[10px] uppercase tracking-[0.18em] text-bekasi-ink/50">{dp.weekday}</span>
          </div>

          {/* Category (top-right) */}
          <div className="absolute top-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur px-2.5 py-1">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: cat.color }} />
            <span className="text-[10.5px] uppercase tracking-[0.2em] text-bekasi-emerald-900 font-medium">{cat.label}</span>
          </div>

          {/* Featured ribbon */}
          <div className="absolute bottom-4 left-4 rounded-full bg-bekasi-gold-500 text-bekasi-emerald-900 px-3 py-1 text-[10.5px] uppercase tracking-[0.22em] font-semibold">
            Featured
          </div>

          {/* Days until */}
          {dU >= 0 && dU <= 60 && (
            <div className="absolute bottom-4 right-4 rounded-full bg-bekasi-emerald-900/85 text-white backdrop-blur px-3 py-1 text-[11px] font-medium">
              in {dU === 0 ? 'today' : `${dU} day${dU === 1 ? '' : 's'}`}
            </div>
          )}
        </div>

        {/* Body */}
        <div className="p-5 md:p-6">
          <h3 className="font-display text-2xl md:text-[1.7rem] leading-tight text-bekasi-emerald-900 group-hover:text-bekasi-emerald-800 transition-colors">
            {evt.title}
          </h3>
          <p className="mt-2 text-sm text-bekasi-ink/65 leading-relaxed line-clamp-2">{evt.excerpt}</p>

          <div className="mt-5 grid grid-cols-2 gap-3 text-[12.5px] text-bekasi-ink/70">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-3.5 w-3.5 text-bekasi-ink/45" />
              {formatEventDate(evt, { short: true })}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-bekasi-ink/45" />
              {evt.time?.split(' · ')[0] ?? evt.time}
            </span>
            <span className="col-span-2 inline-flex items-center gap-1.5 truncate">
              <MapPin className="h-3.5 w-3.5 text-bekasi-ink/45" />
              <span className="truncate">{evt.venue.name}</span>
            </span>
          </div>

          <div className="mt-5 flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-[0.18em] text-bekasi-gold-600">{evt.price}</span>
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-bekasi-emerald-900">
              View event
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-px group-hover:translate-x-px" />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
