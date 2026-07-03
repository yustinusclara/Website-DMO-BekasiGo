import SiteHeader from '@/components/layout/SiteHeader'
import SiteFooter from '@/components/layout/SiteFooter'
import BlogHero from '@/components/sections/blog/BlogHero'
import BlogFeatured from '@/components/sections/blog/BlogFeatured'
import BlogExplorer from '@/components/sections/blog/BlogExplorer'

export const metadata = {
  title: 'Blog — BekasiGo',
  description:
    'Practical writing from the BekasiGo city desk: guides, news, tips, openings, and updates for exploring Kota Bekasi.',
}

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-bekasi-cream">
      <SiteHeader />
      <main>
        <BlogHero />
        <BlogFeatured />
        <BlogExplorer />
      </main>
      <SiteFooter />
    </div>
  )
}
