import { notFound } from 'next/navigation'
import SiteHeader from '@/components/layout/SiteHeader'
import SiteFooter from '@/components/layout/SiteFooter'
import EventHero from '@/components/sections/events/detail/EventHero'
import EventOverview from '@/components/sections/events/detail/EventOverview'
import EventMap from '@/components/sections/events/detail/EventMap'
import EventPlannerCTA from '@/components/sections/events/detail/EventPlannerCTA'
import RelatedEvents from '@/components/sections/events/detail/RelatedEvents'
import { getEventBySlug, getRelatedEvents, EVENTS } from '@/lib/content/events'

export async function generateStaticParams() {
  return EVENTS.map((e) => ({ slug: e.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const e = getEventBySlug(slug)
  if (!e) return { title: 'Not found — BekasiGo' }
  return {
    title: `${e.title} — Events · BekasiGo`,
    description: e.excerpt,
    openGraph: {
      title: e.title,
      description: e.excerpt,
      images: [e.image],
    },
  }
}

export default async function EventDetailPage({ params }) {
  const { slug } = await params
  const evt = getEventBySlug(slug)
  if (!evt) notFound()
  const related = getRelatedEvents(evt, 3)

  return (
    <div className="min-h-screen bg-bekasi-cream">
      <SiteHeader />
      <main>
        <EventHero evt={evt} />
        <EventOverview evt={evt} />
        <EventMap evt={evt} />
        <EventPlannerCTA evt={evt} />
        <RelatedEvents items={related} currentTitle={evt.title} />
      </main>
      <SiteFooter />
    </div>
  )
}
