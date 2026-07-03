import SiteHeader from '@/components/layout/SiteHeader'
import SiteFooter from '@/components/layout/SiteFooter'
import StoriesHero from '@/components/sections/stories/StoriesHero'
import StoriesCover from '@/components/sections/stories/StoriesCover'
import StoriesEditorial from '@/components/sections/stories/StoriesEditorial'
import StoriesByColumn from '@/components/sections/stories/StoriesByColumn'

export const metadata = {
  title: 'City Stories — The Bekasi Journal',
  description:
    'Long-form journalism from BekasiGo. Editorial writing on the neighborhoods, kitchens, rituals, and people that make Kota Bekasi worth writing about.',
}

export default function StoriesPage() {
  return (
    <div className="min-h-screen bg-bekasi-cream">
      <SiteHeader />
      <main>
        <StoriesHero />
        <StoriesCover />
        <StoriesEditorial />
        <StoriesByColumn />
      </main>
      <SiteFooter />
    </div>
  )
}
