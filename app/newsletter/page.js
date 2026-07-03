import InfoPage from '@/components/sections/info/InfoPage'
export const metadata = { title: 'Newsletter — BekasiGo' }
export default function NewsletterPage() {
  return (
    <InfoPage
      kicker="The Bekasi Journal"
      title="A monthly letter from the city."
      lead="Once a month we send one email: a short editorial, three destinations, one event worth planning around, and the best story from the archive. Nothing else, no ads."
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Newsletter' }]}
      sections={[
        { eyebrow: 'How to subscribe', heading: 'In one line', body: 'Email newsletter@bekasigo.id from the address you want to receive the letter at, with the subject “Subscribe”. That is it. You can unsubscribe at any time by replying “Stop”.' },
        { eyebrow: 'What you get', heading: 'A very short list', list: [
          'One editor’s note (≈ 3 short paragraphs)',
          'Three destination picks with quick reasons',
          'One event worth putting on the calendar',
          'One archive story you may have missed',
        ]},
      ]}
    />
  )
}
