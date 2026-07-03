'use client'

import { useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Plus, ImageIcon, Link as LinkIcon, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'

/* Section wrapper */
export function FormSection({ title, kicker, description, children, className }) {
  return (
    <section className={cn('rounded-xl border border-bekasi-emerald-900/8 bg-white overflow-hidden', className)}>
      <div className="px-5 md:px-6 py-4 border-b border-bekasi-emerald-900/8">
        {kicker && <div className="text-[10.5px] uppercase tracking-[0.22em] text-bekasi-gold-600">{kicker}</div>}
        <div className="mt-0.5 font-sans font-semibold text-[15px] text-bekasi-emerald-900">{title}</div>
        {description && <div className="mt-0.5 text-[12.5px] text-bekasi-ink/60">{description}</div>}
      </div>
      <div className="p-5 md:p-6 space-y-5">{children}</div>
    </section>
  )
}

/* Field wrapper */
export function Field({ label, hint, error, required, htmlFor, children, className }) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label && (
        <label htmlFor={htmlFor} className="text-[12px] font-medium text-bekasi-emerald-900 flex items-center gap-1">
          {label}{required && <span className="text-red-500">*</span>}
        </label>
      )}
      {children}
      {hint && !error && <div className="text-[11px] text-bekasi-ink/50">{hint}</div>}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -2 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -2 }}
            className="flex items-center gap-1.5 text-[11.5px] text-red-600"
          >
            <AlertCircle className="h-3 w-3" /> {error}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const inputCls = 'h-10 rounded-md bg-white border-bekasi-emerald-900/15 focus-visible:ring-bekasi-emerald-500/30 focus-visible:border-bekasi-emerald-500'

/* Text / Number */
export function TextField({ value, onChange, prefix, ...props }) {
  return prefix ? (
    <div className="flex items-stretch rounded-md border border-bekasi-emerald-900/15 bg-white overflow-hidden focus-within:ring-2 focus-within:ring-bekasi-emerald-500/30 focus-within:border-bekasi-emerald-500 h-10">
      <span className="inline-flex items-center px-3 text-[12.5px] text-bekasi-ink/55 bg-bekasi-cream/60 border-r border-bekasi-emerald-900/10 whitespace-nowrap select-none">{prefix}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 min-w-0 bg-transparent px-3 text-sm text-bekasi-ink placeholder:text-bekasi-ink/40 focus:outline-none"
        {...props}
      />
    </div>
  ) : (
    <Input value={value} onChange={(e) => onChange(e.target.value)} className={inputCls} {...props} />
  )
}

export function NumberField({ value, onChange, min, max, step = 'any', ...props }) {
  return (
    <Input type="number" value={value ?? ''} onChange={(e) => onChange(e.target.value === '' ? '' : Number(e.target.value))}
      min={min} max={max} step={step} className={inputCls} {...props} />
  )
}

/* Date (yyyy-mm-dd) */
export function DateField({ value, onChange, ...props }) {
  return (
    <Input type="date" value={value ?? ''} onChange={(e) => onChange(e.target.value)}
      className={inputCls} {...props} />
  )
}

/* Textarea */
export function TextareaField({ value, onChange, rows = 4, ...props }) {
  return (
    <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={rows}
      className="w-full rounded-md border border-bekasi-emerald-900/15 bg-white p-3 text-sm text-bekasi-ink placeholder:text-bekasi-ink/40 focus:outline-none focus:ring-2 focus:ring-bekasi-emerald-500/30 focus:border-bekasi-emerald-500 resize-y"
      {...props} />
  )
}

/* Select */
export function SelectField({ value, onChange, options }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}
      className="h-10 rounded-md border border-bekasi-emerald-900/15 bg-white px-3 text-sm text-bekasi-ink focus:outline-none focus:ring-2 focus:ring-bekasi-emerald-500/30 focus:border-bekasi-emerald-500">
      {options.map((o) => (
        <option key={o.value ?? o.id} value={o.value ?? o.id}>{o.label}</option>
      ))}
    </select>
  )
}

