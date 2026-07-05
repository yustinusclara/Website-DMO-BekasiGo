import InfoPage from '@/components/public/pages/info/InfoPage'
export const metadata = { title: 'Careers — BekasiGo' }
export default function CareersPage() {
  return (
    <InfoPage
      kicker="Careers"
      title="Help write the city."
      lead="BekasiGo is a small editorial and technology team. We publish stories, curate directories, and build tools that make Kota Bekasi easier to visit. If you love the city and know how to work in a small, calm team — we would love to hear from you."
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Careers' }]}
      sections={[
        { eyebrow: 'Open roles', heading: 'What we are hiring for', list: [
          'City Editor (Full-time — Bekasi + Jakarta hybrid)',
          'Community Photographer (Contract — monthly retainer)',
          'Frontend Engineer (Full-time — remote-first)',
          'Bahasa → English translator (Freelance)',
        ]},
        { eyebrow: 'How to apply', heading: 'Send a short note', body: 'Email careers@bekasigo.id with the role name in the subject line and 2–3 paragraphs about why. Attach links, not PDFs.' },
      ]}
    />
  )
}
