import { notFound } from 'next/navigation'
import AdminShell from '@/components/admin/AdminShell'
import StoryForm from '@/components/admin/StoryForm'
import { STORIES } from '@/lib/content/stories'

function seededStatus(id) {
  let h = 0; for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0
  return h % 100 < 20 ? 'draft' : 'published'
}

export const metadata = {
  title: 'Edit story — BekasiGo CMS',
  robots: { index: false, follow: false },
}

export default async function AdminStoriesEditPage({ params }) {
  const { slug } = await params
  const story = STORIES.find((s) => s.slug === slug)
  if (!story) notFound()

  // Flatten body blocks into plain content string for the textarea editor.
  const flatContent = (story.body ?? [])
    .map((b) => {
      if (b.type === 'heading')      return `\n## ${b.text}\n`
      if (b.type === 'subheading')   return `\n### ${b.text}\n`
      if (b.type === 'quote')        return `\n> ${b.text}${b.attribution ? ` — ${b.attribution}` : ''}\n`
      if (b.type === 'callout')      return `\n**${b.title ?? 'Note'}:** ${b.text}\n`
      if (b.type === 'image')        return `\n[Image: ${b.caption ?? b.src}]\n`
      if (b.type === 'divider')      return `\n———\n`
      return b.text ?? ''
    })
    .join('\n\n')
    .trim()

  const initial = {
    slug: story.slug,
    title: story.title,
    excerpt: story.excerpt,
    content: flatContent,
    heroImage: story.cover?.image ?? '',
    column: story.column,
    tags: story.tags ?? [],
    publishedAt: story.publishedAt ?? '',
    authorName: story.author?.name ?? '',
    authorRole: story.author?.role ?? '',
    readTime: story.readTime ?? '',
    seoTitle: '',
    seoDescription: '',
    seoKeywords: '',
    seoImage: '',
    status: seededStatus(story.id),
    featured: !!story.featured,
  }

  return (
    <AdminShell kicker="Stories" title={`Editing: ${story.title}`}>
      <StoryForm mode="edit" initial={initial} />
    </AdminShell>
  )
}
