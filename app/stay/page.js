import DirectoryIndex from '@/components/sections/directory/DirectoryIndex'
import items from '@/lib/content/_data_hotels.json'

export const metadata = { title: 'Stay — BekasiGo' }

export default function StayPage() {
  return (
    <DirectoryIndex
      kicker="Where to stay"
      title="Rooms for every rhythm of the city."
      subtitle="Thirty stays sorted by what they do best — mall-attached comfort hubs, business towers, boutique retreats, and budget-friendly transit hotels."
      items={items}
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Stay' }]}
      ctaLabel="places to stay"
    />
  )
}
