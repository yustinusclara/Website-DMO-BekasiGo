'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Utensils, BedDouble, TrainFront, ArrowUpRight, MapPin, Sparkles,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import PillNav from '@/components/ds/PillNav'
import { UTILITY } from '@/lib/content/homepage'

const ICON_MAP = { utensils: Utensils, bed: BedDouble, train: TrainFront }

export default function UtilityPreview() {
  const [activeId, setActiveId] = useState(UTILITY.tabs[0].id)
  const active = UTILITY.tabs.find((t) => t.id === activeId) ?? UTILITY.tabs[0]

  const pillItems = UTILITY.tabs.map((t) => ({ id: t.id, label: t.label, icon: ICON_MAP[t.icon] }))

  return (
    <section id="utility" className="relative overflow-hidden bg-bekasi-sand">
      {/* Subtle info-grid pattern for utility feel */}
      <div aria-hidden className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(0deg, transparent 24%, rgba(6,46,43,0.6) 25%, rgba(6,46,43,0.6) 26%, transparent 27%, transparent 74%, rgba(6,46,43,0.6) 75%, rgba(6,46,43,0.6) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(6,46,43,0.6) 25%, rgba(6,46,43,0.6) 26%, transparent 27%, transparent 74%, rgba(6,46,43,0.6) 75%, rgba(6,46,43,0.6) 76%, transparent 77%, transparent)',
          backgroundSize: '80px 80px',
        }}
      />

      <div className="relative container py-20 md:py-28">
        {/* Compact utilitarian header (no chapter marker) */}
        <div className="grid lg:grid-cols-12 gap-6 items-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-8"
          >
            <span className="eyebrow eyebrow-dot text-bekasi-emerald-700">{UTILITY.eyebrow}</span>
            <h2 className="mt-4 heading-display text-display-lg leading-tight text-bekasi-emerald-900 text-balance">
              {UTILITY.title}
            </h2>
            <p className="mt-4 body text-bekasi-ink/65 max-w-lg">{UTILITY.kicker}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-4 lg:text-right"
          >
            <Link href={UTILITY.action.href}>
              <button className="btn-primary btn-md">
                <Sparkles className="h-4 w-4" /> {UTILITY.action.label}
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </Link>
          </motion.div>
        </div>

        {/* Utility Panel */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 md:mt-12 rounded-3xl bg-white border border-black/[0.04] shadow-elevated overflow-hidden"
        >
          {/* Tab bar */}
          <div className="px-5 md:px-8 py-4 border-b border-black/[0.05] bg-bekasi-cream/50 flex flex-wrap items-center gap-4 justify-between">
            <PillNav
              items={pillItems}
              activeId={activeId}
              onSelect={setActiveId}
              layoutId="utility-tab-bg"
              variant="light"
              size="md"
            />
            <div className="flex items-center gap-3 text-xs text-bekasi-ink/60">
              <span className="font-mono text-bekasi-emerald-800">{active.count}</span>
              <span>{active.unit}</span>
            </div>
          </div>

          {/* Content area */}
          <div className="p-5 md:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Sub header */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-6">
                  <div>
                    <h3 className="heading-4 text-bekasi-emerald-900">{active.label}</h3>
                    <p className="text-sm text-bekasi-ink/60 mt-1">{active.subtitle}</p>
                  </div>
                  <Link href={active.href} className="inline-flex items-center gap-1.5 text-sm font-medium text-bekasi-emerald-900 hover:text-bekasi-emerald-700">
                    See all {active.label.toLowerCase()} <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>

                {/* Utility rows */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                  {active.items.map((item, i) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="group relative flex flex-col rounded-2xl border border-black/[0.05] bg-white hover:border-bekasi-emerald-900/20 hover:shadow-elevated hover:-translate-y-0.5 transition-all overflow-hidden"
                    >
                      {/* Thumbnail */}
                      <div className="relative aspect-[16/10] bg-gradient-to-br from-bekasi-cream to-bekasi-sand overflow-hidden">
                        <img
                          src={item.image}
                          alt=""
                          className="absolute inset-0 h-full w-full object-cover object-center scale-110 mix-blend-multiply transition-transform duration-700 ease-out group-hover:scale-125"
                          loading="lazy"
                        />
                        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-bekasi-emerald-900/30 via-transparent to-transparent" />
                        <span className="absolute top-3 left-3 text-[10px] uppercase tracking-[0.22em] text-white/95 bg-black/40 backdrop-blur px-2.5 py-1 rounded-full border border-white/20">
                          {item.category}
                        </span>
                        <span className="absolute top-3 right-3 mono text-white/80">0{i + 1}</span>
                      </div>
                      {/* Info */}
                      <div className="p-4 md:p-5 flex flex-col gap-3">
                        <h4 className="font-display text-lg text-bekasi-emerald-900 leading-snug">
                          {item.name}
                        </h4>
                        <div className="flex items-center justify-between text-xs">
                          <span className="inline-flex items-center gap-1 text-bekasi-ink/60">
                            <MapPin className="h-3 w-3" /> {item.district}
                          </span>
                          <span className="font-mono text-bekasi-gold-700">{item.price}</span>
                        </div>
                        <div className="pt-3 border-t border-black/[0.05] flex items-center justify-between">
                          <span className="text-xs text-bekasi-ink/50">View details</span>
                          <ArrowUpRight className="h-4 w-4 text-bekasi-ink/40 group-hover:text-bekasi-emerald-900 transition-colors" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Summary strip */}
          <div className="px-5 md:px-8 py-4 border-t border-black/[0.05] bg-bekasi-cream/40 flex flex-wrap items-center justify-between gap-3 text-xs text-bekasi-ink/60">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {UTILITY.tabs.map((t) => {
                const Icon = ICON_MAP[t.icon]
                const isActive = t.id === activeId
                return (
                  <span key={t.id} className={cn('inline-flex items-center gap-1.5', isActive && 'text-bekasi-emerald-900 font-medium')}>
                    <Icon className="h-3.5 w-3.5" />
                    <span className="font-mono">{t.count}</span>
                    <span>{t.label.toLowerCase()}</span>
                  </span>
                )
              })}
            </div>
            <Link href={UTILITY.action.href} className="inline-flex items-center gap-1.5 text-bekasi-emerald-900 font-medium">
              Continue in Smart Planner <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
