'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import { DISCOVER } from '@/lib/content/discover'
import { categories as CAT } from '@/lib/design/tokens'
import Eyebrow from '@/components/ds/Eyebrow'

export default function CityPositioning() {
  const { positioning } = DISCOVER
  return (
    <section className="relative bg-bekasi-cream text-bekasi-ink">
      <div className="container py-20 md:py-28 lg:py-32">
        <div className="grid lg:grid-cols-12 gap-10 md:gap-14 lg:gap-20 items-start">
          {/* Left — narrative */}
          <div className="lg:col-span-7">
            <Eyebrow>{positioning.eyebrow}</Eyebrow>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7 }}
              className="mt-4 font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.05] tracking-tight text-balance"
            >
              {positioning.heading}
            </motion.h2>

            <div className="mt-8 space-y-5 max-w-2xl text-[15px] md:text-base leading-relaxed text-bekasi-ink/75">
              {positioning.paragraphs.map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
                >
                  {p}
                </motion.p>
              ))}
            </div>

            {/* Pull quote */}
            <motion.figure
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-10 relative rounded-2xl border border-bekasi-emerald-900/10 bg-white p-6 md:p-8"
            >
              <Quote className="absolute -top-3 -left-3 h-8 w-8 text-bekasi-gold-500 fill-bekasi-gold-500" strokeWidth={1.5} />
              <blockquote className="font-display text-xl md:text-2xl leading-snug text-bekasi-emerald-900">
                “{positioning.quote}”
              </blockquote>
              <figcaption className="mt-4 text-[11px] uppercase tracking-[0.22em] text-bekasi-ink/50">
                — {positioning.attribution}
              </figcaption>
            </motion.figure>
          </div>

          {/* Right — portrait + pillars */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-black/5 shadow-elevated"
            >
              <Image
                src={positioning.portrait}
                alt="Bekasi portrait"
                fill
                sizes="(max-width: 1024px) 100vw, 500px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 text-white">
                <div className="text-[10.5px] uppercase tracking-[0.22em] text-bekasi-gold-400">Portrait</div>
                <div className="mt-1 text-sm md:text-[15px] text-white/90">{positioning.portraitCaption}</div>
              </div>
            </motion.div>

            {/* Pillars */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              {positioning.pillars.map((p, i) => {
                const c = CAT[p.cat]
                return (
                  <motion.div
                    key={p.title}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
                    className="relative rounded-xl border border-bekasi-emerald-900/10 bg-white p-4"
                  >
                    <span
                      aria-hidden
                      className="absolute left-4 top-4 h-1.5 w-1.5 rounded-full"
                      style={{ background: c.color }}
                    />
                    <div className="pl-4">
                      <div className="text-[15px] font-display leading-tight text-bekasi-emerald-900">{p.title}</div>
                      <div className="mt-1 text-[12.5px] text-bekasi-ink/60">{p.kicker}</div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
