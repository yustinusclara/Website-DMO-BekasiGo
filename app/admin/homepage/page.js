import AdminShell from '@/components/admin/AdminShell'
import HomepageManager from '@/components/admin/HomepageManager'

export const metadata = {
  title: 'Homepage Manager — BekasiGo CMS',
  robots: { index: false, follow: false },
}

export default function AdminHomepagePage() {
  return (
    <AdminShell
      kicker="Homepage Manager"
      title="Compose the public homepage."
    >
      <HomepageManager />
    </AdminShell>
  )
}
