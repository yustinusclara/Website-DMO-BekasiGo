'use client'

import Link from 'next/link'
import {
  Instagram, Youtube, Facebook, Twitter, Music2,
  MapPin, Globe, Mail, ArrowRight, Sparkles,
} from 'lucide-react'
import { FOOTER, NAV } from '@/lib/content/homepage'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const ICONS = {
  instagram: Instagram, youtube: Youtube, facebook: Facebook,
  twitter: Twitter, 'music-2': Music2,
}

export default function SiteFooter() {
  return (
    <footer className="relative gradient-emerald text-white overflow-hidden">
      {/* Big brand wordmark backdrop */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 pointer-events-none flex items-end justify-center overflow-hidden">
        <span className="font-display text-[22vw] leading-[0.8] tracking-tight text-white/[0.035] select-none whitespace-nowrap translate-y-[10%]">
          BekasiGo
        </span>
      </div>

      {/* Newsletter strip */}
      <div className="relative border-b border-white/10">
        <div className="container py-14 md:py-20 grid gap-10 lg:grid-cols-2 items-center">
          <div>
            <span className="eyebrow eyebrow-dot text-bekasi-gold-400">Newsletter</span>
            <h3 className="mt-4 heading-display text-3xl md:text-5xl leading-tight text-balance">
              A slower letter from Bekasi, once a month.
            </h3>
            <p className="mt-4 text-white/70 max-w-md">
              Stories, guides, and event drops — no spam, unsubscribe anytime.
            </p>
          </div>
          <form className="flex flex-col sm:flex-row gap-3">
            <Input
              type="email"
              placeholder="you@email.com"
              className="h-12 flex-1 bg-white/5 border-white/20 text-white placeholder:text-white/40 focus-visible:ring-bekasi-gold-400"
            />
            <Button type="button" className="h-12 rounded-md bg-bekasi-gold-500 hover:bg-bekasi-gold-400 text-bekasi-emerald-900 font-medium px-6">
              Subscribe <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </form>
        </div>
      </div>

      {/* Mega nav */}
      <div className="relative container py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10">
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-full bg-bekasi-gold-500 flex items-center justify-center">
                <span className="font-display text-bekasi-emerald-900 text-lg leading-none">B</span>
              </div>
              <span className="font-display text-xl tracking-tight">BekasiGo</span>
            </Link>
            <p className="mt-4 text-sm text-white/60 leading-relaxed max-w-xs">
              {FOOTER.tagline}
            </p>
            <div className="mt-6 flex items-center gap-2 text-xs text-white/50">
              <MapPin className="h-3.5 w-3.5" />
              Jl. Ahmad Yani, Kota Bekasi 17141
            </div>
            <div className="mt-1 flex items-center gap-2 text-xs text-white/50">
              <Mail className="h-3.5 w-3.5" />
              hello@bekasigo.id
            </div>
          </div>

          {FOOTER.columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs uppercase tracking-[0.22em] text-bekasi-gold-400 mb-4">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-white/75 hover:text-white transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Planner CTA card */}
        <div className="mt-16 rounded-2xl bg-white/[0.04] border border-white/10 p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-6">
          <div className="flex items-center gap-4 flex-1">
            <div className="h-12 w-12 rounded-full bg-bekasi-gold-500/15 border border-bekasi-gold-500/40 flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-bekasi-gold-400" />
            </div>
            <div>
              <p className="text-white font-medium">Not sure where to begin?</p>
              <p className="text-sm text-white/60">Let the Smart Planner build a full itinerary in seconds.</p>
            </div>
          </div>
          <Link href={NAV.cta.href}>
            <Button className="h-11 rounded-full bg-bekasi-gold-500 hover:bg-bekasi-gold-400 text-bekasi-emerald-900 px-6">
              Try the Smart Planner
            </Button>
          </Link>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-white/10">
        <div className="container py-6 flex flex-col md:flex-row items-center gap-6 md:gap-4 justify-between text-xs text-white/50">
          <div className="flex flex-wrap items-center gap-4">
            <span>© {new Date().getFullYear()} BekasiGo. All rights reserved.</span>
            {FOOTER.meta.map((m) => (
              <Link key={m.href} href={m.href} className="hover:text-white transition-colors">
                {m.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-3">
              {FOOTER.social.map((s) => {
                const Icon = ICONS[s.icon] ?? Instagram
                return (
                  <Link key={s.label} href={s.href} aria-label={s.label} className="h-8 w-8 rounded-full border border-white/15 flex items-center justify-center hover:bg-white/10 hover:border-white/30 transition-colors">
                    <Icon className="h-3.5 w-3.5" />
                  </Link>
                )
              })}
            </div>
            <span className="flex items-center gap-1.5">
              <Globe className="h-3.5 w-3.5" /> EN / ID
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
