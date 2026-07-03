import { notFound } from 'next/navigation'
import AdminShell from '@/components/admin/AdminShell'
import DestinationForm from '@/components/admin/DestinationForm'
import { DESTINATIONS, DEST_DISTRICTS } from '@/lib/content/destinations'

function seededStatus(id) {
  let h = 0; for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0
  return h % 100 < 18 ? 'draft' : 'published'
}

export const metadata = {
  title: 'Edit destination — BekasiGo CMS',
  robots: { index: false, follow: false },
}

export default async function AdminDestinationsEditPage({ params }) {
  const { slug } = await params
  const dest = DESTINATIONS.find((d) => d.slug === slug)
  if (!dest) notFound()

  const districtId = DEST_DISTRICTS.find((x) => x.id === dest.district)?.id ?? dest.district

  const initial = {
    slug: dest.slug,
    title: dest.title,
    excerpt: dest.excerpt,
    description: '',
    category: dest.category,
    district: districtId,
    tags: dest.tags ?? [],
    coords: dest.coords ?? { lat: -6.2383, lng: 106.9756 },
    hours: 'Mon–Sun 08:00–22:00',
    duration: dest.duration ?? '1–2 hrs',
    bestTime: 'Weekend mornings',
    familyFriendly: true,
    environment: dest.category === 'nature' ? 'outdoor' : dest.category === 'shopping' || dest.category === 'urban' ? 'indoor' : 'mixed',
    plannerPriority: dest.featured ? 85 : dest.popular ? 65 : 45,
    image: dest.image,
    gallery: [],
    status: seededStatus(dest.id),
    featured: !!dest.featured,
  }

  return (
    <AdminShell kicker="Destinations" title={`Editing: ${dest.title}`}>
      <DestinationForm mode="edit" initial={initial} />
    </AdminShell>
  )
}
