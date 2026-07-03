'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, MapPin, ChevronLeft, ChevronRight, Sparkles, Play, Pause } from 'lucide-react'
import { cn } from '@/lib/utils'
import ChapterMarker from '@/components/ds/ChapterMarker'
import { URBAN } from '@/lib/content/homepage'

/**
 * Urban Lifestyle — magazine-style "Lifestyle Reel":
 *  - Chapter marker + editorial header
 *  - Big feature panel (large image + rich narrative + "known for" chips)
 *  - Thumbnail strip navigation below with progress track
 *  - Auto-cycle every 7s, stops on interaction
 */
export default function UrbanLifestyle() {
  const items = URBAN.items
  const [activeIdx, setActiveIdx] = useState(0)
  const [playing, setPlaying] = useState(true)

  useEffect(() => {
    if (!playing) return
    const t = setInterval(() => setActiveIdx((i) => (i + 1) % items.length), 7000)
    return () => clearInterval(t)
  }, [playing, items.length])

  const active = items[activeIdx]
  const goto  = (i) => { setPlaying(false); setActiveIdx(((i % items.length) + items.length) % items.length) }
  const prev  = () => goto(activeIdx - 1)
  const next  = () => goto(activeIdx + 1)

  return (
    <section id="urban" className="relative overflow-hidden bg-bekasi-cream">
      <div className="container py-24 md:py-32 lg:py-36">
        <ChapterMarker text={URBAN.chapter} variant="light" />

        {/* Editorial header */}
        <div className="mt-14 md:mt-20 grid lg:grid-cols-12 gap-8 lg:gap-16 items-end">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <span className="eyebrow eyebrow-dot text-bekasi-emerald-700">{URBAN.eyebrow}</span>
            <h2 className="mt-6 heading-display text-display-xl leading-[1.02] text-bekasi-emerald-900 text-balance">
              {URBAN.title}
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <p className="body-lg text-bekasi-ink/70 max-w-lg">{URBAN.kicker}</p>
            <Link
              href={URBAN.action.href}
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-bekasi-emerald-900 border-b border-bekasi-emerald-900/40 hover:border-bekasi-emerald-900 pb-1"
            >
              {URBAN.action.label} <ArrowUpRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>

        {/* Feature Reel Panel */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 md:mt-20 rounded-3xl overflow-hidden bg-bekasi-emerald-900 shadow-elevated"
        >
          <div className="grid lg:grid-cols-12 min-h-[520px] md:min-h-[560px]">
            {/* Image side */}
            <div className="relative lg:col-span-7 aspect-[16/10] lg:aspect-auto bg-bekasi-emerald-900 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.img
                  key={active.id}
                  src={active.image}
                  alt={active.title}
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className="img-cover"
                  loading="lazy"
                />
              </AnimatePresence>
              <div aria-hidden className="absolute inset-0 bg-gradient-to-tr from-bekasi-emerald-900/70 via-transparent to-transparent" />

              {/* Corner chapter tag */}
              <div className="absolute top-5 left-5 flex items-center gap-2">
                <span className="chip-dark"><Sparkles className="h-3 w-3" /> Featured Hub</span>
              </div>
              <div className="absolute bottom-5 left-5 flex items-center gap-2 text-white/80">
                <MapPin className="h-3.5 w-3.5" />
                <span className="text-xs uppercase tracking-[0.22em]">{active.district}</span>
              </div>
            </div>

            {/* Content side */}
            <div className="relative lg:col-span-5 p-8 md:p-10 lg:p-12 flex flex-col justify-between text-white">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="flex items-center justify-between">
                    <span className="mono text-bekasi-gold-400">
                      0{activeIdx + 1} / 0{items.length}
                    </span>
                    <span className="chip-gold">{active.category}</span>
                  </div>
                  <h3 className="mt-6 heading-display text-4xl md:text-5xl leading-tight text-balance">
                    {active.title}
                  </h3>
                  <p className="mt-5 body text-white/75">
                    {active.excerpt}
                  </p>

                  <div className="mt-6">
                    <div className="text-eyebrow uppercase text-white/50 mb-3">Known for</div>
                    <div className="flex flex-wrap gap-2">
                      {active.knownFor.map((k) => (
                        <span key={k} className="pill-dark text-[11px]">{k}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
                <Link href={active.href}>
                  <button className="btn-primary btn-md group">
                    Visit this hub
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </Link>
                <button
                  onClick={() => setPlaying((p) => !p)}
                  aria-label={playing ? 'Pause reel' : 'Play reel'}
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-white/60 hover:text-white transition-colors"
                >
                  <span className="h-9 w-9 rounded-full border border-white/20 flex items-center justify-center">
                    {playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5 fill-current ml-0.5" />}
                  </span>
                  <span className="hidden md:inline">{playing ? 'Pause reel' : 'Play reel'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Thumbnail strip navigation */}
          <div className="border-t border-white/10 bg-bekasi-emerald-900/80">
            <div className="flex items-stretch">
              <button
                onClick={prev}
                aria-label="Previous hub"
                className="flex-shrink-0 w-14 md:w-16 border-r border-white/10 text-white/60 hover:text-white hover:bg-white/[0.04] transition-colors flex items-center justify-center"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <div className="flex-1 grid grid-cols-5 divide-x divide-white/10">
                {items.map((item, i) => {
                  const isActive = i === activeIdx
                  return (
                    <button
                      key={item.id}
                      onClick={() => goto(i)}
                      className={cn(
                        'group relative px-3 py-4 md:px-4 md:py-5 text-left transition-colors overflow-hidden',
                        isActive ? 'bg-white/[0.06]' : 'hover:bg-white/[0.03]',
                      )}
                    >
                      {/* Active progress bar */}
                      {isActive && (
                        <motion.span
                          layoutId="reel-underline"
                          className="absolute inset-x-0 top-0 h-0.5 bg-bekasi-gold-500"
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        />
                      )}
                      <div className="flex items-start gap-3">
                        <div className="relative flex-shrink-0 h-12 w-12 md:h-14 md:w-14 rounded-lg overflow-hidden bg-bekasi-emerald-800">
                          <img src={item.image} alt="" className="img-cover" loading="lazy" />
                          {!isActive && <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />}
                        </div>
                        <div className="min-w-0 hidden sm:block">
                          <div className={cn('text-[10px] uppercase tracking-[0.22em]', isActive ? 'text-bekasi-gold-400' : 'text-white/45')}>
                            0{i + 1}
                          </div>
                          <div className={cn('mt-1 text-sm font-medium leading-tight truncate', isActive ? 'text-white' : 'text-white/60')}>
                            {item.title}
                          </div>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
              <button
                onClick={next}
                aria-label="Next hub"
                className="flex-shrink-0 w-14 md:w-16 border-l border-white/10 text-white/60 hover:text-white hover:bg-white/[0.04] transition-colors flex items-center justify-center"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
