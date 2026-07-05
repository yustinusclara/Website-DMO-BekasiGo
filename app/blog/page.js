import SiteHeader from '@/components/layout/SiteHeader'
import SiteFooter from '@/components/layout/SiteFooter'
import BlogHero from '@/components/public/pages/blog/BlogHero'
import BlogFeatured from '@/components/public/pages/blog/BlogFeatured'
import BlogExplorer from '@/components/public/pages/blog/BlogExplorer'

export const metadata = {
  title: 'Blog — BekasiGo',
  description:
    'Practical writing from the BekasiGo city desk: guides, news, tips, openings, and updates for exploring Kota Bekasi.',
}

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-bekasi-cream">
      <SiteHeader />
      <main>
        <BlogHero />
        <BlogFeatured />
        <BlogExplorer />
        
        {/* Editorial cross-link banner */}
        <section className="bg-bekasi-emerald-950 text-white py-12 border-t border-white/5">
          <div className="container flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="font-serif text-lg md:text-xl text-bekasi-gold-400">Looking for long-form features, kitchen profiles, and rituals?</h4>
              <p className="text-sm text-white/70 mt-1">Read our monthly issue on the people and narratives shaping Kota Bekasi.</p>
            </div>
            <Link href="/stories" className="px-5 py-2.5 bg-white text-bekasi-emerald-950 rounded-full font-medium text-sm hover:bg-bekasi-gold-400 hover:text-bekasi-emerald-950 transition-colors inline-flex items-center gap-2 shrink-0">
              Explore City Stories <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
