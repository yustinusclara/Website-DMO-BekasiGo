'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plus, Search, Edit3, Trash2, Eye, Copy, MoreHorizontal,
  MapPin, Star, Calendar as CalIcon, AlertTriangle, ExternalLink,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { EVENTS, EVENT_CATEGORIES, eventStatus, formatEventDate } from '@/lib/content/events'
import { StatusPill } from '@/components/admin/forms/inputs'

function seededStatus(id) {
  let h = 0; for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0
  return h % 100 < 22 ? 'draft' : 'published'
}

export default function EventsList() {
  const router = useRouter()
  const [items, setItems] = useState(() =>
    EVENTS.map((e) => ({ ...e, status: seededStatus(e.id) }))
  )
  const [query, setQuery]       = useState('')
  const [category, setCategory] = useState('all')
  const [status, setStatus]     = useState('all')
  const [when, setWhen]         = useState('all') // upcoming | ongoing | past | all
  const [confirmDel, setConfirmDel] = useState(null)

  const results = useMemo(() => {
    let out = [...items]
    if (category !== 'all') out = out.filter((e) => e.category === category)
    if (status !== 'all')   out = out.filter((e) => e.status === status)
    if (when !== 'all')     out = out.filter((e) => eventStatus(e) === when)
    const q = query.trim().toLowerCase()
    if (q) out = out.filter((e) =>
      e.title.toLowerCase().includes(q)
      || e.venue?.name?.toLowerCase().includes(q)
      || e.tags?.some((t) => t.toLowerCase().includes(q))
    )
    // Soonest first
    out.sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
    return out
  }, [items, query, category, status, when])

  const counts = {
    all: items.length,
    published: items.filter((e) => e.status === 'published').length,
    draft:     items.filter((e) => e.status === 'draft').length,
  }

  const togglePublish = (id) => setItems((prev) => prev.map((e) => e.id === id ? { ...e, status: e.status === 'published' ? 'draft' : 'published' } : e))
  const deleteItem    = (id) => { setItems((prev) => prev.filter((e) => e.id !== id)); setConfirmDel(null) }

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="rounded-xl border border-bekasi-emerald-900/8 bg-white p-4 flex flex-col lg:flex-row gap-3 lg:items-center">
        <div className="relative flex-1 min-w-0">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-bekasi-ink/40" />
          <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search events, venues, tags…"
            className="h-10 pl-10 rounded-md border-bekasi-emerald-900/15 focus-visible:ring-bekasi-emerald-500/30 focus-visible:border-bekasi-emerald-500" />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'all',       label: 'All',       count: counts.all },
            { id: 'published', label: 'Published', count: counts.published },
            { id: 'draft',     label: 'Drafts',    count: counts.draft },
          ].map((s) => (
            <button key={s.id} onClick={() => setStatus(s.id)}
              className={cn('h-9 rounded-md border px-3 text-[12.5px] font-medium inline-flex items-center gap-2 transition-colors',
                status === s.id
                  ? 'bg-bekasi-emerald-900 text-white border-bekasi-emerald-900'
                  : 'bg-white border-bekasi-emerald-900/15 text-bekasi-ink/75 hover:border-bekasi-emerald-900/30')}>
              {s.label}
              <span className={cn('text-[11px] rounded-full px-1.5 py-0.5', status === s.id ? 'bg-white/15' : 'bg-bekasi-emerald-900/5 text-bekasi-ink/60')}>{s.count}</span>
            </button>
          ))}

          <select value={when} onChange={(e) => setWhen(e.target.value)}
            className="h-9 rounded-md border border-bekasi-emerald-900/15 bg-white px-3 text-[13px] focus:outline-none focus:ring-2 focus:ring-bekasi-emerald-500/30 focus:border-bekasi-emerald-500">
            <option value="all">Any time</option>
            <option value="upcoming">Upcoming</option>
            <option value="ongoing">Ongoing</option>
            <option value="past">Past</option>
          </select>

          <select value={category} onChange={(e) => setCategory(e.target.value)}
            className="h-9 rounded-md border border-bekasi-emerald-900/15 bg-white px-3 text-[13px] focus:outline-none focus:ring-2 focus:ring-bekasi-emerald-500/30 focus:border-bekasi-emerald-500">
            {EVENT_CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>{c.label} ({c.id === 'all' ? items.length : items.filter((e) => e.category === c.id).length})</option>
            ))}
          </select>

          <Link href="/admin/events/new">
            <Button className="h-9 rounded-md bg-bekasi-emerald-900 hover:bg-bekasi-emerald-800 text-white px-4 gap-2 text-[13px]">
              <Plus className="h-4 w-4" /> New event
            </Button>
          </Link>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-bekasi-emerald-900/8 bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[10.5px] uppercase tracking-[0.22em] text-bekasi-ink/50 bg-bekasi-cream/50 border-b border-bekasi-emerald-900/8">
                <th className="py-3 px-5 font-medium">Event</th>
                <th className="py-3 px-3 font-medium hidden md:table-cell">When</th>
                <th className="py-3 px-3 font-medium hidden lg:table-cell">Venue</th>
                <th className="py-3 px-3 font-medium hidden md:table-cell">Category</th>
                <th className="py-3 px-3 font-medium">Status</th>
                <th className="py-3 px-5 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-bekasi-emerald-900/6">
              {results.map((e) => {
                const cat = EVENT_CATEGORIES.find((c) => c.id === e.category)
                const evStatus = eventStatus(e)
                return (
                  <tr key={e.id} className="hover:bg-bekasi-cream/40 transition-colors">
                    <td className="py-2.5 px-5">
                      <div className="flex items-center gap-3">
                        <div className="relative h-10 w-14 rounded-md overflow-hidden shrink-0 bg-bekasi-cream">
                          {e.image && <Image src={e.image} alt={e.title} fill sizes="56px" className="object-cover" />}
                        </div>
                        <div className="min-w-0">
                          <div className="font-medium text-bekasi-emerald-900 truncate max-w-xs inline-flex items-center gap-1.5">
                            {e.title}
                            {e.featured && <Star className="h-3 w-3 fill-bekasi-gold-500 text-bekasi-gold-500" />}
                          </div>
                          <div className="text-[11px] text-bekasi-ink/50 truncate max-w-xs">/{e.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-2.5 px-3 hidden md:table-cell">
                      <div className="inline-flex items-center gap-1.5 text-[12px] text-bekasi-ink/70">
                        <CalIcon className="h-3 w-3" />
                        <span>{formatEventDate(e, { short: true })}</span>
                      </div>
                      <div className={cn('mt-0.5 text-[10.5px] uppercase tracking-[0.18em]',
                        evStatus === 'ongoing' ? 'text-bekasi-emerald-700'
                        : evStatus === 'upcoming' ? 'text-bekasi-gold-600'
                        : 'text-bekasi-ink/40')}>{evStatus}</div>
                    </td>
                    <td className="py-2.5 px-3 hidden lg:table-cell">
                      <div className="text-[12px] text-bekasi-ink/70 inline-flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> <span className="truncate max-w-[180px]">{e.venue?.name}</span>
                      </div>
                    </td>
                    <td className="py-2.5 px-3 hidden md:table-cell">
                      {cat && (
                        <span className="inline-flex items-center gap-1.5 text-[11.5px] text-bekasi-ink/70">
                          <span className="h-1.5 w-1.5 rounded-full" style={{ background: cat.color }} />
                          {cat.label}
                        </span>
                      )}
                    </td>
                    <td className="py-2.5 px-3"><StatusPill status={e.status} /></td>
                    <td className="py-2.5 px-5 text-right">
                      <RowActions event={e} onTogglePublish={() => togglePublish(e.id)} onDelete={() => setConfirmDel(e)} onEdit={() => router.push(`/admin/events/${e.slug}`)} />
                    </td>
                  </tr>
                )
              })}
              {results.length === 0 && (
                <tr><td colSpan={6} className="py-16 text-center text-bekasi-ink/55">No events match your filters.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete confirmation */}
      <AnimatePresence>
        {confirmDel && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setConfirmDel(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-xl bg-white shadow-2xl border border-bekasi-emerald-900/10 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-md bg-red-50 text-red-600 inline-flex items-center justify-center shrink-0">
                    <AlertTriangle className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-sans font-semibold text-lg text-bekasi-emerald-900">Delete event?</div>
                    <p className="mt-1 text-sm text-bekasi-ink/65 leading-relaxed">
                      This will permanently remove <strong>{confirmDel.title}</strong> from the CMS. This cannot be undone.
                    </p>
                  </div>
                </div>
              </div>
              <div className="px-6 py-4 bg-bekasi-cream/60 flex justify-end gap-2">
                <button onClick={() => setConfirmDel(null)} className="h-10 rounded-md border border-bekasi-emerald-900/15 hover:bg-white px-4 text-sm font-medium">Cancel</button>
                <button onClick={() => deleteItem(confirmDel.id)} className="h-10 rounded-md bg-red-600 hover:bg-red-500 text-white px-4 text-sm font-medium">Delete permanently</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function RowActions({ event, onTogglePublish, onEdit, onDelete }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative inline-flex items-center gap-1">
      <button onClick={onEdit} title="Edit" className="h-8 w-8 rounded-md text-bekasi-ink/55 hover:text-bekasi-emerald-900 hover:bg-bekasi-emerald-900/[0.06] inline-flex items-center justify-center">
        <Edit3 className="h-3.5 w-3.5" />
      </button>
      <a href={`/events/${event.slug}`} target="_blank" rel="noreferrer" title="Preview" className="h-8 w-8 rounded-md text-bekasi-ink/55 hover:text-bekasi-emerald-900 hover:bg-bekasi-emerald-900/[0.06] inline-flex items-center justify-center">
        <ExternalLink className="h-3.5 w-3.5" />
      </a>
      <button onClick={() => setOpen((v) => !v)} title="More" className="h-8 w-8 rounded-md text-bekasi-ink/55 hover:text-bekasi-emerald-900 hover:bg-bekasi-emerald-900/[0.06] inline-flex items-center justify-center">
        <MoreHorizontal className="h-3.5 w-3.5" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-1 z-50 min-w-[180px] rounded-md border border-bekasi-emerald-900/10 bg-white shadow-lg overflow-hidden">
            <button onClick={() => { onTogglePublish(); setOpen(false) }} className="w-full text-left px-3 py-2 text-[13px] hover:bg-bekasi-cream inline-flex items-center gap-2">
              <Eye className="h-3.5 w-3.5" /> {event.status === 'published' ? 'Unpublish (make draft)' : 'Publish now'}
            </button>
            <button className="w-full text-left px-3 py-2 text-[13px] hover:bg-bekasi-cream inline-flex items-center gap-2">
              <Copy className="h-3.5 w-3.5" /> Duplicate
            </button>
            <div className="border-t border-bekasi-emerald-900/8" />
            <button onClick={() => { onDelete(); setOpen(false) }} className="w-full text-left px-3 py-2 text-[13px] text-red-600 hover:bg-red-50 inline-flex items-center gap-2">
              <Trash2 className="h-3.5 w-3.5" /> Delete
            </button>
          </div>
        </>
      )}
    </div>
  )
}
