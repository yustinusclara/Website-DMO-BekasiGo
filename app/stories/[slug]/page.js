import { notFound } from 'next/navigation'
import SiteHeader from '@/components/layout/SiteHeader'
import SiteFooter from '@/components/layout/SiteFooter'
import ReadingProgress from '@/components/sections/stories/detail/ReadingProgress'
import StoryHero from '@/components/sections/stories/detail/StoryHero'
import StoryBody from '@/components/sections/stories/detail/StoryBody'
import StoryClose from '@/components/sections/stories/detail/StoryClose'
import RelatedStories from '@/components/sections/stories/detail/RelatedStories'
import { getStoryBySlug, getRelatedStories, STORIES } from '@/lib/content/stories'

export async function generateStaticParams() {
  return STORIES.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const s = getStoryBySlug(slug)
  if (!s) return { title: 'Not found — BekasiGo' }
  return {
    title: `${s.title} — The Bekasi Journal`,
    description: s.excerpt,
    openGraph: {
      title: s.title, description: s.excerpt, images: [s.cover.image], type: 'article',
    },
  }
}

export default async function StoryDetailPage({ params }) {
  const { slug } = await params
  const story = getStoryBySlug(slug)
  if (!story) notFound()
  const related = getRelatedStories(story, 3)

  return (
    <div className="min-h-screen bg-bekasi-cream">
      <ReadingProgress />
      <SiteHeader />
      <main>
        <StoryHero story={story} />
        <StoryBody story={story} />
        <StoryClose story={story} />
        <RelatedStories items={related} currentTitle={story.title} />
      </main>
      <SiteFooter />
    </div>
  )
}
