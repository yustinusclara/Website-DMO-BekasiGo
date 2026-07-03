'use client'

import Link from 'next/link'
import { Play, ChevronDown, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { HERO } from '@/lib/content/homepage'

export default function HeroVideo() {
  return (
    <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden text-white">
      {/* Media layer */}
      <div className="absolute inset-0">
        {HERO.videoUrl ? (
          <video
            autoPlay muted loop playsInline poster={HERO.poster}
            className="h-full w-full object-cover"
          >
            <source src={HERO.videoUrl} type="video/mp4" />
          </video>
        ) : (
          <img
            src={HERO.poster}
            alt="Kota Bekasi cityscape"
            className="h-full w-full object-cover animate-kenburns"
          />
        )}
        {/* Layered overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-bekasi-emerald-900/70 via-bekasi-emerald-900/40 to-bekasi-emerald-900/95" />
        <div className="absolute inset-0 bg-gradient-to-r from-bekasi-emerald-900/60 via-transparent to-transparent" />
        <div aria-hidden className="absolute inset-0 bg-noise opacity-[0.08] mix-blend-overlay" />
      </div>

      {/* Frame markers */}
      <div className="absolute inset-x-0 top-28 md:top-36 pointer-events-none">
        <div className="container flex items-center justify-between text-[10px] uppercase tracking-[0.28em] text-white/50">
          <span>N 6°14′ · E 106°59′</span>
          <span>Est. 1996 · A city of 2.5M</span>
        </div>
      </div>

      {/* Content */}
      <div className="relative h-full container flex flex-col justify-end pb-24 md:pb-32">
        <div className="max-w-3xl">
          <span className="eyebrow eyebrow-dot text-bekasi-gold-400">{HERO.eyebrow}</span>
          <h1 className="mt-6 heading-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight text-balance">
            {HERO.title}
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed">
            {HERO.subtitle}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link href={HERO.primaryCta.href}>
              <Button className="h-12 rounded-full bg-bekasi-gold-500 hover:bg-bekasi-gold-400 text-bekasi-emerald-900 px-7 text-sm font-medium shadow-xl shadow-bekasi-gold-500/25">
                <Sparkles className="h-4 w-4 mr-2" /> {HERO.primaryCta.label}
              </Button>
            </Link>
            <Link href={HERO.secondaryCta.href} className="group inline-flex items-center gap-3 text-white/90 hover:text-white">
              <span className="h-11 w-11 rounded-full border border-white/40 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                <Play className="h-4 w-4 fill-white" />
              </span>
              <span className="text-sm font-medium">{HERO.secondaryCta.label}</span>
            </Link>
          </div>
        </div>

        {/* Bottom row: stats + scroll cue */}
        <div className="mt-16 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div className="grid grid-cols-3 gap-8 md:gap-16 max-w-xl">
            {HERO.stats.map((s) => (
              <div key={s.v}>
                <div className="font-display text-3xl md:text-4xl text-bekasi-gold-400">{s.k}</div>
                <div className="mt-1 text-xs uppercase tracking-[0.2em] text-white/60">{s.v}</div>
              </div>
            ))}
          </div>
          <a href="#quick-explore" className="hidden md:inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-white/60 hover:text-white group">
            Scroll to explore
            <ChevronDown className="h-4 w-4 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  )
}
