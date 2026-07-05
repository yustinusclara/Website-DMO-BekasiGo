import DirectoryIndex from '@/components/public/pages/directory/DirectoryIndex'
import all from '@/lib/content/_data_destinations_extra.json'
import restaurants from '@/lib/content/_data_restaurants.json'
import hotels from '@/lib/content/_data_hotels.json'
import transit from '@/lib/content/_data_transit.json'
import { notFound } from 'next/navigation'

// Loose keyword mapping between the URL slug and the Indonesian category label.
const CATEGORY_MAP = {
  heritage: {
    match: ['sejarah', 'religi', 'seni', 'budaya'],
    kicker: 'Heritage & Culture',
    title: 'The living memory of Bekasi.',
    subtitle: 'Temples, colonial-era halls, monuments, and the kampung that keeps its rituals alive.',
  },
  urban: {
    match: ['modern', 'belanja', 'hiburan'],
    kicker: 'Urban Lifestyle',
    title: 'The pulse of the new city.',
    subtitle: 'Malls, indoor entertainment, and the modern landmarks that define daily life in Kota Bekasi.',
  },
  nature: {
    match: ['alam', 'edukasi', 'kuliner alam', 'waterfront', 'situ', 'taman'],
    kicker: 'Nature & Waterfront',
    title: 'Bekasi’s quieter, greener side.',
    subtitle: 'Situs, urban parks, waterfronts, and open-air escapes across the city.',
  },
  family: {
    match: ['keluarga', 'edukasi', 'anak', 'kolam', 'renang'],
    kicker: 'Family Friendly',
    title: 'Places that work with kids in tow.',
    subtitle: 'Kid-safe attractions, splash parks, learning stops, and the low-key spots families come back to.',
  },
  shopping: {
    match: ['belanja', 'modern'],
    kicker: 'Shopping',
    title: 'Where the city shops.',
    subtitle: 'Full-service malls, lifestyle strips, and boutique corners across Kota Bekasi.',
  },
  // The remaining "categories" from the mega menu redirect to their better-fit
  // listings so callers never land on an empty page.
  culinary: { redirect: '/food' },
  access:   { redirect: '/getting-around' },
  stay:     { redirect: '/stay' },
}

export async function generateStaticParams() {
  return Object.keys(CATEGORY_MAP).map((category) => ({ category }))
}

export default async function DiscoverCategoryPage({ params }) {
  const { category } = await params
  const meta = CATEGORY_MAP[category]
  if (!meta) return notFound()
  if (meta.redirect) {
    const { redirect } = await import('next/navigation')
    return redirect(meta.redirect)
  }

  const items = all.filter((d) => {
    const cat = (d.category_id || '').toLowerCase()
    return meta.match.some((m) => cat.includes(m))
  })

  return (
    <DirectoryIndex
      kicker={meta.kicker}
      title={meta.title}
      subtitle={meta.subtitle}
      items={items}
      categoryKey="category_id"
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Discover', href: '/discover' }, { label: meta.kicker }]}
      ctaLabel="destinations"
      emptyLabel="No destinations in this category yet — check back soon."
    />
  )
}
