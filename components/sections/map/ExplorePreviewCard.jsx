'use client'

import Link from 'next/link'
import Image from 'next/image'
import { X, MapPin, Star, ArrowUpRight, Sparkles } from 'lucide-react'
import { districtLabel } from '@/lib/map/positions'

export default function ExplorePreviewCard({ destination, onClose }) {
  const d = destination
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 hidden md:block">
      <div className="pointer-events-auto mx-3 mb-3 overflow-hidden rounded-2xl border border-white/10 bg-white/95 shadow-2xl backdrop-blur">
        <div className="flex gap-4 p-3">
          <div className="relative h-24 w-32 shrink-0 overflow-hidden rounded-lg bg-[color:var(--ink-forest,#0B3D3A)]/8">
            {d.image ? (
              <Image src={d.image} alt={d.title} fill sizes="128px" className="object-cover" />
            ) : null}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[color:var(--gold-accent,#B48A2D)]">Preview</p>
                <h3 className="mt-0.5 font-serif text-lg leading-tight text-[color:var(--ink-forest,#0B3D3A)]">{d.title}</h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full p-1 text-[color:var(--ink-forest,#0B3D3A)]/50 hover:bg-black/5 hover:text-[color:var(--ink-forest,#0B3D3A)]"
                aria-label="Close preview"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-[color:var(--ink-forest,#0B3D3A)]/60">
              <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" />{districtLabel(d.district)}</span>
              <span aria-hidden>·</span>
              <span>{d.category}</span>
              {d.duration ? (<><span aria-hidden>·</span><span>{d.duration}</span></>) : null}
              {d.rating ? (
                <span className="ml-auto inline-flex items-center gap-1 text-[color:var(--gold-accent,#B48A2D)] normal-case tracking-normal">
                  <Star className="h-3 w-3 fill-current" /> {d.rating.toFixed(1)}
                </span>
              ) : null}
            </div>

            <p className="mt-2 text-sm leading-snug text-[color:var(--ink-forest,#0B3D3A)]/75 line-clamp-2">{d.excerpt}</p>

            <div className="mt-3 flex items-center gap-2">
              <Link
                href={`/destinations/${d.slug}`}
                className="inline-flex items-center gap-1.5 rounded-full bg-[color:var(--ink-forest,#0B3D3A)] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-white hover:opacity-90"
              >
                View details <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/planner"
                className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--ink-forest,#0B3D3A)]/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--ink-forest,#0B3D3A)] hover:border-[color:var(--gold-accent,#B48A2D)]"
              >
                <Sparkles className="h-3.5 w-3.5" /> Add to plan
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
