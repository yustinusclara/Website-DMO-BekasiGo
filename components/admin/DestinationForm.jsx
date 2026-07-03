'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Save, ArrowLeft, Eye, Trash2, Sparkles, CheckCircle2, AlertCircle,
  MapPin, Building2, Clock as ClockIcon, ImageIcon, Layers, Home,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  DEST_CATEGORIES, DEST_DISTRICTS,
} from '@/lib/content/destinations'
import {
  FormSection, Field, TextField, TextareaField, SelectField,
  SwitchField, TagsField, NumberField, MediaField, GalleryField, RadioGroup, StatusPill,
} from '@/components/admin/forms/inputs'

function slugify(s) {
  return String(s ?? '').toLowerCase().trim()
    .replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-')
}

const DEFAULT_STATE = {
  slug: '',
  title: '',
  excerpt: '',
  description: '',
  category: 'heritage',
  district: 'bekasi-selatan',
  tags: [],
  coords: { lat: -6.2383, lng: 106.9756 },
  hours: '',
  duration: '1–2 hrs',
  bestTime: 'Weekend mornings',
  familyFriendly: true,
  environment: 'outdoor',
  plannerPriority: 50,
  image: '',
  gallery: [],
  status: 'draft',
  featured: false,
}

export default function DestinationForm({ mode = 'create', initial }) {
  const router = useRouter()
  const [state, setState] = useState(() => ({ ...DEFAULT_STATE, ...(initial ?? {}) }))
  const [errors, setErrors] = useState({})
  const [saved, setSaved]   = useState(false)

  const set = (patch) => { setState((prev) => ({ ...prev, ...patch })); setSaved(false) }
  const setDeep = (path, value) => {
    setState((prev) => {
      const next = { ...prev }
      const keys = path.split('.')
      let cur = next
      for (let i = 0; i < keys.length - 1; i++) { cur[keys[i]] = { ...cur[keys[i]] }; cur = cur[keys[i]] }
      cur[keys.at(-1)] = value
      return next
    })
    setSaved(false)
  }

  const validate = () => {
    const e = {}
    if (!state.title.trim())    e.title    = 'Title is required.'
    if (!state.slug.trim())     e.slug     = 'Slug is required.'
    if (!state.excerpt.trim())  e.excerpt  = 'Short description is required.'
    if (!state.image)           e.image    = 'A featured image is required to publish.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const submit = (nextStatus) => (e) => {
    e?.preventDefault?.()
    // If publishing, run full validation; drafts can be looser
    if (nextStatus === 'published' && !validate()) return
    if (nextStatus === 'draft' && !state.title.trim()) { setErrors({ title: 'Title is required even for drafts.' }); return }

    const payload = { ...state, status: nextStatus, slug: state.slug || slugify(state.title) }
    // eslint-disable-next-line no-console
    console.log('[DestinationForm] Submit:', payload)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const onTitleChange = (v) => {
    // Auto-suggest slug when creating and slug not manually edited
    const currentAutoSlug = slugify(state.title)
    set({ title: v, ...(mode === 'create' && (state.slug === '' || state.slug === currentAutoSlug) ? { slug: slugify(v) } : {}) })
  }

  return (
    <form onSubmit={submit(state.status)} className="space-y-4">
      {/* Action bar */}
      <div className="sticky top-16 z-10 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-bekasi-emerald-900/8 bg-white px-4 py-3">
        <div className="flex items-center gap-3">
          <Link href="/admin/destinations" className="h-9 w-9 rounded-md inline-flex items-center justify-center text-bekasi-ink/55 hover:text-bekasi-emerald-900 hover:bg-bekasi-emerald-900/[0.05]">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <div className="text-[10.5px] uppercase tracking-[0.22em] text-bekasi-gold-600">
              {mode === 'create' ? 'New destination' : 'Editing'}
            </div>
            <div className="font-sans font-semibold text-[15px] text-bekasi-emerald-900 truncate max-w-md">
              {state.title || 'Untitled destination'}
            </div>
          </div>
          <StatusPill status={state.status} />
        </div>
        <div className="flex items-center gap-2">
          {saved && (
            <motion.span initial={{ opacity: 0, y: -2 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-1 rounded-md bg-emerald-50 text-emerald-700 px-2 py-1 text-[11.5px] font-medium">
              <CheckCircle2 className="h-3.5 w-3.5" /> Saved
            </motion.span>
          )}
          {state.slug && (
            <a href={`/destinations/${state.slug}`} target="_blank" rel="noreferrer">
              <Button variant="outline" className="h-9 rounded-md border-bekasi-emerald-900/15 text-bekasi-emerald-900 hover:bg-bekasi-emerald-900/[0.03] px-3 gap-2 text-[13px]">
                <Eye className="h-3.5 w-3.5" /> Preview
              </Button>
            </a>
          )}
          <Button type="button" variant="outline" onClick={submit('draft')}
            className="h-9 rounded-md border-bekasi-emerald-900/15 text-bekasi-emerald-900 hover:bg-bekasi-emerald-900/[0.03] px-3 gap-2 text-[13px]">
            Save as draft
          </Button>
          <Button type="button" onClick={submit('published')}
            className="h-9 rounded-md bg-bekasi-emerald-900 hover:bg-bekasi-emerald-800 text-white px-4 gap-2 text-[13px]">
            <Save className="h-4 w-4" /> {state.status === 'published' ? 'Save & Publish' : 'Publish'}
          </Button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-4">
          <FormSection kicker="Basics" title="Title and identity" description="How the destination appears everywhere on the site.">
            <Field label="Title" required error={errors.title} htmlFor="title">
              <TextField id="title" value={state.title} onChange={onTitleChange} placeholder="e.g. Klenteng Hok Lay Kiong" />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Slug" required error={errors.slug} hint="URL identifier. Auto-generated from title, editable." htmlFor="slug">
                <TextField id="slug" prefix="/destinations/" value={state.slug} onChange={(v) => set({ slug: slugify(v) })} placeholder="hok-lay-kiong" />
              </Field>
              <Field label="Category" required>
                <SelectField value={state.category} onChange={(v) => set({ category: v })}
                  options={DEST_CATEGORIES.filter((c) => c.id !== 'all').map((c) => ({ value: c.id, label: c.label }))} />
              </Field>
            </div>
            <Field label="Tags" hint="Free-form keywords used for search and related-content.">
              <TagsField tags={state.tags} onChange={(t) => set({ tags: t })} />
            </Field>
          </FormSection>

          <FormSection kicker="Descriptions" title="Short + long description">
            <Field label="Short description" required error={errors.excerpt} hint="Used in cards and previews. Aim for 120–180 characters.">
              <TextareaField value={state.excerpt} onChange={(v) => set({ excerpt: v })} rows={2}
                placeholder="A one-sentence summary that shows on cards." />
            </Field>
            <Field label="Long description" hint="Shown on the destination detail page.">
              <TextareaField value={state.description} onChange={(v) => set({ description: v })} rows={6}
                placeholder="Tell the story of the place — history, atmosphere, why it matters." />
            </Field>
          </FormSection>

          <FormSection kicker="Location" title="District and coordinates" description="Powers the map preview, directions link, and district filters.">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="District" required>
                <SelectField value={state.district} onChange={(v) => set({ district: v })}
                  options={DEST_DISTRICTS.filter((d) => d.id !== 'all').map((d) => ({ value: d.id, label: d.label }))} />
              </Field>
              <div />
              <Field label="Latitude" hint="WGS84. Example: -6.2383">
                <NumberField value={state.coords.lat} onChange={(v) => setDeep('coords.lat', v)} step="any" />
              </Field>
              <Field label="Longitude" hint="WGS84. Example: 106.9756">
                <NumberField value={state.coords.lng} onChange={(v) => setDeep('coords.lng', v)} step="any" />
              </Field>
            </div>
          </FormSection>

          <FormSection kicker="Visit info" title="When and how to visit">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Opening hours" hint="Free-form, e.g. Mon–Sun 08:00–22:00">
                <TextField value={state.hours} onChange={(v) => set({ hours: v })} placeholder="Daily 08:00–22:00" />
              </Field>
              <Field label="Estimated duration">
                <TextField value={state.duration} onChange={(v) => set({ duration: v })} placeholder="1–2 hrs" />
              </Field>
            </div>
            <Field label="Best time to visit" hint="E.g. weekday mornings, or golden hour after 17:00.">
              <TextField value={state.bestTime} onChange={(v) => set({ bestTime: v })} placeholder="Weekday mornings" />
            </Field>

            <div className="grid gap-4 sm:grid-cols-2">
              <SwitchField
                label="Family friendly"
                description="Shown in the family filter and used by the planner."
                checked={state.familyFriendly}
                onChange={(v) => set({ familyFriendly: v })}
              />
              <Field label="Indoor / Outdoor" hint="Affects weather-aware planner logic.">
                <RadioGroup value={state.environment} onChange={(v) => set({ environment: v })}
                  options={[
                    { value: 'indoor',  label: 'Indoor',  description: 'Sheltered, weather-independent.' },
                    { value: 'outdoor', label: 'Outdoor', description: 'Open-air, weather-dependent.' },
                    { value: 'mixed',   label: 'Mixed',   description: 'Both indoor and outdoor areas.' },
                  ]}
                />
              </Field>
            </div>
          </FormSection>

          <FormSection kicker="Media" title="Featured image and gallery">
            <Field label="Featured image" required error={errors.image} hint="Used on cards, hero images, and previews (16:10).">
              <MediaField value={state.image} onChange={(v) => set({ image: v })} />
            </Field>
            <Field label="Gallery" hint="Optional additional photos for the detail page.">
              <GalleryField items={state.gallery} onChange={(g) => set({ gallery: g })} />
            </Field>
          </FormSection>
        </div>

        {/* Sticky sidebar */}
        <aside className="space-y-4 lg:sticky lg:top-32 self-start">
          <FormSection kicker="Publishing" title="Status">
            <RadioGroup value={state.status} onChange={(v) => set({ status: v })}
              options={[
                { value: 'draft',     label: 'Draft',      description: 'Hidden from the public site.' },
                { value: 'published', label: 'Published',  description: 'Live on the public site.' },
              ]}
            />
            <SwitchField
              label="Featured on homepage"
              description="Featured items appear in the Icons carousel and hero rotation."
              checked={state.featured}
              onChange={(v) => set({ featured: v })}
            />
          </FormSection>

          <FormSection kicker="Planner" title="Priority score" description="Higher scores get picked first by the AI planner.">
            <div className="flex items-center gap-4">
              <input type="range" min={0} max={100} step={5}
                value={state.plannerPriority}
                onChange={(e) => set({ plannerPriority: Number(e.target.value) })}
                className="flex-1 accent-bekasi-emerald-900" />
              <span className="font-sans font-semibold text-lg text-bekasi-emerald-900 tabular-nums w-10 text-right">{state.plannerPriority}</span>
            </div>
            <div className="flex items-center justify-between text-[10.5px] uppercase tracking-[0.18em] text-bekasi-ink/45">
              <span>Rarely picked</span>
              <span>Always picked</span>
            </div>
          </FormSection>

          {mode === 'edit' && (
            <FormSection kicker="Danger zone" title="Delete" description="Permanent removal. Cannot be undone.">
              <button type="button" className="w-full h-10 rounded-md border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 text-[13px] font-medium inline-flex items-center justify-center gap-2">
                <Trash2 className="h-4 w-4" /> Delete destination
              </button>
            </FormSection>
          )}
        </aside>
      </div>
    </form>
  )
}
