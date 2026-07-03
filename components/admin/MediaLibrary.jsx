'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plus, Search, Trash2, Copy, ExternalLink, Video as VideoIcon,
  Image as ImageIcon, AlertTriangle, X, Cloud, CheckCircle2, Grid3x3, List,
  Filter,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { MEDIA_ASSETS, MEDIA_CATEGORIES, MEDIA_TYPES, mediaStats } from '@/lib/admin/media'

export default function MediaLibrary() {
  const [items, setItems] = useState(() => [...MEDIA_ASSETS])
  const [query, setQuery]       = useState('')
  const [category, setCategory] = useState('all')
  const [type, setType]         = useState('all')
  const [view, setView]         = useState('grid') // 'grid' | 'list'
  const [preview, setPreview]   = useState(null)
  const [confirmDel, setConfirmDel] = useState(null)
  const [copied, setCopied]     = useState(null)

  const stats = mediaStats()

  const results = useMemo(() => {
    let out = [...items]
    if (category !== 'all') out = out.filter((m) => m.category === category)
    if (type     !== 'all') out = out.filter((m) => m.type === type)
    const q = query.trim().toLowerCase()
    if (q) out = out.filter((m) =>
      m.name.toLowerCase().includes(q)
      || m.tags?.some((t) => t.toLowerCase().includes(q))
      || m.category.toLowerCase().includes(q)
    )
    return out
  }, [items, query, category, type])

  const counts = {
    total: items.length,
    images: items.filter((m) => m.type === 'image').length,
    videos: items.filter((m) => m.type === 'video').length,
  }

  const doCopy = async (url) => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(url)
      setTimeout(() => setCopied(null), 1800)
    } catch { /* noop */ }
  }
  const deleteItem = (id) => { setItems((prev) => prev.filter((m) => m.id !== id)); setConfirmDel(null); setPreview(null) }

  return (
    <div className="space-y-4">
      {/* Cloudinary status strip */}
      <div className="rounded-xl border border-bekasi-emerald-900/8 bg-white p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="h-10 w-10 rounded-md bg-bekasi-emerald-900/8 text-bekasi-emerald-800 inline-flex items-center justify-center shrink-0">
            <Cloud className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <div className="text-[10.5px] uppercase tracking-[0.22em] text-bekasi-gold-600">Cloudinary source</div>
            <div className="font-mono text-[12.5px] text-bekasi-ink truncate max-w-[560px]">{stats.cloudinaryBase}</div>
          </div>
        </div>
        <div className="flex items-center gap-6 text-[12px]">
          <StatChip label="Total"  value={counts.total} />
          <StatChip label="Images" value={counts.images} />
          <StatChip label="Videos" value={counts.videos} />
        </div>
      </div>

      {/* Toolbar */}
      <div className="rounded-xl border border-bekasi-emerald-900/8 bg-white p-4 flex flex-col lg:flex-row gap-3 lg:items-center">
        <div className="relative flex-1 min-w-0">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-bekasi-ink/40" />
          <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search media by name, tag, or category…"
            className="h-10 pl-10 rounded-md border-bekasi-emerald-900/15 focus-visible:ring-bekasi-emerald-500/30 focus-visible:border-bekasi-emerald-500" />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <select value={type} onChange={(e) => setType(e.target.value)}
            className="h-9 rounded-md border border-bekasi-emerald-900/15 bg-white px-3 text-[13px] focus:outline-none focus:ring-2 focus:ring-bekasi-emerald-500/30 focus:border-bekasi-emerald-500">
            {MEDIA_TYPES.map((t) => (
              <option key={t.id} value={t.id}>{t.label}</option>
            ))}
          </select>
          <select value={category} onChange={(e) => setCategory(e.target.value)}
            className="h-9 rounded-md border border-bekasi-emerald-900/15 bg-white px-3 text-[13px] focus:outline-none focus:ring-2 focus:ring-bekasi-emerald-500/30 focus:border-bekasi-emerald-500">
            {MEDIA_CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>{c.label} ({c.id === 'all' ? items.length : items.filter((m) => m.category === c.id).length})</option>
            ))}
          </select>
          <div className="h-9 rounded-md border border-bekasi-emerald-900/15 bg-white p-1 inline-flex items-center gap-1">
            <button onClick={() => setView('grid')} title="Grid"
              className={cn('h-7 w-7 rounded inline-flex items-center justify-center transition-colors',
                view === 'grid' ? 'bg-bekasi-emerald-900 text-white' : 'text-bekasi-ink/55 hover:text-bekasi-emerald-900')}>
              <Grid3x3 className="h-3.5 w-3.5" />
            </button>
            <button onClick={() => setView('list')} title="List"
              className={cn('h-7 w-7 rounded inline-flex items-center justify-center transition-colors',
                view === 'list' ? 'bg-bekasi-emerald-900 text-white' : 'text-bekasi-ink/55 hover:text-bekasi-emerald-900')}>
              <List className="h-3.5 w-3.5" />
            </button>
          </div>
          <Link href="/admin/media/upload">
            <Button className="h-9 rounded-md bg-bekasi-emerald-900 hover:bg-bekasi-emerald-800 text-white px-4 gap-2 text-[13px]">
              <Plus className="h-4 w-4" /> Add asset
            </Button>
          </Link>
        </div>
      </div>

      {/* Grid / List */}
      {results.length === 0 ? (
        <div className="rounded-xl border border-bekasi-emerald-900/8 bg-white py-16 text-center text-bekasi-ink/55">
          <Filter className="h-6 w-6 mx-auto mb-2 opacity-40" />
          No media matches your filters.
        </div>
      ) : view === 'grid' ? (
        <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {results.map((m) => (
            <AssetCard key={m.id} asset={m} onPreview={() => setPreview(m)} onCopy={() => doCopy(m.url)} copied={copied === m.url} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-bekasi-emerald-900/8 bg-white overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[10.5px] uppercase tracking-[0.22em] text-bekasi-ink/50 bg-bekasi-cream/50 border-b border-bekasi-emerald-900/8">
                <th className="py-3 px-5 font-medium">Asset</th>
                <th className="py-3 px-3 font-medium hidden md:table-cell">Type</th>
                <th className="py-3 px-3 font-medium hidden md:table-cell">Category</th>
                <th className="py-3 px-3 font-medium hidden lg:table-cell">Used in</th>
                <th className="py-3 px-3 font-medium hidden xl:table-cell">Size</th>
                <th className="py-3 px-5 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-bekasi-emerald-900/6">
              {results.map((m) => {
                const cat = MEDIA_CATEGORIES.find((c) => c.id === m.category)
                return (
                  <tr key={m.id} className="hover:bg-bekasi-cream/40 transition-colors">
                    <td className="py-2.5 px-5">
                      <div className="flex items-center gap-3">
                        <div className="relative h-10 w-14 rounded-md overflow-hidden shrink-0 bg-bekasi-cream">
                          {m.type === 'image'
                            ? <Image src={m.url} alt={m.name} fill sizes="56px" className="object-cover" />
                            : <div className="h-full w-full bg-bekasi-emerald-900 text-white inline-flex items-center justify-center"><VideoIcon className="h-4 w-4" /></div>}
                        </div>
                        <div className="min-w-0">
                          <div className="font-medium text-bekasi-emerald-900 truncate max-w-md">{m.name}</div>
                          <div className="text-[10.5px] uppercase tracking-[0.18em] text-bekasi-ink/50 mt-0.5">{m.dim}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-2.5 px-3 hidden md:table-cell">
                      <span className="inline-flex items-center gap-1.5 text-[11.5px] text-bekasi-ink/70">
                        {m.type === 'image' ? <ImageIcon className="h-3 w-3" /> : <VideoIcon className="h-3 w-3" />}
                        {m.type}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 hidden md:table-cell">
                      {cat && (
                        <span className="inline-flex items-center gap-1.5 text-[11.5px] text-bekasi-ink/70">
                          <span className="h-1.5 w-1.5 rounded-full" style={{ background: cat.color }} />
                          {cat.label}
                        </span>
                      )}
                    </td>
                    <td className="py-2.5 px-3 hidden lg:table-cell text-[11.5px] text-bekasi-ink/65 truncate max-w-xs">{m.usedIn}</td>
                    <td className="py-2.5 px-3 hidden xl:table-cell text-[12px] text-bekasi-ink/60">{m.size}</td>
                    <td className="py-2.5 px-5 text-right">
                      <div className="inline-flex items-center gap-1">
                        <IconBtn title="Preview" onClick={() => setPreview(m)}><ExternalLink className="h-3.5 w-3.5" /></IconBtn>
                        <IconBtn title="Copy URL" onClick={() => doCopy(m.url)}>
                          {copied === m.url ? <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                        </IconBtn>
                        <IconBtn title="Delete" onClick={() => setConfirmDel(m)} danger><Trash2 className="h-3.5 w-3.5" /></IconBtn>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Preview drawer */}
      <AnimatePresence>
        {preview && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setPreview(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-3xl rounded-xl bg-white shadow-2xl overflow-hidden"
            >
              <div className="relative w-full aspect-video bg-bekasi-emerald-900">
                {preview.type === 'image'
                  ? <Image src={preview.url} alt={preview.name} fill sizes="800px" className="object-contain" />
                  : <video src={preview.url} controls autoPlay muted playsInline className="absolute inset-0 w-full h-full object-contain" />}
                <button onClick={() => setPreview(null)} className="absolute top-3 right-3 h-8 w-8 rounded-full bg-black/50 text-white inline-flex items-center justify-center hover:bg-black/70">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="p-5 space-y-3">
                <div>
                  <div className="text-[10.5px] uppercase tracking-[0.22em] text-bekasi-gold-600">{preview.category}</div>
                  <h3 className="font-sans font-semibold text-lg text-bekasi-emerald-900">{preview.name}</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-[12px]">
                  <MetaCell label="Type"     value={preview.type} />
                  <MetaCell label="Dimension" value={preview.dim} />
                  <MetaCell label="Size"     value={preview.size} />
                  <MetaCell label="Uploaded" value={preview.uploadedAt} />
                </div>
                <div>
                  <div className="text-[10.5px] uppercase tracking-[0.22em] text-bekasi-ink/45 mb-1">Cloudinary URL</div>
                  <div className="flex items-stretch gap-2">
                    <div className="flex-1 min-w-0 rounded-md border border-bekasi-emerald-900/15 bg-bekasi-cream/50 px-3 py-2 font-mono text-[11.5px] text-bekasi-ink truncate">{preview.url}</div>
                    <button onClick={() => doCopy(preview.url)}
                      className="h-auto px-3 rounded-md bg-bekasi-emerald-900 text-white text-[12px] font-medium inline-flex items-center gap-1.5 hover:bg-bekasi-emerald-800">
                      {copied === preview.url ? <><CheckCircle2 className="h-3.5 w-3.5" /> Copied</> : <><Copy className="h-3.5 w-3.5" /> Copy</>}
                    </button>
                  </div>
                </div>
                <div>
                  <div className="text-[10.5px] uppercase tracking-[0.22em] text-bekasi-ink/45 mb-1">Used in</div>
                  <div className="text-[12.5px] text-bekasi-ink/75">{preview.usedIn}</div>
                </div>
                {preview.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {preview.tags.map((t) => (
                      <span key={t} className="inline-flex items-center rounded-full bg-bekasi-emerald-900/8 text-bekasi-emerald-900 px-2 py-0.5 text-[11px] font-medium">{t}</span>
                    ))}
                  </div>
                )}
              </div>
              <div className="px-5 py-3 bg-bekasi-cream/40 border-t border-bekasi-emerald-900/8 flex justify-between">
                <button onClick={() => setConfirmDel(preview)}
                  className="h-9 rounded-md text-red-600 hover:bg-red-50 px-3 text-[12.5px] font-medium inline-flex items-center gap-2">
                  <Trash2 className="h-3.5 w-3.5" /> Delete asset
                </button>
                <a href={preview.url} target="_blank" rel="noreferrer"
                  className="h-9 rounded-md text-bekasi-emerald-900 hover:bg-bekasi-emerald-900/[0.06] px-3 text-[12.5px] font-medium inline-flex items-center gap-2">
                  <ExternalLink className="h-3.5 w-3.5" /> Open in Cloudinary
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete confirmation */}
      <AnimatePresence>
        {confirmDel && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setConfirmDel(null)}
          >
            <motion.div initial={{ opacity: 0, y: 20, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-xl bg-white shadow-2xl border border-bekasi-emerald-900/10 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-md bg-red-50 text-red-600 inline-flex items-center justify-center shrink-0">
                    <AlertTriangle className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-sans font-semibold text-lg text-bekasi-emerald-900">Remove media reference?</div>
                    <p className="mt-1 text-sm text-bekasi-ink/65 leading-relaxed">
                      This removes <strong>{confirmDel.name}</strong> from the CMS index. The underlying Cloudinary file is not deleted.
                    </p>
                  </div>
                </div>
              </div>
              <div className="px-6 py-4 bg-bekasi-cream/60 flex justify-end gap-2">
                <button onClick={() => setConfirmDel(null)} className="h-10 rounded-md border border-bekasi-emerald-900/15 hover:bg-white px-4 text-sm font-medium">Cancel</button>
                <button onClick={() => deleteItem(confirmDel.id)} className="h-10 rounded-md bg-red-600 hover:bg-red-500 text-white px-4 text-sm font-medium">Remove reference</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function AssetCard({ asset, onPreview, onCopy, copied }) {
  return (
    <div className="group relative rounded-xl overflow-hidden border border-bekasi-emerald-900/8 bg-white hover:border-bekasi-emerald-900/25 transition-colors">
      <button onClick={onPreview} className="block w-full text-left">
        <div className="relative aspect-[4/3] bg-bekasi-cream overflow-hidden">
          {asset.type === 'image'
            ? <Image src={asset.url} alt={asset.name} fill sizes="260px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
            : <div className="h-full w-full bg-bekasi-emerald-900 text-white inline-flex items-center justify-center relative">
                <VideoIcon className="h-8 w-8" />
                <span className="absolute bottom-2 right-2 text-[9.5px] uppercase tracking-[0.2em] text-white/70">Video</span>
              </div>}
          <span className="absolute top-2 left-2 inline-flex items-center gap-1 rounded-full bg-black/55 text-white px-2 py-0.5 text-[10px] uppercase tracking-[0.15em]">
            {asset.type === 'image' ? <ImageIcon className="h-2.5 w-2.5" /> : <VideoIcon className="h-2.5 w-2.5" />}
            {asset.type}
          </span>
        </div>
        <div className="p-3">
          <div className="font-medium text-[13px] text-bekasi-emerald-900 truncate">{asset.name}</div>
          <div className="mt-0.5 text-[11px] text-bekasi-ink/55 truncate">{asset.usedIn}</div>
        </div>
      </button>
      <button onClick={(e) => { e.stopPropagation(); onCopy() }}
        title="Copy URL"
        className="absolute top-2 right-2 h-8 w-8 rounded-md bg-black/55 text-white inline-flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/75">
        {copied ? <CheckCircle2 className="h-3.5 w-3.5 text-emerald-300" /> : <Copy className="h-3.5 w-3.5" />}
      </button>
    </div>
  )
}

function StatChip({ label, value }) {
  return (
    <div className="flex items-baseline gap-1.5">
      <span className="font-sans font-semibold text-lg text-bekasi-emerald-900 tabular-nums">{value}</span>
      <span className="text-[10.5px] uppercase tracking-[0.22em] text-bekasi-ink/50">{label}</span>
    </div>
  )
}

function MetaCell({ label, value }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.2em] text-bekasi-ink/45">{label}</div>
      <div className="mt-0.5 text-[12.5px] text-bekasi-ink font-medium">{value}</div>
    </div>
  )
}

function IconBtn({ children, onClick, title, danger = false }) {
  return (
    <button onClick={onClick} title={title}
      className={cn('h-8 w-8 rounded-md inline-flex items-center justify-center transition-colors',
        danger ? 'text-red-600 hover:bg-red-50' : 'text-bekasi-ink/55 hover:text-bekasi-emerald-900 hover:bg-bekasi-emerald-900/[0.06]')}>
      {children}
    </button>
  )
}
