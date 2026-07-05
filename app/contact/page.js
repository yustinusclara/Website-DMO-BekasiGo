import InfoPage from '@/components/public/pages/info/InfoPage'
export const metadata = { title: 'Contact BekasiGo' }
export default function ContactPage() {
  return (
    <InfoPage
      kicker="Contact"
      title="Say hello."
      lead="General questions, corrections, or partnership introductions — we read every message."
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
      sections={[
        { eyebrow: 'By channel', heading: 'Reach the right desk', list: [
          'General: hello@bekasigo.id',
          'Press: press@bekasigo.id',
          'Partners: partners@bekasigo.id',
          'Careers: careers@bekasigo.id',
          'Corrections: fix@bekasigo.id',
        ]},
        { eyebrow: 'Editorial office', heading: 'Where we are', body: 'Kota Bekasi, Indonesia. Meetings by appointment only during pilot phase.' },
      ]}
    />
  )
}
