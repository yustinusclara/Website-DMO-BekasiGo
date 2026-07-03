'use client'

import Link from 'next/link'
import Section from '@/components/layout/Section'
import { URBAN } from '@/lib/content/homepage'
import { ArrowUpRight } from 'lucide-react'

export default function UrbanLifestyle() {
  // asymmetric editorial grid, works for 5 tiles
  const layouts = [
    'col-span-12 md:col-span-7 aspect-[16/10]',
    'col-span-12 md:col-span-5 aspect-[16/10]',
    'col-span-12 md:col-span-4 aspect-[4/5]',
    'col-span-12 md:col-span-4 aspect-[4/5]',
    'col-span-12 md:col-span-4 aspect-[4/5]',
  ]
  return (
    <Section id="urban" variant="light"
      eyebrow={URBAN.eyebrow}
      title={URBAN.title}
      kicker={URBAN.kicker}
      action={URBAN.action}
    >
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        {URBAN.tiles.map((tile, i) => (
          <UrbanTile key={tile.title} item={tile} className={layouts[i] || layouts[0]} />
        ))}
      </div>
    </Section>
  )
}

function UrbanTile({ item, className = '' }) {
  return (
    <Link href="#" className={`group relative overflow-hidden rounded-3xl bg-bekasi-emerald-900 ${className}`}>
      <img src={item.image} alt={item.title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
        loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
      <div className="absolute top-4 left-4">
        <span className="text-[10px] uppercase tracking-[0.25em] text-white/90 bg-black/30 backdrop-blur px-3 py-1 rounded-full border border-white/20">
          {item.tag}
        </span>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7 flex items-end justify-between gap-4">
        <h3 className="font-display text-2xl md:text-3xl text-white leading-tight max-w-xs">
          {item.title}
        </h3>
        <div className="h-10 w-10 rounded-full bg-bekasi-gold-500 text-bekasi-emerald-900 flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all flex-shrink-0">
          <ArrowUpRight className="h-4 w-4" />
        </div>
      </div>
    </Link>
  )
}
