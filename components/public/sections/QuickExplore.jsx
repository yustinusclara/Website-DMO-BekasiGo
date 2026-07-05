'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Landmark, Utensils, CalendarDays, ShoppingBag, Users2, Waves, TrainFront,
  ArrowUpRight, MapPin,
} from 'lucide-react'
import PillNav from '@/components/shared/PillNav'
import { QUICK_EXPLORE } from '@/lib/content/homepage'

const ICON_MAP = {
  heritage:   Landmark,
  culinary:   Utensils,
  events:     CalendarDays,
  shopping:   ShoppingBag,
  family:     Users2,
  waterfront: Waves,
  transport:  TrainFront,
}

/**
 * Quick Explore — the fast-jump into major Bekasi interests.
 * Content-first: a premium pill navigation drives a reactive preview panel.
 * Overlaps the hero for the classic DMO transition feel.
 */
export default function QuickExplore({ data }) {
  const content = data || QUICK_EXPLORE;
  const items = content.categories.map((c) => ({
    id: c.id,
    label: c.label,
    icon: ICON_MAP[c.id] ?? Landmark,
    href: c.href,
  }))

  const [activeId, setActiveId] = useState(content.categories[0].id)
  const active = content.categories.find((c) => c.id === activeId) ?? content.categories[0]

  // Auto-cycle through categories every 6s until user interacts.
  const [autoplay, setAutoplay] = useState(true)
  useEffect(() => {
    if (!autoplay) return
    const t = setInterval(() => {
      setActiveId((cur) => {
        const idx = content.categories.findIndex((c) => c.id === cur)
        const next = content.categories[(idx + 1) % content.categories.length]
        return next.id
      })
    }, 6000)
    return () => clearInterval(t)
  }, [autoplay])

  const handleHover = (id) => { setActiveId(id); setAutoplay(false) }

  return (
    <section id="quick-explore" className="relative -mt-16 md:-mt-24 z-20">
      <div className="container">
        <div className="relative rounded-3xl bg-white shadow-elevated border border-black/[0.04] overflow-hidden">

          {/* Section header */}
          <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-end gap-4 md:gap-8 border-b border-black/[0.04]">
            <div className="flex-1">
              <span className="eyebrow eyebrow-dot text-bekasi-emerald-700">{content.eyebrow}</span>
              <h3 className="mt-2 heading-3 text-bekasi-emerald-900">
                {content.title}
              </h3>
            </div>
            <p className="body-sm text-bekasi-ink/60 md:max-w-md md:text-right">
              {content.kicker}
            </p>
          </div>

          {/* Pill nav row */}
          <div className="px-6 md:px-8 py-5 md:py-6 border-b border-black/[0.04] bg-bekasi-cream/40">
            <div className="flex items-center justify-between gap-4">
              <PillNav
                items={items}
                activeId={activeId}
                onSelect={handleHover}
                onHover={handleHover}
                variant="light"
                size="md"
                className="flex-1"
              />
              <Link
                href={content.action.href}
                className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium text-bekasi-emerald-900 hover:text-bekasi-emerald-700 whitespace-nowrap"
              >
                {content.action.label} <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Reactive preview */}
          <div className="grid md:grid-cols-2 gap-0 min-h-[380px]">
            {/* Image side */}
            <div className="relative overflow-hidden aspect-[4/3] md:aspect-auto bg-bekasi-emerald-900">
              <AnimatePresence mode="wait">
                <motion.img
                  key={active.id}
                  src={active.image}
                  alt={active.label}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="img-cover"
                  loading="lazy"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-tr from-bekasi-emerald-900/60 via-transparent to-transparent" />
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-[0.25em] text-white/95 bg-black/30 backdrop-blur px-3 py-1.5 rounded-full border border-white/20">
                  {active.count} places
                </span>
              </div>
            </div>

            {/* Content side */}
            <div className="p-6 md:p-10 flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="mono text-bekasi-ink/40">
                    0{content.categories.findIndex((c) => c.id === active.id) + 1} / {content.categories.length}
                  </div>
                  <h4 className="mt-3 heading-3 text-bekasi-emerald-900">{active.label}</h4>
                  <p className="mt-3 body text-bekasi-ink/70 max-w-md">{active.kicker}</p>

                  <div className="mt-6 space-y-2">
                    {active.samples.map((s) => (
                      <Link
                        key={s.name}
                        href={s.href}
                        className="group flex items-center gap-3 py-2 border-b border-black/[0.06] hover:border-bekasi-emerald-900/30 transition-colors"
                      >
                        <span className="h-7 w-7 rounded-full bg-bekasi-emerald-900/[0.05] group-hover:bg-bekasi-emerald-900 text-bekasi-emerald-800 group-hover:text-bekasi-gold-400 flex items-center justify-center transition-colors">
                          <MapPin className="h-3.5 w-3.5" />
                        </span>
                        <span className="flex-1 text-sm text-bekasi-ink/85 group-hover:text-bekasi-emerald-900">{s.name}</span>
                        <ArrowUpRight className="h-4 w-4 text-bekasi-ink/30 group-hover:text-bekasi-emerald-900 transition-colors" />
                      </Link>
                    ))}
                  </div>

                  <div className="mt-8">
                    <Link href={active.href} className="btn-primary btn-md group">
                      Explore {active.label.toLowerCase()}
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
