import AdminShell from '@/components/admin/AdminShell'
import BlogList from '@/components/admin/BlogList'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Plus } from 'lucide-react'

export const metadata = {
  title: 'Blog — BekasiGo CMS',
  robots: { index: false, follow: false },
}

export default function AdminBlogPage() {
  return (
    <AdminShell
      kicker="Blog"
      title="Guides, news, and SEO-focused posts."
      actions={
        <Link href="/admin/blog/new">
          <Button className="h-10 rounded-md bg-bekasi-emerald-900 hover:bg-bekasi-emerald-800 text-white px-4 gap-2">
            <Plus className="h-4 w-4" /> New post
          </Button>
        </Link>
      }
    >
      <BlogList />
    </AdminShell>
  )
}
