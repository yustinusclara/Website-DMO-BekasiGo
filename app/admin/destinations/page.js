import AdminShell from '@/components/admin/AdminShell'
import DestinationsList from '@/components/admin/DestinationsList'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Plus } from 'lucide-react'

export const metadata = {
  title: 'Destinations — BekasiGo CMS',
  robots: { index: false, follow: false },
}

export default function AdminDestinationsPage() {
  return (
    <AdminShell
      kicker="Destinations"
      title="Manage the destination index."
      actions={
        <Link href="/admin/destinations/new">
          <Button className="h-10 rounded-md bg-bekasi-emerald-900 hover:bg-bekasi-emerald-800 text-white px-4 gap-2">
            <Plus className="h-4 w-4" /> New destination
          </Button>
        </Link>
      }
    >
      <DestinationsList />
    </AdminShell>
  )
}
