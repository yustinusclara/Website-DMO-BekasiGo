import InfoPage from '@/components/sections/info/InfoPage'
export const metadata = { title: 'Government — About BekasiGo' }
export default function AboutGovernmentPage() {
  return (
    <InfoPage
      kicker="Government relations"
      title="Built with Kota Bekasi."
      lead="BekasiGo works alongside the city administration to represent Kota Bekasi honestly and welcomingly. The platform is not the government — but our editorial and data pipelines connect directly with public information channels so visitors always see up-to-date facts."
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'About', href: '/about' }, { label: 'Government' }]}
      sections={[
        { eyebrow: 'Working directly with', heading: 'City agencies', list: [
          'Dinas Pariwisata dan Kebudayaan Kota Bekasi',
          'Bappeda — Badan Perencanaan Pembangunan Daerah',
          'Dinas Perhubungan Kota Bekasi (transit & wayfinding)',
          'Dinas Kominfostatik (open data feeds)',
        ]},
        { eyebrow: 'Open data', heading: 'What we publish', body: 'Destinations, events, cultural venues, and transit corridors are all available as a public JSON feed for civic developers. See the sitemap or contact us for access.' },
      ]}
    />
  )
}
