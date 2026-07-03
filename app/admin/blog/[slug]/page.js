import { notFound } from 'next/navigation'
import AdminShell from '@/components/admin/AdminShell'
import BlogForm from '@/components/admin/BlogForm'
import { BLOG_POSTS } from '@/lib/content/blog'

function seededStatus(id) {
  let h = 0; for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0
  return h % 100 < 18 ? 'draft' : 'published'
}

export const metadata = {
  title: 'Edit blog post — BekasiGo CMS',
  robots: { index: false, follow: false },
}

export default async function AdminBlogEditPage({ params }) {
  const { slug } = await params
  const post = BLOG_POSTS.find((p) => p.slug === slug)
  if (!post) notFound()

  const flatContent = (post.body ?? [])
    .map((b) => {
      if (b.type === 'heading')      return `\n## ${b.text}\n`
      if (b.type === 'subheading')   return `\n### ${b.text}\n`
      if (b.type === 'quote')        return `\n> ${b.text}${b.attribution ? ` — ${b.attribution}` : ''}\n`
      if (b.type === 'note')         return `\n**Note:** ${b.text}\n`
      if (b.type === 'ordered_list') return (b.items ?? []).map((it, i) => `${i + 1}. ${it}`).join('\n')
      if (b.type === 'unordered_list') return (b.items ?? []).map((it) => `- ${it}`).join('\n')
      if (b.type === 'image')        return `\n[Image: ${b.caption ?? b.src}]\n`
      if (b.type === 'divider')      return `\n———\n`
      return b.text ?? ''
    })
    .join('\n\n')
    .trim()

  const initial = {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    content: flatContent,
    cover: post.cover,
    category: post.category,
    tags: post.tags ?? [],
    authorName: post.author?.name ?? '',
    authorRole: post.author?.role ?? '',
    publishedAt: post.publishedAt ?? '',
    updatedAt: post.updatedAt ?? '',
    featured: !!post.featured,
    relatedDestinations: post.relatedDestinationSlug ? [post.relatedDestinationSlug] : [],
    relatedEvents: [],
    relatedRestaurants: [],
    seoTitle: '',
    seoDescription: '',
    canonical: '',
    status: seededStatus(post.id),
  }

  return (
    <AdminShell kicker="Blog" title={`Editing: ${post.title}`}>
      <BlogForm mode="edit" initial={initial} />
    </AdminShell>
  )
}
