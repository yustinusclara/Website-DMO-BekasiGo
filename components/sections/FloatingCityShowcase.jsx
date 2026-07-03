'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { FLOATING_CITY } from '@/lib/content/homepage'
import { ArrowUpRight, Sparkles } from 'lucide-react'

export default function FloatingCityShowcase() {
  return (
    <section id="floating-city" className="relative overflow-hidden gradient-emerald text-white">
      {/* Ambient background image */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-40 mix-blend-screen"
        style={{
          backgroundImage: `url(${FLOATING_CITY.bg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-bekasi-emerald-900/40 via-bekasi-emerald-900/70 to-bekasi-emerald-900" />
      {/* Glow */}
      <div aria-hidden className="absolute left-1/2 top-1/2 h-[70vw] w-[70vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-bekasi-gold-500/10 blur-[120px]" />

      <div className="relative container py-20 md:py-28 lg:py-32">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <span className="eyebrow eyebrow-dot text-bekasi-gold-400">{FLOATING_CITY.eyebrow}</span>
            <h2 className="mt-5 heading-display text-4xl md:text-6xl lg:text-7xl leading-[1.02] text-white text-balance whitespace-pre-line">
              {FLOATING_CITY.title}
            </h2>
            <p className="mt-6 text-lg text-white/75 max-w-lg leading-relaxed">
              {FLOATING_CITY.kicker}
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4 max-w-lg">
              {FLOATING_CITY.pillars.map((p) => (
                <div key={p.k} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="font-display text-lg text-bekasi-gold-400">{p.k}</div>
                  <div className="mt-1 text-xs text-white/65 leading-relaxed">{p.v}</div>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <Link href={FLOATING_CITY.cta.href}>
                <Button className="h-12 rounded-full bg-bekasi-gold-500 hover:bg-bekasi-gold-400 text-bekasi-emerald-900 px-7 font-medium shadow-xl shadow-bekasi-gold-500/25">
                  <Sparkles className="h-4 w-4 mr-2" /> {FLOATING_CITY.cta.label}
                  <ArrowUpRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Floating city artwork */}
          <div className="lg:col-span-6 order-1 lg:order-2 relative">
            <div className="relative aspect-square max-w-[560px] mx-auto">
              {/* Radial rings */}
              <div aria-hidden className="absolute inset-0 rounded-full border border-white/10" />
              <div aria-hidden className="absolute inset-6 rounded-full border border-white/[0.06]" />
              <div aria-hidden className="absolute inset-14 rounded-full border border-bekasi-gold-500/20" />
              {/* Gold glow behind image */}
              <div aria-hidden className="absolute inset-8 rounded-full bg-bekasi-gold-500/10 blur-3xl" />
              {/* The artwork */}
              <img
                src={FLOATING_CITY.image}
                alt="Kota Bekasi Floating Smart City"
                className="relative z-10 h-full w-full object-contain animate-float-y drop-shadow-[0_25px_45px_rgba(0,0,0,0.45)]"
                loading="lazy"
              />
              {/* Orbiting chips */}
              {[
                { label: 'Smart City',  top: '6%',  left: '4%'  },
                { label: 'Heritage',    top: '18%', right: '2%' },
                { label: 'Waterfront',  bottom: '20%', left: '0%' },
                { label: 'Youthful',    bottom: '8%',  right: '4%' },
              ].map((c) => (
                <span
                  key={c.label}
                  className="absolute z-20 text-[10px] uppercase tracking-[0.25em] text-bekasi-gold-400 bg-bekasi-emerald-900/70 backdrop-blur border border-bekasi-gold-500/30 px-3 py-1.5 rounded-full"
                  style={c}
                >
                  {c.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
