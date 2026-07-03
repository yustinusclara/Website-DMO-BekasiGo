'use client'

import Link from 'next/link'
import Section from '@/components/layout/Section'
import { UTILITY } from '@/lib/content/homepage'
import { ArrowUpRight, Check } from 'lucide-react'

export default function UtilityPreview() {
  return (
    <Section id="utility" variant="sand"
      eyebrow={UTILITY.eyebrow}
      title={UTILITY.title}
      kicker={UTILITY.kicker}
      align="center"
    >
      <div className="grid md:grid-cols-3 gap-5 md:gap-6">
        {UTILITY.columns.map((col, i) => (
          <Link
            key={col.key}
            href={col.href}
            className="group relative overflow-hidden rounded-3xl bg-white flex flex-col shadow-sm hover:shadow-xl hover:shadow-bekasi-emerald-900/10 hover:-translate-y-1 transition-all"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <img src={col.image} alt={col.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <span className="absolute top-4 left-4 text-[10px] uppercase tracking-[0.25em] text-white/90 bg-black/30 backdrop-blur px-3 py-1 rounded-full border border-white/20">
                0{i + 1} / 03
              </span>
            </div>
            <div className="p-6 md:p-7 flex flex-col flex-1">
              <h3 className="font-display text-2xl md:text-3xl text-bekasi-emerald-900">{col.title}</h3>
              <ul className="mt-4 space-y-2.5 flex-1">
                {col.items.map((it) => (
                  <li key={it} className="flex items-center gap-3 text-sm text-bekasi-ink/75">
                    <span className="h-5 w-5 rounded-full bg-bekasi-emerald-900/5 text-bekasi-emerald-800 flex items-center justify-center">
                      <Check className="h-3 w-3" />
                    </span>
                    {it}
                  </li>
                ))}
              </ul>
              <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-bekasi-emerald-900 group-hover:gap-3 transition-all">
                Explore {col.title.toLowerCase()} <ArrowUpRight className="h-4 w-4" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  )
}
