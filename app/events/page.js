import SiteHeader from '@/components/layout/SiteHeader'
import SiteFooter from '@/components/layout/SiteFooter'
import EventsHero from '@/components/sections/events/EventsHero'
import EventsFeatured from '@/components/sections/events/EventsFeatured'
import EventsExplorer from '@/components/sections/events/EventsExplorer'

export const metadata = {
  title: 'Events — BekasiGo',
  description:
    'Every festival, concert, market and cultural event happening across Kota Bekasi. The official BekasiGo events calendar.',
}

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-bekasi-cream">
      <SiteHeader />
      <main>
        <EventsHero />
        <EventsFeatured />
        <EventsExplorer />
      </main>
      <SiteFooter />
    </div>
  )
}
