import AdminShell from '@/components/admin/AdminShell'
import StoriesList from '@/components/admin/StoriesList'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Plus } from 'lucide-react'

export const metadata = {
  title: 'Stories — BekasiGo CMS',
  robots: { index: false, follow: false },
}

export default function AdminStoriesPage() {
  return (
    <AdminShell
      kicker="Stories"
      title="Manage the editorial magazine."
      actions={
        <Link href="/admin/stories/new">
          <Button className="h-10 rounded-md bg-bekasi-emerald-900 hover:bg-bekasi-emerald-800 text-white px-4 gap-2">
            <Plus className="h-4 w-4" /> New story
          </Button>
        </Link>
      }
    >
      <StoriesList />
    </AdminShell>
  )
}
