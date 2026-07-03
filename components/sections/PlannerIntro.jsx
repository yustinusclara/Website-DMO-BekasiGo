'use client'

import Link from 'next/link'
import Section from '@/components/layout/Section'
import { PLANNER } from '@/lib/content/homepage'
import { Button } from '@/components/ui/button'
import { Sparkles, Check, MessageSquare, MapPin, Route } from 'lucide-react'

const STOP_ICONS = [MapPin, MapPin, Route, MapPin]

export default function PlannerIntro() {
  return (
    <Section id="planner" variant="dark" containerClassName="relative">
      <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        <div className="lg:col-span-6">
          <span className="eyebrow eyebrow-dot text-bekasi-gold-400">{PLANNER.eyebrow}</span>
          <h2 className="mt-5 heading-display text-4xl md:text-6xl leading-[1.02] text-white text-balance">
            {PLANNER.title}
          </h2>
          <p className="mt-5 text-lg text-white/75 max-w-lg leading-relaxed">
            {PLANNER.kicker}
          </p>
          <ul className="mt-8 space-y-3">
            {PLANNER.bullets.map((b) => (
              <li key={b} className="flex items-center gap-3 text-white/85">
                <span className="h-6 w-6 rounded-full bg-bekasi-gold-500/20 border border-bekasi-gold-500/40 text-bekasi-gold-400 flex items-center justify-center">
                  <Check className="h-3.5 w-3.5" />
                </span>
                <span className="text-sm md:text-base">{b}</span>
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <Link href={PLANNER.cta.href}>
              <Button className="h-12 rounded-full bg-bekasi-gold-500 hover:bg-bekasi-gold-400 text-bekasi-emerald-900 px-7 font-medium shadow-xl shadow-bekasi-gold-500/25">
                <Sparkles className="h-4 w-4 mr-2" /> {PLANNER.cta.label}
              </Button>
            </Link>
          </div>
        </div>

        {/* Mock planner card */}
        <div className="lg:col-span-6 relative">
          <div className="relative rounded-3xl bg-white/[0.04] border border-white/10 backdrop-blur-xl p-6 md:p-8 shadow-2xl shadow-black/40">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-bekasi-gold-500 text-bekasi-emerald-900 flex items-center justify-center">
                  <Sparkles className="h-4 w-4" />
                </div>
                <span className="font-display text-white text-lg">Your Bekasi Itinerary</span>
              </div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-bekasi-gold-400">Draft</span>
            </div>
            <div className="mt-6 space-y-4">
              {PLANNER.mockStops.map((s, i) => {
                const Icon = STOP_ICONS[i] ?? MapPin
                return (
                  <div key={s.time} className="flex items-center gap-4 p-3 rounded-xl bg-black/20 border border-white/5">
                    <span className="font-mono text-xs text-bekasi-gold-400 w-14">{s.time}</span>
                    <div className="h-9 w-9 rounded-lg bg-bekasi-emerald-700 text-bekasi-gold-400 flex items-center justify-center">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-white font-medium">{s.place}</div>
                      <div className="text-[11px] uppercase tracking-[0.2em] text-white/50 mt-0.5">{s.tag}</div>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="mt-6 flex items-center gap-3 rounded-xl border border-bekasi-gold-500/30 bg-bekasi-gold-500/5 p-4">
              <MessageSquare className="h-4 w-4 text-bekasi-gold-400 flex-shrink-0" />
              <p className="text-xs text-white/75">
                <span className="text-bekasi-gold-400">Refine:</span> "Add a Betawi cultural stop before lunch."
              </p>
            </div>
          </div>
          <div aria-hidden className="absolute -inset-8 -z-10 rounded-[36px] bg-bekasi-gold-500/10 blur-3xl" />
        </div>
      </div>
    </Section>
  )
}
