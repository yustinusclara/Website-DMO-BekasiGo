'use client'

import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search, X, ChevronDown, LayoutGrid, List as ListIcon,
  MapPin, Sparkles, ArrowRight, RotateCcw,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  DESTINATIONS, DEST_CATEGORIES, DEST_DISTRICTS, DEST_SORTS,
} from '@/lib/content/destinations'
import DestinationCard from '@/components/shared/DestinationCard'

const PAGE_SIZE = 12

export default function DestinationsExplorer() {
  const [query, setQuery]         = useState('')
  const [category, setCategory]   = useState('all')
  const [district, setDistrict]   = useState('all')
  const [sort, setSort]           = useState('featured')
  const [view, setView]           = useState('grid') // 'grid' | 'list'
  const [visible, setVisible]     = useState(PAGE_SIZE)
  const [districtOpen, setDistrictOpen] = useState(false)
  const [sortOpen, setSortOpen]         = useState(false)

  const results = useMemo(() => {
    let items = [...DESTINATIONS]

    // Category
    if (category !== 'all') items = items.filter((d) => d.category === category)

    // District
    if (district !== 'all') items = items.filter((d) => d.district === district)

    // Query
    const q = query.trim().toLowerCase()
    if (q) {
      items = items.filter((d) =>
        d.title.toLowerCase().includes(q) ||
        d.excerpt.toLowerCase().includes(q) ||
        d.tags?.some((t) => t.toLowerCase().includes(q))
      )
    }

    // Sort
    switch (sort) {
      case 'popular':
        items.sort((a, b) => Number(b.popular) - Number(a.popular) || (b.reviews ?? 0) - (a.reviews ?? 0))
        break
      case 'rating':
        items.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
        break
      case 'az':
        items.sort((a, b) => a.title.localeCompare(b.title))
        break
      case 'featured':
      default:
        items.sort((a, b) => Number(b.featured) - Number(a.featured) || (b.rating ?? 0) - (a.rating ?? 0))
    }
    return items
  }, [query, category, district, sort])

  const visibleResults = results.slice(0, visible)
  const canLoadMore = visible < results.length
  const activeCat  = DEST_CATEGORIES.find((c) => c.id === category) ?? DEST_CATEGORIES[0]
  const activeDist = DEST_DISTRICTS.find((d) => d.id === district) ?? DEST_DISTRICTS[0]
  const activeSort = DEST_SORTS.find((s) => s.id === sort) ?? DEST_SORTS[0]

  const reset = () => {
    setQuery(''); setCategory('all'); setDistrict('all'); setSort('featured'); setVisible(PAGE_SIZE)
  }

  const hasFilters = query || category !== 'all' || district !== 'all' || sort !== 'featured'

  return (
    <section className="relative bg-bekasi-cream text-bekasi-ink">
      {/* Sticky filter bar */}
      <div className="sticky top-16 md:top-[calc(4.5rem+2.25rem)] z-30 border-b border-bekasi-emerald-900/10 bg-bekasi-cream/95 backdrop-blur-xl">
        <div className="container py-4 md:py-5">
          {/* Row 1: search + district + sort + view */}
          <div className="flex flex-col lg:flex-row gap-3 lg:items-center">
            {/* Search */}
            <div className="relative flex-1 min-w-0">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-bekasi-ink/40" />
              <input
                type="text"
                value={query}
                onChange={(e) => { setQuery(e.target.value); setVisible(PAGE_SIZE) }}
                placeholder="Search destinations, tags, or districts…"
                className="h-11 w-full rounded-full border border-bekasi-emerald-900/15 bg-white pl-11 pr-10 text-sm text-bekasi-ink placeholder:text-bekasi-ink/40 focus:outline-none focus:ring-2 focus:ring-bekasi-emerald-500/30 focus:border-bekasi-emerald-500 transition-all"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full flex items-center justify-center hover:bg-bekasi-emerald-900/5"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-2 lg:flex-nowrap">
              {/* District dropdown */}
              <Dropdown
                open={districtOpen}
                onOpen={setDistrictOpen}
                label={activeDist.label}
                icon={MapPin}
                items={DEST_DISTRICTS}
                value={district}
                onChange={(v) => { setDistrict(v); setVisible(PAGE_SIZE) }}
                align="left"
              />

              {/* Sort dropdown */}
              <Dropdown
                open={sortOpen}
                onOpen={setSortOpen}
                label={activeSort.label}
                icon={Sparkles}
                items={DEST_SORTS}
                value={sort}
                onChange={(v) => setSort(v)}
                align="right"
              />

              {/* View toggle */}
              <div className="inline-flex rounded-full border border-bekasi-emerald-900/15 bg-white p-1">
                <button
                  onClick={() => setView('grid')}
                  aria-pressed={view === 'grid'}
                  aria-label="Grid view"
                  className={cn(
                    'h-9 w-9 rounded-full inline-flex items-center justify-center transition-colors',
                    view === 'grid' ? 'bg-bekasi-emerald-900 text-white' : 'text-bekasi-ink/60 hover:text-bekasi-emerald-900',
                  )}
                >
                  <LayoutGrid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setView('list')}
                  aria-pressed={view === 'list'}
                  aria-label="List view"
                  className={cn(
                    'h-9 w-9 rounded-full inline-flex items-center justify-center transition-colors',
                    view === 'list' ? 'bg-bekasi-emerald-900 text-white' : 'text-bekasi-ink/60 hover:text-bekasi-emerald-900',
                  )}
                >
                  <ListIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Row 2: category chips (horizontally scrollable) */}
          <div className="mt-3 flex items-center gap-2 overflow-x-auto no-scrollbar -mx-1 px-1 pb-0.5">
            {DEST_CATEGORIES.map((c) => {
              const active = c.id === category
              return (
                <button
                  key={c.id}
                  onClick={() => { setCategory(c.id); setVisible(PAGE_SIZE) }}
                  className={cn(
                    'shrink-0 inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-medium transition-all border',
                    active
                      ? 'bg-bekasi-emerald-900 text-white border-bekasi-emerald-900 shadow-sm'
                      : 'bg-white text-bekasi-ink/75 border-bekasi-emerald-900/12 hover:border-bekasi-emerald-900/30 hover:text-bekasi-emerald-900',
                  )}
                >
                  <span>{c.label}</span>
                  <span className={cn(
                    'text-[11px] leading-none rounded-full px-1.5 py-0.5',
                    active ? 'bg-white/15 text-white/80' : 'bg-bekasi-emerald-900/5 text-bekasi-ink/60',
                  )}>
                    {c.id === 'all' ? DESTINATIONS.length : DESTINATIONS.filter((d) => d.category === c.id).length}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Results section */}
      <div className="container py-10 md:py-14">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 md:mb-8">
          <p className="text-sm text-bekasi-ink/65">
            Showing <span className="font-medium text-bekasi-ink">{visibleResults.length}</span>{' '}
            of <span className="font-medium text-bekasi-ink">{results.length}</span> destinations
            {activeCat.id !== 'all' && (
              <span> · filtered by <span className="font-medium text-bekasi-emerald-900">{activeCat.label}</span></span>
            )}
          </p>
          {hasFilters && (
            <button
              onClick={reset}
              className="inline-flex items-center gap-1.5 text-sm text-bekasi-ink/70 hover:text-bekasi-emerald-900 transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset filters
            </button>
          )}
        </div>

        {results.length === 0 ? (
          <EmptyState onReset={reset} />
        ) : (
          <>
            <div
              className={cn(
                view === 'grid'
                  ? 'grid gap-5 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                  : 'flex flex-col gap-4',
              )}
            >
              <AnimatePresence mode="popLayout">
                {visibleResults.map((d, i) => (
                  <motion.div
                    key={d.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.45, delay: (i % PAGE_SIZE) * 0.03 }}
                  >
                    <DestinationCard item={d} view={view} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {canLoadMore && (
              <div className="mt-10 md:mt-14 flex justify-center">
                <Button
                  onClick={() => setVisible((v) => v + PAGE_SIZE)}
                  className="h-12 rounded-full bg-bekasi-emerald-900 hover:bg-bekasi-emerald-800 text-white px-8 gap-2"
                >
                  Load {Math.min(PAGE_SIZE, results.length - visible)} more
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Dropdown                                                            */
/* ------------------------------------------------------------------ */

function Dropdown({ open, onOpen, label, icon: Icon, items, value, onChange, align = 'left' }) {
  return (
    <div className="relative">
      <button
        onClick={() => onOpen(!open)}
        className="inline-flex items-center gap-2 h-11 rounded-full border border-bekasi-emerald-900/15 bg-white pl-4 pr-3 text-sm font-medium text-bekasi-ink hover:border-bekasi-emerald-900/30 transition-colors"
      >
        {Icon && <Icon className="h-3.5 w-3.5 text-bekasi-ink/60" />}
        <span className="max-w-[160px] truncate">{label}</span>
        <ChevronDown className={cn('h-3.5 w-3.5 text-bekasi-ink/50 transition-transform', open && 'rotate-180')} />
      </button>

      <AnimatePresence>
        {open && (
          <>
            {/* backdrop */}
            <div className="fixed inset-0 z-40" onClick={() => onOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15 }}
              className={cn(
                'absolute top-full mt-2 z-50 min-w-[240px] rounded-2xl border border-bekasi-emerald-900/10 bg-white shadow-elevated overflow-hidden',
                align === 'right' ? 'right-0' : 'left-0',
              )}
            >
              <div className="max-h-80 overflow-y-auto py-2">
                {items.map((it) => {
                  const active = it.id === value
                  return (
                    <button
                      key={it.id}
                      onClick={() => { onChange(it.id); onOpen(false) }}
                      className={cn(
                        'w-full flex items-center justify-between px-4 py-2.5 text-sm text-left hover:bg-bekasi-emerald-900/[0.03] transition-colors',
                        active && 'text-bekasi-emerald-900 font-medium',
                      )}
                    >
                      <span>{it.label}</span>
                      {active && <span className="h-1.5 w-1.5 rounded-full bg-bekasi-gold-500" />}
                    </button>
                  )
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Empty state                                                         */
/* ------------------------------------------------------------------ */

function EmptyState({ onReset }) {
  return (
    <div className="relative rounded-3xl border border-dashed border-bekasi-emerald-900/15 bg-white/50 py-20 md:py-24 text-center">
      <div className="mx-auto h-14 w-14 rounded-full bg-bekasi-emerald-900/[0.04] flex items-center justify-center">
        <Search className="h-6 w-6 text-bekasi-emerald-900/40" />
      </div>
      <h3 className="mt-5 font-display text-2xl text-bekasi-emerald-900">No destinations match your filters.</h3>
      <p className="mt-2 text-bekasi-ink/60 max-w-md mx-auto">
        Try loosening a filter, checking a different district, or searching for a tag like “heritage” or “warung”.
      </p>
      <Button
        onClick={onReset}
        className="mt-6 h-11 rounded-full bg-bekasi-emerald-900 hover:bg-bekasi-emerald-800 text-white px-6"
      >
        <RotateCcw className="h-4 w-4 mr-2" />
        Reset filters
      </Button>
    </div>
  )
}
