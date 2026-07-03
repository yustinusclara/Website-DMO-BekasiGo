import InfoPage from '@/components/sections/info/InfoPage'
import { notFound } from 'next/navigation'

const LEGAL = {
  privacy: {
    kicker: 'Legal', title: 'Privacy notice.',
    lead: 'BekasiGo respects your privacy. This page describes what we collect and why — in plain language.',
    sections: [
      { eyebrow: 'What we collect', heading: 'Only what we need', list: [
        'Basic Google account info (name, email, profile picture) when you sign in',
        'Usage analytics — anonymised pageviews and route paths',
        'Voluntary submissions — messages, story pitches, corrections',
      ]},
      { eyebrow: 'What we do not collect', heading: 'Explicit exclusions', list: [
        'Payment information — we do not process payments on BekasiGo',
        'Location — unless you explicitly click “Use my location” on the map',
        'Third-party marketing data — no data brokers, ever',
      ]},
      { eyebrow: 'Contact', heading: 'Requests and questions', body: 'Email fix@bekasigo.id to request data export or deletion.' },
    ],
  },
  terms: {
    kicker: 'Legal', title: 'Terms of use.',
    lead: 'By using BekasiGo you agree to these simple, non-adversarial terms.',
    sections: [
      { eyebrow: 'Content', heading: 'How to use our work', body: 'Our editorial, photography, and structured data are copyright BekasiGo unless otherwise noted. You may quote up to three paragraphs with attribution and a link back. Republishing at scale requires written permission — press@bekasigo.id.' },
      { eyebrow: 'Third-party listings', heading: 'Destinations and events', body: 'Business, cultural, and event information on BekasiGo is provided as-is. Please verify hours and access with the venue directly before your visit. Corrections welcome at fix@bekasigo.id.' },
      { eyebrow: 'AI itineraries', heading: 'Smart Trip Planner', body: 'The Smart Trip Planner assembles plans from our real directory. AI outputs are suggestions — you are the traveller, and the traveller decides.' },
    ],
  },
  accessibility: {
    kicker: 'Legal', title: 'Accessibility statement.',
    lead: 'BekasiGo aims to be usable by everyone. Our target is WCAG 2.1 Level AA.',
    sections: [
      { eyebrow: 'Where we are', heading: 'Current status', list: [
        'Colour contrast — tested against 4.5:1 across brand palettes',
        'Keyboard navigation — every interactive element reachable via tab',
        'Screen reader labels — aria-labels on all icon buttons',
        'Reduced motion — large animations respect prefers-reduced-motion',
      ]},
      { eyebrow: 'Feedback', heading: 'Tell us where it hurts', body: 'If any part of BekasiGo is hard to use, email accessibility@bekasigo.id. We treat accessibility bugs as top-priority fixes.' },
    ],
  },
}

export async function generateStaticParams() {
  return Object.keys(LEGAL).map((slug) => ({ slug }))
}

export default async function LegalPage({ params }) {
  const { slug } = await params
  const meta = LEGAL[slug]
  if (!meta) return notFound()
  return <InfoPage {...meta} breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Legal' }, { label: meta.title }]} />
}
