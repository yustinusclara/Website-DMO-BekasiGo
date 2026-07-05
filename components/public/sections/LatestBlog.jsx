'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight, Mail, Rss } from 'lucide-react'
import ChapterMarker from '@/components/shared/ChapterMarker'
import PillNav from '@/components/shared/PillNav'
import BlogCard from '@/components/shared/BlogCard'
import { BLOG } from '@/lib/content/homepage'

export default function LatestBlog({ data }) {
  const content = data || BLOG;
  const [cat, setCat] = useState('all')

  return (
    <section id="blog" className="relative overflow-hidden bg-bekasi-cream">
      <div className="container py-24 md:py-32 lg:py-36">
        <ChapterMarker text={content.chapter} variant="light" />

        {/* Editorial header */}
        <div className="mt-14 md:mt-20 grid lg:grid-cols-12 gap-8 lg:gap-16 items-end">
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.8 }}
            className="lg:col-span-7"
          >
            <span className="eyebrow eyebrow-dot text-bekasi-emerald-700">{content.eyebrow}</span>
            <h2 className="mt-6 heading-display text-display-xl leading-[1.02] text-bekasi-emerald-900 text-balance">
              {content.title}
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.8, delay: 0.1 }}
            className="lg:col-span-5"
          >
            <p className="body-lg text-bekasi-ink/70 max-w-lg">{content.kicker}</p>
            <div className="mt-4 flex items-center gap-3 text-xs text-bekasi-ink/50">
              <Rss className="h-3.5 w-3.5" />
              <span className="font-mono">{content.totalPosts}</span> articles in the archive
            </div>
          </motion.div>
        </div>

        {/* Category filter */}
        <div className="mt-10 md:mt-12 flex flex-wrap items-center justify-between gap-4">
          <PillNav
            items={content.categories}
            activeId={cat}
            onSelect={setCat}
            layoutId="blog-cat-bg"
            variant="light"
            size="md"
          />
          <Link href={content.action.href} className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium text-bekasi-emerald-900 hover:text-bekasi-emerald-700 whitespace-nowrap">
            {content.action.label} <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Main split: Featured + Compact list */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 md:mt-10 grid lg:grid-cols-12 gap-6 md:gap-10"
        >
          <div className="lg:col-span-7">
            <BlogCard item={content.featured} variant="featured" />
          </div>
          <div className="lg:col-span-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-eyebrow uppercase text-bekasi-ink/60">More reads</span>
              <span className="mono text-bekasi-ink/40">{content.compact.length}</span>
            </div>
            <ul className="divide-y divide-black/[0.06]">
              {content.compact.map((post) => (
                <li key={post.href}><BlogCard item={post} variant="compact" /></li>
              ))}
            </ul>
            <Link href={content.action.href} className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-bekasi-emerald-900 hover:text-bekasi-emerald-700">
              Browse all posts <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>

        {/* Additional 3-col grid */}
        <div className="mt-16 md:mt-20">
          <div className="flex items-end justify-between mb-6">
            <div>
              <div className="mono text-bekasi-ink/50 mb-2">Also worth reading</div>
              <h3 className="heading-3 text-bekasi-emerald-900">Fresh from the editors.</h3>
            </div>
          </div>
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}
            variants={{ show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } }}
            className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6"
          >
            {content.grid.map((post) => (
              <motion.div
                key={post.href}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
                }}
              >
                <BlogCard item={post} variant="grid" />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Newsletter + CTA row */}
        <div className="mt-16 md:mt-20 rounded-3xl bg-white border border-black/[0.05] p-6 md:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-start gap-4 max-w-xl">
            <div className="h-12 w-12 rounded-full bg-bekasi-emerald-900 text-bekasi-gold-400 flex items-center justify-center flex-shrink-0">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <p className="heading-4 text-bekasi-emerald-900">A slower letter from Bekasi.</p>
              <p className="mt-2 text-sm text-bekasi-ink/60">One monthly email of stories, guides, and event drops — unsubscribe anytime.</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link href={content.secondaryAction.href} className="btn-ghost btn-md text-bekasi-emerald-900">
              {content.secondaryAction.label}
            </Link>
            <Link href={content.action.href}>
              <button className="btn-primary btn-md">
                <Rss className="h-4 w-4" /> {content.action.label}
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
