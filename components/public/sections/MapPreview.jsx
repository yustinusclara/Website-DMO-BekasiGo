'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Map as MapIcon, ArrowUpRight, Navigation2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import ChapterMarker from '@/components/shared/ChapterMarker'
import PillNav from '@/components/shared/PillNav'
import Tag from '@/components/shared/Tag'
import LeafletMap from '@/components/map/LeafletMap'
import { MAP_PREVIEW } from '@/lib/content/homepage'
import { categories as CATS } from '@/lib/design/tokens'
import { percentToLatLng, KOTA_BEKASI_CENTER } from '@/lib/map/positions'

export default function MapPreview({ data }) {
  const content = data || MAP_PREVIEW;
  const [filter, setFilter]       = useState('all')
  const [activePin, setActivePin] = useState(content.pins[0].id)

  // Attach real lat/lng to every pin once (stable per session).
  const geocodedPins = useMemo(
    () => content.pins.map((p) => {
      const ll = percentToLatLng({ x: p.x, y: p.y })
      return { ...p, lat: ll.lat, lng: ll.lng }
    }),
    [],
  )

  const visiblePins = filter === 'all'
    ? geocodedPins
    : geocodedPins.filter((p) => p.category === filter)

  const active   = geocodedPins.find((p) => p.id === activePin) ?? geocodedPins[0]
  const activeCat = CATS[active.category] ?? CATS.urban

  const points = visiblePins.map((p) => ({
    id: p.id,
    lat: p.lat,
    lng: p.lng,
    category: p.category,
    title: p.name,
    kicker: p.district,
    description: p.description,
  }))

  return (
    <section id="map" className="relative overflow-hidden bg-bekasi-cream">
      <div className="container py-24 md:py-32 lg:py-36">
        <ChapterMarker text={content.chapter} variant="light" />

        {/* Editorial header */}
        <div className="mt-14 md:mt-20 grid lg:grid-cols-12 gap-8 lg:gap-16 items-end">
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.8 }}
            className="lg:col-span-7"
          >
            <span className="eyebrow eyebrow-dot text-bekasi-emerald-700">{content.eyebrow}</span>
            <h2 className="mt-6 heading-display text-display-xl leading-[1.02] text-bekasi-emerald-900 text-balance">
              {content.title}
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.8, delay: 0.1 }}
            className="lg:col-span-5"
          >
            <p className="body-lg text-bekasi-ink/70 max-w-lg">{content.kicker}</p>
          </motion.div>
        </div>

        {/* Filter row */}
        <div className="mt-10 md:mt-12 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <PillNav
            items={content.filters}
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
          {/* MAP CANVAS — real Leaflet + OSM */}
          <div className="lg:col-span-8 relative rounded-3xl overflow-hidden border border-black/[0.04] shadow-elevated aspect-[16/11] md:aspect-[16/10] lg:aspect-auto lg:min-h-[560px] z-10">
            <LeafletMap
              points={points}
              center={KOTA_BEKASI_CENTER}
              zoom={12}
              minZoom={11}
              selectedId={activePin}
              onMarkerClick={setActivePin}
              heightClass="h-full"
              interactive
            />

            {/* Top overlay: live badge */}
            <div className="absolute top-4 left-4 z-[600] pointer-events-none">
              <div className="chip-dark inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-bekasi-coral animate-pulse" /> Live preview
              </div>
            </div>
          </div>

          {/* INFO PANEL */}
          <div className="lg:col-span-4 flex flex-col gap-4 md:gap-6">
            {/* Active pin info */}
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
            {content.stats.map((s) => (
              <div key={s.v}>
                <div className="font-display text-3xl md:text-4xl text-bekasi-emerald-900 leading-none">{s.k}</div>
                <div className="mt-2 text-eyebrow uppercase text-bekasi-ink/55">{s.v}</div>
              </div>
            ))}
          </div>
          <div className="lg:col-span-4 flex flex-wrap justify-start lg:justify-end gap-3">
            <Link href={content.secondaryCta.href} className="btn-ghost btn-md text-bekasi-emerald-900">
              {content.secondaryCta.label}
            </Link>
            <Link href={content.cta.href}>
              <button className="btn-primary btn-md">
                <MapIcon className="h-4 w-4" /> {content.cta.label}
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
