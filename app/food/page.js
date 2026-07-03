import DirectoryIndex from '@/components/sections/directory/DirectoryIndex'
import items from '@/lib/content/_data_restaurants.json'

export const metadata = { title: 'Food & Drink — BekasiGo' }

export default function FoodPage() {
  return (
    <DirectoryIndex
      kicker="Food & Drink"
      title="Bekasi on a plate."
      subtitle="Thirty restaurants, warungs, and cafes across Bekasi — curated by category. From legendary sate stalls to Peranakan kitchens and modern chef tables, every entry comes with a first-visit note."
      items={items}
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Food & Drink' }]}
      ctaLabel="places to eat"
    />
  )
}
