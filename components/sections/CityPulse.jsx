'use client'

import Link from 'next/link'
import Section from '@/components/layout/Section'
import { CITY_PULSE } from '@/lib/content/homepage'
import { Calendar, MapPin, ArrowUpRight } from 'lucide-react'

export default function CityPulse() {
  return (
    <Section id="events" variant="cream"
      eyebrow={CITY_PULSE.eyebrow}
      title={CITY_PULSE.title}
      kicker={CITY_PULSE.kicker}
      action={CITY_PULSE.action}
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        {CITY_PULSE.events.map((e, i) => (
          <Link
            key={i}
            href="/events"
            className="group relative rounded-2xl bg-white border border-black/5 overflow-hidden p-6 flex flex-col justify-between min-h-[240px] hover:shadow-xl hover:shadow-bekasi-emerald-900/5 hover:-translate-y-1 transition-all"
          >
            <div className="absolute right-5 top-5 text-right">
              <div className="font-display text-4xl md:text-5xl text-bekasi-emerald-900 leading-none">
                {e.date.split(' ')[1]}
              </div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-bekasi-ink/50 mt-1">
                {e.month}
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] uppercase tracking-[0.25em] text-bekasi-gold-600 border border-bekasi-gold-500/30 rounded-full px-2.5 py-1 bg-bekasi-gold-500/10">
                {e.tag}
              </span>
            </div>
            <div>
              <h3 className="font-display text-xl md:text-2xl text-bekasi-emerald-900 leading-snug mb-3 pr-14">
                {e.title}
              </h3>
              <div className="flex items-center gap-2 text-xs text-bekasi-ink/60">
                <MapPin className="h-3.5 w-3.5" />
                {e.venue}
              </div>
            </div>
            <div className="absolute bottom-4 right-5 h-9 w-9 rounded-full bg-bekasi-emerald-900 text-bekasi-gold-400 flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-10 flex flex-col md:flex-row md:items-center justify-between rounded-2xl bg-white/70 border border-bekasi-emerald-900/10 p-6">
        <div className="flex items-center gap-4">
          <div className="h-11 w-11 rounded-full bg-bekasi-emerald-900 text-bekasi-gold-400 flex items-center justify-center">
            <Calendar className="h-5 w-5" />
          </div>
          <div>
            <p className="font-medium text-bekasi-emerald-900">Full calendar of what's on in Bekasi.</p>
            <p className="text-sm text-bekasi-ink/60">Filter by month, category, and neighborhood.</p>
          </div>
        </div>
        <Link href="/events" className="mt-4 md:mt-0 inline-flex items-center gap-2 text-sm font-medium text-bekasi-emerald-900 hover:text-bekasi-emerald-700">
          Open calendar <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </Section>
  )
}
