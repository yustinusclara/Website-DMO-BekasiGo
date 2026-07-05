'use client'

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plus, Search, Edit3, Trash2, Eye, Copy, MoreHorizontal,
  Star, AlertTriangle, ExternalLink, Calendar as CalIcon, Feather,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { STORIES, STORY_COLUMNS, formatStoryDate } from '@/lib/content/stories'
import { StatusPill } from '@/components/admin/forms/inputs'
import { getSupabase } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

function seededStatus(id) {
  let h = 0; for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0
  return h % 100 < 20 ? 'draft' : 'published'
}

export default function StoriesList() {
  const router = useRouter()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery]     = useState('')
  const [column, setColumn]   = useState('all')
  const [status, setStatus]   = useState('all')
  const [confirmDel, setConfirmDel] = useState(null)

  useEffect(() => {
    async function loadData() {
      setLoading(true)
      const supabase = getSupabase()
      if (!supabase) {
        setItems(STORIES.map(s => ({ ...s, status: s.status || seededStatus(s.id) })))
        setLoading(false)
        return
      }
      try {
        const { data, error } = await supabase
          .from('stories')
          .select('*')
          .order('published_at', { ascending: false })
        if (error) throw error
        if (data) {
          setItems(data.map(s => ({
            id: s.id,
            slug: s.slug,
            title: s.title,
            subtitle: s.subtitle || '',
            excerpt: s.excerpt,
            content: s.content,
            cover: s.hero_image_url || s.cover?.image || 'https://res.cloudinary.com/oi9u7lsq/image/upload/v1783096744/3._Summarecon_Mall_Bekasi_avsah4.png',
            column: s.column_key || 'heritage',
            tags: s.tags || [],
            author: { name: s.author_name || 'Admin', role: s.author_role || 'Editor' },
            publishedAt: s.published_at || new Date().toISOString(),
            status: s.status || 'draft',
            featured: !!s.featured
          })))
        }
      } catch (err) {
        console.error('[StoriesList] Database load error, falling back:', err)
        setItems(STORIES.map(s => ({ ...s, status: s.status || seededStatus(s.id) })))
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])
  

  const results = useMemo(() => {
    let out = [...items]
    if (column !== 'all') out = out.filter((s) => s.column === column)
    if (status !== 'all') out = out.filter((s) => s.status === status)
    const q = query.trim().toLowerCase()
    if (q) out = out.filter((s) =>
      s.title.toLowerCase().includes(q)
      || s.author?.name?.toLowerCase().includes(q)
      || s.tags?.some((t) => t.toLowerCase().includes(q))
    )
    // Newest first
    out.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
    return out
  }, [items, query, column, status])

  const counts = {
    all: items.length,
    published: items.filter((s) => s.status === 'published').length,
    draft:     items.filter((s) => s.status === 'draft').length,
  }

  const togglePublish = async (story) => {
    const nextStatus = story.status === 'published' ? 'draft' : 'published'
    const supabase = getSupabase()
    if (!supabase) {
      setItems((prev) => prev.map((s) => s.id === story.id ? { ...s, status: nextStatus } : s))
      toast.success(`Story status updated to ${nextStatus} (Local mode)`)
      return
    }
    try {
      const { error } = await supabase.from('stories').update({ status: nextStatus }).eq('id', story.id)
      if (error) throw error
      setItems((prev) => prev.map((s) => s.id === story.id ? { ...s, status: nextStatus } : s))
      toast.success(`Story status updated to ${nextStatus}`)
    } catch (err) {
      toast.error('Failed to update story status: ' + err.message)
    }
  }
  const deleteItem    = async (story) => {
    const supabase = getSupabase()
    if (!supabase) {
      setItems((prev) => prev.filter((s) => s.id !== story.id))
      setConfirmDel(null)
      toast.success('Story deleted (Local mode)')
      return
    }
    try {
      const { error } = await supabase.from('stories').delete().eq('id', story.id)
      if (error) throw error
      setItems((prev) => prev.filter((s) => s.id !== story.id))
      setConfirmDel(null)
      toast.success('Story deleted successfully')
    } catch (err) {
      toast.error('Failed to delete story: ' + err.message)
    }
  }

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-bekasi-emerald-900" />
        <span className="ml-2 text-sm text-bekasi-ink/70">Loading stories from Supabase...</span>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="rounded-xl border border-bekasi-emerald-900/8 bg-white p-4 flex flex-col lg:flex-row gap-3 lg:items-center">
        <div className="relative flex-1 min-w-0">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-bekasi-ink/40" />
          <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search stories, authors, tags…"
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

          <select value={column} onChange={(e) => setColumn(e.target.value)}
            className="h-9 rounded-md border border-bekasi-emerald-900/15 bg-white px-3 text-[13px] focus:outline-none focus:ring-2 focus:ring-bekasi-emerald-500/30 focus:border-bekasi-emerald-500">
            {STORY_COLUMNS.map((c) => (
              <option key={c.id} value={c.id}>{c.label} ({c.id === 'all' ? items.length : items.filter((s) => s.column === c.id).length})</option>
            ))}
          </select>

          <Link href="/admin/stories/new">
            <Button className="h-9 rounded-md bg-bekasi-emerald-900 hover:bg-bekasi-emerald-800 text-white px-4 gap-2 text-[13px]">
              <Plus className="h-4 w-4" /> New story
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
                <th className="py-3 px-5 font-medium">Story</th>
                <th className="py-3 px-3 font-medium hidden md:table-cell">Column</th>
                <th className="py-3 px-3 font-medium hidden lg:table-cell">Author</th>
                <th className="py-3 px-3 font-medium hidden md:table-cell">Published</th>
                <th className="py-3 px-3 font-medium">Status</th>
                <th className="py-3 px-5 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-bekasi-emerald-900/6">
              {results.map((s) => {
                const col = STORY_COLUMNS.find((c) => c.id === s.column)
                return (
                  <tr key={s.id} className="hover:bg-bekasi-cream/40 transition-colors">
                    <td className="py-2.5 px-5">
                      <div className="flex items-center gap-3">
                        <div className="relative h-10 w-14 rounded-md overflow-hidden shrink-0 bg-bekasi-cream">
                          {s.cover?.image && <Image src={s.cover.image} alt={s.title} fill sizes="56px" className="object-cover" />}
                        </div>
                        <div className="min-w-0">
                          <div className="font-medium text-bekasi-emerald-900 truncate max-w-md inline-flex items-center gap-1.5">
                            {s.title}
                            {s.featured && <Star className="h-3 w-3 fill-bekasi-gold-500 text-bekasi-gold-500" />}
                          </div>
                          <div className="text-[11px] text-bekasi-ink/50 truncate max-w-md">/{s.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-2.5 px-3 hidden md:table-cell">
                      {col && (
                        <span className="inline-flex items-center gap-1.5 text-[11.5px] text-bekasi-ink/70">
                          <span className="h-1.5 w-1.5 rounded-full" style={{ background: col.color }} />
                          {col.label}
                        </span>
                      )}
                    </td>
                    <td className="py-2.5 px-3 hidden lg:table-cell">
                      {s.author && (
                        <span className="text-[12px] text-bekasi-ink/70 inline-flex items-center gap-1">
                          <Feather className="h-3 w-3" /> <span className="truncate max-w-[150px]">{s.author.name}</span>
                        </span>
                      )}
                    </td>
                    <td className="py-2.5 px-3 hidden md:table-cell">
                      {s.publishedAt && (
                        <span className="inline-flex items-center gap-1.5 text-[12px] text-bekasi-ink/70">
                          <CalIcon className="h-3 w-3" /> {formatStoryDate(s.publishedAt, { short: true })}
                        </span>
                      )}
                    </td>
                    <td className="py-2.5 px-3"><StatusPill status={s.status} /></td>
                    <td className="py-2.5 px-5 text-right">
                      <RowActions story={s} onTogglePublish={() => togglePublish(s.id)} onDelete={() => setConfirmDel(s)} onEdit={() => router.push(`/admin/stories/${s.slug}`)} />
                    </td>
                  </tr>
                )
              })}
              {results.length === 0 && (
                <tr><td colSpan={6} className="py-16 text-center text-bekasi-ink/55">No stories match your filters.</td></tr>
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
                    <div className="font-sans font-semibold text-lg text-bekasi-emerald-900">Delete story?</div>
                    <p className="mt-1 text-sm text-bekasi-ink/65 leading-relaxed">
                      This will permanently remove <strong>{confirmDel.title}</strong> from the CMS. This cannot be undone.
                    </p>
                  </div>
                </div>
              </div>
              <div className="px-6 py-4 bg-bekasi-cream/60 flex justify-end gap-2">
                <button onClick={() => setConfirmDel(null)} className="h-10 rounded-md border border-bekasi-emerald-900/15 hover:bg-white px-4 text-sm font-medium">Cancel</button>
                <button onClick={() => deleteItem(confirmDel)} className="h-10 rounded-md bg-red-600 hover:bg-red-500 text-white px-4 text-sm font-medium">Delete permanently</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function RowActions({ story, onTogglePublish, onEdit, onDelete }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative inline-flex items-center gap-1">
      <button onClick={onEdit} title="Edit" className="h-8 w-8 rounded-md text-bekasi-ink/55 hover:text-bekasi-emerald-900 hover:bg-bekasi-emerald-900/[0.06] inline-flex items-center justify-center">
        <Edit3 className="h-3.5 w-3.5" />
      </button>
      <a href={`/stories/${story.slug}`} target="_blank" rel="noreferrer" title="Preview" className="h-8 w-8 rounded-md text-bekasi-ink/55 hover:text-bekasi-emerald-900 hover:bg-bekasi-emerald-900/[0.06] inline-flex items-center justify-center">
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
              <Eye className="h-3.5 w-3.5" /> {story.status === 'published' ? 'Unpublish (make draft)' : 'Publish now'}
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
