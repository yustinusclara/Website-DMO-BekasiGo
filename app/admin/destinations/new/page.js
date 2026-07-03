import AdminShell from '@/components/admin/AdminShell'
import DestinationForm from '@/components/admin/DestinationForm'

export const metadata = {
  title: 'New destination — BekasiGo CMS',
  robots: { index: false, follow: false },
}

export default function AdminDestinationsNewPage() {
  return (
    <AdminShell kicker="Destinations" title="Create a new destination.">
      <DestinationForm mode="create" />
    </AdminShell>
  )
}
