'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ChevronRight, CalendarDays, Clock, MapPin, Ticket, Users,
  Share2, Heart, ArrowDown,
} from 'lucide-react'
import {
  EVENT_CATEGORIES, formatEventDate, eventDayParts, daysUntil,
} from '@/lib/content/events'

export default function EventHero({ evt }) {
  const cat = EVENT_CATEGORIES.find((c) => c.id === evt.category) ?? { label: evt.category, color: '#155F58' }
  const dp  = eventDayParts(evt)
  const dU  = daysUntil(evt)

  return (
    <section className="relative isolate min-h-[92vh] md:min-h-screen text-white overflow-hidden">
      <Image
        src={evt.image}
        alt={evt.title}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center scale-105"
      />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/25 to-bekasi-emerald-900" />
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(212,169,76,0.15)_0%,_transparent_50%)]" />

      <div className="relative container flex flex-col justify-end min-h-[92vh] md:min-h-screen pt-28 pb-14 md:pb-20">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-white/70"
        >
          <Link href="/" className="hover:text-bekasi-gold-400 transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3 opacity-60" />
          <Link href="/events" className="hover:text-bekasi-gold-400 transition-colors">Events</Link>
          <ChevronRight className="h-3 w-3 opacity-60" />
          <span className="text-bekasi-gold-400">{evt.title}</span>
        </motion.nav>

        {/* Chips */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-8 md:mt-10 flex flex-wrap items-center gap-2"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-white/95 backdrop-blur px-3 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: cat.color }} />
            <span className="text-[10.5px] uppercase tracking-[0.22em] text-bekasi-emerald-900 font-medium">{cat.label}</span>
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/[0.06] backdrop-blur px-3 py-1.5 text-[11px] uppercase tracking-[0.2em] text-white/80">
            <MapPin className="h-3 w-3" /> {evt.venue.district}
          </span>
          {evt.featured && (
            <span className="rounded-full bg-bekasi-gold-500 text-bekasi-emerald-900 px-3 py-1.5 text-[10.5px] uppercase tracking-[0.2em] font-semibold">
              Featured
            </span>
          )}
          {dU >= 0 && dU <= 60 && (
            <span className="rounded-full bg-bekasi-emerald-900/60 border border-white/20 backdrop-blur px-3 py-1.5 text-[10.5px] uppercase tracking-[0.2em] text-white/90">
              in {dU === 0 ? 'today' : `${dU} day${dU === 1 ? '' : 's'}`}
            </span>
          )}
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.25rem] leading-[0.98] tracking-tight text-balance max-w-5xl"
        >
          {evt.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-5 max-w-2xl text-base md:text-lg text-white/80 leading-relaxed"
        >
          {evt.excerpt}
        </motion.p>

        {/* Info tiles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-10 md:mt-14 grid grid-cols-2 md:grid-cols-4 gap-3"
        >
          <InfoTile
            icon={CalendarDays}
            eyebrow="Date"
            value={formatEventDate(evt)}
            highlight={`${dp.day} ${dp.month} ${dp.year}`}
          />
          <InfoTile icon={Clock}  eyebrow="Time"   value={evt.time} />
          <InfoTile icon={MapPin} eyebrow="Venue"  value={evt.venue.name} sub={evt.venue.district} />
          <InfoTile icon={Ticket} eyebrow="Ticket" value={evt.price} />
        </motion.div>

        {/* Actions row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.75 }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <button className="h-11 rounded-full border border-white/20 hover:border-white/40 bg-white/[0.06] hover:bg-white/[0.12] px-5 inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] transition-colors">
            <Heart className="h-4 w-4" /> Save
          </button>
          <button className="h-11 rounded-full border border-white/20 hover:border-white/40 bg-white/[0.06] hover:bg-white/[0.12] px-5 inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] transition-colors">
            <Share2 className="h-4 w-4" /> Share
          </button>
          {evt.capacity && (
            <span className="inline-flex items-center gap-2 text-xs text-white/60 ml-auto">
              <Users className="h-3.5 w-3.5" /> {evt.capacity}
            </span>
          )}

          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 ml-2"
          >
            <ArrowDown className="h-3.5 w-3.5" />
          </motion.span>
        </motion.div>
      </div>
    </section>
  )
}

function InfoTile({ icon: Icon, eyebrow, value, sub, highlight }) {
  return (
    <div className="rounded-2xl border border-white/12 bg-white/[0.05] backdrop-blur p-4 md:p-5">
      <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.22em] text-bekasi-gold-400">
        <Icon className="h-3.5 w-3.5" /> {eyebrow}
      </div>
      <div className="mt-2 text-[15px] font-medium text-white leading-snug line-clamp-2">{value}</div>
      {sub && <div className="mt-1 text-xs text-white/55 truncate">{sub}</div>}
      {highlight && (
        <div className="mt-2 text-[10.5px] uppercase tracking-[0.2em] text-white/50">{highlight}</div>
      )}
    </div>
  )
}
