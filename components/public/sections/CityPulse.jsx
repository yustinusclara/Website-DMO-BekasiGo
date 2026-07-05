'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Calendar, MapPin, ArrowUpRight, Ticket, Clock,
  Utensils, Music2, Landmark, Trophy, Cpu,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import ChapterMarker from '@/components/shared/ChapterMarker'
import PillNav from '@/components/shared/PillNav'
import { CITY_PULSE } from '@/lib/content/homepage'

const TAG_ICON = {
  Food:    Utensils,
  Culture: Landmark,
  Music:   Music2,
  Sport:   Trophy,
  Tech:    Cpu,
}

export default function CityPulse({ data }) {
  const content = data || CITY_PULSE;
  const [filter, setFilter] = useState('all')
  const featured = content.featured

  return (
    <section id="events" className="relative overflow-hidden bg-bekasi-cream">
      <div className="container py-24 md:py-32 lg:py-36">
        <ChapterMarker text={content.chapter} variant="light" />

        {/* Editorial header */}
        <div className="mt-14 md:mt-20 grid lg:grid-cols-12 gap-8 lg:gap-16 items-end">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <span className="eyebrow eyebrow-dot text-bekasi-emerald-700">{content.eyebrow}</span>
            <h2 className="mt-6 heading-display text-display-xl leading-[1.02] text-bekasi-emerald-900 text-balance">
              {content.title}
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <p className="body-lg text-bekasi-ink/70 max-w-lg">{content.kicker}</p>
            <Link
              href={content.action.href}
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-bekasi-emerald-900 border-b border-bekasi-emerald-900/40 hover:border-bekasi-emerald-900 pb-1"
            >
              {content.action.label} <ArrowUpRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>

        {/* Live ticker bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mt-14 md:mt-20 relative rounded-full bg-bekasi-emerald-900 text-white overflow-hidden flex items-center"
        >
          <div className="flex-shrink-0 flex items-center gap-2 pl-4 md:pl-6 pr-4 py-3 border-r border-white/10">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-bekasi-coral opacity-75 animate-ping" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-bekasi-coral" />
            </span>
            <span className="text-[11px] uppercase tracking-[0.28em] font-medium">Live now</span>
          </div>
          <div className="flex-1 overflow-hidden relative mask-fade-r">
            <div className="flex whitespace-nowrap animate-marquee gap-10 py-3">
              {[...content.liveNow, ...content.liveNow].map((e, i) => {
                const Icon = TAG_ICON[e.tag] ?? Landmark
                return (
                  <span key={i} className="inline-flex items-center gap-2 text-sm text-white/85">
                    <span className="text-bekasi-gold-400 text-[10px] uppercase tracking-[0.22em]">{e.status}</span>
                    <span className="opacity-30">/</span>
                    <Icon className="h-3.5 w-3.5 text-bekasi-gold-400" />
                    <span className="font-medium">{e.title}</span>
                    <span className="opacity-40">·</span>
                    <span className="text-white/60">{e.venue}</span>
                  </span>
                )
              })}
            </div>
          </div>
        </motion.div>

        {/* Filter pill nav */}
        <div className="mt-8 md:mt-10">
          <PillNav
            items={content.filters}
            activeId={filter}
            onSelect={setFilter}
            layoutId="citypulse-filter-bg"
            variant="light"
            size="md"
          />
        </div>

        {/* Main grid: feature + upcoming list */}
        <div className="mt-8 md:mt-10 grid lg:grid-cols-12 gap-6 md:gap-8">
          {/* FEATURED EVENT */}
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 relative rounded-3xl overflow-hidden bg-bekasi-emerald-900 text-white shadow-elevated group"
          >
            <div className="relative aspect-[16/10] md:aspect-[16/9] overflow-hidden">
              <img src={featured.image} alt={featured.title} className="img-cover img-zoom-slow" loading="lazy" />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-bekasi-emerald-900 via-bekasi-emerald-900/40 to-transparent" />
              <span className="absolute top-5 left-5 chip-gold">Featured Event</span>
              <span className="absolute top-5 right-5 chip-dark inline-flex items-center gap-1.5">
                <Ticket className="h-3 w-3" /> {featured.ticketStatus}
              </span>
            </div>

            <div className="relative p-6 md:p-8 lg:p-10 -mt-24 md:-mt-32 z-10">
              <div className="flex items-start gap-6">
                {/* Big date */}
                <div className="flex-shrink-0 text-center rounded-2xl bg-bekasi-gold-500 text-bekasi-emerald-900 px-4 py-3 md:px-5 md:py-4 shadow-gold">
                  <div className="font-display text-4xl md:text-5xl leading-none">{featured.date.d}</div>
                  <div className="mt-1 text-[10px] uppercase tracking-[0.28em] font-medium">{featured.date.m}</div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="chip-dark">{featured.category}</span>
                    <span className="text-[10px] uppercase tracking-[0.22em] text-white/60">{featured.range}</span>
                  </div>
                  <h3 className="heading-display text-3xl md:text-4xl leading-tight text-balance text-white">
                    {featured.title}
                  </h3>
                  <div className="mt-3 flex items-center gap-2 text-sm text-white/70">
                    <MapPin className="h-4 w-4 flex-shrink-0" /> {featured.venue}
                  </div>
                </div>
              </div>

              <p className="mt-6 body text-white/75 max-w-2xl">
                {featured.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {featured.highlights.map((h) => (
                  <span key={h} className="pill-dark text-[11px]">{h}</span>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link href={featured.href}>
                  <button className="btn-primary btn-md group/cta">
                    Get event details
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
                  </button>
                </Link>
                <button className="btn-outline-invert btn-md">
                  <Calendar className="h-4 w-4" /> Add to my plan
                </button>
              </div>
            </div>
          </motion.article>

          {/* UPCOMING LIST */}
          <motion.aside
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 rounded-3xl bg-white border border-black/[0.04] p-6 md:p-8 flex flex-col shadow-soft"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="eyebrow eyebrow-dot text-bekasi-emerald-700">Coming up</span>
                <h3 className="mt-2 heading-4 text-bekasi-emerald-900">Next on the calendar</h3>
              </div>
              <span className="chip-light font-mono">{content.upcoming.length} events</span>
            </div>

            <ul className="flex-1 flex flex-col divide-y divide-black/[0.06]">
              {content.upcoming.map((e) => {
                const Icon = TAG_ICON[e.tag] ?? Landmark
                return (
                  <li key={e.href}>
                    <Link
                      href={e.href}
                      className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 md:gap-5 py-4 hover:bg-bekasi-cream/60 -mx-2 px-2 rounded-lg transition-colors"
                    >
                      <div className="flex-shrink-0 text-center min-w-[52px]">
                        <div className="font-display text-2xl md:text-3xl text-bekasi-emerald-900 leading-none">{e.date.d}</div>
                        <div className="mt-1 text-[10px] uppercase tracking-[0.25em] text-bekasi-ink/50">{e.date.m}</div>
                        <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-bekasi-gold-600">{e.day}</div>
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.22em] text-bekasi-gold-700">
                            <Icon className="h-3 w-3" /> {e.tag}
                          </span>
                        </div>
                        <h4 className="font-display text-lg text-bekasi-emerald-900 leading-snug group-hover:text-bekasi-emerald-700 transition-colors truncate">
                          {e.title}
                        </h4>
                        <div className="mt-1 flex items-center gap-1.5 text-xs text-bekasi-ink/55">
                          <MapPin className="h-3 w-3" /> {e.venue}
                        </div>
                      </div>
                      <ArrowUpRight className="h-4 w-4 text-bekasi-ink/30 group-hover:text-bekasi-emerald-900 transition-colors flex-shrink-0" />
                    </Link>
                  </li>
                )
              })}
            </ul>

            <Link
              href="/events"
              className="mt-4 inline-flex items-center justify-center gap-1.5 py-3 border-t border-black/[0.06] -mx-6 md:-mx-8 -mb-6 md:-mb-8 px-6 md:px-8 text-sm font-medium text-bekasi-emerald-900 hover:bg-bekasi-cream transition-colors rounded-b-3xl"
            >
              See all events · <span className="text-bekasi-ink/50">{content.totalEvents} on the calendar</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </motion.aside>
        </div>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mt-10 rounded-2xl bg-white/70 border border-bekasi-emerald-900/10 p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-bekasi-emerald-900 text-bekasi-gold-400 flex items-center justify-center">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <p className="font-medium text-bekasi-emerald-900">The full pulse of Kota Bekasi.</p>
              <p className="text-sm text-bekasi-ink/60">Filter by month, category, and neighborhood — {content.totalEvents} events on the live calendar.</p>
            </div>
          </div>
          <Link href="/events">
            <button className="btn-primary btn-md">
              <Clock className="h-4 w-4" /> Open calendar
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
