import AdminShell from '@/components/admin/AdminShell'
import EventsList from '@/components/admin/EventsList'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Plus } from 'lucide-react'

export const metadata = {
  title: 'Events — BekasiGo CMS',
  robots: { index: false, follow: false },
}

export default function AdminEventsPage() {
  return (
    <AdminShell
      kicker="Events"
      title="Manage upcoming and past events."
      actions={
        <Link href="/admin/events/new">
          <Button className="h-10 rounded-md bg-bekasi-emerald-900 hover:bg-bekasi-emerald-800 text-white px-4 gap-2">
            <Plus className="h-4 w-4" /> New event
          </Button>
        </Link>
      }
    >
      <EventsList />
    </AdminShell>
  )
}
