'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search, X, ChevronDown, Sparkles, ArrowRight, RotateCcw, Clock, RefreshCw,
  Newspaper, ArrowUpRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  BLOG_POSTS, BLOG_CATEGORIES, BLOG_SORTS, formatPostDate,
} from '@/lib/content/blog'

const PAGE_SIZE = 9

export default function BlogExplorer() {
  const [query, setQuery]       = useState('')
  const [category, setCategory] = useState('all')
  const [sort, setSort]         = useState('newest')
  const [visible, setVisible]   = useState(PAGE_SIZE)
  const [sortOpen, setSortOpen] = useState(false)

  const results = useMemo(() => {
    let items = [...BLOG_POSTS]
    if (category !== 'all') items = items.filter((p) => p.category === category)
    const q = query.trim().toLowerCase()
    if (q) {
      items = items.filter((p) =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.tags?.some((t) => t.toLowerCase().includes(q)),
      )
    }
    switch (sort) {
      case 'featured': items.sort((a, b) => Number(b.featured) - Number(a.featured) || new Date(b.publishedAt) - new Date(a.publishedAt)); break
      case 'name':     items.sort((a, b) => a.title.localeCompare(b.title)); break
      case 'newest':
      default:         items.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
    }
    return items
  }, [query, category, sort])

  const visibleResults = results.slice(0, visible)
  const canLoadMore    = visible < results.length
  const activeCat  = BLOG_CATEGORIES.find((c) => c.id === category) ?? BLOG_CATEGORIES[0]
  const activeSort = BLOG_SORTS.find((s) => s.id === sort) ?? BLOG_SORTS[0]
  const hasFilters = query || category !== 'all' || sort !== 'newest'

  const reset = () => {
    setQuery(''); setCategory('all'); setSort('newest'); setVisible(PAGE_SIZE)
  }

  return (
    <section id="blog-grid" className="relative bg-white text-bekasi-ink">
      {/* Sticky filter bar */}
      <div className="sticky top-16 md:top-[calc(4.5rem+2.25rem)] z-30 border-y border-bekasi-emerald-900/10 bg-white/95 backdrop-blur-xl">
        <div className="container py-4 md:py-5">
          <div className="flex flex-col lg:flex-row gap-3 lg:items-center">
            <div className="relative flex-1 min-w-0">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-bekasi-ink/40" />
              <input
                type="text"
                value={query}
                onChange={(e) => { setQuery(e.target.value); setVisible(PAGE_SIZE) }}
                placeholder="Search posts, tags, or topics…"
                className="h-11 w-full rounded-md border border-bekasi-emerald-900/15 bg-white pl-11 pr-10 text-sm text-bekasi-ink placeholder:text-bekasi-ink/40 focus:outline-none focus:ring-2 focus:ring-bekasi-emerald-500/30 focus:border-bekasi-emerald-500 transition-all"
              />
              {query && (
                <button onClick={() => setQuery('')} aria-label="Clear search" className="absolute right-3 top-1/2 -translate-y-1/2 h-6 w-6 rounded-md flex items-center justify-center hover:bg-bekasi-emerald-900/5">
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => setSortOpen(!sortOpen)}
                className="inline-flex items-center gap-2 h-11 rounded-md border border-bekasi-emerald-900/15 bg-white pl-4 pr-3 text-sm font-medium text-bekasi-ink hover:border-bekasi-emerald-900/30 transition-colors"
              >
                <Sparkles className="h-3.5 w-3.5 text-bekasi-ink/60" />
                <span className="max-w-[160px] truncate">{activeSort.label}</span>
                <ChevronDown className={cn('h-3.5 w-3.5 text-bekasi-ink/50 transition-transform', sortOpen && 'rotate-180')} />
              </button>
              <AnimatePresence>
                {sortOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setSortOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 z-50 min-w-[220px] rounded-md border border-bekasi-emerald-900/10 bg-white shadow-elevated overflow-hidden"
                    >
                      <div className="py-2">
                        {BLOG_SORTS.map((it) => (
                          <button
                            key={it.id}
                            onClick={() => { setSort(it.id); setSortOpen(false) }}
                            className={cn('w-full flex items-center justify-between px-4 py-2.5 text-sm text-left hover:bg-bekasi-emerald-900/[0.03] transition-colors',
                              it.id === sort && 'text-bekasi-emerald-900 font-medium')}
                          >
                            <span>{it.label}</span>
                            {it.id === sort && <span className="h-1.5 w-1.5 rounded-full bg-bekasi-gold-500" />}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Category chips */}
          <div className="mt-3 flex items-center gap-2 overflow-x-auto no-scrollbar -mx-1 px-1 pb-0.5">
            {BLOG_CATEGORIES.map((c) => {
              const active = c.id === category
              const count  = c.id === 'all' ? BLOG_POSTS.length : BLOG_POSTS.filter((p) => p.category === c.id).length
              return (
                <button
                  key={c.id}
                  onClick={() => { setCategory(c.id); setVisible(PAGE_SIZE) }}
                  className={cn(
                    'shrink-0 inline-flex items-center gap-2 rounded-md px-4 py-2 text-[13px] font-medium transition-all border',
                    active
                      ? 'bg-bekasi-emerald-900 text-white border-bekasi-emerald-900 shadow-sm'
                      : 'bg-white text-bekasi-ink/75 border-bekasi-emerald-900/12 hover:border-bekasi-emerald-900/30 hover:text-bekasi-emerald-900',
                  )}
                >
                  {c.id !== 'all' && (
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: c.color }} />
                  )}
                  <span>{c.label}</span>
                  <span className={cn(
                    'text-[11px] leading-none rounded-full px-1.5 py-0.5',
                    active ? 'bg-white/15 text-white/80' : 'bg-bekasi-emerald-900/5 text-bekasi-ink/60',
                  )}>{count}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <div className="container py-10 md:py-14">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 md:mb-8">
          <div>
            <div className="text-[11px] uppercase tracking-[0.22em] text-bekasi-gold-600">All posts</div>
            <p className="mt-1 text-sm text-bekasi-ink/65">
              Showing <span className="font-medium text-bekasi-ink">{visibleResults.length}</span> of{' '}
              <span className="font-medium text-bekasi-ink">{results.length}</span> posts
              {activeCat.id !== 'all' && (
                <> · <span className="font-medium text-bekasi-emerald-900">{activeCat.label}</span></>
              )}
            </p>
          </div>
          {hasFilters && (
            <button onClick={reset} className="inline-flex items-center gap-1.5 text-sm text-bekasi-ink/70 hover:text-bekasi-emerald-900 transition-colors">
              <RotateCcw className="h-3.5 w-3.5" /> Reset filters
            </button>
          )}
        </div>

        {results.length === 0 ? (
          <EmptyState onReset={reset} />
        ) : (
          <>
            <div className="grid gap-5 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {visibleResults.map((p, i) => (
                  <motion.div
                    key={p.id} layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.45, delay: (i % PAGE_SIZE) * 0.03 }}
                  >
                    <PostCard post={p} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {canLoadMore && (
              <div className="mt-10 md:mt-14 flex justify-center">
                <Button
                  onClick={() => setVisible((v) => v + PAGE_SIZE)}
                  className="h-12 rounded-md bg-bekasi-emerald-900 hover:bg-bekasi-emerald-800 text-white px-8 gap-2"
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

function PostCard({ post }) {
  const cat = BLOG_CATEGORIES.find((c) => c.id === post.category) ?? { label: post.category, color: '#155F58' }
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-bekasi-emerald-900/10 bg-white hover:border-bekasi-emerald-900/25 hover:shadow-elevated transition-all"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image src={post.cover} alt={post.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/40 to-transparent" />

        <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-md bg-white/95 backdrop-blur px-2.5 py-1">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: cat.color }} />
          <span className="text-[10.5px] uppercase tracking-[0.2em] text-bekasi-emerald-900 font-medium">{cat.label}</span>
        </div>
        {post.featured && (
          <span className="absolute top-3 right-3 rounded-md bg-bekasi-gold-500 text-bekasi-emerald-900 px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] font-semibold">
            Featured
          </span>
        )}
      </div>

      <div className="flex-1 flex flex-col p-5">
        <h3 className="font-sans font-semibold text-lg md:text-xl leading-snug text-bekasi-emerald-900 group-hover:text-bekasi-emerald-800 transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="mt-2 text-[13.5px] text-bekasi-ink/65 leading-relaxed line-clamp-2">{post.excerpt}</p>

        <div className="mt-auto pt-4 flex items-center justify-between border-t border-bekasi-emerald-900/[0.06] pt-3">
          <div className="flex items-center gap-2 text-[11px] text-bekasi-ink/55">
            <span>{formatPostDate(post.publishedAt, { short: true })}</span>
            <span className="text-bekasi-ink/30">·</span>
            <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {post.readTime}</span>
            {post.updatedAt && post.updatedAt !== post.publishedAt && (
              <>
                <span className="text-bekasi-ink/30">·</span>
                <span className="inline-flex items-center gap-1 text-bekasi-gold-600"><RefreshCw className="h-3 w-3" />Upd.</span>
              </>
            )}
          </div>
          <span className="inline-flex items-center justify-center h-8 w-8 rounded-md bg-bekasi-emerald-900/[0.04] text-bekasi-emerald-900 group-hover:bg-bekasi-emerald-900 group-hover:text-white transition-colors" aria-hidden>
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  )
}

function EmptyState({ onReset }) {
  return (
    <div className="relative rounded-xl border border-dashed border-bekasi-emerald-900/15 bg-white py-20 md:py-24 text-center">
      <div className="mx-auto h-14 w-14 rounded-md bg-bekasi-emerald-900/[0.04] flex items-center justify-center">
        <Newspaper className="h-6 w-6 text-bekasi-emerald-900/40" />
      </div>
      <h3 className="mt-5 font-sans font-semibold text-2xl text-bekasi-emerald-900">No posts match your filters.</h3>
      <p className="mt-2 text-bekasi-ink/60 max-w-md mx-auto">Try a different section, or clear the search box.</p>
      <Button onClick={onReset} className="mt-6 h-11 rounded-md bg-bekasi-emerald-900 hover:bg-bekasi-emerald-800 text-white px-6">
        <RotateCcw className="h-4 w-4 mr-2" /> Reset filters
      </Button>
    </div>
  )
}
