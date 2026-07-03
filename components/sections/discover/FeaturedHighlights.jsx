'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { MapPin, ArrowUpRight } from 'lucide-react'
import { DISCOVER } from '@/lib/content/discover'
import { categories as CAT } from '@/lib/design/tokens'
import Eyebrow from '@/components/ds/Eyebrow'

/**
 * FeaturedHighlights — editorial numbered spotlight of 3 places.
 * Alternating layout: image left, text right, image left again.
 */
export default function FeaturedHighlights() {
  const { highlights } = DISCOVER
  return (
    <section className="relative bg-bekasi-emerald-900 text-white overflow-hidden">
      {/* subtle noise + ambient blobs */}
      <div aria-hidden className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-bekasi-gold-500/10 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-40 right-1/4 h-[420px] w-[420px] rounded-full bg-bekasi-emerald-500/20 blur-3xl" />

      <div className="relative container py-20 md:py-28 lg:py-32">
        <div className="max-w-3xl">
          <Eyebrow variant="gold">{highlights.eyebrow}</Eyebrow>
          <h2 className="mt-4 font-display text-3xl md:text-5xl leading-tight tracking-tight text-balance">
            {highlights.heading}
          </h2>
          <p className="mt-4 max-w-xl text-white/70 leading-relaxed">{highlights.kicker}</p>
        </div>

        <div className="mt-14 md:mt-20 space-y-16 md:space-y-24">
          {highlights.items.map((it, i) => (
            <HighlightRow key={it.number} item={it} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function HighlightRow({ item, index }) {
  const c = CAT[item.cat]
  const flip = index % 2 === 1
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-120px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`grid gap-8 md:gap-12 lg:gap-16 lg:grid-cols-12 items-center ${flip ? 'lg:flex-row-reverse' : ''}`}
    >
      {/* Image */}
      <Link
        href={item.href}
        className={`group relative block overflow-hidden rounded-2xl lg:col-span-7 aspect-[4/3] md:aspect-[16/10] ${flip ? 'lg:order-2' : ''}`}
      >
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* number overlay */}
        <div className="absolute top-4 left-4 md:top-6 md:left-6 font-display text-4xl md:text-5xl text-white/90 leading-none drop-shadow-lg">
          {item.number}
        </div>

        {/* category chip */}
        <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 inline-flex items-center gap-2 rounded-full bg-white/90 backdrop-blur px-3 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: c.color }} />
          <span className="text-[11px] uppercase tracking-[0.2em] text-bekasi-emerald-900">{c.label}</span>
        </div>
      </Link>

      {/* Text */}
      <div className={`lg:col-span-5 ${flip ? 'lg:order-1' : ''}`}>
        <div className="text-[11px] uppercase tracking-[0.28em] text-bekasi-gold-400">Highlight {item.number}</div>
        <h3 className="mt-3 font-display text-3xl md:text-4xl lg:text-5xl leading-[1.05] tracking-tight text-white">
          {item.title}
        </h3>
        <div className="mt-3 inline-flex items-center gap-1.5 text-white/60 text-sm">
          <MapPin className="h-3.5 w-3.5" />
          {item.location}
        </div>
        <p className="mt-5 text-white/75 leading-relaxed max-w-lg">{item.kicker}</p>
        <Link
          href={item.href}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/[0.06] hover:bg-white text-white hover:text-bekasi-emerald-900 border border-white/15 hover:border-white px-5 py-2.5 text-sm font-medium transition-all"
        >
          Open the story
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </motion.div>
  )
}
