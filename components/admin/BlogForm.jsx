'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  Save, ArrowLeft, Eye, Trash2, CheckCircle2, Search as SearchIcon,
  Link2, MapPin, CalendarDays, UtensilsCrossed, Loader2
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { BLOG_CATEGORIES } from '@/lib/content/blog'
import { DESTINATIONS } from '@/lib/content/destinations'
import { EVENTS } from '@/lib/content/events'
import {
  FormSection, Field, TextField, TextareaField, SelectField,
  SwitchField, TagsField, MediaField, RadioGroup, StatusPill, DateField,
  MultiSelectField,
} from '@/components/admin/forms/inputs'

function slugify(s) {
  return String(s ?? '').toLowerCase().trim()
    .replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-')
}

const DEFAULT_STATE = {
  slug: '',
  title: '',
  excerpt: '',
  content: '',
  cover: '',
  category: 'guides',
  tags: [],
  authorName: '',
  authorRole: '',
  publishedAt: '',
  updatedAt: '',
  featured: false,
  // Relations
  relatedDestinations: [],
  relatedEvents: [],
  relatedRestaurants: [], // freeform names (no dataset yet)
  // SEO
  seoTitle: '',
  seoDescription: '',
  canonical: '',
  //
  status: 'draft',
}

import { getSupabase } from '@/lib/supabase/client'
import { toast } from 'sonner'

