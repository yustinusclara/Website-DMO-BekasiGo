import { notFound } from 'next/navigation'
import AdminShell from '@/components/admin/AdminShell'
import EventForm from '@/components/admin/EventForm'
import { EVENTS } from '@/lib/content/events'

function seededStatus(id) {
  let h = 0; for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0
  return h % 100 < 22 ? 'draft' : 'published'
}

export const metadata = {
  title: 'Edit event — BekasiGo CMS',
  robots: { index: false, follow: false },
}

export default async function AdminEventsEditPage({ params }) {
  const { slug } = await params
  const evt = EVENTS.find((e) => e.slug === slug)
  if (!evt) notFound()

  const venueString = [evt.venue?.name, evt.venue?.district].filter(Boolean).join(', ')

  const initial = {
    slug: evt.slug,
    title: evt.title,
    summary: evt.excerpt ?? '',
    content: '',
    venue: venueString,
    startDate: evt.startDate ?? '',
    endDate: evt.endDate ?? '',
    time: evt.time ?? '',
    category: evt.category,
    tags: evt.tags ?? [],
    image: evt.image,
    ctaLabel: 'Get tickets',
    ctaUrl: '',
    status: seededStatus(evt.id),
    featured: !!evt.featured,
  }

  return (
    <AdminShell kicker="Events" title={`Editing: ${evt.title}`}>
      <EventForm mode="edit" initial={initial} />
    </AdminShell>
  )
}
