import AdminShell from '@/components/admin/AdminShell'
import MediaAssetForm from '@/components/admin/MediaAssetForm'

export const metadata = {
  title: 'Add media — BekasiGo CMS',
  robots: { index: false, follow: false },
}

export default function AdminMediaUploadPage() {
  return (
    <AdminShell kicker="Media" title="Add a new Cloudinary asset.">
      <MediaAssetForm />
    </AdminShell>
  )
}
