'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  Save, ArrowLeft, Eye, Trash2, CheckCircle2,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { getSupabase } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { EVENT_CATEGORIES } from '@/lib/content/events'
import {
  FormSection, Field, TextField, TextareaField, SelectField,
  SwitchField, TagsField, MediaField, RadioGroup, StatusPill, DateField,
} from '@/components/admin/forms/inputs'

function slugify(s) {
  return String(s ?? '').toLowerCase().trim()
    .replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-')
}

const DEFAULT_STATE = {
  slug: '',
  title: '',
  summary: '',
  content: '',
  venue: '',
  startDate: '',
  endDate: '',
  time: '',
  category: 'festival',
  tags: [],
  image: '',
  ctaLabel: 'Get tickets',
  ctaUrl: '',
  status: 'draft',
  featured: false,
}

export default function EventForm({ mode = 'create', initial }) {
  const router = useRouter()
  const [state, setState] = useState(() => ({ ...DEFAULT_STATE, ...(initial ?? {}) }))
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [saved, setSaved]   = useState(false)

  const set = (patch) => { setState((prev) => ({ ...prev, ...patch })); setSaved(false) }

  const validate = () => {
    const e = {}
    if (!state.title.trim())      e.title      = 'Title is required.'
    if (!state.slug.trim())       e.slug       = 'Slug is required.'
    if (!state.summary.trim())    e.summary    = 'Summary is required.'
    if (!state.venue.trim())      e.venue      = 'Venue is required.'
    if (!state.startDate)         e.startDate  = 'Start date is required.'
    if (state.endDate && state.startDate && new Date(state.endDate) < new Date(state.startDate)) {
      e.endDate = 'End date must be after start date.'
    }
    if (!state.image)             e.image      = 'A featured image is required to publish.'
    if (state.ctaUrl && !/^https?:\/\//i.test(state.ctaUrl)) e.ctaUrl = 'CTA URL must start with http(s)://'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const submit = (nextStatus) => async (e) => {
    e?.preventDefault?.()
    if (nextStatus === 'published' && !validate()) {
      toast.error('Please fix form validation errors.')
      return
    }
    if (nextStatus === 'draft' && !state.title.trim()) {
      setErrors({ title: 'Title is required even for drafts.' })
      toast.error('Title is required.')
      return
    }

    const payload = {
      slug: state.slug || slugify(state.title),
      title: state.title,
      summary: state.summary,
      content: state.content,
      venue_name: state.venue,
      start_date: state.startDate,
      end_date: state.endDate || null,
      time_display: state.time,
      category: state.category,
      tags: state.tags,
      image_url: state.image, // Cloudinary image url mapped to database
      cta_label: state.ctaLabel,
      cta_url: state.ctaUrl,
      featured: !!state.featured,
      status: nextStatus,
      body: []
    }

    setSubmitting(true)
    const supabase = getSupabase()

    if (!supabase) {
      console.log('[EventForm] Submit (Local mock):', payload)
      setSaved(true)
      setSubmitting(false)
      toast.success(`Event saved successfully as ${nextStatus} (Local mode)`)
      setTimeout(() => {
        setSaved(false)
        router.push('/admin/events')
      }, 1500)
      return
    }

    try {
      let result;
      if (mode === 'create') {
        result = await supabase
          .from('events')
          .insert([payload])
          .select()
      } else {
        result = await supabase
          .from('events')
          .update(payload)
          .eq('slug', initial?.slug)
          .select()
      }

      if (result.error) throw result.error

      setSaved(true)
      toast.success(`Event saved successfully as ${nextStatus}`)
      setTimeout(() => {
        setSaved(false)
        router.push('/admin/events')
      }, 1500)
    } catch (err) {
      console.error('[EventForm] Save error:', err)
      toast.error(err.message || 'Failed to save event to Supabase.')
    } finally {
      setSubmitting(false)
    }
  }

  const onTitleChange = (v) => {
    const currentAutoSlug = slugify(state.title)
    set({ title: v, ...(mode === 'create' && (state.slug === '' || state.slug === currentAutoSlug) ? { slug: slugify(v) } : {}) })
  }

  return (
    <form onSubmit={submit(state.status)} className="space-y-4">
      {/* Action bar */}
      <div className="sticky top-16 z-10 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-bekasi-emerald-900/8 bg-white px-4 py-3">
        <div className="flex items-center gap-3">
          <Link href="/admin/events" className="h-9 w-9 rounded-md inline-flex items-center justify-center text-bekasi-ink/55 hover:text-bekasi-emerald-900 hover:bg-bekasi-emerald-900/[0.05]">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <div className="text-[10.5px] uppercase tracking-[0.22em] text-bekasi-gold-600">
              {mode === 'create' ? 'New event' : 'Editing'}
            </div>
            <div className="font-sans font-semibold text-[15px] text-bekasi-emerald-900 truncate max-w-md">
              {state.title || 'Untitled event'}
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
            <a href={`/events/${state.slug}`} target="_blank" rel="noreferrer">
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
          <FormSection kicker="Basics" title="Title and identity" description="How the event appears on cards, listings, and social shares.">
            <Field label="Title" required error={errors.title} htmlFor="title">
              <TextField id="title" value={state.title} onChange={onTitleChange} placeholder="e.g. Bekasi Cultural Festival 2026" />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Slug" required error={errors.slug} hint="URL identifier. Auto-generated from title, editable." htmlFor="slug">
                <TextField id="slug" prefix="/events/" value={state.slug} onChange={(v) => set({ slug: slugify(v) })} placeholder="bekasi-cultural-festival-2026" />
              </Field>
              <Field label="Category" required>
                <SelectField value={state.category} onChange={(v) => set({ category: v })}
                  options={EVENT_CATEGORIES.filter((c) => c.id !== 'all').map((c) => ({ value: c.id, label: c.label }))} />
              </Field>
            </div>
            <Field label="Tags" hint="Free-form keywords used for search and related-content.">
              <TagsField tags={state.tags} onChange={(t) => set({ tags: t })} />
            </Field>
          </FormSection>

          <FormSection kicker="Content" title="Summary and full description">
            <Field label="Summary" required error={errors.summary} hint="Shows on event cards. Aim for 120–200 characters.">
              <TextareaField value={state.summary} onChange={(v) => set({ summary: v })} rows={2}
                placeholder="A one-sentence pitch that appears on cards and share previews." />
            </Field>
            <Field label="Content" hint="Long description shown on the event detail page. Supports paragraphs.">
              <TextareaField value={state.content} onChange={(v) => set({ content: v })} rows={8}
                placeholder="Tell the full story of the event — program, highlights, why to come." />
            </Field>
          </FormSection>

          <FormSection kicker="Schedule" title="Date and time" description="Powers the “when” filters and the countdown badge on the site.">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Event start" required error={errors.startDate}>
                <DateField value={state.startDate} onChange={(v) => set({ startDate: v })} />
              </Field>
              <Field label="Event end" error={errors.endDate} hint="Leave empty for single-day events.">
                <DateField value={state.endDate} onChange={(v) => set({ endDate: v })} />
              </Field>
            </div>
            <Field label="Time (display)" hint="Free-form, e.g. 10:00 – 22:00 WIB or Every Sunday 07:00–10:00.">
              <TextField value={state.time} onChange={(v) => set({ time: v })} placeholder="10:00 – 22:00 WIB" />
            </Field>
          </FormSection>

          <FormSection kicker="Location" title="Venue" description="Where the event happens — shown on the detail page.">
            <Field label="Venue" required error={errors.venue} hint="Full venue label, e.g. Alun-Alun Kota Bekasi, Bekasi Timur.">
              <TextField value={state.venue} onChange={(v) => set({ venue: v })} placeholder="Alun-Alun Kota Bekasi, Bekasi Timur" />
            </Field>
          </FormSection>

          <FormSection kicker="Media" title="Featured image">
            <Field label="Featured image" required error={errors.image} hint="Used on event cards, hero images, and previews (16:10).">
              <MediaField value={state.image} onChange={(v) => set({ image: v })} />
            </Field>
          </FormSection>

          <FormSection kicker="Call to action" title="Primary button" description="Rendered on the detail page — use for ticket sales, registration, or RSVP.">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="CTA label" hint="E.g. Get tickets, Register, RSVP.">
                <TextField value={state.ctaLabel} onChange={(v) => set({ ctaLabel: v })} placeholder="Get tickets" />
              </Field>
              <Field label="CTA URL" error={errors.ctaUrl} hint="External link. Leave empty to hide the button.">
                <TextField value={state.ctaUrl} onChange={(v) => set({ ctaUrl: v })} placeholder="https://tickets.example.com/…" />
              </Field>
            </div>
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
              description="Featured events appear in the Events carousel and hero rotation."
              checked={state.featured}
              onChange={(v) => set({ featured: v })}
            />
          </FormSection>

          {mode === 'edit' && (
            <FormSection kicker="Danger zone" title="Delete" description="Permanent removal. Cannot be undone.">
              <button type="button" className="w-full h-10 rounded-md border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 text-[13px] font-medium inline-flex items-center justify-center gap-2">
                <Trash2 className="h-4 w-4" /> Delete event
              </button>
            </FormSection>
          )}
        </aside>
      </div>
    </form>
  )
}
