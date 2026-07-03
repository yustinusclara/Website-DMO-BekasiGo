'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Quote, Info, List as ListIcon } from 'lucide-react'
import { extractToc } from '@/lib/content/blog'
import { cn } from '@/lib/utils'

/**
 * BlogPostBody — renders block-based article body PLUS a sticky
 * Table-of-Contents sidebar (SEO friendly, functional). Distinct from
 * Stories: sans-serif headings, cleaner spacing, no drop cap.
 */
export default function BlogPostBody({ post }) {
  const toc = extractToc(post)
  const [active, setActive] = useState(null)

  // Track scroll to highlight active section
  useEffect(() => {
    if (!toc.length) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 },
    )
    toc.forEach((h) => {
      const el = document.getElementById(h.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [toc])

  return (
    <section className="relative bg-white text-bekasi-ink">
      <div className="container py-14 md:py-20">
        <div className="grid gap-10 md:gap-14 lg:grid-cols-[1fr_260px] xl:grid-cols-[1fr_280px]">
          {/* Article */}
          <article className="max-w-[68ch] mx-auto lg:mx-0 space-y-6 md:space-y-7">
            {post.body.map((block, i) => (
              <Block key={i} block={block} index={i} />
            ))}
          </article>

          {/* Table of Contents sidebar */}
          {toc.length > 0 && (
            <aside className="hidden lg:block">
              <div className="sticky top-32">
                <div className="text-[10.5px] uppercase tracking-[0.22em] text-bekasi-gold-600 inline-flex items-center gap-2 mb-4">
                  <ListIcon className="h-3.5 w-3.5" /> In this post
                </div>
                <nav className="border-l border-bekasi-emerald-900/10 space-y-1">
                  {toc.map((h) => (
                    <a
                      key={h.id}
                      href={`#${h.id}`}
                      className={cn(
                        'block -ml-px border-l pl-3 py-1.5 text-[13px] leading-snug transition-colors',
                        h.level === 3 && 'pl-6 text-[12.5px]',
                        active === h.id
                          ? 'border-bekasi-gold-500 text-bekasi-emerald-900 font-medium'
                          : 'border-transparent text-bekasi-ink/60 hover:text-bekasi-emerald-900',
                      )}
                    >
                      {h.text}
                    </a>
                  ))}
                </nav>

                {post.tags?.length > 0 && (
                  <div className="mt-8">
                    <div className="text-[10.5px] uppercase tracking-[0.22em] text-bekasi-gold-600 mb-3">Tags</div>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((t) => (
                        <span key={t} className="rounded-md border border-bekasi-emerald-900/12 bg-white px-2.5 py-1 text-[10.5px] uppercase tracking-[0.15em] text-bekasi-ink/65">
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </aside>
          )}
        </div>
      </div>
    </section>
  )
}

function Block({ block, index }) {
  const anchor = `h-${index}`
  const reveal = {
    initial: { opacity: 0, y: 14 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.55 },
  }

  switch (block.type) {
    case 'paragraph':
      return (
        <motion.p {...reveal} className="text-[16.5px] md:text-[17px] leading-[1.75] text-bekasi-ink/80">
          {block.text}
        </motion.p>
      )
    case 'heading':
      return (
        <motion.h2 {...reveal} id={anchor} className="scroll-mt-32 pt-4 font-sans font-semibold text-2xl md:text-[1.75rem] leading-tight tracking-tight text-bekasi-emerald-900">
          {block.text}
        </motion.h2>
      )
    case 'subheading':
      return (
        <motion.h3 {...reveal} id={anchor} className="scroll-mt-32 pt-2 font-sans font-semibold text-xl leading-snug text-bekasi-emerald-900">
          {block.text}
        </motion.h3>
      )
    case 'list':
      return (
        <motion.ul {...reveal} className="space-y-2.5 pl-1">
          {block.items.map((t, i) => (
            <li key={i} className="flex gap-3 text-[16px] leading-relaxed text-bekasi-ink/80">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-bekasi-gold-500 shrink-0" aria-hidden />
              <span>{t}</span>
            </li>
          ))}
        </motion.ul>
      )
    case 'ordered_list':
      return (
        <motion.ol {...reveal} className="space-y-3">
          {block.items.map((t, i) => (
            <li key={i} className="relative pl-10 text-[16px] leading-relaxed text-bekasi-ink/80">
              <span className="absolute left-0 top-0 h-7 w-7 rounded-md bg-bekasi-emerald-900 text-white inline-flex items-center justify-center text-sm font-medium">{i + 1}</span>
              {t}
            </li>
          ))}
        </motion.ol>
      )
    case 'note':
      return (
        <motion.aside {...reveal} className="relative rounded-md border-l-4 border-bekasi-gold-500 bg-bekasi-gold-500/[0.08] p-4 md:p-5">
          <div className="flex items-start gap-3">
            <Info className="h-4 w-4 mt-0.5 text-bekasi-gold-600 shrink-0" />
            <div>
              <div className="text-[10.5px] uppercase tracking-[0.22em] text-bekasi-gold-600 font-medium">Note</div>
              <p className="mt-1 text-[15px] text-bekasi-ink/80 leading-relaxed">{block.text}</p>
            </div>
          </div>
        </motion.aside>
      )
    case 'quote':
      return (
        <motion.figure {...reveal} className="my-2 border-l-2 border-bekasi-emerald-900/25 pl-6">
          <Quote className="h-5 w-5 text-bekasi-gold-500 mb-2" strokeWidth={1.5} />
          <blockquote className="font-sans text-lg md:text-xl leading-snug text-bekasi-emerald-900">
            “{block.text}”
          </blockquote>
          {block.attribution && (
            <figcaption className="mt-3 text-[11px] uppercase tracking-[0.22em] text-bekasi-ink/55">— {block.attribution}</figcaption>
          )}
        </motion.figure>
      )
    case 'image':
      return (
        <motion.figure {...reveal}>
          <div className="relative aspect-[16/10] rounded-md overflow-hidden">
            <Image src={block.src} alt={block.caption ?? ''} fill sizes="(max-width: 1024px) 100vw, 800px" className="object-cover" />
          </div>
          {block.caption && (
            <figcaption className="mt-2 text-[12.5px] text-bekasi-ink/55">{block.caption}</figcaption>
          )}
        </motion.figure>
      )
    case 'divider':
      return <motion.hr {...reveal} className="border-t border-bekasi-emerald-900/10 my-4" />
    default:
      return null
  }
}
