import DirectoryIndex from '@/components/public/pages/directory/DirectoryIndex'
import items from '@/lib/content/_data_transit.json'

export const metadata = { title: 'Getting Around — BekasiGo' }

export default function GettingAroundPage() {
  return (
    <DirectoryIndex
      kicker="Getting around"
      title="Move through Bekasi like a local."
      subtitle="LRT Jabodebek, KRL Commuter Line, and Transjakarta corridors that connect Kota Bekasi to Greater Jakarta — with quick notes on where each station lands you."
      items={items}
      categoryKey="mode"
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Getting Around' }]}
      ctaLabel="stations & corridors"
    />
  )
}
