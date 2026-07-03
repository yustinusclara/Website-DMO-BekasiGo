'use client'

import Link from 'next/link'
import Section from '@/components/layout/Section'
import { MAP_PREVIEW } from '@/lib/content/homepage'
import { Button } from '@/components/ui/button'
import { MapPin, Map as MapIcon, Filter } from 'lucide-react'

export default function MapPreview() {
  return (
    <Section id="map" variant="cream"
      eyebrow={MAP_PREVIEW.eyebrow}
      title={MAP_PREVIEW.title}
      kicker={MAP_PREVIEW.kicker}
    >
      <div className="relative rounded-3xl overflow-hidden border border-black/5 bg-bekasi-emerald-900 aspect-[16/10] md:aspect-[16/8]">
        {/* Stylized map background */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-90"
          style={{
            background:
              'radial-gradient(circle at 30% 40%, rgba(212,169,76,0.15), transparent 40%),' +
              'radial-gradient(circle at 70% 65%, rgba(140,199,214,0.12), transparent 45%),' +
              'linear-gradient(135deg, #062E2B 0%, #0B3D3A 55%, #124F4A 100%)',
          }}
        />
        {/* Grid lines */}
        <svg aria-hidden className="absolute inset-0 h-full w-full opacity-25" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Simulated roads */}
        <svg aria-hidden className="absolute inset-0 h-full w-full" viewBox="0 0 100 60" preserveAspectRatio="none">
          <path d="M 5 30 Q 30 10, 50 25 T 95 20" stroke="rgba(255,255,255,0.18)" strokeWidth="0.4" fill="none" />
          <path d="M 10 55 Q 40 45, 60 50 T 95 40" stroke="rgba(255,255,255,0.14)" strokeWidth="0.4" fill="none" />
          <path d="M 50 5 Q 45 25, 55 40 T 60 58" stroke="rgba(212,169,76,0.35)" strokeWidth="0.5" fill="none" strokeDasharray="1 1" />
        </svg>

        {/* Pins */}
        {MAP_PREVIEW.pins.map((p, i) => (
          <div
            key={p.name}
            className="absolute"
            style={{ left: `${p.x}%`, top: `${p.y}%`, transform: 'translate(-50%, -100%)' }}
          >
            <div className="group relative">
              <div className="absolute -inset-3 rounded-full bg-bekasi-gold-500/20 animate-ping" />
              <div className="relative h-8 w-8 rounded-full bg-bekasi-gold-500 text-bekasi-emerald-900 flex items-center justify-center shadow-lg">
                <MapPin className="h-4 w-4" />
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap rounded-full bg-white/95 backdrop-blur px-3 py-1 text-xs font-medium text-bekasi-emerald-900 shadow opacity-0 group-hover:opacity-100 transition-opacity">
                {p.name} · <span className="text-bekasi-ink/60">{p.cat}</span>
              </div>
            </div>
          </div>
        ))}

        {/* Overlay UI */}
        <div className="absolute inset-0 flex flex-col justify-between p-5 md:p-8 pointer-events-none">
          <div className="flex flex-wrap items-center gap-2">
            {['All', 'Heritage', 'Urban', 'Nature', 'Food', 'Events'].map((c, i) => (
              <span
                key={c}
                className={`text-xs px-3 py-1.5 rounded-full backdrop-blur border pointer-events-auto ${
                  i === 0
                    ? 'bg-bekasi-gold-500 border-bekasi-gold-500 text-bekasi-emerald-900 font-medium'
                    : 'bg-white/10 border-white/20 text-white/85 hover:bg-white/20'
                }`}
              >
                {c}
              </span>
            ))}
            <span className="ml-auto inline-flex items-center gap-1.5 text-xs text-white/70 pointer-events-auto">
              <Filter className="h-3.5 w-3.5" /> Filters
            </span>
          </div>
          <div className="flex items-end justify-between">
            <div className="max-w-md">
              <div className="text-[10px] uppercase tracking-[0.3em] text-bekasi-gold-400">Preview</div>
              <div className="mt-1 font-display text-2xl md:text-3xl text-white">120+ points across Kota Bekasi</div>
            </div>
            <Link href={MAP_PREVIEW.cta.href} className="pointer-events-auto">
              <Button className="h-11 rounded-full bg-white text-bekasi-emerald-900 hover:bg-bekasi-gold-400 px-5">
                <MapIcon className="h-4 w-4 mr-2" /> {MAP_PREVIEW.cta.label}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Section>
  )
}
