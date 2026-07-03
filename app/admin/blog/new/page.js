import AdminShell from '@/components/admin/AdminShell'
import BlogForm from '@/components/admin/BlogForm'

export const metadata = {
  title: 'New blog post — BekasiGo CMS',
  robots: { index: false, follow: false },
}

export default function AdminBlogNewPage() {
  return (
    <AdminShell kicker="Blog" title="Publish a new blog post.">
      <BlogForm mode="create" />
    </AdminShell>
  )
}
