'use client'

import Link from 'next/link'
import Section from '@/components/layout/Section'
import { STORIES } from '@/lib/content/homepage'
import { Clock, ArrowUpRight } from 'lucide-react'

export default function StoriesFromBekasi() {
  const [main, ...rest] = STORIES.items
  return (
    <Section id="stories" variant="light"
      eyebrow={STORIES.eyebrow}
      title={STORIES.title}
      kicker={STORIES.kicker}
      action={STORIES.action}
    >
      <div className="grid lg:grid-cols-12 gap-6 md:gap-8">
        {/* Feature */}
        <Link href="#" className="group lg:col-span-7 relative overflow-hidden rounded-3xl aspect-[4/3] lg:aspect-auto lg:min-h-[560px]">
          <img src={main.image} alt={main.title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1500ms] group-hover:scale-105" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
            <span className="text-[10px] uppercase tracking-[0.3em] text-bekasi-gold-400">{main.tag}</span>
            <h3 className="mt-3 heading-display text-3xl md:text-5xl text-white leading-tight max-w-xl text-balance">
              {main.title}
            </h3>
            <div className="mt-5 flex items-center gap-4 text-sm text-white/75">
              <span>By {main.author}</span>
              <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {main.readTime}</span>
            </div>
          </div>
        </Link>

        {/* Side list */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          {rest.map((s) => (
            <Link key={s.title} href="#" className="group grid grid-cols-3 gap-5 items-center rounded-2xl p-3 hover:bg-bekasi-cream transition-colors">
              <div className="col-span-1 aspect-[4/3] overflow-hidden rounded-xl">
                <img src={s.image} alt={s.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
              </div>
              <div className="col-span-2">
                <span className="text-[10px] uppercase tracking-[0.25em] text-bekasi-gold-600">{s.tag}</span>
                <h4 className="mt-2 font-display text-lg md:text-xl text-bekasi-emerald-900 leading-snug group-hover:text-bekasi-emerald-700 transition-colors">
                  {s.title}
                </h4>
                <div className="mt-2 flex items-center gap-3 text-xs text-bekasi-ink/60">
                  <span>{s.author}</span>
                  <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {s.readTime}</span>
                </div>
              </div>
            </Link>
          ))}
          <Link href="/stories" className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-bekasi-emerald-900 hover:text-bekasi-emerald-700">
            Browse all stories <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </Section>
  )
}
