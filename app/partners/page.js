import InfoPage from '@/components/public/pages/info/InfoPage'
export const metadata = { title: 'Partners — BekasiGo' }
export default function PartnersPage() {
  return (
    <InfoPage
      kicker="Partner network"
      title="Together we tell Bekasi’s story."
      lead="From cultural venues to hotel groups, transport operators, and creative studios — our partner network makes BekasiGo trustworthy on the ground. Every listed destination, event, and stay has been reviewed with a local operator to ensure accuracy."
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Partners' }]}
      sections={[
        { eyebrow: 'Active partners', heading: 'A curated network', list: [
          'Summarecon Group — Summarecon Mall Bekasi, Downtown Walk',
          'Trans Corp — Trans Snow World Juanda, Trans Park Mall',
          'Metropolitan Land — Grand Metropolitan Mall, Metropolitan Mall',
          'PT KAI — Stasiun Bekasi + Bekasi Timur commuter operations',
          'PT LRT Jakarta — Jabodebek line stations across the city',
          'Betawi Cultural Council — Kampung Adat Kranggan programming',
        ]},
        { eyebrow: 'How to join', heading: 'Become a partner', body: 'If you operate a destination, event venue, hotel, restaurant, or cultural programme in Kota Bekasi, we would love to feature you. Email partners@bekasigo.id with a short intro and we will follow up within five working days.' },
      ]}
      cta={{ eyebrow: 'Talk to us', title: 'Reach the partner desk', body: 'Media, hospitality, and civic partners — the fastest way in.', label: 'Contact us', href: '/contact' }}
    />
  )
}
