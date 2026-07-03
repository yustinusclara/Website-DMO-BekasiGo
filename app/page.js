import SiteHeader from '@/components/layout/SiteHeader'
import SiteFooter from '@/components/layout/SiteFooter'
import HeroVideo from '@/components/sections/HeroVideo'
import QuickExplore from '@/components/sections/QuickExplore'
import FloatingCityShowcase from '@/components/sections/FloatingCityShowcase'
import FeaturedIcons from '@/components/sections/FeaturedIcons'
import HeritageSpotlight from '@/components/sections/HeritageSpotlight'
import UrbanLifestyle from '@/components/sections/UrbanLifestyle'
import CityPulse from '@/components/sections/CityPulse'
import UtilityPreview from '@/components/sections/UtilityPreview'
import PlannerIntro from '@/components/sections/PlannerIntro'
import MapPreview from '@/components/sections/MapPreview'
import StoriesFromBekasi from '@/components/sections/StoriesFromBekasi'
import LatestBlog from '@/components/sections/LatestBlog'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-bekasi-cream">
      <SiteHeader />
      <main>
        {/* 1. Hero Video (Kota Bekasi Floating City) */}
        <HeroVideo />
        {/* 2. Quick Explore (overlaps hero) */}
        <QuickExplore />
        {/* 3. Signature Floating City */}
        <FloatingCityShowcase />
        {/* 4. Featured Icons of Bekasi */}
        <FeaturedIcons />
        {/* 5. Heritage & Culture Spotlight */}
        <HeritageSpotlight />
        {/* 6. Urban Lifestyle */}
        <UrbanLifestyle />
        {/* 7. Events / City Pulse */}
        <CityPulse />
        {/* 8. Food / Stay / Access utility preview */}
        <UtilityPreview />
        {/* 9. Smart Trip Planner intro */}
        <PlannerIntro />
        {/* 10. Explore Map preview */}
        <MapPreview />
        {/* 11. Stories from Bekasi */}
        <StoriesFromBekasi />
        {/* 12. Latest from Blog */}
        <LatestBlog />
      </main>
      {/* 13. Footer */}
      <SiteFooter />
    </div>
  )
}
