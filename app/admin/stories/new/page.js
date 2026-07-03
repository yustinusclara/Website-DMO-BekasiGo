import AdminShell from '@/components/admin/AdminShell'
import StoryForm from '@/components/admin/StoryForm'

export const metadata = {
  title: 'New story — BekasiGo CMS',
  robots: { index: false, follow: false },
}

export default function AdminStoriesNewPage() {
  return (
    <AdminShell kicker="Stories" title="Publish a new story.">
      <StoryForm mode="create" />
    </AdminShell>
  )
}
