'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import {
  ArrowLeft, Save, Cloud, CheckCircle2, AlertCircle, Video as VideoIcon,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  FormSection, Field, TextField, TextareaField, SelectField, TagsField,
} from '@/components/admin/forms/inputs'
import { MEDIA_CATEGORIES } from '@/lib/admin/media'
import { cn } from '@/lib/utils'

function inferType(url) {
  if (!url) return 'image'
  const clean = url.split('?')[0].toLowerCase()
  if (/\.(mp4|mov|webm|mpeg|mpg|avi|wmv|flv)$/.test(clean)) return 'video'
  if (/\/video\/upload\//.test(clean)) return 'video'
  return 'image'
}

const DEFAULT_STATE = {
  url: '',
  name: '',
  category: 'landmark',
  tags: [],
  altText: '',
  usedIn: '',
}

export default function MediaAssetForm() {
  const router = useRouter()
  const [state, setState] = useState(DEFAULT_STATE)
  const [errors, setErrors] = useState({})
  const [saved, setSaved]   = useState(false)

  const set = (patch) => { setState((prev) => ({ ...prev, ...patch })); setSaved(false) }

  const type = inferType(state.url)
  const previewOk = state.url && /^https?:\/\//i.test(state.url)

  const validate = () => {
    const e = {}
    if (!state.url.trim())  e.url  = 'Cloudinary URL is required.'
    else if (!/^https?:\/\//i.test(state.url)) e.url = 'URL must start with http(s)://'
    if (!state.name.trim()) e.name = 'Display name is required.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const submit = (e) => {
    e?.preventDefault?.()
    if (!validate()) return
    const payload = { ...state, type, id: state.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') }
    console.log('[MediaAssetForm] Add asset:', payload)
    setSaved(true)
    setTimeout(() => { setSaved(false); router.push('/admin/media') }, 900)
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      {/* Action bar */}
      <div className="sticky top-16 z-10 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-bekasi-emerald-900/8 bg-white px-4 py-3">
        <div className="flex items-center gap-3">
          <Link href="/admin/media" className="h-9 w-9 rounded-md inline-flex items-center justify-center text-bekasi-ink/55 hover:text-bekasi-emerald-900 hover:bg-bekasi-emerald-900/[0.05]">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <div className="text-[10.5px] uppercase tracking-[0.22em] text-bekasi-gold-600">New media asset</div>
            <div className="font-sans font-semibold text-[15px] text-bekasi-emerald-900 truncate max-w-md">
              {state.name || 'Untitled asset'}
            </div>
          </div>
          <span className={cn('inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10.5px] uppercase tracking-[0.18em] font-medium',
            type === 'video' ? 'bg-orange-50 text-orange-700 border border-orange-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200')}>
            {type === 'video' ? <VideoIcon className="h-3 w-3" /> : <Cloud className="h-3 w-3" />} {type}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <AnimatePresence>
            {saved && (
              <motion.span initial={{ opacity: 0, y: -2 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="inline-flex items-center gap-1 rounded-md bg-emerald-50 text-emerald-700 px-2 py-1 text-[11.5px] font-medium">
                <CheckCircle2 className="h-3.5 w-3.5" /> Added
              </motion.span>
            )}
          </AnimatePresence>
          <Button type="submit"
            className="h-9 rounded-md bg-bekasi-emerald-900 hover:bg-bekasi-emerald-800 text-white px-4 gap-2 text-[13px]">
            <Save className="h-4 w-4" /> Add to library
          </Button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-4">
          <FormSection kicker="Cloudinary source" title="Paste a Cloudinary URL" description="BekasiGo uses a single Cloudinary source. Upload files directly in the Cloudinary console, then paste the public URL here.">
            <Field label="Cloudinary URL" required error={errors.url} hint="Full public URL. Supports both /image/upload/ and /video/upload/ variants.">
              <TextField value={state.url} onChange={(v) => set({ url: v })} placeholder="https://res.cloudinary.com/…" />
            </Field>
            <Field label="Display name" required error={errors.name} hint="How the asset is identified in the CMS.">
              <TextField value={state.name} onChange={(v) => set({ name: v })} placeholder="e.g. Klenteng Hok Lay Kiong — courtyard" />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Category" hint="Used for filter/search in the media grid.">
                <SelectField value={state.category} onChange={(v) => set({ category: v })}
                  options={MEDIA_CATEGORIES.filter((c) => c.id !== 'all').map((c) => ({ value: c.id, label: c.label }))} />
              </Field>
              <Field label="Used in" hint="Optional. E.g. Destinations · Events.">
                <TextField value={state.usedIn} onChange={(v) => set({ usedIn: v })} placeholder="Destinations · Homepage" />
              </Field>
            </div>
            <Field label="Tags" hint="Free-form keywords used by search.">
              <TagsField tags={state.tags} onChange={(t) => set({ tags: t })} />
            </Field>
            <Field label="Alt text" hint="Accessibility. Describe the image concisely.">
              <TextareaField value={state.altText} onChange={(v) => set({ altText: v })} rows={2}
                placeholder="An interior view of the Klenteng courtyard with red lanterns." />
            </Field>
          </FormSection>

          {errors.url && !previewOk && (
            <div className="rounded-md border border-red-200 bg-red-50 text-red-700 px-4 py-3 text-[13px] inline-flex items-center gap-2">
              <AlertCircle className="h-4 w-4" /> Preview will appear when a valid URL is entered.
            </div>
          )}
        </div>

        {/* Live preview */}
        <aside className="lg:sticky lg:top-32 self-start">
          <div className="rounded-xl border border-bekasi-emerald-900/8 bg-white overflow-hidden">
            <div className="px-5 py-3 border-b border-bekasi-emerald-900/8">
              <div className="text-[10.5px] uppercase tracking-[0.22em] text-bekasi-gold-600">Live preview</div>
              <div className="font-sans font-semibold text-[15px] text-bekasi-emerald-900">Cloudinary asset</div>
            </div>
            <div className="relative aspect-[4/3] bg-bekasi-cream">
              {previewOk
                ? (type === 'image'
                    ? <Image src={state.url} alt={state.altText || state.name || 'preview'} fill sizes="400px" className="object-cover" unoptimized />
                    : <video src={state.url} controls muted playsInline className="absolute inset-0 w-full h-full object-cover" />)
                : <div className="absolute inset-0 inline-flex items-center justify-center text-bekasi-ink/40 text-[12.5px]">
                    <div className="text-center">
                      <Cloud className="h-8 w-8 mx-auto mb-2 opacity-40" />
                      Paste a Cloudinary URL to preview.
                    </div>
                  </div>}
            </div>
            {previewOk && (
              <div className="p-4 text-[11.5px] text-bekasi-ink/70 space-y-1 font-mono break-all">
                {state.url}
              </div>
            )}
          </div>
        </aside>
      </div>
    </form>
  )
}
