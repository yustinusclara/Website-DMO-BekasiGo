'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  Save, ArrowLeft, Eye, Trash2, CheckCircle2, Search as SearchIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { STORY_COLUMNS } from '@/lib/content/stories'
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
  excerpt: '',
  content: '',
  heroImage: '',
  column: 'heritage',
  tags: [],
  publishedAt: '',
  authorName: '',
  authorRole: '',
  readTime: '',
  // SEO
  seoTitle: '',
  seoDescription: '',
  seoKeywords: '',
  seoImage: '',
  //
  status: 'draft',
  featured: false,
}

export default function StoryForm({ mode = 'create', initial }) {
  const router = useRouter()
  const [state, setState] = useState(() => ({ ...DEFAULT_STATE, ...(initial ?? {}) }))
  const [errors, setErrors] = useState({})
  const [saved, setSaved]   = useState(false)

  const set = (patch) => { setState((prev) => ({ ...prev, ...patch })); setSaved(false) }

  const validate = () => {
    const e = {}
    if (!state.title.trim())      e.title      = 'Title is required.'
    if (!state.slug.trim())       e.slug       = 'Slug is required.'
    if (!state.excerpt.trim())    e.excerpt    = 'Excerpt is required.'
    if (!state.content.trim())    e.content    = 'Content is required.'
    if (!state.heroImage)         e.heroImage  = 'A hero image is required to publish.'
    if (!state.publishedAt)       e.publishedAt = 'Publish date is required.'
    if (state.seoTitle && state.seoTitle.length > 70) e.seoTitle = 'Keep under 70 characters for best results.'
    if (state.seoDescription && state.seoDescription.length > 160) e.seoDescription = 'Keep under 160 characters for best results.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const submit = (nextStatus) => (e) => {
    e?.preventDefault?.()
    if (nextStatus === 'published' && !validate()) return
    if (nextStatus === 'draft' && !state.title.trim()) { setErrors({ title: 'Title is required even for drafts.' }); return }
    const payload = { ...state, status: nextStatus, slug: state.slug || slugify(state.title) }
    console.log('[StoryForm] Submit:', payload)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
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
          <Link href="/admin/stories" className="h-9 w-9 rounded-md inline-flex items-center justify-center text-bekasi-ink/55 hover:text-bekasi-emerald-900 hover:bg-bekasi-emerald-900/[0.05]">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <div className="text-[10.5px] uppercase tracking-[0.22em] text-bekasi-gold-600">
              {mode === 'create' ? 'New story' : 'Editing'}
            </div>
            <div className="font-sans font-semibold text-[15px] text-bekasi-emerald-900 truncate max-w-md">
              {state.title || 'Untitled story'}
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
            <a href={`/stories/${state.slug}`} target="_blank" rel="noreferrer">
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
          <FormSection kicker="Basics" title="Title and identity" description="How the story appears in the magazine and share cards.">
            <Field label="Title" required error={errors.title} htmlFor="title">
              <TextField id="title" value={state.title} onChange={onTitleChange} placeholder="e.g. The return of the Kranggan ritual." />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Slug" required error={errors.slug} hint="URL identifier. Auto-generated from title, editable." htmlFor="slug">
                <TextField id="slug" prefix="/stories/" value={state.slug} onChange={(v) => set({ slug: slugify(v) })} placeholder="return-of-kranggan-ritual" />
              </Field>
              <Field label="Column" required hint="The editorial column (Heritage, Voices, Places, People, Kitchen).">
                <SelectField value={state.column} onChange={(v) => set({ column: v })}
                  options={STORY_COLUMNS.filter((c) => c.id !== 'all').map((c) => ({ value: c.id, label: c.label }))} />
              </Field>
            </div>
            <Field label="Tags" hint="Free-form keywords used for search and related content.">
              <TagsField tags={state.tags} onChange={(t) => set({ tags: t })} />
            </Field>
          </FormSection>

          <FormSection kicker="Content" title="Excerpt and body">
            <Field label="Excerpt" required error={errors.excerpt} hint="Shown on story cards and share previews. 140–220 characters recommended.">
              <TextareaField value={state.excerpt} onChange={(v) => set({ excerpt: v })} rows={3}
                placeholder="A magnetic one-paragraph hook that captures the story." />
            </Field>
            <Field label="Content" required error={errors.content} hint="The full story body. Paragraphs separated by blank lines.">
              <TextareaField value={state.content} onChange={(v) => set({ content: v })} rows={16}
                placeholder="Write the story here — lede, body, subheadings, quotes…" />
            </Field>
          </FormSection>

          <FormSection kicker="Media" title="Hero image">
            <Field label="Hero image" required error={errors.heroImage} hint="Used as the cover image on cards and the detail page (16:10).">
              <MediaField value={state.heroImage} onChange={(v) => set({ heroImage: v })} />
            </Field>
          </FormSection>

          <FormSection kicker="Byline" title="Author and reading time" description="Optional — shown at the top of the story.">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Author name">
                <TextField value={state.authorName} onChange={(v) => set({ authorName: v })} placeholder="e.g. Aris Prasetyo" />
              </Field>
              <Field label="Author role">
                <TextField value={state.authorRole} onChange={(v) => set({ authorRole: v })} placeholder="Contributing Editor" />
              </Field>
            </div>
            <Field label="Read time" hint="Free-form, e.g. 6 min read.">
              <TextField value={state.readTime} onChange={(v) => set({ readTime: v })} placeholder="6 min read" />
            </Field>
          </FormSection>

          <FormSection
            kicker="SEO"
            title={<span className="inline-flex items-center gap-2"><SearchIcon className="h-4 w-4 text-bekasi-emerald-700" /> Search metadata</span>}
            description="Optional but recommended — controls how the story looks in Google and social shares. Falls back to Title + Excerpt if empty."
          >
            <Field label="SEO title" error={errors.seoTitle} hint={`${state.seoTitle.length}/70 characters recommended.`}>
              <TextField value={state.seoTitle} onChange={(v) => set({ seoTitle: v })} placeholder="Falls back to the story title." />
            </Field>
            <Field label="SEO description" error={errors.seoDescription} hint={`${state.seoDescription.length}/160 characters recommended.`}>
              <TextareaField value={state.seoDescription} onChange={(v) => set({ seoDescription: v })} rows={2}
                placeholder="Short summary shown under the title in search results." />
            </Field>
            <Field label="Keywords" hint="Comma-separated. Only used by internal search and hints.">
              <TextField value={state.seoKeywords} onChange={(v) => set({ seoKeywords: v })} placeholder="heritage, kampung, ritual" />
            </Field>
            <Field label="Social share image" hint="Optional. Falls back to the hero image if empty. Recommended 1200×630.">
              <MediaField value={state.seoImage} onChange={(v) => set({ seoImage: v })} />
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
            <Field label="Publish date" required error={errors.publishedAt} hint="Used to sort the magazine timeline.">
              <DateField value={state.publishedAt} onChange={(v) => set({ publishedAt: v })} />
            </Field>
            <SwitchField
              label="Featured story"
              description="Featured stories appear in the hero carousel of the magazine."
              checked={state.featured}
              onChange={(v) => set({ featured: v })}
            />
          </FormSection>

          {mode === 'edit' && (
            <FormSection kicker="Danger zone" title="Delete" description="Permanent removal. Cannot be undone.">
              <button type="button" className="w-full h-10 rounded-md border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 text-[13px] font-medium inline-flex items-center justify-center gap-2">
                <Trash2 className="h-4 w-4" /> Delete story
              </button>
            </FormSection>
          )}
        </aside>
      </div>
    </form>
  )
}
