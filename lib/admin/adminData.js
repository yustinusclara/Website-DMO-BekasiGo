// Admin dashboard data — aggregated from existing content sources.
// Mock draft/published status is derived deterministically from item ids
// so the numbers stay stable between renders.

import { DESTINATIONS } from '@/lib/content/destinations'
import { EVENTS }        from '@/lib/content/events'
import { STORIES }       from '@/lib/content/stories'
import { BLOG_POSTS }    from '@/lib/content/blog'

function hash(str) {
  let h = 0
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0
  return h
}

// Deterministic draft flag — ~18% of items are drafts
function isDraft(item)     { return hash(item.id) % 100 < 18 }
function isScheduled(item) { return hash(item.id) % 100 >= 90 } // ~10%

function summarize(items, type, singular) {
  const drafts    = items.filter(isDraft)
  const scheduled = items.filter(isScheduled)
  const published = items.filter((i) => !isDraft(i) && !isScheduled(i))
  return {
    id: type,
    label: singular,
    total: items.length,
    published: published.length,
    drafts: drafts.length,
    scheduled: scheduled.length,
  }
}

export const CONTENT_STATS = [
  summarize(DESTINATIONS, 'destinations', 'Destinations'),
  summarize(EVENTS,       'events',       'Events'),
  summarize(STORIES,      'stories',      'Stories'),
  summarize(BLOG_POSTS,   'blog',         'Blog posts'),
]

// Rough week-over-week trend (mocked)
export const CONTENT_TRENDS = {
  destinations: { delta: +2, unit: 'this week' },
  events:       { delta: +3, unit: 'this week' },
  stories:      { delta: +1, unit: 'this week' },
  blog:         { delta: +4, unit: 'this week' },
}

// Combined recent edits feed — pull most-recent items across all content
// types, tagged with a mock editor and time-ago label.
const EDITORS = [
  { name: 'Aris Prasetyo',   initials: 'AP', color: '#B48A2D' },
  { name: 'Salma Prawira',    initials: 'SP', color: '#E27D5A' },
  { name: 'Rizki Andiansyah', initials: 'RA', color: '#1E7A72' },
  { name: 'BekasiGo Editorial', initials: 'BE', color: '#155F58' },
]

function editorFor(item) { return EDITORS[hash(item.id) % EDITORS.length] }

function agoLabelFor(item, seed = 0) {
  const mins = (hash(item.id + seed) % 360) + 5
  if (mins < 60)   return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24)    return `${hrs}h ago`
  return `${Math.floor(hrs / 24)}d ago`
}

function statusFor(item) {
  if (isDraft(item))     return 'draft'
  if (isScheduled(item)) return 'scheduled'
  return 'published'
}

function toEdit(item, type, hrefBuilder) {
  return {
    id:     `${type}-${item.id}`,
    type,
    title:  item.title,
    href:   hrefBuilder(item),
    editor: editorFor(item),
    ago:    agoLabelFor(item),
    status: statusFor(item),
  }
}

export const RECENT_EDITS = [
  ...DESTINATIONS.slice(0, 4).map((d) => toEdit(d, 'destinations', (x) => `/destinations/${x.slug}`)),
  ...EVENTS.slice(0, 3).map((e)       => toEdit(e, 'events',       (x) => `/events/${x.slug}`)),
  ...STORIES.slice(0, 3).map((s)      => toEdit(s, 'stories',      (x) => `/stories/${x.slug}`)),
  ...BLOG_POSTS.slice(0, 3).map((p)   => toEdit(p, 'blog',         (x) => `/blog/${x.slug}`)),
].sort((a, b) => a.ago.localeCompare(b.ago)).slice(0, 8)

// Upcoming scheduled items across content types.
export const UPCOMING_SCHEDULED = [
  ...EVENTS.filter(isScheduled),
  ...STORIES.filter(isScheduled),
  ...BLOG_POSTS.filter(isScheduled),
  ...DESTINATIONS.filter(isScheduled),
].slice(0, 4).map((item) => ({
  id: item.id,
  title: item.title,
  type: item.venue ? 'events' : item.subtitle && item.column ? 'stories' : item.category && item.excerpt ? (item.readTime?.includes('min read') ? 'blog' : 'destinations') : 'destinations',
  date: item.startDate ?? item.publishedAt ?? item.updatedAt ?? new Date().toISOString().slice(0, 10),
}))

export const TYPE_META = {
  destinations: { label: 'Destination', color: '#155F58', href: '/admin/destinations', newHref: '/admin/destinations/new' },
  events:       { label: 'Event',        color: '#E27D5A', href: '/admin/events',       newHref: '/admin/events/new' },
  stories:      { label: 'Story',        color: '#B48A2D', href: '/admin/stories',      newHref: '/admin/stories/new' },
  blog:         { label: 'Blog post',    color: '#1E7A72', href: '/admin/blog',         newHref: '/admin/blog/new' },
}

export const CURRENT_USER = {
  name: 'You',
  email: 'editor@bekasigo.id',
  role: 'Editor',
  initials: 'YO',
}