/* MultiSelect — pick multiple items from a fixed list of options.
   options: [{ value, label, hint? }]
   value: array of selected value strings
*/
export function MultiSelectField({ value = [], onChange, options, placeholder = 'Search and add…', emptyLabel = 'No matches.' }) {
  const [query, setQuery] = useState('')
  const [open, setOpen]   = useState(false)
  const selectedSet = new Set(value)
  const available = options.filter((o) => {
    if (selectedSet.has(o.value)) return false
    if (!query.trim()) return true
    return o.label.toLowerCase().includes(query.trim().toLowerCase())
  })
  const selectedItems = value.map((v) => options.find((o) => o.value === v)).filter(Boolean)

  const add = (v) => { onChange([...value, v]); setQuery(''); setOpen(false) }
  const remove = (v) => onChange(value.filter((x) => x !== v))

  return (
    <div className="space-y-2">
      {selectedItems.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {selectedItems.map((item) => (
            <span key={item.value}
              className="inline-flex items-center gap-1.5 rounded-full bg-bekasi-emerald-900/8 text-bekasi-emerald-900 pl-2.5 pr-1 py-0.5 text-[12px] font-medium">
              {item.label}
              <button type="button" onClick={() => remove(item.value)}
                className="h-4 w-4 inline-flex items-center justify-center rounded-full hover:bg-bekasi-emerald-900/15">
                <X className="h-2.5 w-2.5" />
              </button>
            </span>
          ))}
        </div>
      )}
      <div className="relative">
        <input
          value={query}
          onFocus={() => setOpen(true)}
          onChange={(e) => { setQuery(e.target.value); setOpen(true) }}
          placeholder={placeholder}
          className={cn(inputCls, 'w-full px-3 border border-bekasi-emerald-900/15')}
        />
        {open && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
            <div className="absolute left-0 right-0 top-full mt-1 z-20 max-h-56 overflow-auto rounded-md border border-bekasi-emerald-900/15 bg-white shadow-lg">
              {available.length === 0 ? (
                <div className="px-3 py-3 text-[12.5px] text-bekasi-ink/50">{emptyLabel}</div>
              ) : (
                available.slice(0, 30).map((o) => (
                  <button key={o.value} type="button" onClick={() => add(o.value)}
                    className="w-full text-left px-3 py-2 hover:bg-bekasi-cream inline-flex items-center gap-2">
                    <Plus className="h-3.5 w-3.5 text-bekasi-emerald-700 shrink-0" />
                    <span className="text-[13px] text-bekasi-ink truncate">{o.label}</span>
                    {o.hint && <span className="ml-auto text-[11px] text-bekasi-ink/45 truncate">{o.hint}</span>}
                  </button>
                ))
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
/* Switch */
export function SwitchField({ checked, onChange, label, description }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-md border border-bekasi-emerald-900/10 bg-bekasi-cream/30 px-4 py-3">
      <div className="min-w-0">
        <div className="text-[13px] font-medium text-bekasi-emerald-900">{label}</div>
        {description && <div className="text-[11.5px] text-bekasi-ink/55 mt-0.5">{description}</div>}
      </div>
      <button role="switch" aria-checked={checked} onClick={() => onChange(!checked)}
        className={cn('relative h-5 w-9 rounded-full transition-colors inline-flex items-center shrink-0',
          checked ? 'bg-bekasi-emerald-900' : 'bg-bekasi-emerald-900/15')}>
        <span className={cn('absolute h-4 w-4 rounded-full bg-white shadow-sm transition-transform',
          checked ? 'translate-x-4' : 'translate-x-0.5')} />
      </button>
    </div>
  )
}

/* Radio group */
export function RadioGroup({ value, onChange, options }) {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {options.map((o) => {
        const active = o.value === value
        return (
          <button key={o.value} type="button" onClick={() => onChange(o.value)}
            className={cn('rounded-md border p-3 text-left transition-all',
              active
                ? 'border-bekasi-emerald-900 bg-bekasi-emerald-900/[0.04]'
                : 'border-bekasi-emerald-900/12 hover:border-bekasi-emerald-900/25 bg-white')}>
            <div className="flex items-center gap-2">
              <span className={cn('h-3.5 w-3.5 rounded-full border-2', active ? 'border-bekasi-emerald-900 bg-bekasi-emerald-900' : 'border-bekasi-emerald-900/30')} />
              <span className="text-[13px] font-medium text-bekasi-emerald-900">{o.label}</span>
            </div>
            {o.description && <div className="mt-1 text-[11.5px] text-bekasi-ink/55 pl-5">{o.description}</div>}
          </button>
        )
      })}
    </div>
  )
}

/* Tags */
export function TagsField({ tags = [], onChange, placeholder = 'Type and press Enter…' }) {
  const [draft, setDraft] = useState('')
  const addTag = () => {
    const v = draft.trim().toLowerCase()
    if (!v || tags.includes(v)) return
    onChange([...tags, v])
    setDraft('')
  }
  return (
    <div className="flex flex-wrap items-center gap-1.5 rounded-md border border-bekasi-emerald-900/15 bg-white p-2 min-h-[44px]">
      {tags.map((t) => (
        <span key={t} className="inline-flex items-center gap-1 rounded-md bg-bekasi-emerald-900/[0.06] text-bekasi-emerald-900 pl-2 pr-1 py-0.5 text-xs">
          #{t}
          <button onClick={() => onChange(tags.filter((x) => x !== t))} className="h-4 w-4 rounded hover:bg-red-100 hover:text-red-600 inline-flex items-center justify-center">
            <X className="h-3 w-3" />
          </button>
        </span>
      ))}
      <input value={draft} onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTag() } }}
        placeholder={placeholder}
        className="flex-1 min-w-[120px] bg-transparent text-sm placeholder:text-bekasi-ink/40 focus:outline-none px-1" />
    </div>
  )
}

