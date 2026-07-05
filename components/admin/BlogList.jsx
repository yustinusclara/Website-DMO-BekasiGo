'use client'

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plus, Search, Edit3, Trash2, Eye, Copy, MoreHorizontal,
  Star, AlertTriangle, ExternalLink, Calendar as CalIcon, User, Loader2
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { BLOG_POSTS, BLOG_CATEGORIES, formatPostDate } from '@/lib/content/blog'
import { StatusPill } from '@/components/admin/forms/inputs'
import { getSupabase } from '@/lib/supabase/client'
import { toast } from 'sonner'

export default function BlogList() {
  const router = useRouter()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery]       = useState('')
  const [category, setCategory] = useState('all')
  const [status, setStatus]     = useState('all')
  const [confirmDel, setConfirmDel] = useState(null)

  // 1. Fetch data from Supabase, fallback to static BLOG_POSTS
  useEffect(() => {
    async function loadData() {
      setLoading(true)
      const supabase = getSupabase()
      if (!supabase) {
        // Fallback to static local data
        setItems(BLOG_POSTS.map(p => ({ ...p, status: p.status || 'published' })))
        setLoading(false)
        return
      }

      try {
        const { data, error } = await supabase
          .from('blogs')
          .select('*')
          .order('published_at', { ascending: false })

        if (error) throw error

        if (data && data.length > 0) {
          // Map database structure to UI component structure
          const mapped = data.map((b) => ({
            id: b.id,
            slug: b.slug,
            title: b.title,
            excerpt: b.excerpt,
            content: b.content,
            cover: b.cover_url || b.cover || 'https://res.cloudinary.com/oi9u7lsq/image/upload/v1783096744/3._Summarecon_Mall_Bekasi_avsah4.png', // Default cover if null
            category: b.category_id || b.category || 'guides',
            tags: b.tags || [],
            author: { name: b.author_name || 'Admin', role: b.author_role || 'Editor' },
            publishedAt: b.published_at || new Date().toISOString(),
            featured: !!b.featured,
            status: b.status || 'draft'
          }))
          setItems(mapped)
        } else {
          // If Supabase is connected but empty, initialize with seeded static items or leave empty
          setItems([])
        }
      } catch (err) {
        console.error('[BlogList] Supabase error, falling back to static:', err)
        setItems(BLOG_POSTS.map(p => ({ ...p, status: p.status || 'published' })))
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const results = useMemo(() => {
    let out = [...items]
    if (category !== 'all') out = out.filter((p) => p.category === category)
    if (status !== 'all')   out = out.filter((p) => p.status === status)
    const q = query.trim().toLowerCase()
    if (q) out = out.filter((p) =>
      p.title.toLowerCase().includes(q)
      || p.author?.name?.toLowerCase().includes(q)
      || p.tags?.some((t) => t.toLowerCase().includes(q))
    )
    out.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
    return out
  }, [items, query, category, status])

  const counts = {
    all: items.length,
    published: items.filter((p) => p.status === 'published').length,
    draft:     items.filter((p) => p.status === 'draft').length,
  }

  const togglePublish = async (post) => {
    const nextStatus = post.status === 'published' ? 'draft' : 'published'
    const supabase = getSupabase()

    if (!supabase) {
      // Local state fallback
      setItems((prev) => prev.map((p) => p.id === post.id ? { ...p, status: nextStatus } : p))
      toast.success(`Post status updated to ${nextStatus} (Local mode)`)
      return
    }

    try {
      const { error } = await supabase
        .from('blogs')
        .update({ status: nextStatus })
        .eq('id', post.id)

      if (error) throw error

      setItems((prev) => prev.map((p) => p.id === post.id ? { ...p, status: nextStatus } : p))
      toast.success(`Post status updated to ${nextStatus}`)
    } catch (err) {
      console.error('[BlogList] Error updating status:', err)
      toast.error('Failed to update post status in database')
    }
  }

  const deleteItem = async (post) => {
    const supabase = getSupabase()

    if (!supabase) {
      // Local state fallback
      setItems((prev) => prev.filter((p) => p.id !== post.id))
      setConfirmDel(null)
      toast.success('Post deleted (Local mode)')
      return
    }

    try {
      const { error } = await supabase
        .from('blogs')
        .delete()
        .eq('id', post.id)

      if (error) throw error

      setItems((prev) => prev.filter((p) => p.id !== post.id))
      setConfirmDel(null)
      toast.success('Post permanently deleted')
    } catch (err) {
      console.error('[BlogList] Error deleting post:', err)
      toast.error('Failed to delete post from database')
    }
  }

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-bekasi-emerald-900" />
        <span className="ml-2 text-sm text-bekasi-ink/70">Loading posts from Supabase...</span>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-bekasi-emerald-900/8 bg-white p-4 flex flex-col lg:flex-row gap-3 lg:items-center">
        <div className="relative flex-1 min-w-0">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-bekasi-ink/40" />
          <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search posts, authors, tags…"
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

          <select value={category} onChange={(e) => setCategory(e.target.value)}
            className="h-9 rounded-md border border-bekasi-emerald-900/15 bg-white px-3 text-[13px] focus:outline-none focus:ring-2 focus:ring-bekasi-emerald-500/30 focus:border-bekasi-emerald-500">
            {BLOG_CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>{c.label} ({c.id === 'all' ? items.length : items.filter((p) => p.category === c.id).length})</option>
            ))}
          </select>

          <Link href="/admin/blog/new">
            <Button className="h-9 rounded-md bg-bekasi-emerald-900 hover:bg-bekasi-emerald-800 text-white px-4 gap-2 text-[13px]">
              <Plus className="h-4 w-4" /> New post
            </Button>
          </Link>
        </div>
      </div>

      <div className="rounded-xl border border-bekasi-emerald-900/8 bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[10.5px] uppercase tracking-[0.22em] text-bekasi-ink/50 bg-bekasi-cream/50 border-b border-bekasi-emerald-900/8">
                <th className="py-3 px-5 font-medium">Post</th>
                <th className="py-3 px-3 font-medium hidden md:table-cell">Category</th>
                <th className="py-3 px-3 font-medium hidden lg:table-cell">Author</th>
                <th className="py-3 px-3 font-medium hidden md:table-cell">Published</th>
                <th className="py-3 px-3 font-medium">Status</th>
                <th className="py-3 px-5 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-bekasi-emerald-900/6">
              {results.map((p) => {
                const cat = BLOG_CATEGORIES.find((c) => c.id === p.category)
                return (
                  <tr key={p.id} className="hover:bg-bekasi-cream/40 transition-colors">
                    <td className="py-2.5 px-5">
                      <div className="flex items-center gap-3">
                        <div className="relative h-10 w-14 rounded-md overflow-hidden shrink-0 bg-bekasi-cream">
                          {p.cover && <Image src={p.cover} alt={p.title} fill sizes="56px" className="object-cover" />}
                        </div>
                        <div className="min-w-0">
                          <div className="font-medium text-bekasi-emerald-900 truncate max-w-md inline-flex items-center gap-1.5">
                            {p.title}
                            {p.featured && <Star className="h-3 w-3 fill-bekasi-gold-500 text-bekasi-gold-500" />}
                          </div>
                          <div className="text-[11px] text-bekasi-ink/50 truncate max-w-md">/{p.slug}</div>
                        </div>
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
                    <td className="py-2.5 px-3 hidden lg:table-cell">
                      <span className="text-[12px] text-bekasi-ink/70 inline-flex items-center gap-1">
                        <User className="h-3 w-3" /> <span className="truncate max-w-[160px]">{p.author?.name}</span>
                      </span>
                    </td>
                    <td className="py-2.5 px-3 hidden md:table-cell">
                      <span className="inline-flex items-center gap-1.5 text-[12px] text-bekasi-ink/70">
                        <CalIcon className="h-3 w-3" /> {formatPostDate(p.publishedAt, { short: true })}
                      </span>
                    </td>
                    <td className="py-2.5 px-3"><StatusPill status={p.status} /></td>
                    <td className="py-2.5 px-5 text-right">
                      <RowActions post={p} onTogglePublish={() => togglePublish(p)} onDelete={() => setConfirmDel(p)} onEdit={() => router.push(`/admin/blog/${p.slug}`)} />
                    </td>
                  </tr>
                )
              })}
              {results.length === 0 && (
                <tr><td colSpan={6} className="py-16 text-center text-bekasi-ink/55">No posts match your filters.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {confirmDel && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setConfirmDel(null)}>
            <motion.div initial={{ opacity: 0, y: 20, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-xl bg-white shadow-2xl border border-bekasi-emerald-900/10 overflow-hidden">
              <div className="p-6">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-md bg-red-50 text-red-600 inline-flex items-center justify-center shrink-0">
                    <AlertTriangle className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-sans font-semibold text-lg text-bekasi-emerald-900">Delete post?</div>
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

function RowActions({ post, onTogglePublish, onEdit, onDelete }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative inline-flex items-center gap-1">
      <button onClick={onEdit} title="Edit" className="h-8 w-8 rounded-md text-bekasi-ink/55 hover:text-bekasi-emerald-900 hover:bg-bekasi-emerald-900/[0.06] inline-flex items-center justify-center">
        <Edit3 className="h-3.5 w-3.5" />
      </button>
      <a href={`/blog/${post.slug}`} target="_blank" rel="noreferrer" title="Preview" className="h-8 w-8 rounded-md text-bekasi-ink/55 hover:text-bekasi-emerald-900 hover:bg-bekasi-emerald-900/[0.06] inline-flex items-center justify-center">
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
              <Eye className="h-3.5 w-3.5" /> {post.status === 'published' ? 'Unpublish (make draft)' : 'Publish now'}
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
