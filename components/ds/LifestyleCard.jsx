'use client'

import Link from 'next/link'
import { ArrowUpRight, MapPin } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * LifestyleCard — reusable portrait card for lifestyle destinations.
 * Editorial DMO tone: image · category · title · excerpt · tag row.
 * Reused in the homepage reel and future Discover / Urban pages.
 */
export default function LifestyleCard({ item, className, index }) {
  return (
    <Link
      href={item.href}
      className={cn(
        'group relative block rounded-2xl overflow-hidden bg-bekasi-emerald-900 aspect-[3/4]',
        'transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-elevated',
        className,
      )}
    >
      <img
        src={item.image}
        alt={item.title}
        loading="lazy"
        className="img-cover img-zoom-slow"
      />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

      <div className="absolute top-4 left-4 right-4 flex items-start justify-between z-10">
        <span className="tag-cat--overlay">{item.category}</span>
        {index !== undefined && (
          <span className="mono text-white/70">0{index}</span>
        )}
      </div>

      <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 z-10">
        <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.22em] text-white/70 mb-2">
          <MapPin className="h-3 w-3" /> {item.district}
        </div>
        <h3 className="font-display text-xl md:text-2xl text-white leading-tight text-balance">
          {item.title}
        </h3>
        {item.excerpt && (
          <p className="mt-2 text-sm text-white/70 line-clamp-2 max-w-xs">
            {item.excerpt}
          </p>
        )}
        <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-bekasi-gold-400">
          Explore hub
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </Link>
  )
}
