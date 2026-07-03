import InfoPage from '@/components/sections/info/InfoPage'
import { notFound } from 'next/navigation'

const PLAN = {
  currency: {
    kicker: 'Practical', title: 'Currency & payments in Bekasi.',
    lead: 'Everything you need to know before spending your first Rupiah in Kota Bekasi.',
    sections: [
      { eyebrow: 'Currency', heading: 'Indonesian Rupiah (IDR)', body: 'ATMs are widely available in malls, transit stations, and inside minimarts (Alfamart, Indomaret). Most foreign debit and credit cards work — look for the Visa / Mastercard / JCB logo.' },
      { eyebrow: 'Cashless', heading: 'QRIS is everywhere', list: [
        'QRIS is the national QR standard — one code, many wallets',
        'GoPay, OVO, DANA, and ShopeePay all read QRIS',
        'Contactless cards (Flazz, Brizzi, TapCash) work on LRT/KRL/Transjakarta',
      ]},
      { eyebrow: 'Tipping', heading: 'Optional, not required', body: 'Service charge (5–10%) is usually already included in restaurant bills. Rounding up for taxi drivers and hotel porters is customary but never expected.' },
    ],
  },
  weather: {
    kicker: 'Practical', title: 'Weather in Bekasi.',
    lead: 'Kota Bekasi has a warm tropical climate year-round. Here is what to pack.',
    sections: [
      { eyebrow: 'The seasons', heading: 'Two, gently', list: [
        'Dry season (April–October) — warm, low humidity in the mornings, hotter afternoons',
        'Rainy season (November–March) — brief but heavy afternoon showers',
      ]},
      { eyebrow: 'Daily rhythm', heading: 'Plan around the heat', body: 'Best walking window is 06:30–10:00 and 16:30–sunset. Between 11:00 and 15:00 the sun is strong — aim for indoor stops (malls, museums, cafes).' },
      { eyebrow: 'What to pack', heading: 'The short list', list: [
        'Light cotton or linen',
        'A compact umbrella — useful in rainy season',
        'Sunscreen (locally sold and affordable)',
        'A reusable water bottle',
      ]},
    ],
  },
}

export async function generateStaticParams() {
  return Object.keys(PLAN).map((slug) => ({ slug }))
}

export default async function PlanPage({ params }) {
  const { slug } = await params
  const meta = PLAN[slug]
  if (!meta) return notFound()
  return <InfoPage {...meta} breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Plan' }, { label: meta.title }]} />
}