/* Media (single) */
export function MediaField({ value, onChange, aspect = '4/3' }) {
  return (
    <div className="flex items-start gap-3">
      <div className="relative shrink-0 rounded-md overflow-hidden border border-bekasi-emerald-900/10 bg-bekasi-cream/40"
        style={{ aspectRatio: aspect, width: 128 }}>
        {value && value.startsWith('http') ? (
          <Image src={value} alt="preview" fill sizes="128px" className="object-cover" />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-bekasi-ink/30">
            <ImageIcon className="h-6 w-6" />
          </div>
        )}
      </div>
      <div className="flex-1 space-y-2">
        <Input value={value ?? ''} onChange={(e) => onChange(e.target.value)} placeholder="Media URL" className={cn(inputCls, 'text-[13px]')} />
        <div className="flex items-center gap-2">
          <button type="button" className="inline-flex items-center gap-1.5 rounded-md border border-bekasi-emerald-900/15 hover:border-bekasi-emerald-900/30 hover:bg-bekasi-emerald-900/[0.03] px-3 py-1.5 text-[12px] font-medium text-bekasi-emerald-900">
            <ImageIcon className="h-3.5 w-3.5" /> Media library
          </button>
          {value && <button type="button" onClick={() => onChange('')} className="text-[12px] text-bekasi-ink/55 hover:text-red-600">Clear</button>}
        </div>
      </div>
    </div>
  )
}

/* Gallery (multi) */
export function GalleryField({ items = [], onChange }) {
  const [draft, setDraft] = useState('')
  return (
    <div>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
        {items.map((src, i) => (
          <div key={i} className="group relative aspect-square rounded-md overflow-hidden border border-bekasi-emerald-900/10 bg-bekasi-cream">
            {src.startsWith('http') && <Image src={src} alt="" fill sizes="120px" className="object-cover" />}
            <button onClick={() => onChange(items.filter((_, x) => x !== i))}
              className="absolute top-1 right-1 h-6 w-6 rounded-md bg-white/95 text-red-600 opacity-0 group-hover:opacity-100 inline-flex items-center justify-center shadow-sm">
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
        <label className="group relative aspect-square rounded-md border border-dashed border-bekasi-emerald-900/25 hover:border-bekasi-emerald-900/50 hover:bg-bekasi-cream cursor-pointer inline-flex items-center justify-center transition-colors">
          <Plus className="h-5 w-5 text-bekasi-ink/40 group-hover:text-bekasi-emerald-900" />
        </label>
      </div>
      <div className="mt-3 flex items-center gap-2">
        <div className="relative flex-1">
          <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-bekasi-ink/40" />
          <Input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Paste media URL and press Enter"
            onKeyDown={(e) => { if (e.key === 'Enter' && draft.trim()) { onChange([...items, draft.trim()]); setDraft('') } }}
            className={cn(inputCls, 'pl-9 text-[13px]')} />
        </div>
        <button type="button" onClick={() => { if (draft.trim()) { onChange([...items, draft.trim()]); setDraft('') } }}
          className="h-10 px-4 rounded-md bg-bekasi-emerald-900 text-white text-[13px] font-medium hover:bg-bekasi-emerald-800">Add</button>
      </div>
    </div>
  )
}

/* Status pill */
export function StatusPill({ status }) {
  const styles = {
    published: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    draft:     'bg-bekasi-gold-500/12 text-bekasi-gold-700 border-bekasi-gold-500/30',
  }
  return (
    <span className={cn('inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[10.5px] font-medium uppercase tracking-[0.18em]', styles[status] ?? styles.draft)}>
      {status === 'published' && <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />}
      {status === 'draft' && <span className="h-1.5 w-1.5 rounded-full bg-bekasi-gold-500" />}
      {status}
    </span>
  )
}
