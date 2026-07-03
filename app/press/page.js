import InfoPage from '@/components/sections/info/InfoPage'
export const metadata = { title: 'Press — BekasiGo' }
export default function PressPage() {
  return (
    <InfoPage
      kicker="Press & media"
      title="For editors, writers, and camera crews."
      lead="Working on a story about Kota Bekasi? Our press team can help with fact-checking, high-resolution photography, on-site access, and interview scheduling."
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Press' }]}
      sections={[
        { eyebrow: 'Media kit', heading: 'What is inside', list: [
          'Brand assets — wordmark, colour tokens, typography',
          'Photo library — high-resolution destination imagery',
          'Fact sheet — city demographics, cultural context, transit',
          'Story ideas — recent Bekasi angles worth covering',
        ]},
        { eyebrow: 'Requests', heading: 'How to reach us', body: 'Email press@bekasigo.id with your outlet, angle, and deadline. We aim to reply within 48 hours on weekdays.' },
      ]}
    />
  )
}
