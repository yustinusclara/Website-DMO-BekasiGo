import SiteHeader from '@/components/layout/SiteHeader'
import SiteFooter from '@/components/layout/SiteFooter'
import StoriesHero from '@/components/public/pages/stories/StoriesHero'
import StoriesCover from '@/components/public/pages/stories/StoriesCover'
import StoriesEditorial from '@/components/public/pages/stories/StoriesEditorial'
import StoriesByColumn from '@/components/public/pages/stories/StoriesByColumn'

export const metadata = {
  title: 'City Stories — The Bekasi Journal',
  description:
    'Long-form journalism from BekasiGo. Editorial writing on the neighborhoods, kitchens, rituals, and people that make Kota Bekasi worth writing about.',
}

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function StoriesPage() {
  return (
    <div className="min-h-screen bg-bekasi-cream">
      <SiteHeader />
      <main>
        <StoriesHero />
        <StoriesCover />
        <StoriesEditorial />
        <StoriesByColumn />
        
        {/* Editorial cross-link banner */}
        <section className="bg-bekasi-emerald-950 text-white py-12 border-t border-white/5">
          <div className="container flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="font-serif text-lg md:text-xl text-bekasi-gold-400">Looking for weekly guides, news, and cafe openings?</h4>
              <p className="text-sm text-white/70 mt-1">Check out our rolling Notebook for practical updates from the city desk.</p>
            </div>
            <Link href="/blog" className="px-5 py-2.5 bg-white text-bekasi-emerald-950 rounded-full font-medium text-sm hover:bg-bekasi-gold-400 hover:text-bekasi-emerald-950 transition-colors inline-flex items-center gap-2 shrink-0">
              Read the Blog <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
