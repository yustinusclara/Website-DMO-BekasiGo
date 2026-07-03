import SiteHeader from '@/components/layout/SiteHeader'
import SiteFooter from '@/components/layout/SiteFooter'
import DiscoverHero from '@/components/sections/discover/DiscoverHero'
import CityPositioning from '@/components/sections/discover/CityPositioning'
import CategoryGrid from '@/components/sections/discover/CategoryGrid'
import FeaturedHighlights from '@/components/sections/discover/FeaturedHighlights'
import CityFacts from '@/components/sections/discover/CityFacts'
import CTAPaths from '@/components/sections/discover/CTAPaths'

export const metadata = {
  title: 'Discover Bekasi — BekasiGo',
  description:
    'The official overview of Kota Bekasi. Explore heritage, food, urban lifestyle, and the neighborhoods that shape a city rewriting its own story.',
}

export default function DiscoverPage() {
  return (
    <div className="min-h-screen bg-bekasi-cream">
      <SiteHeader />
      <main>
        {/* 1. Overview hero */}
        <DiscoverHero />
        {/* 2. City positioning — editorial narrative */}
        <CityPositioning />
        {/* 3. Category-led exploration */}
        <CategoryGrid />
        {/* 4. Featured highlights */}
        <FeaturedHighlights />
        {/* 5. City facts / numbers */}
        <CityFacts />
        {/* 6. CTA paths into destinations / events / planner / map */}
        <CTAPaths />
      </main>
      <SiteFooter />
    </div>
  )
}
