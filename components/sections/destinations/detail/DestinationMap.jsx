'use client'

import { motion } from 'framer-motion'
import { MapPin, Navigation, Compass, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { categories as CAT } from '@/lib/design/tokens'
import { DEST_DISTRICTS } from '@/lib/content/destinations'

/**
 * DestinationMap — static location preview.
 * Rendered as a decorative topo-style map with a colored pin, coords,
 * and CTAs into the interactive map and Google Maps directions.
 * Ready to be swapped for a live Google Maps embed in Phase 3.
 */
export default function DestinationMap({ dest }) {
  const cat = CAT[dest.category] ?? { color: '#155F58' }
  const district = DEST_DISTRICTS.find((d) => d.id === dest.district)?.label ?? dest.district

  return (
    <section className="relative bg-white text-bekasi-ink">
      <div className="container py-16 md:py-24">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-14 items-center">
          <div className="lg:col-span-5">
            <div className="text-[11px] uppercase tracking-[0.22em] text-bekasi-gold-600 inline-flex items-center gap-2">
              <span className="h-px w-8 bg-bekasi-gold-500" />
              Location
            </div>
            <h2 className="mt-4 font-display text-3xl md:text-4xl leading-tight tracking-tight text-bekasi-emerald-900">
              Find it on the map.
            </h2>
            <p className="mt-4 text-bekasi-ink/70 max-w-lg leading-relaxed">
              {dest.title} sits in <strong>{district}</strong>. Below is a quick location snapshot—open the interactive Explore Map for turn-by-turn context, nearby stops, and transit options.
            </p>

            <div className="mt-6 rounded-xl border border-bekasi-emerald-900/10 bg-bekasi-cream p-4">
              <div className="flex items-start gap-3">
                <div className="h-9 w-9 rounded-full bg-white flex items-center justify-center shrink-0">
                  <MapPin className="h-4 w-4 text-bekasi-emerald-900" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10.5px] uppercase tracking-[0.22em] text-bekasi-ink/55">Address</div>
                  <div className="mt-1 text-sm text-bekasi-ink/85">{dest.address}</div>
                  <div className="mt-3 flex items-center gap-2 text-[11px] tracking-[0.18em] text-bekasi-ink/55">
                    <Compass className="h-3.5 w-3.5" />
                    <span className="font-mono">{dest.coords.lat}, {dest.coords.lng}</span>
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
                href={`https://www.google.com/maps/dir/?api=1&destination=${dest.coords.lat},${dest.coords.lng}`}
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
            <MapVisualization coords={dest.coords} pinColor={cat.color} title={dest.title} />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------- */
/* Decorative map visualization (SVG topo pattern + animated pin)      */
/* Ready to be replaced with live Google Maps embed later.             */
/* ----------------------------------------------------------------- */
function MapVisualization({ coords, pinColor, title }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8 }}
      className="relative aspect-[4/3] md:aspect-[16/10] rounded-2xl overflow-hidden border border-bekasi-emerald-900/10 shadow-elevated"
    >
      {/* Base tone */}
      <div className="absolute inset-0 bg-gradient-to-br from-bekasi-emerald-50 via-white to-bekasi-sand" />

      {/* SVG grid + topo */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 800 500"
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#0B3D3A" strokeOpacity="0.06" strokeWidth="0.5" />
          </pattern>
          <pattern id="grid-lg" width="200" height="200" patternUnits="userSpaceOnUse">
            <path d="M 200 0 L 0 0 0 200" fill="none" stroke="#0B3D3A" strokeOpacity="0.1" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="800" height="500" fill="url(#grid)" />
        <rect width="800" height="500" fill="url(#grid-lg)" />

        {/* Rivers / roads */}
        <path d="M 0 380 C 150 340, 250 300, 400 320 S 700 260, 800 220" stroke="#8CC7D6" strokeWidth="6" fill="none" opacity="0.55" />
        <path d="M 50 100 C 200 180, 350 140, 500 200 S 750 180, 800 250" stroke="#1E7A72" strokeWidth="2" fill="none" opacity="0.35" />
        <path d="M 120 500 L 220 320 L 320 260 L 460 240 L 620 180" stroke="#155F58" strokeWidth="1.5" fill="none" opacity="0.35" strokeDasharray="6 6" />

        {/* Green patches (parks) */}
        <circle cx="180" cy="180" r="48" fill="#3F9186" opacity="0.15" />
        <circle cx="650" cy="380" r="64" fill="#3F9186" opacity="0.12" />

        {/* Neighborhood blocks */}
        {[[280, 100, 90, 60], [400, 90, 70, 60], [540, 130, 100, 50], [280, 210, 60, 60], [370, 220, 80, 70], [500, 320, 90, 60], [270, 400, 120, 50]].map(([x, y, w, h], i) => (
          <rect key={i} x={x} y={y} width={w} height={h} rx="4" fill="#062E2B" opacity="0.05" />
        ))}

        {/* Neighborhood labels */}
        <g fill="#0B3D3A" fontSize="11" fontFamily="sans-serif" opacity="0.35">
          <text x="180" y="90" textAnchor="middle">Bekasi Utara</text>
          <text x="640" y="120" textAnchor="middle">Bekasi Timur</text>
          <text x="140" y="330" textAnchor="middle">Bekasi Barat</text>
          <text x="640" y="440" textAnchor="middle">Jatiasih</text>
          <text x="400" y="470" textAnchor="middle">Bekasi Selatan</text>
        </g>
      </svg>

      {/* Animated pin (centered) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          initial={{ y: -12, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          {/* Pulse */}
          <motion.span
            aria-hidden
            animate={{ scale: [1, 2.2], opacity: [0.45, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
            className="absolute inset-0 rounded-full"
            style={{ background: pinColor }}
          />
          <div
            className="relative h-14 w-14 rounded-full ring-4 ring-white shadow-2xl flex items-center justify-center"
            style={{ background: pinColor }}
          >
            <MapPin className="h-6 w-6 text-white" fill="white" />
          </div>

          {/* Label bubble */}
          <div className="absolute left-1/2 top-full mt-3 -translate-x-1/2 whitespace-nowrap rounded-lg bg-white px-3 py-1.5 shadow-elevated border border-bekasi-emerald-900/8">
            <div className="text-[10.5px] uppercase tracking-[0.2em] text-bekasi-gold-600">You are here</div>
            <div className="text-[13px] font-medium text-bekasi-emerald-900">{title}</div>
          </div>
        </motion.div>
      </div>

      {/* Coord badge */}
      <div className="absolute bottom-3 left-3 rounded-full bg-white/95 backdrop-blur px-3 py-1.5 text-[10.5px] font-mono tracking-tight text-bekasi-emerald-900 border border-bekasi-emerald-900/10">
        {coords.lat}, {coords.lng}
      </div>
      <div className="absolute bottom-3 right-3 rounded-full bg-white/95 backdrop-blur px-3 py-1.5 text-[10.5px] uppercase tracking-[0.18em] text-bekasi-ink/55 border border-bekasi-emerald-900/10">
        Preview · open interactive map for details
      </div>
    </motion.div>
  )
}
