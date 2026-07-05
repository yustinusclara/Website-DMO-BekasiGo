'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight, Clock, RefreshCw } from 'lucide-react'
import { BLOG_POSTS, BLOG_CATEGORIES, formatPostDate } from '@/lib/content/blog'

export default function BlogFeatured() {
  const featured = BLOG_POSTS.filter((p) => p.featured).slice(0, 1)[0]
  if (!featured) return null
  const sideItems = BLOG_POSTS.filter((p) => p.id !== featured.id).slice(0, 3)

  return (
    <section className="relative bg-bekasi-cream text-bekasi-ink">
      <div className="container py-14 md:py-20">
        <div className="flex items-end justify-between gap-6 mb-8">
          <div>
            <div className="text-[11px] uppercase tracking-[0.22em] text-bekasi-gold-600 inline-flex items-center gap-2">
              <span className="h-px w-8 bg-bekasi-gold-500" />
              Featured
            </div>
            <h2 className="mt-3 font-sans font-semibold text-2xl md:text-3xl leading-tight tracking-tight text-bekasi-emerald-900">
              This week&apos;s must-reads.
            </h2>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Featured card — 2 cols */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 group relative overflow-hidden rounded-xl border border-bekasi-emerald-900/10 bg-white hover:border-bekasi-emerald-900/25 hover:shadow-elevated transition-all"
          >
            <Link href={`/blog/${featured.slug}`} className="grid md:grid-cols-2">
              <FeaturedImage post={featured} />
              <div className="p-6 md:p-8 flex flex-col">
                <FeaturedMeta post={featured} />
                <h3 className="mt-3 font-sans font-semibold text-2xl md:text-3xl leading-tight tracking-tight text-bekasi-emerald-900 group-hover:text-bekasi-emerald-800 text-balance">
                  {featured.title}
                </h3>
                <p className="mt-3 text-[15px] text-bekasi-ink/70 leading-relaxed line-clamp-3">{featured.subtitle}</p>
                <div className="mt-auto pt-6 flex items-center justify-between gap-3">
                  <div className="text-xs text-bekasi-ink/55">
                    By <span className="text-bekasi-emerald-900 font-medium">{featured.author.name}</span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-bekasi-emerald-900">
                    Read post <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-px group-hover:translate-x-px" />
                  </span>
                </div>
              </div>
            </Link>
          </motion.article>

          {/* Side list */}
          <div className="flex flex-col divide-y divide-bekasi-emerald-900/10 rounded-xl border border-bekasi-emerald-900/10 bg-white">
            {sideItems.map((p) => (
              <SideItem key={p.id} post={p} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function FeaturedImage({ post }) {
  return (
    <div className="relative aspect-[16/12] md:aspect-auto md:min-h-full overflow-hidden">
      <Image src={post.cover} alt={post.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      <div className="absolute top-4 left-4 rounded-md bg-bekasi-gold-500 text-bekasi-emerald-900 px-3 py-1.5 text-[10.5px] uppercase tracking-[0.22em] font-semibold">
        Featured
      </div>
    </div>
  )
}

function FeaturedMeta({ post }) {
  const cat = BLOG_CATEGORIES.find((c) => c.id === post.category) ?? { color: '#155F58', label: post.category }
  return (
    <div className="flex flex-wrap items-center gap-2 text-[11px] text-bekasi-ink/60">
      <span className="inline-flex items-center gap-1.5 rounded-md border border-bekasi-emerald-900/12 px-2 py-1">
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: cat.color }} />
        <span className="uppercase tracking-[0.18em] text-bekasi-emerald-900 font-medium">{cat.label}</span>
      </span>
      <span className="text-bekasi-ink/45">·</span>
      <span>{formatPostDate(post.publishedAt, { short: true })}</span>
      {post.updatedAt && post.updatedAt !== post.publishedAt && (
        <>
          <span className="text-bekasi-ink/45">·</span>
          <span className="inline-flex items-center gap-1 text-bekasi-gold-600"><RefreshCw className="h-3 w-3" /> Updated {formatPostDate(post.updatedAt, { short: true })}</span>
        </>
      )}
      <span className="text-bekasi-ink/45">·</span>
      <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {post.readTime}</span>
    </div>
  )
}

function SideItem({ post }) {
  const cat = BLOG_CATEGORIES.find((c) => c.id === post.category) ?? { color: '#155F58', label: post.category }
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group grid grid-cols-[110px_1fr] gap-4 p-4 hover:bg-bekasi-cream/50 transition-colors"
    >
      <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
        <Image src={post.cover} alt={post.title} fill sizes="110px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
      </div>
      <div className="min-w-0 flex flex-col justify-center">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-bekasi-ink/55">
          <span className="h-1 w-1 rounded-full" style={{ background: cat.color }} />
          <span>{cat.label}</span>
          <span className="text-bekasi-ink/30">·</span>
          <span>{post.readTime}</span>
        </div>
        <h4 className="mt-1 font-sans font-semibold text-[15.5px] leading-snug text-bekasi-emerald-900 group-hover:text-bekasi-emerald-800 line-clamp-2">
          {post.title}
        </h4>
      </div>
    </Link>
  )
}
