'use client'

// Reusable directory index used by /food, /stay, /getting-around and
// /discover/[category]. Consumes a rich data array + label config.

import { useMemo, useState } from 'react'
import SiteHeader from '@/components/layout/SiteHeader'
import SiteFooter from '@/components/layout/SiteFooter'
import { Search, ChevronRight, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export default function DirectoryIndex({
  kicker, title, subtitle,
  items,
  categoryKey = 'category',
  breadcrumbs = [],
  ctaLabel,
  emptyLabel = 'No results.',
}) {
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('all')

  const cats = useMemo(() => {
    const set = new Map()
    items.forEach((i) => { const k = i[categoryKey]; if (k) set.set(k, (set.get(k) ?? 0) + 1) })
    return Array.from(set.entries()).map(([id, count]) => ({ id, count }))
  }, [items, categoryKey])

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase()
    return items.filter((i) => {
      if (cat !== 'all' && i[categoryKey] !== cat) return false
      if (!s) return true
      return [i.name, i.name_id, i.excerpt, i.excerpt_id, i.mode].filter(Boolean).join(' ').toLowerCase().includes(s)
    })
  }, [items, q, cat, categoryKey])

  return (
    <div className="min-h-screen bg-bekasi-cream">
      <SiteHeader />
      <main>
        <section className="container pt-32 md:pt-40 pb-10">
          {breadcrumbs.length > 0 && (
            <nav className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-bekasi-ink/55">
              {breadcrumbs.map((b, i) => (
                <span key={b.label} className="inline-flex items-center gap-2">
                  {b.href ? <Link href={b.href} className="hover:text-bekasi-emerald-800">{b.label}</Link> : <span className="text-bekasi-gold-600">{b.label}</span>}
                  {i < breadcrumbs.length - 1 && <ChevronRight className="h-3 w-3 opacity-60" />}
                </span>
              ))}
            </nav>
          )}
          <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.22em] text-bekasi-gold-600">{kicker}</p>
          <h1 className="mt-3 font-serif text-4xl md:text-5xl leading-tight text-bekasi-emerald-900">{title}</h1>
          {subtitle && <p className="mt-4 max-w-2xl text-bekasi-ink/70 leading-relaxed">{subtitle}</p>}
          {ctaLabel && <p className="mt-3 text-[11px] uppercase tracking-[0.22em] text-bekasi-emerald-800">{items.length} {ctaLabel}</p>}

          {/* Filter bar */}
          <div className="mt-8 flex flex-col md:flex-row md:items-center gap-3">
            <label className="flex items-center gap-2 rounded-full border border-bekasi-emerald-900/15 bg-white px-4 py-2 focus-within:border-bekasi-gold-500 md:w-80">
              <Search className="h-4 w-4 text-bekasi-ink/40" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search…" className="w-full bg-transparent text-sm placeholder:text-bekasi-ink/40 focus:outline-none" />
            </label>
            <div className="flex flex-wrap gap-1.5">
              <button type="button" onClick={() => setCat('all')} className={cn('rounded-full border px-3 py-1 text-xs transition-colors', cat === 'all' ? 'border-bekasi-emerald-900 bg-bekasi-emerald-900 text-white' : 'border-bekasi-emerald-900/15 text-bekasi-ink/70 hover:border-bekasi-gold-500')}>All ({items.length})</button>
              {cats.map((c) => (
                <button key={c.id} type="button" onClick={() => setCat(c.id)} className={cn('rounded-full border px-3 py-1 text-xs transition-colors', cat === c.id ? 'border-bekasi-emerald-900 bg-bekasi-emerald-900 text-white' : 'border-bekasi-emerald-900/15 text-bekasi-ink/70 hover:border-bekasi-gold-500')}>
                  {c.id} <span className="opacity-60">({c.count})</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="container pb-24">
          {filtered.length === 0 && <div className="rounded-2xl border border-dashed border-bekasi-emerald-900/20 bg-white/60 p-8 text-center text-bekasi-ink/60">{emptyLabel}</div>}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((i) => (
              <article key={i.id} className="group flex flex-col rounded-2xl border border-bekasi-emerald-900/10 bg-white p-5 shadow-soft hover:shadow-elevated hover:border-bekasi-gold-500/40 transition-all">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center rounded-full bg-bekasi-emerald-900/8 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-bekasi-emerald-800">{i[categoryKey] || i.mode || 'Info'}</span>
                  {i.no && <span className="font-mono text-[10px] text-bekasi-ink/40">N° {i.no}</span>}
                </div>
                <h3 className="mt-3 font-serif text-xl leading-tight text-bekasi-emerald-900">{i.name}</h3>
                {i.name_id && i.name_id !== i.name && <p className="mt-0.5 text-[11.5px] text-bekasi-ink/50">{i.name_id}</p>}
                <p className="mt-3 text-[13.5px] text-bekasi-ink/70 leading-relaxed line-clamp-4">{i.excerpt || i.excerpt_id}</p>
                {i.access && <p className="mt-3 text-[11.5px] text-bekasi-ink/55"><span className="font-semibold text-bekasi-emerald-800">Access:</span> {i.access}</p>}
                {i.activities && <p className="mt-1 text-[11.5px] text-bekasi-ink/55"><span className="font-semibold text-bekasi-emerald-800">Do:</span> {i.activities}</p>}
                <div className="mt-auto pt-4">
                  <Link href="/map" className="inline-flex items-center gap-1 text-[12px] font-medium text-bekasi-emerald-900 hover:text-bekasi-gold-600">See on map <ArrowUpRight className="h-3 w-3" /></Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
