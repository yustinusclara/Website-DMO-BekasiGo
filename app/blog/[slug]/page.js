import { notFound } from 'next/navigation'
import SiteHeader from '@/components/layout/SiteHeader'
import SiteFooter from '@/components/layout/SiteFooter'
import BlogPostHero from '@/components/sections/blog/detail/BlogPostHero'
import BlogPostBody from '@/components/sections/blog/detail/BlogPostBody'
import BlogRelatedCTA from '@/components/sections/blog/detail/BlogRelatedCTA'
import BlogPostClose from '@/components/sections/blog/detail/BlogPostClose'
import RelatedPosts from '@/components/sections/blog/detail/RelatedPosts'
import { getPostBySlug, getRelatedPosts, BLOG_POSTS } from '@/lib/content/blog'
import { getDestinationBySlug } from '@/lib/content/destinations'

export async function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const p = getPostBySlug(slug)
  if (!p) return { title: 'Not found — BekasiGo' }
  return {
    title: `${p.title} — BekasiGo Blog`,
    description: p.excerpt,
    openGraph: {
      title: p.title, description: p.excerpt, images: [p.cover], type: 'article',
      publishedTime: p.publishedAt, modifiedTime: p.updatedAt ?? p.publishedAt,
    },
  }
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const related = getRelatedPosts(post, 3)
  const relatedDest = post.relatedDestinationSlug ? getDestinationBySlug(post.relatedDestinationSlug) : null

  return (
    <div className="min-h-screen bg-bekasi-cream">
      <SiteHeader />
      <main>
        <BlogPostHero post={post} />
        <BlogPostBody post={post} />
        <BlogRelatedCTA post={post} destination={relatedDest} />
        <BlogPostClose post={post} />
        <RelatedPosts items={related} />
      </main>
      <SiteFooter />
    </div>
  )
}
