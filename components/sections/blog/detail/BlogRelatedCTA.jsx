'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Sparkles, ArrowUpRight, MapPin, Star, Compass } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { categories as CAT } from '@/lib/design/tokens'
import { DEST_DISTRICTS } from '@/lib/content/destinations'

/**
 * BlogRelatedCTA — shown between the article body and its close.
 *   Card A: linked destination (if the post references one)
 *   Card B: Smart Planner CTA
 * If no related destination, we show the planner CTA full-width.
 */
export default function BlogRelatedCTA({ post, destination }) {
  return (
    <section className="relative bg-bekasi-cream text-bekasi-ink">
      <div className="container py-12 md:py-16">
        <div className={destination ? 'grid gap-5 md:gap-6 lg:grid-cols-2' : ''}>
          {destination && <DestinationCard destination={destination} />}
          <PlannerCTA post={post} full={!destination} />
        </div>
      </div>
    </section>
  )
}

function DestinationCard({ destination: d }) {
  const cat = CAT[d.category] ?? { color: '#155F58', label: d.category }
  const district = DEST_DISTRICTS.find((x) => x.id === d.district)?.label ?? d.district
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6 }}
    >
      <Link
        href={`/destinations/${d.slug}`}
        className="group relative flex flex-col sm:flex-row overflow-hidden rounded-xl border border-bekasi-emerald-900/10 bg-white hover:border-bekasi-emerald-900/25 hover:shadow-elevated transition-all"
      >
        <div className="relative w-full sm:w-56 aspect-[4/3] sm:aspect-auto sm:min-h-full shrink-0 overflow-hidden">
          <Image src={d.image} alt={d.title} fill sizes="(max-width: 640px) 100vw, 240px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-md bg-white/95 backdrop-blur px-2.5 py-1">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: cat.color }} />
            <span className="text-[10.5px] uppercase tracking-[0.2em] text-bekasi-emerald-900 font-medium">{cat.label}</span>
          </div>
        </div>
        <div className="flex-1 p-5 md:p-6 flex flex-col">
          <div className="text-[10.5px] uppercase tracking-[0.22em] text-bekasi-gold-600 inline-flex items-center gap-2">
            <MapPin className="h-3 w-3" /> Referenced destination
          </div>
          <h3 className="mt-2 font-sans font-semibold text-xl leading-tight text-bekasi-emerald-900 group-hover:text-bekasi-emerald-800">
            {d.title}
          </h3>
          <div className="mt-1 flex items-center gap-2 text-xs text-bekasi-ink/60">
            <span>{district}</span>
            {d.rating && (
              <>
                <span className="text-bekasi-ink/30">·</span>
                <span className="inline-flex items-center gap-1">
                  <Star className="h-3 w-3 fill-bekasi-gold-500 text-bekasi-gold-500" />
                  {d.rating.toFixed(1)}
                </span>
              </>
            )}
          </div>
          <p className="mt-3 text-sm text-bekasi-ink/70 leading-relaxed line-clamp-2">{d.excerpt}</p>
          <div className="mt-auto pt-4 flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-[0.18em] text-bekasi-gold-600">Open destination</span>
            <span className="inline-flex items-center justify-center h-8 w-8 rounded-md bg-bekasi-emerald-900/[0.04] text-bekasi-emerald-900 group-hover:bg-bekasi-emerald-900 group-hover:text-white transition-colors">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

function PlannerCTA({ post, full }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6, delay: 0.1 }}
      className={full ? '' : ''}
    >
      <div className="group relative flex flex-col overflow-hidden rounded-xl bg-bekasi-emerald-900 text-white p-6 md:p-8 min-h-full">
        <div aria-hidden className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-bekasi-gold-500/15 blur-3xl" />

        <div className="relative">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-md bg-bekasi-gold-500 text-bekasi-emerald-900">
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="mt-4 text-[10.5px] uppercase tracking-[0.22em] text-bekasi-gold-400">Smart Planner</div>
          <h3 className="mt-2 font-sans font-semibold text-2xl md:text-[1.65rem] leading-tight">
            Turn this post into a real trip.
          </h3>
          <p className="mt-3 text-sm text-white/70 leading-relaxed max-w-md">
            Let the BekasiGo AI planner build a full itinerary around what you just read.
          </p>
        </div>

        <div className="relative mt-6 flex flex-wrap gap-3">
          <Link href={`/planner?seed=blog:${post.slug}`}>
            <Button className="h-11 rounded-md bg-bekasi-gold-500 hover:bg-bekasi-gold-400 text-bekasi-emerald-900 font-medium px-5 gap-2">
              <Sparkles className="h-4 w-4" />
              Open Smart Planner
            </Button>
          </Link>
          <Link href="/map">
            <Button variant="outline" className="h-11 rounded-md border-white/25 bg-white/[0.04] text-white hover:bg-white hover:text-bekasi-emerald-900 px-5 gap-2">
              <Compass className="h-4 w-4" />
              Open Map
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
