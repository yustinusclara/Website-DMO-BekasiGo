import InfoPage from '@/components/sections/info/InfoPage'
export const metadata = { title: 'Submit a story — BekasiGo' }
export default function StoriesSubmitPage() {
  return (
    <InfoPage
      kicker="Submit a story"
      title="Pitch us something no one else has."
      lead="BekasiGo is looking for long-form journalism about Kota Bekasi — the small histories, the changing neighbourhoods, the kitchens, the people. If you have a lead, we would love to hear it."
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'City Stories', href: '/stories' }, { label: 'Submit' }]}
      sections={[
        { eyebrow: 'What we publish', heading: 'The Bekasi Journal shape', list: [
          '1,500–3,500 word features',
          'Voice-first — first person or intimate third',
          'Grounded on real places and people in Kota Bekasi',
          'Available in both Bahasa Indonesia and English',
        ]},
        { eyebrow: 'What we do not publish', heading: 'Filters', list: [
          'Press releases or promotional content',
          'Round-ups without a reporting spine',
          'AI-generated first drafts',
        ]},
        { eyebrow: 'How to pitch', heading: 'Two paragraphs is enough', body: 'Email pitches@bekasigo.id with the working headline, a two-paragraph angle, and one line about who you are. If we want to run it, we will reply within one week with a commission fee (paid in IDR on publication).' },
      ]}
    />
  )
}