export default function BlogForm({ mode = 'create', initial }) {
  const router = useRouter()
  const [state, setState] = useState(() => ({ ...DEFAULT_STATE, ...(initial ?? {}) }))
  const [errors, setErrors] = useState({})
  const [saved, setSaved]   = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const set = (patch) => { setState((prev) => ({ ...prev, ...patch })); setSaved(false) }

  const destOptions = DESTINATIONS.map((d) => ({ value: d.slug, label: d.title, hint: d.district }))
  const evtOptions  = EVENTS.map((e) => ({ value: e.slug, label: e.title, hint: e.venue?.district }))

  const validate = () => {
    const e = {}
    if (!state.title.trim())    e.title    = 'Title is required.'
    if (!state.slug.trim())     e.slug     = 'Slug is required.'
    if (!state.excerpt.trim())  e.excerpt  = 'Excerpt is required.'
    if (!state.content.trim())  e.content  = 'Content is required.'
    if (!state.cover)           e.cover    = 'A featured image is required to publish.'
    if (!state.authorName.trim()) e.authorName = 'Author name is required.'
    if (!state.publishedAt)     e.publishedAt = 'Publish date is required.'
    if (state.canonical && !/^https?:\/\//i.test(state.canonical)) e.canonical = 'Canonical URL must start with http(s)://'
    if (state.seoTitle && state.seoTitle.length > 70) e.seoTitle = 'Keep under 70 characters for best results.'
    if (state.seoDescription && state.seoDescription.length > 160) e.seoDescription = 'Keep under 160 characters for best results.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const submit = (nextStatus) => async (e) => {
    e?.preventDefault?.()
    if (nextStatus === 'published' && !validate()) {
      toast.error('Please correct form validation errors.')
      return
    }
    if (nextStatus === 'draft' && !state.title.trim()) {
      setErrors({ title: 'Title is required even for drafts.' })
      toast.error('Title is required even for drafts.')
      return
    }

    const payload = {
      slug: state.slug || slugify(state.title),
      title: state.title,
      excerpt: state.excerpt,
      content: state.content,
      cover_url: state.cover, // map state.cover (Cloudinary URL string) to cover_url
      category_id: state.category, // store string category ID
      tags: state.tags,
      author_name: state.authorName,
      author_role: state.authorRole,
      published_at: state.publishedAt ? new Date(state.publishedAt).toISOString().split('T')[0] : null,
      featured: !!state.featured,
      status: nextStatus,
      // relations
      body: [] // default empty rich text array
    }

    setSubmitting(true)
    const supabase = getSupabase()

    if (!supabase) {
      console.log('[BlogForm] Submit (Local mock):', payload)
      setSaved(true)
      setSubmitting(false)
      toast.success(`Post saved successfully as ${nextStatus} (Local mode)`)
      setTimeout(() => {
        setSaved(false)
        router.push('/admin/blog')
      }, 1500)
      return
    }

    try {
      let result;
      if (mode === 'create') {
        result = await supabase
          .from('blogs')
          .insert([payload])
          .select()
      } else {
        result = await supabase
          .from('blogs')
          .update(payload)
          .eq('slug', initial?.slug)
          .select()
      }

      if (result.error) throw result.error

      setSaved(true)
      toast.success(`Post saved successfully as ${nextStatus}`)
      setTimeout(() => {
        setSaved(false)
        router.push('/admin/blog')
      }, 1500)
    } catch (err) {
      console.error('[BlogForm] Database write error:', err)
      toast.error(err.message || 'Failed to save post to the database.')
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
          <Link href="/admin/blog" className="h-9 w-9 rounded-md inline-flex items-center justify-center text-bekasi-ink/55 hover:text-bekasi-emerald-900 hover:bg-bekasi-emerald-900/[0.05]">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <div className="text-[10.5px] uppercase tracking-[0.22em] text-bekasi-gold-600">
              {mode === 'create' ? 'New blog post' : 'Editing post'}
            </div>
            <div className="font-sans font-semibold text-[15px] text-bekasi-emerald-900 truncate max-w-md">
              {state.title || 'Untitled post'}
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
            <a href={`/blog/${state.slug}`} target="_blank" rel="noreferrer">
              <Button variant="outline" className="h-9 rounded-md border-bekasi-emerald-900/15 text-bekasi-emerald-900 hover:bg-bekasi-emerald-900/[0.03] px-3 gap-2 text-[13px]">
                <Eye className="h-3.5 w-3.5" /> Preview
              </Button>
            </a>
          )}
          <Button type="button" variant="outline" onClick={submit('draft')} disabled={submitting}
            className="h-9 rounded-md border-bekasi-emerald-900/15 text-bekasi-emerald-900 hover:bg-bekasi-emerald-900/[0.03] px-3 gap-2 text-[13px]">
            {submitting ? 'Saving...' : 'Save as draft'}
          </Button>
          <Button type="button" onClick={submit('published')} disabled={submitting}
            className="h-9 rounded-md bg-bekasi-emerald-900 hover:bg-bekasi-emerald-800 text-white px-4 gap-2 text-[13px]">
            {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            {state.status === 'published' ? 'Save & Publish' : 'Publish'}
          </Button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-4">
          <FormSection kicker="Basics" title="Title and identity" description="Practical, SEO-focused writing — different from City Stories.">
            <Field label="Title" required error={errors.title} htmlFor="title">
              <TextField id="title" value={state.title} onChange={onTitleChange} placeholder="e.g. The perfect weekend in Bekasi: a 48-hour guide" />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Slug" required error={errors.slug} hint="URL identifier. Auto-generated from title, editable." htmlFor="slug">
                <TextField id="slug" prefix="/blog/" value={state.slug} onChange={(v) => set({ slug: slugify(v) })} placeholder="perfect-weekend-in-bekasi" />
              </Field>
              <Field label="Category" required>
                <SelectField value={state.category} onChange={(v) => set({ category: v })}
                  options={BLOG_CATEGORIES.filter((c) => c.id !== 'all').map((c) => ({ value: c.id, label: c.label }))} />
              </Field>
            </div>
            <Field label="Tags" hint="Free-form keywords used for search and related content.">
              <TagsField tags={state.tags} onChange={(t) => set({ tags: t })} />
            </Field>
          </FormSection>

          <FormSection kicker="Content" title="Excerpt and body">
            <Field label="Excerpt" required error={errors.excerpt} hint="Shown on post cards and share previews. 140–220 characters recommended.">
              <TextareaField value={state.excerpt} onChange={(v) => set({ excerpt: v })} rows={3}
                placeholder="A short summary that will appear in cards and search results." />
            </Field>
            <Field label="Content" required error={errors.content} hint="The full post body.">
              <TextareaField value={state.content} onChange={(v) => set({ content: v })} rows={16}
                placeholder="Write the post here — use ## for headings, > for quotes, and blank lines to separate paragraphs." />
            </Field>
          </FormSection>

          <FormSection kicker="Media" title="Featured image">
            <Field label="Featured image" required error={errors.cover} hint="Used on cards, share previews, and the post hero (16:10).">
              <MediaField value={state.cover} onChange={(v) => set({ cover: v })} />
            </Field>
          </FormSection>

          <FormSection kicker="Byline" title="Author" description="Blog posts have a team byline — different from City Stories' personal editor bylines.">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Author name" required error={errors.authorName}>
                <TextField value={state.authorName} onChange={(v) => set({ authorName: v })} placeholder="e.g. BekasiGo Editorial" />
              </Field>
              <Field label="Author role" hint="E.g. Guides team, News desk, City Editor.">
                <TextField value={state.authorRole} onChange={(v) => set({ authorRole: v })} placeholder="Guides team" />
              </Field>
            </div>
          </FormSection>

          <FormSection
            kicker="Related content"
            title={<span className="inline-flex items-center gap-2"><Link2 className="h-4 w-4 text-bekasi-emerald-700" /> Cross-link with BekasiGo</span>}
            description="Pick destinations, events, and restaurants that appear on the post detail page — boosts internal SEO and reader engagement."
          >
            <Field label={<span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> Related destinations</span>} hint="Shown as a ‘Places mentioned’ rail on the post detail page.">
              <MultiSelectField value={state.relatedDestinations} onChange={(v) => set({ relatedDestinations: v })}
                options={destOptions} placeholder="Search destinations by name…" />
            </Field>
            <Field label={<span className="inline-flex items-center gap-1.5"><CalendarDays className="h-3.5 w-3.5" /> Related events</span>} hint="Upcoming events referenced by this post.">
              <MultiSelectField value={state.relatedEvents} onChange={(v) => set({ relatedEvents: v })}
                options={evtOptions} placeholder="Search events by name…" />
            </Field>
            <Field label={<span className="inline-flex items-center gap-1.5"><UtensilsCrossed className="h-3.5 w-3.5" /> Related restaurants</span>} hint="Free-form names — restaurant directory coming soon.">
              <TagsField tags={state.relatedRestaurants} onChange={(t) => set({ relatedRestaurants: t })} />
            </Field>
          </FormSection>

          <FormSection
            kicker="SEO"
            title={<span className="inline-flex items-center gap-2"><SearchIcon className="h-4 w-4 text-bekasi-emerald-700" /> Search & sharing</span>}
            description="Blog posts are SEO-first. Canonical URL is important when the post is re-syndicated on another site."
          >
            <Field label="SEO title" error={errors.seoTitle} hint={`${state.seoTitle.length}/70 characters recommended.`}>
              <TextField value={state.seoTitle} onChange={(v) => set({ seoTitle: v })} placeholder="Falls back to the post title." />
            </Field>
            <Field label="SEO description" error={errors.seoDescription} hint={`${state.seoDescription.length}/160 characters recommended.`}>
              <TextareaField value={state.seoDescription} onChange={(v) => set({ seoDescription: v })} rows={2}
                placeholder="Short summary shown in Google search results." />
            </Field>
            <Field label="Canonical URL" error={errors.canonical} hint="Optional. Point Google to the original URL when this post is a cross-post.">
              <TextField value={state.canonical} onChange={(v) => set({ canonical: v })} placeholder="https://bekasigo.id/blog/…" />
            </Field>
          </FormSection>
        </div>

        {/* Sticky sidebar */}
        <aside className="space-y-4 lg:sticky lg:top-32 self-start">
          <FormSection kicker="Publishing" title="Status and schedule">
            <RadioGroup value={state.status} onChange={(v) => set({ status: v })}
              options={[
                { value: 'draft',     label: 'Draft',      description: 'Hidden from the public site.' },
                { value: 'published', label: 'Published',  description: 'Live on the public site.' },
              ]}
            />
            <Field label="Publish date" required error={errors.publishedAt} hint="Used to sort the blog index.">
              <DateField value={state.publishedAt} onChange={(v) => set({ publishedAt: v })} />
            </Field>
            <Field label="Last updated" hint="Optional. Shows ‘Updated on…’ on the post.">
              <DateField value={state.updatedAt} onChange={(v) => set({ updatedAt: v })} />
            </Field>
            <SwitchField
              label="Featured post"
              description="Featured posts appear in the blog hero rail and homepage editorial."
              checked={state.featured}
              onChange={(v) => set({ featured: v })}
            />
          </FormSection>

          {mode === 'edit' && (
            <FormSection kicker="Danger zone" title="Delete" description="Permanent removal. Cannot be undone.">
              <button type="button" className="w-full h-10 rounded-md border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 text-[13px] font-medium inline-flex items-center justify-center gap-2">
                <Trash2 className="h-4 w-4" /> Delete post
              </button>
            </FormSection>
          )}
        </aside>
      </div>
    </form>
  )
}
