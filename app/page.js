import dynamic from 'next/dynamic'
import SiteHeader from '@/components/layout/SiteHeader'
import SiteFooter from '@/components/layout/SiteFooter'
import HeroVideo from '@/components/public/sections/HeroVideo'
import QuickExplore from '@/components/public/sections/QuickExplore'
import FloatingCityShowcase from '@/components/public/sections/FloatingCityShowcase'
import FeaturedIcons from '@/components/public/sections/FeaturedIcons'
import HeritageSpotlight from '@/components/public/sections/HeritageSpotlight'
import UrbanLifestyle from '@/components/public/sections/UrbanLifestyle'
import UtilityPreview from '@/components/public/sections/UtilityPreview'
import StoriesFromBekasi from '@/components/public/sections/StoriesFromBekasi'
import LatestBlog from '@/components/public/sections/LatestBlog'

// Optimize performance: lazy load heavy below-the-fold components using dynamic imports (safe for Server Components)
const CityPulse = dynamic(() => import('@/components/public/sections/CityPulse'), {
  loading: () => <div className="h-96 bg-bekasi-cream animate-pulse rounded-3xl" />
})

const PlannerIntro = dynamic(() => import('@/components/public/sections/PlannerIntro'), {
  loading: () => <div className="h-96 bg-bekasi-cream animate-pulse rounded-3xl" />
})

const MapPreview = dynamic(() => import('@/components/public/sections/MapPreview'), {
  loading: () => <div className="h-96 bg-bekasi-cream animate-pulse rounded-3xl" />
})

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
        {/* 7. Events / City Pulse (Lazy loaded) */}
        <CityPulse />
        {/* 8. Food / Stay / Access utility preview */}
        <UtilityPreview />
        {/* 9. Smart Trip Planner intro (Lazy loaded) */}
        <PlannerIntro />
        {/* 10. Explore Map preview (Lazy loaded) */}
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
