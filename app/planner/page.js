import PlannerShell from '@/components/sections/planner/PlannerShell'
import SiteHeader from '@/components/layout/SiteHeader'
import SiteFooter from '@/components/layout/SiteFooter'

export const metadata = {
  title: 'Smart Trip Planner — BekasiGo',
  description:
    'Build a heritage, family, or foodie itinerary through Kota Bekasi with an AI planner tuned on 24 destinations and 13 events.',
  openGraph: {
    title: 'Smart Trip Planner — BekasiGo',
    description: 'An AI travel co-pilot for Kota Bekasi.',
    type: 'website',
  },
}

export default function PlannerPage() {
  return (
    <>
      <SiteHeader />
      <main className="pt-32 md:pt-40 pb-24 bg-bekasi-cream">
        <PlannerShell />
      </main>
      <SiteFooter />
    </>
  )
}
