'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import { Reorder, motion, AnimatePresence } from 'framer-motion'
import {
  GripVertical, Eye, EyeOff, ChevronUp, ChevronDown, Check,
  Save, Undo2, ExternalLink, Sparkles, Layers, ImageIcon,
  Link as LinkIcon, Plus, X, ArrowUpRight, AlertCircle,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { HOMEPAGE_SECTIONS, SECTION_KIND_META } from '@/lib/admin/homepageSchema'
import { DESTINATIONS } from '@/lib/content/destinations'
import { EVENTS }       from '@/lib/content/events'
import { STORIES }      from '@/lib/content/stories'
import { BLOG_POSTS }   from '@/lib/content/blog'

const CONTENT_POOL = {
  destinations: () => DESTINATIONS.map((d) => ({ id: d.slug, title: d.title, image: d.image })),
  events:       () => EVENTS.map((e)      => ({ id: e.slug, title: e.title, image: e.image })),
  stories:      () => STORIES.map((s)     => ({ id: s.slug, title: s.title, image: s.cover.image })),
  blog:         () => BLOG_POSTS.map((p)  => ({ id: p.slug, title: p.title, image: p.cover })),
}

export default function HomepageManager() {
  const [sections, setSections] = useState(HOMEPAGE_SECTIONS)
  const [selectedId, setSelectedId] = useState(HOMEPAGE_SECTIONS[0].id)
  const [dirty, setDirty]     = useState(false)
  const [saved, setSaved]     = useState(false)

  const selected = useMemo(() => sections.find((s) => s.id === selectedId), [sections, selectedId])

  const updateSection = (id, patch) => {
    setSections((prev) => prev.map((s) => s.id === id ? { ...s, ...patch } : s))
    setDirty(true); setSaved(false)
  }

  const updateField = (sectionId, key, value) => {
    setSections((prev) => prev.map((s) => {
      if (s.id !== sectionId) return s
      return { ...s, fields: s.fields.map((f) => f.key === key ? { ...f, value } : f) }
    }))
    setDirty(true); setSaved(false)
  }

  const updateFeaturedIds = (sectionId, ids) => {
    setSections((prev) => prev.map((s) => s.id === sectionId ? { ...s, featured: { ...s.featured, ids } } : s))
    setDirty(true); setSaved(false)
  }

  const handleSave = () => {
    // eslint-disable-next-line no-console
    console.log('[HomepageManager] Save payload:', sections)
    setSaved(true); setDirty(false)
    setTimeout(() => setSaved(false), 2500)
  }

  const handleReset = () => {
    setSections(HOMEPAGE_SECTIONS)
    setDirty(false); setSaved(false)
  }

  const move = (id, dir) => {
    setSections((prev) => {
      const i = prev.findIndex((s) => s.id === id)
      const j = i + dir
      if (j < 0 || j >= prev.length) return prev
      const next = [...prev]
      const [it] = next.splice(i, 1)
      next.splice(j, 0, it)
      return next
    })
    setDirty(true); setSaved(false)
  }

  const enabledCount = sections.filter((s) => s.enabled).length

  return (
    <div className="space-y-4">
      {/* Action bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-bekasi-emerald-900/8 bg-white px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-md bg-bekasi-gold-500/15 text-bekasi-gold-600 inline-flex items-center justify-center">
            <Layers className="h-4 w-4" />
          </div>
          <div className="text-[13px]">
            <span className="font-medium text-bekasi-emerald-900">{enabledCount}</span>
            <span className="text-bekasi-ink/55"> of {sections.length} sections enabled</span>
            {dirty && (
              <span className="ml-3 inline-flex items-center gap-1 rounded-md bg-bekasi-gold-500/15 text-bekasi-gold-700 px-2 py-0.5 text-[11px] font-medium">
                <AlertCircle className="h-3 w-3" /> Unsaved changes
              </span>
            )}
            {saved && (
              <span className="ml-3 inline-flex items-center gap-1 rounded-md bg-emerald-50 text-emerald-700 px-2 py-0.5 text-[11px] font-medium">
                <Check className="h-3 w-3" /> Saved
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <a href="/" target="_blank" rel="noreferrer">
            <Button variant="outline" className="h-9 rounded-md border-bekasi-emerald-900/15 text-bekasi-emerald-900 hover:bg-bekasi-emerald-900/[0.03] px-3 gap-2 text-[13px]">
              <ExternalLink className="h-3.5 w-3.5" /> Preview site
            </Button>
          </a>
          <Button variant="outline" onClick={handleReset} disabled={!dirty}
            className="h-9 rounded-md border-bekasi-emerald-900/15 text-bekasi-emerald-900 hover:bg-bekasi-emerald-900/[0.03] disabled:opacity-40 px-3 gap-2 text-[13px]">
            <Undo2 className="h-3.5 w-3.5" /> Discard
          </Button>
          <Button onClick={handleSave} disabled={!dirty}
            className="h-9 rounded-md bg-bekasi-emerald-900 hover:bg-bekasi-emerald-800 text-white disabled:opacity-50 px-4 gap-2 text-[13px]">
            <Save className="h-4 w-4" /> Save changes
          </Button>
        </div>
      </div>

      {/* Grid: section list + editor */}
      <div className="grid gap-4 lg:grid-cols-[420px_minmax(0,1fr)]">
        {/* Left — section list */}
        <div className="rounded-xl border border-bekasi-emerald-900/8 bg-white overflow-hidden">
          <div className="px-4 py-3 border-b border-bekasi-emerald-900/8 flex items-center justify-between">
            <div>
              <div className="text-[10.5px] uppercase tracking-[0.22em] text-bekasi-gold-600">Homepage</div>
              <div className="text-[14px] font-medium text-bekasi-emerald-900">Section stack</div>
            </div>
            <span className="text-[10.5px] uppercase tracking-[0.18em] text-bekasi-ink/50">Drag to reorder</span>
          </div>

          <Reorder.Group
            axis="y"
            values={sections}
            onReorder={(next) => { setSections(next); setDirty(true); setSaved(false) }}
            className="divide-y divide-bekasi-emerald-900/6"
          >
            {sections.map((s, i) => (
              <SectionRow
                key={s.id}
                section={s}
                index={i}
                total={sections.length}
                selected={s.id === selectedId}
                onSelect={() => setSelectedId(s.id)}
                onToggle={() => updateSection(s.id, { enabled: !s.enabled })}
                onMoveUp={() => move(s.id, -1)}
                onMoveDown={() => move(s.id, 1)}
              />
            ))}
          </Reorder.Group>
        </div>

        {/* Right — editor */}
        <div className="rounded-xl border border-bekasi-emerald-900/8 bg-white">
          <AnimatePresence mode="wait">
            {selected && (
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                <SectionEditor
                  section={selected}
                  onFieldChange={(k, v) => updateField(selected.id, k, v)}
                  onFeaturedChange={(ids) => updateFeaturedIds(selected.id, ids)}
                  onToggle={() => updateSection(selected.id, { enabled: !selected.enabled })}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

/* -------- SectionRow -------- */
function SectionRow({ section, index, total, selected, onSelect, onToggle, onMoveUp, onMoveDown }) {
  const meta = SECTION_KIND_META[section.kind] ?? { color: '#155F58', label: section.kind }
  return (
    <Reorder.Item value={section} whileDrag={{ scale: 1.01, boxShadow: '0 12px 30px rgba(0,0,0,0.08)' }}>
      <div
        onClick={onSelect}
        className={cn(
          'grid grid-cols-[auto_1fr_auto] gap-3 items-center p-3 cursor-pointer transition-colors',
          selected ? 'bg-bekasi-cream/70' : 'hover:bg-bekasi-cream/40',
        )}
      >
        <div className="flex items-center gap-1.5">
          <div className="h-6 w-6 flex items-center justify-center text-bekasi-ink/30 hover:text-bekasi-emerald-900 cursor-grab active:cursor-grabbing">
            <GripVertical className="h-4 w-4" />
          </div>
          <div className="h-6 w-6 rounded-md inline-flex items-center justify-center text-[10.5px] font-medium"
               style={{ background: `${meta.color}18`, color: meta.color }}>
            {String(index + 1).padStart(2, '0')}
          </div>
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-[9.5px] uppercase tracking-[0.22em]" style={{ color: meta.color }}>{meta.label}</span>
            {!section.enabled && (
              <span className="text-[9.5px] uppercase tracking-[0.22em] text-bekasi-ink/45 inline-flex items-center gap-1">
                <EyeOff className="h-3 w-3" /> Hidden
              </span>
            )}
          </div>
          <div className={cn('mt-0.5 text-[13.5px] font-medium truncate', selected ? 'text-bekasi-emerald-900' : 'text-bekasi-ink/85')}>
            {section.label}
          </div>
          <div className="text-[11.5px] text-bekasi-ink/55 truncate">{section.description}</div>
        </div>

        <div className="flex flex-col items-center gap-1" onClick={(e) => e.stopPropagation()}>
          <div className="flex flex-col gap-0.5">
            <button onClick={onMoveUp} disabled={index === 0}
              className="h-5 w-5 rounded inline-flex items-center justify-center text-bekasi-ink/50 hover:text-bekasi-emerald-900 hover:bg-bekasi-emerald-900/[0.05] disabled:opacity-30 disabled:cursor-not-allowed">
              <ChevronUp className="h-3.5 w-3.5" />
            </button>
            <button onClick={onMoveDown} disabled={index === total - 1}
              className="h-5 w-5 rounded inline-flex items-center justify-center text-bekasi-ink/50 hover:text-bekasi-emerald-900 hover:bg-bekasi-emerald-900/[0.05] disabled:opacity-30 disabled:cursor-not-allowed">
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
          </div>
          <Toggle checked={section.enabled} onChange={onToggle} />
        </div>
      </div>
    </Reorder.Item>
  )
}

/* -------- SectionEditor -------- */
function SectionEditor({ section, onFieldChange, onFeaturedChange, onToggle }) {
  const meta = SECTION_KIND_META[section.kind] ?? { color: '#155F58', label: section.kind }
  return (
    <div>
      {/* Editor header */}
      <div className="px-6 py-4 border-b border-bekasi-emerald-900/8 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: meta.color }} />
            <span className="text-[10px] uppercase tracking-[0.22em]" style={{ color: meta.color }}>{meta.label}</span>
          </div>
          <h2 className="mt-0.5 font-sans font-semibold text-xl text-bekasi-emerald-900">{section.label}</h2>
          <p className="mt-1 text-[13px] text-bekasi-ink/60 max-w-2xl">{section.description}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[12px] text-bekasi-ink/60">{section.enabled ? 'Visible on homepage' : 'Hidden'}</span>
          <Toggle checked={section.enabled} onChange={onToggle} />
        </div>
      </div>

      <div className="p-6 space-y-8">
        {/* Fields */}
        <div>
          <div className="text-[10.5px] uppercase tracking-[0.22em] text-bekasi-gold-600 mb-3 inline-flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5" /> Content fields
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {section.fields.map((f) => (
              <FieldControl
                key={f.key}
                field={f}
                className={f.type === 'textarea' || f.type === 'media' ? 'md:col-span-2' : ''}
                onChange={(v) => onFieldChange(f.key, v)}
              />
            ))}
          </div>
        </div>

        {/* Featured content */}
        {section.featured && (
          <FeaturedSelector section={section} onChange={onFeaturedChange} />
        )}
      </div>
    </div>
  )
}

/* -------- FieldControl -------- */
function FieldControl({ field, onChange, className }) {
  const commonInput = 'h-11 rounded-md bg-white border-bekasi-emerald-900/15 focus-visible:ring-bekasi-emerald-500/30 focus-visible:border-bekasi-emerald-500'

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label className="text-[12px] font-medium text-bekasi-emerald-900 inline-flex items-center gap-1.5">
        {field.type === 'link' && <LinkIcon className="h-3 w-3 text-bekasi-ink/40" />}
        {field.type === 'media' && <ImageIcon className="h-3 w-3 text-bekasi-ink/40" />}
        {field.label}
        <span className="ml-1 text-[10px] uppercase tracking-[0.18em] text-bekasi-ink/40">{field.type}</span>
      </label>

      {field.type === 'textarea' && (
        <textarea
          value={field.value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className="min-h-[84px] w-full rounded-md border border-bekasi-emerald-900/15 bg-white p-3 text-sm text-bekasi-ink focus:outline-none focus:ring-2 focus:ring-bekasi-emerald-500/30 focus:border-bekasi-emerald-500 resize-y"
        />
      )}

      {(field.type === 'text' || field.type === 'link') && (
        <Input
          type={field.type === 'link' ? 'text' : 'text'}
          value={field.value}
          onChange={(e) => onChange(e.target.value)}
          className={commonInput}
        />
      )}

      {field.type === 'media' && (
        <MediaField value={field.value} onChange={onChange} />
      )}
    </div>
  )
}

function MediaField({ value, onChange }) {
  return (
    <div className="flex items-start gap-3">
      <div className="relative h-24 w-32 shrink-0 rounded-md overflow-hidden border border-bekasi-emerald-900/10 bg-bekasi-cream/40">
        {value && value.startsWith('http') ? (
          <Image src={value} alt="media preview" fill sizes="128px" className="object-cover" />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-bekasi-ink/30">
            <ImageIcon className="h-6 w-6" />
          </div>
        )}
      </div>
      <div className="flex-1 space-y-2">
        <Input value={value} onChange={(e) => onChange(e.target.value)} placeholder="Media URL or Cloudinary path"
          className="h-10 rounded-md bg-white border-bekasi-emerald-900/15 text-sm" />
        <div className="flex items-center gap-2">
          <button type="button" className="inline-flex items-center gap-1.5 rounded-md border border-bekasi-emerald-900/15 hover:border-bekasi-emerald-900/30 hover:bg-bekasi-emerald-900/[0.03] px-3 py-1.5 text-[12px] font-medium text-bekasi-emerald-900">
            <ImageIcon className="h-3.5 w-3.5" /> Open media library
          </button>
          {value && (
            <button type="button" onClick={() => onChange('')} className="text-[12px] text-bekasi-ink/55 hover:text-red-600">
              Clear
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

/* -------- FeaturedSelector -------- */
function FeaturedSelector({ section, onChange }) {
  const { type, slots, ids } = section.featured
  const pool = (CONTENT_POOL[type]?.() ?? [])
  const [picker, setPicker] = useState(false)

  const selected = ids.map((id) => pool.find((p) => p.id === id)).filter(Boolean)
  const available = pool.filter((p) => !ids.includes(p.id))

  const remove = (id) => onChange(ids.filter((x) => x !== id))
  const add    = (id) => { onChange([...ids, id]); setPicker(false) }

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div className="text-[10.5px] uppercase tracking-[0.22em] text-bekasi-gold-600 inline-flex items-center gap-2">
          <Layers className="h-3.5 w-3.5" /> Featured {type} · {ids.length}/{slots} slots
        </div>
        <button onClick={() => setPicker((v) => !v)} disabled={ids.length >= slots || available.length === 0}
          className="inline-flex items-center gap-1.5 rounded-md border border-bekasi-emerald-900/15 hover:border-bekasi-emerald-900/30 hover:bg-bekasi-emerald-900/[0.03] px-3 py-1.5 text-[12px] font-medium text-bekasi-emerald-900 disabled:opacity-40 disabled:cursor-not-allowed">
          <Plus className="h-3.5 w-3.5" /> Add item
        </button>
      </div>

      <div className="grid gap-2">
        <AnimatePresence>
          {selected.map((item, i) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-3 rounded-md border border-bekasi-emerald-900/8 bg-white p-2 pr-3"
            >
              <span className="text-[10.5px] font-mono text-bekasi-ink/40 w-4 text-right">{String(i + 1).padStart(2, '0')}</span>
              <div className="relative h-10 w-14 rounded overflow-hidden shrink-0">
                <Image src={item.image} alt={item.title} fill sizes="56px" className="object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[13px] text-bekasi-emerald-900 font-medium truncate">{item.title}</div>
                <div className="text-[10.5px] uppercase tracking-[0.18em] text-bekasi-ink/45 truncate">{item.id}</div>
              </div>
              <button onClick={() => remove(item.id)} className="h-7 w-7 rounded-md text-bekasi-ink/45 hover:text-red-600 hover:bg-red-50 inline-flex items-center justify-center">
                <X className="h-3.5 w-3.5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>

        {ids.length < slots && !picker && (
          <button onClick={() => setPicker(true)} className="w-full rounded-md border border-dashed border-bekasi-emerald-900/20 hover:border-bekasi-emerald-900/40 bg-bekasi-cream/40 hover:bg-bekasi-cream p-3 text-[12.5px] text-bekasi-ink/60 hover:text-bekasi-emerald-900 inline-flex items-center justify-center gap-2 transition-colors">
            <Plus className="h-3.5 w-3.5" /> Add item to slot {ids.length + 1}
          </button>
        )}

        {picker && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-md border border-bekasi-emerald-900/10 bg-bekasi-cream/60 p-3"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="text-[10.5px] uppercase tracking-[0.22em] text-bekasi-ink/55">Pick from {type} — {available.length} available</div>
              <button onClick={() => setPicker(false)} className="text-[11px] text-bekasi-ink/55 hover:text-bekasi-emerald-900">Cancel</button>
            </div>
            <div className="max-h-64 overflow-y-auto space-y-1.5">
              {available.slice(0, 20).map((item) => (
                <button key={item.id} onClick={() => add(item.id)}
                  className="w-full flex items-center gap-3 rounded-md bg-white hover:bg-bekasi-emerald-900/[0.03] border border-bekasi-emerald-900/8 p-2 pr-3 text-left transition-colors">
                  <div className="relative h-9 w-12 rounded overflow-hidden shrink-0">
                    <Image src={item.image} alt={item.title} fill sizes="48px" className="object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[13px] font-medium text-bekasi-emerald-900 truncate">{item.title}</div>
                    <div className="text-[10.5px] uppercase tracking-[0.18em] text-bekasi-ink/45 truncate">{item.id}</div>
                  </div>
                  <ArrowUpRight className="h-3.5 w-3.5 text-bekasi-ink/40" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

/* -------- Toggle switch -------- */
function Toggle({ checked, onChange }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className={cn(
        'relative h-5 w-9 rounded-full transition-colors inline-flex items-center',
        checked ? 'bg-bekasi-emerald-900' : 'bg-bekasi-emerald-900/15',
      )}
    >
      <span className={cn(
        'absolute h-4 w-4 rounded-full bg-white shadow-sm transition-transform',
        checked ? 'translate-x-4' : 'translate-x-0.5',
      )} />
      <span className="sr-only">{checked ? 'Hide section' : 'Show section'}</span>
    </button>
  )
}
