'use client'

import Image from 'next/image'
import { MapPin, Star, ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { districtLabel } from '@/lib/map/positions'

export default function ExploreSidePanel({ items, selectedId, onSelect }) {
  if (!items?.length) {
    return (
      <div className="rounded-2xl border border-dashed border-[color:var(--ink-forest,#0B3D3A)]/20 bg-white/60 p-6 text-center text-sm text-[color:var(--ink-forest,#0B3D3A)]/60">
        No places match your filters.
        <br />
        Try clearing a filter or broadening your search.
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-[color:var(--ink-forest,#0B3D3A)]/10 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-[color:var(--ink-forest,#0B3D3A)]/8 px-4 py-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--ink-forest,#0B3D3A)]/70">
          Results ({items.length})
        </p>
        <p className="text-[10px] uppercase tracking-[0.22em] text-[color:var(--ink-forest,#0B3D3A)]/40">Tap to focus</p>
      </div>
      <ul className="max-h-[540px] overflow-y-auto divide-y divide-[color:var(--ink-forest,#0B3D3A)]/8">
        {items.map((d) => {
          const active = d.id === selectedId
          return (
            <li key={d.id}>
              <button
                type="button"
                onClick={() => onSelect(d.id)}
                className={cn(
                  'group flex w-full items-start gap-3 px-4 py-3 text-left transition-colors',
                  active
                    ? 'bg-[color:var(--gold-accent,#B48A2D)]/8'
                    : 'hover:bg-[color:var(--bg-page,#F7F1E5)]/60',
                )}
              >
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-[color:var(--ink-forest,#0B3D3A)]/8">
                  {d.image ? (
                    <Image src={d.image} alt={d.title} fill sizes="64px" className="object-cover" />
                  ) : null}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-serif text-[15px] leading-snug line-clamp-1 text-[color:var(--ink-forest,#0B3D3A)]">
                      {d.title}
                    </p>
                    <ArrowUpRight className={cn('h-4 w-4 shrink-0 transition-opacity', active ? 'opacity-100' : 'opacity-0 group-hover:opacity-60')} />
                  </div>
                  <div className="mt-1 flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-[color:var(--ink-forest,#0B3D3A)]/55">
                    <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" />{districtLabel(d.district)}</span>
                    <span aria-hidden>·</span>
                    <span>{d.category}</span>
                  </div>
                  <p className="mt-1 text-xs text-[color:var(--ink-forest,#0B3D3A)]/60 line-clamp-2">{d.excerpt}</p>
                  {d.rating ? (
                    <div className="mt-1 inline-flex items-center gap-1 text-[11px] text-[color:var(--gold-accent,#B48A2D)]">
                      <Star className="h-3 w-3 fill-current" /> {d.rating.toFixed(1)}
                      <span className="text-[color:var(--ink-forest,#0B3D3A)]/40">({d.reviews?.toLocaleString?.() ?? d.reviews})</span>
                    </div>
                  ) : null}
                </div>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
