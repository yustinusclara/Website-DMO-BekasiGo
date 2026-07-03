'use client'

import { Search, X, SlidersHorizontal } from 'lucide-react'
import { cn } from '@/lib/utils'
import { districtLabel } from '@/lib/map/positions'

const CATEGORY_LABEL = {
  heritage: 'Heritage',
  urban: 'Urban',
  culinary: 'Culinary',
  nature: 'Nature',
  family: 'Family',
  shopping: 'Shopping',
  wellness: 'Wellness',
  nightlife: 'Nightlife',
  religious: 'Religious',
  transport: 'Transport',
}

function titleize(id) {
  return CATEGORY_LABEL[id] || id.replace(/(^|[-_])(\w)/g, (_, s, c) => (s ? ' ' : '') + c.toUpperCase())
}

export default function ExploreFilters({ filters, setFilters, categories, districts, onReset }) {
  const activeCount =
    (filters.q ? 1 : 0) +
    (filters.categories.length ? 1 : 0) +
    (filters.district !== 'all' ? 1 : 0) +
    (filters.onlyFeatured ? 1 : 0)

  const toggleCategory = (id) => {
    setFilters((f) => {
      const has = f.categories.includes(id)
      return { ...f, categories: has ? f.categories.filter((c) => c !== id) : [...f.categories, id] }
    })
  }

  return (
    <div className="rounded-2xl border border-[color:var(--ink-forest,#0B3D3A)]/10 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--ink-forest,#0B3D3A)]/70">
          <SlidersHorizontal className="h-3.5 w-3.5" />
          Filters
          {activeCount > 0 && (
            <span className="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[color:var(--gold-accent,#B48A2D)] px-1.5 text-[10px] font-bold text-white">
              {activeCount}
            </span>
          )}
        </div>
        {activeCount > 0 && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1 text-xs text-[color:var(--ink-forest,#0B3D3A)]/60 hover:text-[color:var(--ink-forest,#0B3D3A)]"
          >
            <X className="h-3 w-3" /> Reset
          </button>
        )}
      </div>

      {/* Search input */}
      <label className="mt-3 flex items-center gap-2 rounded-lg border border-[color:var(--ink-forest,#0B3D3A)]/15 bg-white px-3 py-2 focus-within:border-[color:var(--gold-accent,#B48A2D)]">
        <Search className="h-4 w-4 text-[color:var(--ink-forest,#0B3D3A)]/50" />
        <input
          type="search"
          value={filters.q}
          onChange={(e) => setFilters((f) => ({ ...f, q: e.target.value }))}
          placeholder="Search places, tags, districts…"
          className="w-full bg-transparent text-sm placeholder:text-[color:var(--ink-forest,#0B3D3A)]/40 focus:outline-none"
        />
        {filters.q && (
          <button
            type="button"
            onClick={() => setFilters((f) => ({ ...f, q: '' }))}
            className="rounded-full p-0.5 hover:bg-black/5"
            aria-label="Clear search"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </label>

      {/* Categories */}
      <div className="mt-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[color:var(--ink-forest,#0B3D3A)]/60">Category</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {categories.map((c) => {
            const active = filters.categories.includes(c.id)
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => toggleCategory(c.id)}
                className={cn(
                  'inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs transition-colors',
                  active
                    ? 'border-[color:var(--ink-forest,#0B3D3A)] bg-[color:var(--ink-forest,#0B3D3A)] text-white'
                    : 'border-[color:var(--ink-forest,#0B3D3A)]/15 text-[color:var(--ink-forest,#0B3D3A)]/80 hover:border-[color:var(--gold-accent,#B48A2D)] hover:text-[color:var(--ink-forest,#0B3D3A)]',
                )}
              >
                {titleize(c.id)}
                <span className={cn('text-[10px]', active ? 'text-white/70' : 'text-[color:var(--ink-forest,#0B3D3A)]/40')}>
                  {c.count}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* District */}
      <div className="mt-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[color:var(--ink-forest,#0B3D3A)]/60">District</p>
        <select
          value={filters.district}
          onChange={(e) => setFilters((f) => ({ ...f, district: e.target.value }))}
          className="mt-2 w-full rounded-lg border border-[color:var(--ink-forest,#0B3D3A)]/15 bg-white px-3 py-2 text-sm focus:border-[color:var(--gold-accent,#B48A2D)] focus:outline-none"
        >
          <option value="all">All districts</option>
          {districts.map((d) => (
            <option key={d.id} value={d.id}>{districtLabel(d.id)} ({d.count})</option>
          ))}
        </select>
      </div>

      {/* Featured toggle */}
      <label className="mt-4 flex cursor-pointer items-center justify-between gap-3 rounded-lg border border-[color:var(--ink-forest,#0B3D3A)]/10 bg-[color:var(--bg-page,#F7F1E5)]/50 px-3 py-2 text-sm">
        <span className="text-[color:var(--ink-forest,#0B3D3A)]/80">Featured only</span>
        <input
          type="checkbox"
          checked={filters.onlyFeatured}
          onChange={(e) => setFilters((f) => ({ ...f, onlyFeatured: e.target.checked }))}
          className="h-4 w-4 accent-[color:var(--gold-accent,#B48A2D)]"
        />
      </label>
    </div>
  )
}
