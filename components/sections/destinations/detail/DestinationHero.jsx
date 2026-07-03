'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ChevronRight, MapPin, Star, Clock, Ticket, Share2, Heart, ArrowDown,
} from 'lucide-react'
import { categories as CAT } from '@/lib/design/tokens'
import { DEST_DISTRICTS } from '@/lib/content/destinations'

export default function DestinationHero({ dest }) {
  const cat = CAT[dest.category] ?? { label: dest.category, color: '#155F58' }
  const district = DEST_DISTRICTS.find((d) => d.id === dest.district)?.label ?? dest.district

  return (
    <section className="relative isolate min-h-[92vh] md:min-h-screen text-white overflow-hidden">
      {/* Background image */}
      <Image
        src={dest.image}
        alt={dest.title}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center scale-105"
      />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/25 to-bekasi-emerald-900" />
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(212,169,76,0.15)_0%,_transparent_50%)]" />

      <div className="relative container flex flex-col justify-end min-h-[92vh] md:min-h-screen pt-28 pb-14 md:pb-20">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-white/70"
        >
          <Link href="/" className="hover:text-bekasi-gold-400 transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3 opacity-60" />
          <Link href="/destinations" className="hover:text-bekasi-gold-400 transition-colors">Destinations</Link>
          <ChevronRight className="h-3 w-3 opacity-60" />
          <span className="text-bekasi-gold-400">{dest.title}</span>
        </motion.nav>

        {/* Category + district chip row */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-8 md:mt-10 flex flex-wrap items-center gap-2"
        >
          <span
            className="inline-flex items-center gap-2 rounded-full bg-white/95 backdrop-blur px-3 py-1.5"
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: cat.color }} />
            <span className="text-[10.5px] uppercase tracking-[0.22em] text-bekasi-emerald-900 font-medium">{cat.label}</span>
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/[0.06] backdrop-blur px-3 py-1.5 text-[11px] uppercase tracking-[0.2em] text-white/80">
            <MapPin className="h-3 w-3" /> {district}
          </span>
          {dest.featured && (
            <span className="rounded-full bg-bekasi-gold-500 text-bekasi-emerald-900 px-3 py-1.5 text-[10.5px] uppercase tracking-[0.2em] font-semibold">
              Featured
            </span>
          )}
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] leading-[0.98] tracking-tight text-balance max-w-5xl"
        >
          {dest.title}
        </motion.h1>

        {/* Summary */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-5 max-w-2xl text-base md:text-lg text-white/80 leading-relaxed"
        >
          {dest.excerpt}
        </motion.p>

        {/* Meta strip */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 md:mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/80"
        >
          {dest.rating && (
            <span className="inline-flex items-center gap-1.5">
              <Star className="h-4 w-4 fill-bekasi-gold-400 text-bekasi-gold-400" />
              <span className="font-medium text-white">{dest.rating.toFixed(1)}</span>
              <span className="text-white/50">({dest.reviews?.toLocaleString() ?? 0} reviews)</span>
            </span>
          )}
          {dest.duration && (
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-white/60" /> {dest.duration}
            </span>
          )}
          {dest.fee && (
            <span className="inline-flex items-center gap-1.5">
              <Ticket className="h-4 w-4 text-white/60" /> {dest.fee}
            </span>
          )}

          {/* Quick actions */}
          <div className="flex items-center gap-2 ml-auto">
            <button className="h-10 rounded-full border border-white/20 hover:border-white/40 bg-white/[0.06] hover:bg-white/[0.12] px-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] transition-colors">
              <Heart className="h-4 w-4" /> Save
            </button>
            <button className="h-10 rounded-full border border-white/20 hover:border-white/40 bg-white/[0.06] hover:bg-white/[0.12] px-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] transition-colors">
              <Share2 className="h-4 w-4" /> Share
            </button>
          </div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-10 md:mt-14 flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-white/50"
        >
          <span>Scroll to explore</span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20"
          >
            <ArrowDown className="h-3.5 w-3.5" />
          </motion.span>
        </motion.div>
      </div>
    </section>
  )
}
