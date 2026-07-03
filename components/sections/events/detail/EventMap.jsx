'use client'

import { motion } from 'framer-motion'
import { MapPin, Navigation, Compass, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { EVENT_CATEGORIES } from '@/lib/content/events'
import LeafletMap from '@/components/map/LeafletMap'

export default function EventMap({ evt }) {
  const cat = EVENT_CATEGORIES.find((c) => c.id === evt.category) ?? { color: '#155F58' }
  const { coords } = evt.venue

  const point = {
    id: evt.slug || evt.id || 'event',
    lat: Number(coords.lat),
    lng: Number(coords.lng),
    category: 'events',
    title: evt.venue.name,
    kicker: evt.venue.district,
    description: evt.venue.address,
    active: true,
  }

  return (
    <section className="relative bg-white text-bekasi-ink">
      <div className="container py-16 md:py-24">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-14 items-center">
          <div className="lg:col-span-5">
            <div className="text-[11px] uppercase tracking-[0.22em] text-bekasi-gold-600 inline-flex items-center gap-2">
              <span className="h-px w-8 bg-bekasi-gold-500" />
              Where it happens
            </div>
            <h2 className="mt-4 font-display text-3xl md:text-4xl leading-tight tracking-tight text-bekasi-emerald-900">
              {evt.venue.name}.
            </h2>
            <p className="mt-4 text-bekasi-ink/70 max-w-lg leading-relaxed">
              {evt.venue.address}, {evt.venue.district}. Open the interactive Explore Map for nearby destinations, transit stops, and parking notes.
            </p>

            <div className="mt-6 rounded-xl border border-bekasi-emerald-900/10 bg-bekasi-cream p-4">
              <div className="flex items-start gap-3">
                <div className="h-9 w-9 rounded-full bg-white flex items-center justify-center shrink-0">
                  <MapPin className="h-4 w-4 text-bekasi-emerald-900" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10.5px] uppercase tracking-[0.22em] text-bekasi-ink/55">Venue</div>
                  <div className="mt-1 text-sm font-medium text-bekasi-ink/85">{evt.venue.name}</div>
                  <div className="text-xs text-bekasi-ink/55">{evt.venue.address}</div>
                  <div className="mt-3 flex items-center gap-2 text-[11px] tracking-[0.18em] text-bekasi-ink/55">
                    <Compass className="h-3.5 w-3.5" />
                    <span className="font-mono">{coords.lat}, {coords.lng}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/map"
                className="inline-flex items-center gap-2 rounded-full bg-bekasi-emerald-900 hover:bg-bekasi-emerald-800 text-white px-5 py-2.5 text-sm font-medium transition-colors"
              >
                <Compass className="h-4 w-4" />
                Open Explore Map
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${coords.lat},${coords.lng}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-bekasi-emerald-900/20 hover:border-bekasi-emerald-900/40 hover:bg-bekasi-emerald-900/[0.03] text-bekasi-emerald-900 px-5 py-2.5 text-sm font-medium transition-colors"
              >
                <Navigation className="h-4 w-4" />
                Get directions
              </a>
            </div>
          </div>

          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8 }}
              className="rounded-2xl overflow-hidden border border-bekasi-emerald-900/10 shadow-elevated"
            >
              <LeafletMap
                points={[point]}
                center={{ lat: point.lat, lng: point.lng }}
                zoom={15}
                heightClass="aspect-[4/3] md:aspect-[16/10]"
                interactive
              />
              <div className="flex items-center justify-between px-4 py-2 text-[10.5px] uppercase tracking-[0.18em] text-bekasi-ink/55 bg-white">
                <span className="font-mono">{coords.lat}, {coords.lng}</span>
                <span>Event venue on the interactive map</span>
              </div>
            </motion.div>
            <div className="sr-only">Category color: {cat.color}</div>
          </div>
        </div>
      </div>
    </section>
  )
}
