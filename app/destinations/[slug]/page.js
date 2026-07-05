import { notFound } from 'next/navigation'
import SiteHeader from '@/components/layout/SiteHeader'
import SiteFooter from '@/components/layout/SiteFooter'
import DestinationHero from '@/components/public/pages/destinations/detail/DestinationHero'
import DestinationOverview from '@/components/public/pages/destinations/detail/DestinationOverview'
import DestinationMap from '@/components/public/pages/destinations/detail/DestinationMap'
import PlannerCTAStrip from '@/components/public/pages/destinations/detail/PlannerCTAStrip'
import RelatedDestinations from '@/components/public/pages/destinations/detail/RelatedDestinations'
import {
  getDestinationBySlug,
  getRelatedDestinations,
  DESTINATIONS,
} from '@/lib/content/destinations'

// Pre-render all known destination slugs at build time.
export async function generateStaticParams() {
  return DESTINATIONS.map((d) => ({ slug: d.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const dest = getDestinationBySlug(slug)
  if (!dest) return { title: 'Not found — BekasiGo' }
  return {
    title: `${dest.title} — BekasiGo`,
    description: dest.excerpt,
    openGraph: {
      title: dest.title,
      description: dest.excerpt,
      images: [dest.image],
    },
  }
}

export default async function DestinationDetailPage({ params }) {
  const { slug } = await params
  const dest = getDestinationBySlug(slug)
  if (!dest) notFound()

  const related = getRelatedDestinations(dest, 4)

  return (
    <div className="min-h-screen bg-bekasi-cream">
      <SiteHeader />
      <main>
        <DestinationHero dest={dest} />
        <DestinationOverview dest={dest} />
        <DestinationMap dest={dest} />
        <PlannerCTAStrip dest={dest} />
        <RelatedDestinations items={related} currentTitle={dest.title} />
      </main>
      <SiteFooter />
    </div>
  )
}
