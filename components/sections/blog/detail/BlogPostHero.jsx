'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ChevronRight, CalendarDays, Clock, RefreshCw, User,
  Share2, Link as LinkIcon,
} from 'lucide-react'
import { BLOG_CATEGORIES, formatPostDate } from '@/lib/content/blog'

/**
 * BlogPostHero — compact article header, NOT the full-viewport treatment
 * used by Stories. Blog posts read like functional articles, so we lead
 * with meta first, then a wide 21:9 hero image below.
 */
export default function BlogPostHero({ post }) {
  const cat = BLOG_CATEGORIES.find((c) => c.id === post.category) ?? { color: '#155F58', label: post.category }

  return (
    <section className="relative bg-white text-bekasi-ink pt-28 md:pt-32">
      <div className="container">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-bekasi-ink/55"
        >
          <Link href="/" className="hover:text-bekasi-emerald-900 transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3 opacity-60" />
          <Link href="/blog" className="hover:text-bekasi-emerald-900 transition-colors">Blog</Link>
          <ChevronRight className="h-3 w-3 opacity-60" />
          <span className="text-bekasi-emerald-900">{cat.label}</span>
        </motion.nav>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-md border border-bekasi-emerald-900/12 px-2.5 py-1">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: cat.color }} />
            <span className="text-[10.5px] uppercase tracking-[0.22em] text-bekasi-emerald-900 font-medium">{cat.label}</span>
          </span>
          {post.featured && (
            <span className="rounded-md bg-bekasi-gold-500 text-bekasi-emerald-900 px-2.5 py-1 text-[10.5px] uppercase tracking-[0.22em] font-semibold">
              Featured
            </span>
          )}
        </div>

        {/* Sans-serif title (blog voice) */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-5 font-sans font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.05] tracking-tight text-bekasi-emerald-900 text-balance max-w-4xl"
        >
          {post.title}
        </motion.h1>

        {post.subtitle && (
          <p className="mt-5 max-w-2xl text-lg md:text-xl text-bekasi-ink/70 leading-relaxed">{post.subtitle}</p>
        )}

        {/* Meta strip */}
        <div className="mt-8 pb-6 border-b border-bekasi-emerald-900/10 flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] text-bekasi-ink/70">
          <span className="inline-flex items-center gap-2">
            <span className="h-8 w-8 rounded-full bg-bekasi-emerald-900/[0.06] inline-flex items-center justify-center">
              <User className="h-4 w-4 text-bekasi-emerald-900" />
            </span>
            <span>
              <span className="text-bekasi-emerald-900 font-medium">{post.author.name}</span>
              <span className="block text-xs text-bekasi-ink/50">{post.author.role}</span>
            </span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-4 w-4 text-bekasi-ink/45" />
            <span>Published {formatPostDate(post.publishedAt)}</span>
          </span>
          {post.updatedAt && post.updatedAt !== post.publishedAt && (
            <span className="inline-flex items-center gap-1.5 text-bekasi-gold-600">
              <RefreshCw className="h-4 w-4" />
              <span>Updated {formatPostDate(post.updatedAt)}</span>
            </span>
          )}
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-bekasi-ink/45" /> {post.readTime}
          </span>

          <div className="ml-auto flex items-center gap-2">
            <button className="inline-flex items-center gap-2 rounded-md border border-bekasi-emerald-900/15 hover:border-bekasi-emerald-900/30 hover:bg-bekasi-emerald-900/[0.03] px-3 py-1.5 text-xs">
              <Share2 className="h-3.5 w-3.5" /> Share
            </button>
            <button className="inline-flex items-center gap-2 rounded-md border border-bekasi-emerald-900/15 hover:border-bekasi-emerald-900/30 hover:bg-bekasi-emerald-900/[0.03] px-3 py-1.5 text-xs">
              <LinkIcon className="h-3.5 w-3.5" /> Copy link
            </button>
          </div>
        </div>

        {/* Wide featured image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-8 relative aspect-[21/9] rounded-xl overflow-hidden border border-bekasi-emerald-900/10"
        >
          <Image src={post.cover} alt={post.title} fill priority sizes="100vw" className="object-cover" />
        </motion.div>
      </div>
    </section>
  )
}
