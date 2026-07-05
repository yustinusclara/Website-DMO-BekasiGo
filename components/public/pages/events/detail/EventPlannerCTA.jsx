'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Sparkles, Compass, ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function EventPlannerCTA({ evt }) {
  return (
    <section className="relative bg-bekasi-emerald-900 text-white overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-bekasi-gold-500/15 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-40 right-1/4 h-[420px] w-[420px] rounded-full bg-bekasi-emerald-500/20 blur-3xl" />

      <div className="relative container py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="grid gap-8 lg:grid-cols-[1fr_auto] items-center"
        >
          <div>
            <div className="flex items-center gap-3 text-bekasi-gold-400">
              <Sparkles className="h-4 w-4" />
              <span className="text-[11px] uppercase tracking-[0.28em]">Smart Planner</span>
            </div>
            <h2 className="mt-3 font-display text-3xl md:text-4xl lg:text-5xl leading-[1.05] tracking-tight text-balance max-w-3xl">
              Turn {evt.title} into a full Bekasi day.
            </h2>
            <p className="mt-4 text-white/70 max-w-2xl leading-relaxed">
              Our AI stitches nearby food, sights, and transit around your event—so you arrive on time and leave with a story.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link href={`/planner?seed=event:${evt.slug}`}>
              <Button className="h-12 rounded-full bg-bekasi-gold-500 hover:bg-bekasi-gold-400 text-bekasi-emerald-900 font-medium px-6 gap-2">
                <Sparkles className="h-4 w-4" />
                Plan around this event
              </Button>
            </Link>
            <Link href="/map">
              <Button
                variant="outline"
                className="h-12 rounded-full border-white/25 bg-white/[0.04] text-white hover:bg-white hover:text-bekasi-emerald-900 px-6 gap-2"
              >
                <Compass className="h-4 w-4" />
                Open Explore Map
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
