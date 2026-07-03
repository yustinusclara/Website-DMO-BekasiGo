import InfoPage from '@/components/sections/info/InfoPage'
export const metadata = { title: 'Sitemap — BekasiGo' }
export default function SitemapPage() {
  return (
    <InfoPage
      kicker="Sitemap"
      title="Everything, in one list."
      lead="All public pages on BekasiGo."
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Sitemap' }]}
      sections={[
        { eyebrow: 'Discover', heading: 'Editorial', list: ['/ — Homepage', '/discover — Discover Bekasi', '/discover/heritage', '/discover/urban', '/discover/nature', '/discover/family', '/discover/culinary → /food', '/discover/access → /getting-around', '/discover/shopping', '/discover/stay → /stay'] },
        { eyebrow: 'Directories', heading: 'Listings', list: ['/destinations', '/food', '/stay', '/events', '/getting-around', '/map — Explore Map'] },
        { eyebrow: 'Editorial', heading: 'Stories & Journal', list: ['/stories', '/stories/submit', '/blog'] },
        { eyebrow: 'Tools', heading: 'Utilities', list: ['/planner — Smart Trip Planner', '/plan/currency', '/plan/weather', '/newsletter'] },
        { eyebrow: 'Corporate', heading: 'About', list: ['/about', '/about/government', '/about/partners', '/partners', '/press', '/careers', '/contact', '/legal/privacy', '/legal/terms', '/legal/accessibility'] },
      ]}
    />
  )
}
