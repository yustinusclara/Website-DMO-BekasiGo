'use client'

import { motion } from 'framer-motion'
import { Share2, Link as LinkIcon } from 'lucide-react'
import { BLOG_CATEGORIES, formatPostDate } from '@/lib/content/blog'

export default function BlogPostClose({ post }) {
  const cat = BLOG_CATEGORIES.find((c) => c.id === post.category) ?? { color: '#155F58', label: post.category }

  return (
    <section className="relative bg-white text-bekasi-ink border-t border-bekasi-emerald-900/8">
      <div className="container py-10 md:py-14">
        <div className="max-w-[68ch] mx-auto">
          {/* Author bio (compact) */}
          <motion.div
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.55 }}
            className="rounded-xl border border-bekasi-emerald-900/10 bg-bekasi-cream p-5 md:p-6 flex flex-col sm:flex-row gap-4 items-start"
          >
            <div
              className="h-12 w-12 rounded-md flex items-center justify-center shrink-0 font-sans font-semibold text-lg text-white"
              style={{ background: cat.color }}
            >
              {post.author.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[10.5px] uppercase tracking-[0.22em] text-bekasi-gold-600">Written by</div>
              <div className="mt-1 font-sans font-semibold text-lg text-bekasi-emerald-900">{post.author.name}</div>
              <div className="text-sm text-bekasi-ink/60">{post.author.role} · BekasiGo</div>
              <p className="mt-2 text-sm text-bekasi-ink/70 leading-relaxed">
                Filed on {formatPostDate(post.publishedAt)}. Written for readers who need it useful, not lyrical.
              </p>
            </div>
          </motion.div>

          {/* Tags + share */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="text-[10.5px] uppercase tracking-[0.22em] text-bekasi-ink/50">Filed under</span>
            {post.tags?.map((t) => (
              <span key={t} className="rounded-md border border-bekasi-emerald-900/12 bg-white px-2.5 py-1 text-[11px] uppercase tracking-[0.15em] text-bekasi-ink/65">
                #{t}
              </span>
            ))}
            <div className="ml-auto flex items-center gap-2">
              <button className="h-9 rounded-md border border-bekasi-emerald-900/15 hover:border-bekasi-emerald-900/30 hover:bg-bekasi-emerald-900 hover:text-white px-3 inline-flex items-center gap-2 text-xs transition-colors">
                <Share2 className="h-3.5 w-3.5" /> Share
              </button>
              <button className="h-9 rounded-md border border-bekasi-emerald-900/15 hover:border-bekasi-emerald-900/30 hover:bg-bekasi-emerald-900 hover:text-white px-3 inline-flex items-center gap-2 text-xs transition-colors">
                <LinkIcon className="h-3.5 w-3.5" /> Copy link
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
