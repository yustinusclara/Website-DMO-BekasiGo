import InfoPage from '@/components/public/pages/info/InfoPage'
export const metadata = { title: 'About BekasiGo' }
export default function AboutPage() {
  return (
    <InfoPage
      kicker="About BekasiGo"
      title="An editorial front door to Kota Bekasi."
      lead="BekasiGo is the Destination Management Organization (DMO) platform for Kota Bekasi. We work with the city government, cultural institutions, and local operators to make it easier for anyone — residents, returning diaspora, day-trippers from Jakarta, or international guests — to discover, plan, and understand the rhythms of the city."
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'About' }]}
      sections={[
        { eyebrow: 'Our mission', heading: 'Bekasi, seen clearly.', body: 'We publish curated destination guides, cultural stories, and live event listings, and we power a Smart Trip Planner that assembles day-plans grounded on our real directory — no hallucinated places, no invented restaurants.' },
        { eyebrow: 'Who we serve', heading: 'Four audiences, one canvas.', list: [
          'Residents — discover neighbourhoods you have not visited yet.',
          'Returning diaspora — reconnect with heritage and family memory.',
          'Day-trippers — plan a two-hour or two-day loop from Jakarta.',
          'International guests — English editorial layered over local voice.',
        ] },
        { eyebrow: 'How we work', heading: 'Public-facing, quietly modular.', body: 'The public site (this domain) sits on top of an internal CMS + Supabase backend. Content teams manage destinations, events, stories, blog posts, and media in one place; the public site consumes it via a stable data contract.' },
      ]}
      cta={{ eyebrow: 'Partner with us', title: 'Work with the city.', body: 'Government agencies, cultural venues, operators and local businesses — reach out and we will loop you into the network.', label: 'Become a partner', href: '/partners' }}
    />
  )
}
