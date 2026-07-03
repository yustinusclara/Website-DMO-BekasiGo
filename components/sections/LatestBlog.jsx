'use client'

import Link from 'next/link'
import Section from '@/components/layout/Section'
import { BLOG } from '@/lib/content/homepage'
import { ArrowUpRight } from 'lucide-react'

export default function LatestBlog() {
  return (
    <Section id="blog" variant="cream"
      eyebrow={BLOG.eyebrow}
      title={BLOG.title}
      action={BLOG.action}
    >
      <div className="grid md:grid-cols-3 gap-5 md:gap-6">
        {BLOG.items.map((post) => (
          <Link key={post.title} href="#" className="group rounded-2xl overflow-hidden bg-white border border-black/5 hover:shadow-xl hover:shadow-bekasi-emerald-900/5 hover:-translate-y-1 transition-all flex flex-col">
            <div className="relative aspect-[16/10] overflow-hidden">
              <img src={post.image} alt={post.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110" loading="lazy" />
              <span className="absolute top-4 left-4 text-[10px] uppercase tracking-[0.25em] text-white/95 bg-black/30 backdrop-blur px-3 py-1 rounded-full border border-white/20">
                {post.category}
              </span>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <div className="text-xs text-bekasi-ink/50 uppercase tracking-[0.2em]">{post.date}</div>
              <h3 className="mt-3 font-display text-xl md:text-2xl text-bekasi-emerald-900 leading-snug flex-1">
                {post.title}
              </h3>
              <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-bekasi-emerald-900">
                Read article
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  )
}
