'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight, Clock } from 'lucide-react'
import { BLOG_CATEGORIES, formatPostDate } from '@/lib/content/blog'

export default function RelatedPosts({ items }) {
  if (!items?.length) return null
  return (
    <section className="relative bg-bekasi-cream text-bekasi-ink">
      <div className="container py-14 md:py-20">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-8 md:mb-12">
          <div>
            <div className="text-[11px] uppercase tracking-[0.22em] text-bekasi-gold-600 inline-flex items-center gap-2">
              <span className="h-px w-8 bg-bekasi-gold-500" />
              Keep reading
            </div>
            <h2 className="mt-4 font-sans font-semibold text-2xl md:text-3xl leading-tight tracking-tight text-bekasi-emerald-900">
              More from the desk
            </h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-md border border-bekasi-emerald-900/15 hover:border-bekasi-emerald-900/30 hover:bg-bekasi-emerald-900 hover:text-white px-4 py-2 text-sm font-medium transition-all"
          >
            All posts <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-5 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p, i) => {
            const cat = BLOG_CATEGORIES.find((c) => c.id === p.category) ?? { color: '#155F58', label: p.category }
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: i * 0.06 }}
              >
                <Link
                  href={`/blog/${p.slug}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-bekasi-emerald-900/10 bg-white hover:border-bekasi-emerald-900/25 hover:shadow-elevated transition-all"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image src={p.cover} alt={p.title} fill sizes="(max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-md bg-white/95 backdrop-blur px-2 py-0.5">
                      <span className="h-1.5 w-1.5 rounded-full" style={{ background: cat.color }} />
                      <span className="text-[10.5px] uppercase tracking-[0.2em] text-bekasi-emerald-900 font-medium">{cat.label}</span>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col p-5">
                    <h3 className="font-sans font-semibold text-lg leading-snug text-bekasi-emerald-900 group-hover:text-bekasi-emerald-800 line-clamp-2">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-[13.5px] text-bekasi-ink/65 leading-relaxed line-clamp-2">{p.excerpt}</p>
                    <div className="mt-auto pt-4 text-[11px] text-bekasi-ink/55 inline-flex items-center gap-2">
                      <span>{formatPostDate(p.publishedAt, { short: true })}</span>
                      <span className="text-bekasi-ink/30">·</span>
                      <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {p.readTime}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
