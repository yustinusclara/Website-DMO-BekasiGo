import AdminShell from '@/components/admin/AdminShell'
import EventForm from '@/components/admin/EventForm'

export const metadata = {
  title: 'New event — BekasiGo CMS',
  robots: { index: false, follow: false },
}

export default function AdminEventsNewPage() {
  return (
    <AdminShell kicker="Events" title="Create a new event.">
      <EventForm mode="create" />
    </AdminShell>
  )
}
