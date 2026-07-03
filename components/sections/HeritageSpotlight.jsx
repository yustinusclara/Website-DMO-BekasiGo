'use client'

import Link from 'next/link'
import Section from '@/components/layout/Section'
import { HERITAGE } from '@/lib/content/homepage'
import { ArrowUpRight } from 'lucide-react'

export default function HeritageSpotlight() {
  return (
    <Section id="heritage" variant="dark"
      eyebrow={HERITAGE.eyebrow}
      title={HERITAGE.title}
      kicker={HERITAGE.kicker}
      action={HERITAGE.action}
    >
      <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
        {/* Feature image */}
        <div className="lg:col-span-7 relative rounded-3xl overflow-hidden aspect-[4/5] lg:aspect-auto lg:min-h-[560px] group bg-bekasi-emerald-900">
          <img src={HERITAGE.image} alt="Bekasi heritage"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1500ms] group-hover:scale-105" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-tr from-bekasi-emerald-900/85 via-bekasi-emerald-900/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <span className="text-[10px] uppercase tracking-[0.3em] text-bekasi-gold-400">{HERITAGE.featureCaption.tag}</span>
            <h3 className="mt-2 font-display text-3xl md:text-5xl text-white leading-tight text-balance">
              {HERITAGE.featureCaption.title}
            </h3>
            <div className="mt-4 hairline-invert" />
            <div className="mt-4 flex items-center justify-between text-white/70 text-sm">
              <span>{HERITAGE.featureCaption.meta}</span>
              <Link href="/stories/hok-lay-kiong" className="inline-flex items-center gap-1.5 text-bekasi-gold-400 hover:text-white">
                Read <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Side stack */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          {HERITAGE.cards.map((c) => (
            <Link key={c.title} href="#" className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.06] transition-colors flex items-stretch min-h-[140px]">
              <div className="relative w-32 md:w-44 flex-shrink-0 overflow-hidden bg-bekasi-emerald-800">
                <img src={c.image} alt={c.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
              </div>
              <div className="flex-1 p-5 md:p-6 flex flex-col justify-center">
                <div className="text-[10px] uppercase tracking-[0.25em] text-bekasi-gold-400">{c.meta}</div>
                <h4 className="mt-2 font-display text-xl md:text-2xl text-white leading-snug">{c.title}</h4>
              </div>
              <ArrowUpRight className="absolute top-4 right-4 h-4 w-4 text-white/50 group-hover:text-bekasi-gold-400 transition-colors" />
            </Link>
          ))}
        </div>
      </div>
    </Section>
  )
}
