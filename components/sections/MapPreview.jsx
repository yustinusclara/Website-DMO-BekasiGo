'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Map as MapIcon, Filter, Compass, ArrowUpRight, Navigation2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import ChapterMarker from '@/components/ds/ChapterMarker'
import PillNav from '@/components/ds/PillNav'
import Tag from '@/components/ds/Tag'
import { MAP_PREVIEW } from '@/lib/content/homepage'
import { categories as CATS } from '@/lib/design/tokens'

export default function MapPreview() {
  const [filter, setFilter]     = useState('all')
  const [activePin, setActivePin] = useState(MAP_PREVIEW.pins[0].id)

  const visiblePins = filter === 'all'
    ? MAP_PREVIEW.pins
    : MAP_PREVIEW.pins.filter((p) => p.category === filter)

  const active = MAP_PREVIEW.pins.find((p) => p.id === activePin) ?? MAP_PREVIEW.pins[0]
  const activeCat = CATS[active.category] ?? CATS.urban

  return (
    <section id="map" className="relative overflow-hidden bg-bekasi-cream">
      <div className="container py-24 md:py-32 lg:py-36">
        <ChapterMarker text={MAP_PREVIEW.chapter} variant="light" />

        {/* Editorial header */}
        <div className="mt-14 md:mt-20 grid lg:grid-cols-12 gap-8 lg:gap-16 items-end">
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.8 }}
            className="lg:col-span-7"
          >
            <span className="eyebrow eyebrow-dot text-bekasi-emerald-700">{MAP_PREVIEW.eyebrow}</span>
            <h2 className="mt-6 heading-display text-display-xl leading-[1.02] text-bekasi-emerald-900 text-balance">
              {MAP_PREVIEW.title}
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.8, delay: 0.1 }}
            className="lg:col-span-5"
          >
            <p className="body-lg text-bekasi-ink/70 max-w-lg">{MAP_PREVIEW.kicker}</p>
          </motion.div>
        </div>

        {/* Filter row */}
        <div className="mt-10 md:mt-12 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <PillNav
            items={MAP_PREVIEW.filters}
            activeId={filter}
            onSelect={setFilter}
            layoutId="map-filter-bg"
            variant="light"
            size="md"
          />
          <div className="inline-flex items-center gap-2 text-xs text-bekasi-ink/60">
            <span className="h-2 w-2 rounded-full bg-bekasi-coral animate-pulse" />
            <span className="mono text-bekasi-emerald-800">{visiblePins.length}</span>
            <span>places on the map</span>
          </div>
        </div>

        {/* Main split: Map + Info Panel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 md:mt-8 grid lg:grid-cols-12 gap-4 md:gap-6"
        >
          {/* MAP CANVAS */}
          <div className="lg:col-span-8 relative rounded-3xl overflow-hidden border border-black/[0.04] shadow-elevated aspect-[16/11] md:aspect-[16/10] lg:aspect-auto lg:min-h-[560px] bg-bekasi-emerald-900">
            {/* Base radial ambient */}
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(circle at 30% 40%, rgba(212,169,76,0.18), transparent 40%),' +
                  'radial-gradient(circle at 70% 65%, rgba(140,199,214,0.14), transparent 45%),' +
                  'linear-gradient(135deg, #062E2B 0%, #0B3D3A 55%, #124F4A 100%)',
              }}
            />
            {/* Grid */}
            <svg aria-hidden className="absolute inset-0 h-full w-full opacity-25" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="map-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#map-grid)" />
            </svg>

            {/* Simulated roads */}
            <svg aria-hidden className="absolute inset-0 h-full w-full" viewBox="0 0 100 60" preserveAspectRatio="none">
              <path d="M 5 30 Q 30 10, 50 25 T 95 20" stroke="rgba(255,255,255,0.18)" strokeWidth="0.35" fill="none" />
              <path d="M 10 55 Q 40 45, 60 50 T 95 40" stroke="rgba(255,255,255,0.14)" strokeWidth="0.35" fill="none" />
              <path d="M 50 5 Q 45 25, 55 40 T 60 58" stroke="rgba(212,169,76,0.35)" strokeWidth="0.45" fill="none" strokeDasharray="1 1" />
              <path d="M 5 5 L 95 55" stroke="rgba(255,255,255,0.08)" strokeWidth="0.3" fill="none" />
              <path d="M 5 55 L 95 5" stroke="rgba(255,255,255,0.08)" strokeWidth="0.3" fill="none" />
            </svg>

            {/* District labels */}
            {MAP_PREVIEW.districts.map((d) => (
              <span
                key={d.name}
                className="absolute text-[9px] uppercase tracking-[0.28em] text-white/25 font-medium pointer-events-none select-none whitespace-nowrap"
                style={{ left: `${d.x}%`, top: `${d.y}%`, transform: 'translate(-50%,-50%)' }}
              >
                {d.name}
              </span>
            ))}

            {/* Pins */}
            {MAP_PREVIEW.pins.map((p) => {
              const dimmed = filter !== 'all' && p.category !== filter
              const isActive = p.id === activePin
              const cat = CATS[p.category] ?? CATS.urban
              return (
                <button
                  key={p.id}
                  onMouseEnter={() => setActivePin(p.id)}
                  onFocus={() => setActivePin(p.id)}
                  className={cn(
                    'absolute group focus:outline-none transition-opacity',
                    dimmed && 'opacity-25 hover:opacity-100',
                  )}
                  style={{ left: `${p.x}%`, top: `${p.y}%`, transform: 'translate(-50%, -100%)' }}
                  aria-label={p.name}
                >
                  {/* Ping */}
                  {isActive && (
                    <span aria-hidden className="absolute inset-0 -inset-3 rounded-full animate-ping" style={{ backgroundColor: `${cat.color}55` }} />
                  )}
                  {/* Pin */}
                  <span
                    className={cn(
                      'relative flex items-center justify-center rounded-full shadow-lg transition-all border-2 border-white/90',
                      isActive ? 'h-9 w-9 -translate-y-1' : 'h-7 w-7',
                    )}
                    style={{ backgroundColor: cat.color, color: '#0B3D3A' }}
                  >
                    <MapPin className={isActive ? 'h-4 w-4' : 'h-3.5 w-3.5'} />
                  </span>
                  {/* Hover label */}
                  <span className="absolute left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap rounded-full bg-white/95 backdrop-blur px-3 py-1 text-xs font-medium text-bekasi-emerald-900 shadow-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    {p.name}
                  </span>
                </button>
              )
            })}

            {/* Top overlay: compass + legend */}
            <div className="absolute top-4 left-4 right-4 flex items-start justify-between pointer-events-none z-10">
              <div className="flex flex-col gap-2">
                <div className="chip-dark inline-flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-bekasi-coral animate-pulse" /> Live preview
                </div>
              </div>
              <div className="flex items-center gap-2 pointer-events-auto">
                <div className="h-10 w-10 rounded-full bg-white/10 border border-white/20 backdrop-blur flex items-center justify-center text-white">
                  <Compass className="h-4 w-4" />
                </div>
              </div>
            </div>

            {/* Bottom overlay: mini stats + zoom controls (visual only) */}
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between pointer-events-none z-10">
              <div className="max-w-md">
                <div className="text-[10px] uppercase tracking-[0.3em] text-bekasi-gold-400">Kota Bekasi</div>
                <div className="mt-1 font-display text-2xl md:text-3xl text-white leading-tight">120+ points across the city</div>
              </div>
              <div className="pointer-events-auto flex items-center gap-1">
                <button className="h-9 w-9 rounded-md bg-white/10 border border-white/20 backdrop-blur text-white text-lg font-medium hover:bg-white/20">+</button>
                <button className="h-9 w-9 rounded-md bg-white/10 border border-white/20 backdrop-blur text-white text-lg font-medium hover:bg-white/20">−</button>
              </div>
            </div>
          </div>

          {/* INFO PANEL */}
          <div className="lg:col-span-4 flex flex-col gap-4 md:gap-6">
            {/* Hovered pin info */}
            <div className="rounded-3xl bg-white border border-black/[0.04] p-6 md:p-7 shadow-soft flex-1 min-h-[240px]">
              <div className="flex items-center justify-between mb-4">
                <span className="eyebrow eyebrow-dot text-bekasi-emerald-700">Now viewing</span>
                <Tag category={active.category} variant="chip" />
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="flex items-center gap-2 text-xs text-bekasi-ink/55 mb-2">
                    <MapPin className="h-3.5 w-3.5" style={{ color: activeCat.color }} />
                    {active.district}
                  </div>
                  <h3 className="heading-display text-2xl md:text-3xl text-bekasi-emerald-900 leading-tight">
                    {active.name}
                  </h3>
                  <p className="mt-3 text-sm text-bekasi-ink/70 leading-relaxed">
                    {active.description}
                  </p>
                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <Link href={`/map?pin=${active.id}`}>
                      <button className="btn-primary btn-sm">
                        <Navigation2 className="h-3.5 w-3.5" /> Route on map
                      </button>
                    </Link>
                    <Link href={`/destinations/${active.id}`} className="text-xs font-medium text-bekasi-emerald-900 hover:text-bekasi-emerald-700 inline-flex items-center gap-1">
                      View details <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Nearby list */}
            <div className="rounded-3xl bg-white border border-black/[0.04] p-5 md:p-6 shadow-soft">
              <div className="flex items-center justify-between mb-4">
                <span className="text-eyebrow uppercase text-bekasi-ink/60">Nearby on the map</span>
                <span className="mono text-bekasi-ink/40">{visiblePins.length}</span>
              </div>
              <ul className="space-y-1">
                {visiblePins.slice(0, 4).map((p) => {
                  const cat = CATS[p.category] ?? CATS.urban
                  const isActive = p.id === activePin
                  return (
                    <li key={p.id}>
                      <button
                        onMouseEnter={() => setActivePin(p.id)}
                        onFocus={() => setActivePin(p.id)}
                        onClick={() => setActivePin(p.id)}
                        className={cn(
                          'w-full flex items-center gap-3 rounded-lg px-2 py-2 text-left transition-colors',
                          isActive ? 'bg-bekasi-cream/70' : 'hover:bg-bekasi-cream/60',
                        )}
                      >
                        <span className="h-7 w-7 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${cat.color}22`, color: cat.dark }}>
                          <MapPin className="h-3.5 w-3.5" />
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm text-bekasi-emerald-900 font-medium truncate">{p.name}</div>
                          <div className="text-[11px] text-bekasi-ink/55">{p.district}</div>
                        </div>
                        <ArrowUpRight className="h-3.5 w-3.5 text-bekasi-ink/30" />
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Stats + CTA row */}
        <div className="mt-10 md:mt-12 grid gap-6 lg:grid-cols-12 items-center">
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-6">
            {MAP_PREVIEW.stats.map((s) => (
              <div key={s.v}>
                <div className="font-display text-3xl md:text-4xl text-bekasi-emerald-900 leading-none">{s.k}</div>
                <div className="mt-2 text-eyebrow uppercase text-bekasi-ink/55">{s.v}</div>
              </div>
            ))}
          </div>
          <div className="lg:col-span-4 flex flex-wrap justify-start lg:justify-end gap-3">
            <Link href={MAP_PREVIEW.secondaryCta.href} className="btn-ghost btn-md text-bekasi-emerald-900">
              {MAP_PREVIEW.secondaryCta.label}
            </Link>
            <Link href={MAP_PREVIEW.cta.href}>
              <button className="btn-primary btn-md">
                <MapIcon className="h-4 w-4" /> {MAP_PREVIEW.cta.label}
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
