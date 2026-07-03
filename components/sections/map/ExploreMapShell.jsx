'use client'

import { useMemo, useState } from 'react'
import SiteHeader from '@/components/layout/SiteHeader'
import SiteFooter from '@/components/layout/SiteFooter'
import { DESTINATIONS } from '@/lib/content/destinations'
import ExploreFilters from './ExploreFilters'
import ExploreSidePanel from './ExploreSidePanel'
import ExploreMapCanvas from './ExploreMapCanvas'
import ExplorePreviewCard from './ExplorePreviewCard'
import { latLngFor } from '@/lib/map/positions'
import { Map as MapIcon, List, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const DEFAULT_FILTERS = {
  q: '',
  categories: [],
  district: 'all',
  onlyFeatured: false,
}

export default function ExploreMapShell() {
  const [filters, setFilters] = useState(DEFAULT_FILTERS)
  const [selectedId, setSelectedId] = useState(null)
  const [mobileTab, setMobileTab] = useState('map') // 'map' | 'list'

  // Attach normalized positions once — stable per session.
  const placed = useMemo(
    () => DESTINATIONS.map((d, i) => ({ ...d, pos: latLngFor(d, i) })),
    [],
  )

  // Category + district taxonomy derived from the dataset.
  const categories = useMemo(() => {
    const set = new Map()
    placed.forEach((d) => set.set(d.category, (set.get(d.category) ?? 0) + 1))
    return Array.from(set.entries()).map(([id, count]) => ({ id, count }))
  }, [placed])

  const districts = useMemo(() => {
    const set = new Map()
    placed.forEach((d) => set.set(d.district, (set.get(d.district) ?? 0) + 1))
    return Array.from(set.entries()).map(([id, count]) => ({ id, count }))
  }, [placed])

  const filtered = useMemo(() => {
    const q = filters.q.trim().toLowerCase()
    return placed.filter((d) => {
      if (filters.onlyFeatured && !d.featured) return false
      if (filters.district !== 'all' && d.district !== filters.district) return false
      if (filters.categories.length && !filters.categories.includes(d.category)) return false
      if (!q) return true
      const hay = [d.title, d.excerpt, d.category, d.district, ...(d.tags ?? [])].join(' ').toLowerCase()
      return hay.includes(q)
    })
  }, [placed, filters])

  const selected = filtered.find((d) => d.id === selectedId) ?? placed.find((d) => d.id === selectedId) ?? null

  const totalCount = placed.length
  const shownCount = filtered.length

  const resetFilters = () => setFilters(DEFAULT_FILTERS)

  return (
    <div className="min-h-screen bg-[color:var(--bg-page,#F7F1E5)] text-[color:var(--ink-forest,#0B3D3A)]">
      <SiteHeader />

      {/* Page header strip */}
      <section className="border-b border-[color:var(--ink-forest,#0B3D3A)]/10 bg-[color:var(--bg-page,#F7F1E5)]">
        <div className="mx-auto max-w-[1400px] px-6 pt-24 pb-6 md:pt-28">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--gold-accent,#B48A2D)]">
                Explore Map
              </p>
              <h1 className="font-serif text-3xl md:text-5xl leading-tight mt-2">
                Every place, one canvas.
              </h1>
              <p className="mt-2 max-w-2xl text-sm md:text-base text-[color:var(--ink-forest,#0B3D3A)]/70">
                Filter Kota Bekasi&rsquo;s directory by district, category, or vibe. Tap any pin for a preview and jump straight to full details.
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs uppercase tracking-[0.22em] text-[color:var(--ink-forest,#0B3D3A)]/60">
              <span>{shownCount} / {totalCount} places</span>
              <span className="hidden md:inline text-[color:var(--gold-accent,#B48A2D)]">Interactive</span>
            </div>
          </div>

          {/* Mobile tab switcher */}
          <div className="mt-5 flex md:hidden overflow-hidden rounded-full border border-[color:var(--ink-forest,#0B3D3A)]/15 bg-white/70 p-1 text-sm">
            {[
              { id: 'map', Icon: MapIcon, label: 'Map' },
              { id: 'list', Icon: List, label: 'List' },
            ].map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setMobileTab(t.id)}
                className={cn(
                  'flex flex-1 items-center justify-center gap-2 rounded-full px-3 py-2 transition-colors',
                  mobileTab === t.id
                    ? 'bg-[color:var(--ink-forest,#0B3D3A)] text-white shadow-sm'
                    : 'text-[color:var(--ink-forest,#0B3D3A)]/70',
                )}
              >
                <t.Icon className="h-4 w-4" />
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main workspace */}
      <section className="mx-auto max-w-[1400px] px-6 pb-16">
        <div className="grid grid-cols-12 gap-6">
          {/* Filters + List column */}
          <div
            className={cn(
              'col-span-12 md:col-span-4 lg:col-span-4 flex flex-col gap-4',
              mobileTab === 'map' && 'hidden md:flex',
            )}
          >
            <ExploreFilters
              filters={filters}
              setFilters={setFilters}
              categories={categories}
              districts={districts}
              onReset={resetFilters}
            />
            <ExploreSidePanel
              items={filtered}
              selectedId={selectedId}
              onSelect={setSelectedId}
              onClear={() => setSelectedId(null)}
            />
          </div>

          {/* Map column */}
          <div
            className={cn(
              'col-span-12 md:col-span-8 lg:col-span-8',
              mobileTab === 'list' && 'hidden md:block',
            )}
          >
            <div className="relative">
              <ExploreMapCanvas
                items={filtered}
                selectedId={selectedId}
                onSelect={setSelectedId}
              />

              {/* Floating preview card */}
              {selected ? (
                <ExplorePreviewCard
                  destination={selected}
                  onClose={() => setSelectedId(null)}
                />
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />

      {/* Mobile bottom-sheet preview (only when a pin is tapped and list tab active) */}
      {selected && mobileTab === 'list' ? (
        <div className="fixed inset-x-0 bottom-0 z-40 md:hidden">
          <div className="mx-3 mb-3 rounded-2xl border border-[color:var(--ink-forest,#0B3D3A)]/12 bg-white shadow-xl">
            <div className="flex items-start justify-between gap-3 p-3">
              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[color:var(--gold-accent,#B48A2D)]">Preview</p>
                <p className="mt-1 font-serif text-base leading-snug truncate">{selected.title}</p>
              </div>
              <button type="button" onClick={() => setSelectedId(null)} className="rounded-full p-1 hover:bg-black/5" aria-label="Close preview">
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
