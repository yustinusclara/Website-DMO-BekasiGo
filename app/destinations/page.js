import SiteHeader from '@/components/layout/SiteHeader'
import SiteFooter from '@/components/layout/SiteFooter'
import DestinationsHero from '@/components/sections/destinations/DestinationsHero'
import DestinationsExplorer from '@/components/sections/destinations/DestinationsExplorer'

export const metadata = {
  title: 'Destinations — BekasiGo',
  description:
    'Browse the full BekasiGo destination index. Heritage sites, urban icons, family spots, food institutions and more across Kota Bekasi.',
}

export default function DestinationsPage() {
  return (
    <div className="min-h-screen bg-bekasi-cream">
      <SiteHeader />
      <main>
        <DestinationsHero />
        <DestinationsExplorer />
      </main>
      <SiteFooter />
    </div>
  )
}
