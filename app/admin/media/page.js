import AdminShell from '@/components/admin/AdminShell'
import MediaLibrary from '@/components/admin/MediaLibrary'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Plus } from 'lucide-react'

export const metadata = {
  title: 'Media Library — BekasiGo CMS',
  robots: { index: false, follow: false },
}

export default function AdminMediaPage() {
  return (
    <AdminShell
      kicker="Media"
      title="Manage the Cloudinary asset library."
      actions={
        <Link href="/admin/media/upload">
          <Button className="h-10 rounded-md bg-bekasi-emerald-900 hover:bg-bekasi-emerald-800 text-white px-4 gap-2">
            <Plus className="h-4 w-4" /> Add asset
          </Button>
        </Link>
      }
    >
      <MediaLibrary />
    </AdminShell>
  )
}
