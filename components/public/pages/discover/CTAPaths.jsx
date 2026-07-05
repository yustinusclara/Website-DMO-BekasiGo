'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { MapPin, Calendar, Sparkles, Globe, ArrowUpRight } from 'lucide-react'
import { DISCOVER } from '@/lib/content/discover'
import Eyebrow from '@/components/shared/Eyebrow'
import { cn } from '@/lib/utils'

const ICONS = { MapPin, Calendar, Sparkles, Globe }

export default function CTAPaths() {
  const { paths } = DISCOVER
  return (
    <section className="relative bg-bekasi-cream text-bekasi-ink">
      <div className="container py-20 md:py-28">
        <div className="max-w-3xl">
          <Eyebrow>{paths.eyebrow}</Eyebrow>
          <h2 className="mt-4 font-display text-3xl md:text-5xl leading-tight tracking-tight text-balance">
            {paths.heading}
          </h2>
          <p className="mt-4 max-w-xl text-bekasi-ink/70 leading-relaxed">{paths.kicker}</p>
        </div>

        <div className="mt-12 md:mt-16 grid gap-4 md:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {paths.items.map((p, i) => {
            const Icon = ICONS[p.icon] ?? MapPin
            const accent = p.accent
            return (
              <motion.div
                key={p.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
              >
                <Link
                  href={p.href}
                  className={cn(
                    'group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border transition-all p-6 md:p-7 min-h-[260px]',
                    accent
                      ? 'bg-bekasi-emerald-900 border-bekasi-emerald-900 text-white hover:shadow-2xl hover:shadow-bekasi-emerald-900/30'
                      : 'bg-white border-bekasi-emerald-900/10 text-bekasi-ink hover:border-bekasi-emerald-900/30 hover:shadow-elevated',
                  )}
                >
                  {/* Ambient dot for accent */}
                  {accent && (
                    <div aria-hidden className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-bekasi-gold-500/20 blur-3xl" />
                  )}

                  <div className="relative">
                    <div
                      className={cn(
                        'inline-flex h-12 w-12 items-center justify-center rounded-full',
                        accent
                          ? 'bg-bekasi-gold-500 text-bekasi-emerald-900'
                          : 'bg-bekasi-emerald-900/5 text-bekasi-emerald-900',
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className={cn('mt-4 text-[10.5px] uppercase tracking-[0.22em]', accent ? 'text-bekasi-gold-400' : 'text-bekasi-gold-600')}>
                      {p.count}
                    </div>
                    <h3 className={cn('mt-2 font-display text-2xl md:text-[1.65rem] leading-tight', accent ? 'text-white' : 'text-bekasi-emerald-900')}>
                      {p.label}
                    </h3>
                    <p className={cn('mt-2 text-sm leading-relaxed', accent ? 'text-white/70' : 'text-bekasi-ink/65')}>
                      {p.kicker}
                    </p>
                  </div>

                  <div className={cn('relative mt-6 inline-flex items-center gap-1.5 text-sm font-medium',
                    accent ? 'text-bekasi-gold-400' : 'text-bekasi-emerald-900',
                  )}>
                    Enter
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-px group-hover:translate-x-px" />
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
